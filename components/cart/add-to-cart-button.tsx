"use client";

import { useCartStore } from "@/store/useCartStore";
import type { Product } from "@/types/product";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const syncToWC = useCartStore((state) => state.syncToWC);

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price ?? '',
      image: product.image?.sourceUrl ?? '',
    };
    addItem(cartItem);
    openCart();
    syncToWC(cartItem);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="rounded-md bg-brand-forest px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-forest-dark"
    >
      Add to Cart
    </button>
  );
}
