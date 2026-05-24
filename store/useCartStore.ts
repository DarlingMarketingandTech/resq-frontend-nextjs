'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  // Ref-counted scroll lock so concurrent overlays don't race each other.
  _scrollLockCount: number;
  lockScroll: () => void;
  unlockScroll: () => void;
}

/**
 * Apply or remove the body scroll lock based on the current ref count.
 * Called exclusively from lockScroll / unlockScroll so both Header and
 * CartDrawer share a single source of truth instead of independently
 * mutating document.body.style.overflow.
 */
function applyScrollLock(count: number) {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = count > 0 ? 'hidden' : '';
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      _scrollLockCount: 0,

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      lockScroll: () =>
        set((state) => {
          const next = state._scrollLockCount + 1;
          applyScrollLock(next);
          return { _scrollLockCount: next };
        }),

      unlockScroll: () =>
        set((state) => {
          const next = Math.max(0, state._scrollLockCount - 1);
          applyScrollLock(next);
          return { _scrollLockCount: next };
        }),
    }),
    {
      name: 'resq-cart-storage',
      // Don't persist the transient scroll-lock counter across page reloads.
      partialize: (state) => ({
        items: state.items,
        isCartOpen: state.isCartOpen,
      }),
    }
  )
);
