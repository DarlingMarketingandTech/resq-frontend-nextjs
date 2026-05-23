"use client";

import Link from "next/link";
import { useState } from "react";

import { CartSummary } from "@/components/cart/cart-summary";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-2xl font-bold tracking-tight text-brand-forest">
            ResQ
          </span>
          <span className="text-sm font-medium tracking-widest text-brand-muted uppercase">
            Organics
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          <Link
            href="/products?category=humans"
            className="text-sm font-medium text-brand-text transition-colors hover:text-brand-forest"
          >
            Shop for Humans
          </Link>
          <Link
            href="/products?category=pets"
            className="text-sm font-medium text-brand-text transition-colors hover:text-brand-forest"
          >
            Shop for Pets
          </Link>
          <Link
            href="/products?category=bundles"
            className="text-sm font-medium text-brand-text transition-colors hover:text-brand-forest"
          >
            Bundles
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <CartSummary />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-brand-muted transition-colors hover:text-brand-forest md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-brand-border bg-white px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/products?category=humans"
              className="text-sm font-medium text-brand-text transition-colors hover:text-brand-forest"
              onClick={() => setMobileOpen(false)}
            >
              Shop for Humans
            </Link>
            <Link
              href="/products?category=pets"
              className="text-sm font-medium text-brand-text transition-colors hover:text-brand-forest"
              onClick={() => setMobileOpen(false)}
            >
              Shop for Pets
            </Link>
            <Link
              href="/products?category=bundles"
              className="text-sm font-medium text-brand-text transition-colors hover:text-brand-forest"
              onClick={() => setMobileOpen(false)}
            >
              Bundles
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
