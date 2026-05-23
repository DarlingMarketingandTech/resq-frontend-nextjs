"use client";

import { create } from "zustand";

import type { CartState } from "@/types/cart";
import type { Product } from "@/types/product";

function addOrIncrement(items: CartState["items"], product: Product): CartState["items"] {
  const existing = items.find((item) => item.product.id === product.id);

  if (!existing) {
    return [...items, { product, quantity: 1 }];
  }

  return items.map((item) =>
    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
  );
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) => set((state) => ({ items: addOrIncrement(state.items, product) })),
  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((item) => item.product.id !== productId) })),
  clearCart: () => set({ items: [] }),
  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
