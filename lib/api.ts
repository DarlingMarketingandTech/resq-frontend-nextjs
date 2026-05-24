import { cache } from "react";

import type { Product } from "@/types/product";
import type { GraphQLResponse } from "@/types/wpgraphql";

type ProductsQueryResult = {
  products: {
    nodes: Product[];
  };
};

type ProductBySlugQueryResult = {
  products: {
    nodes: Product[];
  };
};

const endpoint = process.env.WP_GRAPHQL_URL;
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

const PRODUCTS_QUERY = /* GraphQL */ `
  query Products {
    products(first: 24) {
      nodes {
        id
        slug
        name
        shortDescription
        description
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
        }
        ... on ExternalProduct {
          price
          regularPrice
          salePrice
        }
      }
    }
  }
`;

const PRODUCT_BY_SLUG_QUERY = /* GraphQL */ `
  query ProductBySlug($slug: String!) {
    products(where: { slugIn: [$slug] }, first: 1) {
      nodes {
        id
        slug
        name
        shortDescription
        description
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
        }
        ... on ExternalProduct {
          price
          regularPrice
          salePrice
        }
      }
    }
  }
`;

function getAuthorizationHeader() {
  if (!consumerKey || !consumerSecret) {
    return undefined;
  }

  const encoded = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  return `Basic ${encoded}`;
}

async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  tags: string[] = [],
): Promise<T | null> {
  if (!endpoint) {
    return null;
  }

  const authorization = getAuthorizationHeader();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15_000);

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authorization ? { Authorization: authorization } : {}),
      },
      body: JSON.stringify({ query, variables }),
      signal: controller.signal,
      next: {
        revalidate: 300,
        tags,
      },
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`WPGraphQL request timed out after 15 s (endpoint: ${endpoint})`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new Error(`WPGraphQL request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as GraphQLResponse<T>;

  if (payload.errors?.length) {
    const message = payload.errors.map((error) => error.message).join("; ");
    throw new Error(`WPGraphQL responded with errors: ${message}`);
  }

  return payload.data ?? null;
}

const getProductsCached = cache(async (): Promise<Product[]> => {
  try {
    const data = await fetchGraphQL<ProductsQueryResult>(PRODUCTS_QUERY, undefined, ["products"]);
    return data?.products.nodes ?? [];
  } catch (err) {
    console.error("[api] getProductsCached failed:", err instanceof Error ? err.message : err);
    return [];
  }
});

const getProductBySlugCached = cache(async (slug: string): Promise<Product | null> => {
  try {
    const data = await fetchGraphQL<ProductBySlugQueryResult>(
      PRODUCT_BY_SLUG_QUERY,
      { slug },
      ["products", `product:${slug}`],
    );
    return data?.products.nodes[0] ?? null;
  } catch (err) {
    console.error(`[api] getProductBySlugCached("${slug}") failed:`, err instanceof Error ? err.message : err);
    return null;
  }
});

export async function getProducts(): Promise<Product[]> {
  return getProductsCached();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return getProductBySlugCached(slug);
}
