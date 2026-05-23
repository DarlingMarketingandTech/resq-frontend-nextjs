import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <p className="rounded-md border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
        No products are available. Set WP_GRAPHQL_URL and confirm your WooCommerce WPGraphQL endpoint is online.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
