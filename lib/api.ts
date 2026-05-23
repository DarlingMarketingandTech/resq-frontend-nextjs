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
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

const PRODUCTS_QUERY = /* GraphQL */ `
  query Products {
    products(first: 24) {
      nodes {
        id
        slug
        name
        shortDescription
        description
        price
        regularPrice
        salePrice
        image {
          sourceUrl
          altText
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
        price
        regularPrice
        salePrice
        image {
          sourceUrl
          altText
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

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authorization ? { Authorization: authorization } : {}),
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: 300,
      tags,
    },
  });

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
  const data = await fetchGraphQL<ProductsQueryResult>(PRODUCTS_QUERY, undefined, ["products"]);
  return data?.products.nodes ?? [];
});

const getProductBySlugCached = cache(async (slug: string): Promise<Product | null> => {
  const data = await fetchGraphQL<ProductBySlugQueryResult>(
    PRODUCT_BY_SLUG_QUERY,
    { slug },
    ["products", `product:${slug}`],
  );

  return data?.products.nodes[0] ?? null;
});

export async function getProducts(): Promise<Product[]> {
  return getProductsCached();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return getProductBySlugCached(slug);
}
