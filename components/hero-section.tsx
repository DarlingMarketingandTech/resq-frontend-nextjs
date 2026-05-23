import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-warm">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-brand-sage" />
        <div className="absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full bg-brand-honey" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-10 lg:py-40">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-brand-honey uppercase">
            Therapeutic Skincare
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
            Nature&rsquo;s Healing,{" "}
            <span className="text-brand-forest">Perfected.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-brand-muted sm:text-lg">
            Medical-grade Manuka Honey, Organic Aloe Vera, and Full-Spectrum CBD
            — crafted into premium therapeutic formulas for the whole family.
            Humans and pets alike.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/products?category=humans"
              className="inline-flex items-center rounded-full bg-brand-forest px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-forest-dark hover:shadow-md"
            >
              Shop for Humans
            </Link>
            <Link
              href="/products?category=pets"
              className="inline-flex items-center rounded-full border border-brand-forest px-7 py-3.5 text-sm font-semibold text-brand-forest transition-all hover:bg-brand-forest hover:text-white"
            >
              Shop for Pets
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-8 border-t border-brand-border pt-8">
            <div>
              <p className="text-2xl font-bold text-brand-dark">100%</p>
              <p className="mt-1 text-xs text-brand-muted">Organic &amp; Natural</p>
            </div>
            <div className="h-10 w-px bg-brand-border" />
            <div>
              <p className="text-2xl font-bold text-brand-dark">UMF</p>
              <p className="mt-1 text-xs text-brand-muted">Certified Manuka</p>
            </div>
            <div className="h-10 w-px bg-brand-border" />
            <div>
              <p className="text-2xl font-bold text-brand-dark">Zero</p>
              <p className="mt-1 text-xs text-brand-muted">Parabens &amp; Sulfates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
