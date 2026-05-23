import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
  title?: string;
  subtitle?: string;
};

export function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-brand-border bg-white p-10 text-center">
        <p className="text-sm text-brand-muted">
          No products available at this time.
        </p>
      </div>
    );
  }

  return (
    <section>
      {(title || subtitle) && (
        <div className="mb-10 text-center">
          {title && (
            <h2 className="text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-muted sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
