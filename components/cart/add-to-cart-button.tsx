"use client";

import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/types/product";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
    >
      Add to Cart
    </button>
  );
}
