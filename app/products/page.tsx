import { ProductGrid } from "@/components/product-grid";
import { getProducts } from "@/lib/api";

export const revalidate = 300;

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Products</h1>
        <p className="mt-2 text-sm text-slate-600">Server-rendered WooCommerce product listing with cached WPGraphQL fetches.</p>
      </header>
      <ProductGrid products={products} />
    </section>
  );
}
