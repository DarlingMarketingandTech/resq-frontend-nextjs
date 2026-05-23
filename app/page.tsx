import Link from "next/link";

export default function HomePage() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Next.js 16 Headless WooCommerce Storefront
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        This starter uses App Router Server Components, WPGraphQL data fetching, Tailwind CSS, and Zustand cart
        state management to provide a scalable ecommerce baseline.
      </p>
      <div className="mt-6">
        <Link
          href="/products"
          className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Browse Products
        </Link>
      </div>
    </section>
  );
}
