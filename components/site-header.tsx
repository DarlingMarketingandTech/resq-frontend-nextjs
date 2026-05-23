import Link from "next/link";

import { CartSummary } from "@/components/cart/cart-summary";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          RESQ Storefront
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
          <Link href="/products" className="hover:text-slate-900">
            Products
          </Link>
          <CartSummary />
        </nav>
      </div>
    </header>
  );
}
