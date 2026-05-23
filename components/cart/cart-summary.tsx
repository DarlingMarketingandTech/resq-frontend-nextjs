"use client";

import { useCartStore } from "@/store/useCartStore";

export function CartSummary() {
  const totalItems = useCartStore((state) => state.totalItems());

  return (
    <span className="rounded-full bg-brand-forest px-3 py-1 text-xs font-semibold text-white">
      Cart ({totalItems})
    </span>
  );
}
