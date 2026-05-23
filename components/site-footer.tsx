import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-border bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-brand-forest">
                ResQ
              </span>
              <span className="text-xs font-medium tracking-widest text-brand-muted uppercase">
                Organics
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-brand-muted">
              Premium therapeutic skincare powered by nature&rsquo;s most
              effective healing ingredients.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-wider text-brand-dark uppercase">
              Shop
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/products?category=humans" className="text-xs text-brand-muted transition-colors hover:text-brand-forest">
                  Shop for Humans
                </Link>
              </li>
              <li>
                <Link href="/products?category=pets" className="text-xs text-brand-muted transition-colors hover:text-brand-forest">
                  Shop for Pets
                </Link>
              </li>
              <li>
                <Link href="/products?category=bundles" className="text-xs text-brand-muted transition-colors hover:text-brand-forest">
                  Bundles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-wider text-brand-dark uppercase">
              Learn
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/about" className="text-xs text-brand-muted transition-colors hover:text-brand-forest">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/ingredients" className="text-xs text-brand-muted transition-colors hover:text-brand-forest">
                  Key Ingredients
                </Link>
              </li>
              <li>
                <Link href="/guarantee" className="text-xs text-brand-muted transition-colors hover:text-brand-forest">
                  Our Guarantee
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-wider text-brand-dark uppercase">
              Support
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/contact" className="text-xs text-brand-muted transition-colors hover:text-brand-forest">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-xs text-brand-muted transition-colors hover:text-brand-forest">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-xs text-brand-muted transition-colors hover:text-brand-forest">
                  Returns &amp; Shipping
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-border pt-6">
          <p className="text-center text-[11px] text-brand-muted">
            &copy; {new Date().getFullYear()} ResQ Organics. All rights reserved.
            Statements have not been evaluated by the FDA. Products are not intended
            to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </div>
    </footer>
  );
}
