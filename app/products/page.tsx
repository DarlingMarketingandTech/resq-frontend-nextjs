import { getProducts } from "@/lib/api";
import { ProductListClient } from "@/components/plp/ProductListClient";

export const revalidate = 300;

export const metadata = {
  title: 'Products | ResQ Organics',
  description: 'Explore our premium natural wellness products for humans and pets.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>;
}) {
  const products = await getProducts();
  const params = await searchParams;

  return (
    <>
      {/* PLP Hero Section */}
      <section className="bg-gradient-to-r from-brand-forest to-brand-sage py-12 md:py-16 lg:py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">
            Our Products
          </h1>
          <p className="text-lg md:text-xl text-brand-mint max-w-2xl">
            Discover premium botanical wellness products crafted from nature's most powerful ingredients.
            From skincare to pet care, we have a solution for every wellness need.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <ProductListClient products={products} />
      </section>
    </>
  );
}
