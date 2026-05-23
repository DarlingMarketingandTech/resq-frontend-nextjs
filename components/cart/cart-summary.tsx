"use client";

import { useCartStore } from "@/lib/cart-store";

export function CartSummary() {
  const totalItems = useCartStore((state) => state.totalItems());

  return <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">Cart ({totalItems})</span>;
}
