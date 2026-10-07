import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CheckoutPayload } from "../types/checkout";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  availableStock: number;
  qty: number;
  type: "sparepart" | "service";
};

interface CartState {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updatePrice: (id: string, newPrice: number) => void;
  updateAvailableStock: (id: string, newStock: number) => void;
  updateQty: (id: string, qty: number) => void;
  incrementQty: (id: string) => void;
  decrementQty: (id: string) => void;
  clearCart: () => void;

  isInCart: (id: string) => boolean;
  getSpareparts: () => CartItem[];
  getServices: () => CartItem[];

  getItemQty: (id: string) => number;
  getItemSubtotal: (id: string) => number;
  getSparepartsTotalAmount: () => number;
  getServicesTotalAmount: () => number;
  getTotalAmount: () => number;

  getCheckoutPayload: () => CheckoutPayload;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.id === newItem.id,
          );

          if (newItem.type === "service") {
            if (existingIndex !== -1) return state;
            return {
              items: [...state.items, { ...newItem, qty: 1 }],
            };
          }

          const initialQty = newItem.qty && newItem.qty > 0 ? newItem.qty : 1;

          if (existingIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              qty: updatedItems[existingIndex].qty + initialQty,
            };
            return { items: updatedItems };
          }

          return {
            items: [...state.items, { ...newItem, qty: initialQty }],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updatePrice: (id, newPrice) => {
        const validatedPrice = Math.max(0, newPrice);

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, price: validatedPrice } : item,
          ),
        }));
      },

      updateAvailableStock(id, newStock) {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, availableStock: newStock } : item,
          ),
        }));
      },

      updateQty: (id, newQty) => {
        const item = get().items.find((i) => i.id === id);
        if (!item || item.type === "service") return;

        if (newQty <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty: newQty } : i,
          ),
        }));
      },

      incrementQty: (id) => {
        const item = get().items.find((i) => i.id === id);
        if (!item || item.type === "service") return;

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i,
          ),
        }));
      },

      decrementQty: (id) => {
        const item = get().items.find((i) => i.id === id);
        if (!item || item.type === "service") return;

        if (item.qty <= 1) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty: i.qty - 1 } : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      isInCart: (id) => get().items.some((item) => item.id === id),

      getSpareparts: () =>
        get().items.filter((item) => item.type === "sparepart"),

      getServices: () => get().items.filter((item) => item.type === "service"),

      getItemQty: (id) => {
        const item = get().items.find((i) => i.id === id);
        return item ? item.qty : 0;
      },

      getItemSubtotal: (id) => {
        const item = get().items.find((i) => i.id === id);
        return item ? item.price * item.qty : 0;
      },

      getSparepartsTotalAmount: () => {
        return get()
          .getSpareparts()
          .reduce((total, item) => total + item.price * item.qty, 0);
      },

      getServicesTotalAmount: () => {
        return get()
          .getServices()
          .reduce((total, item) => total + item.price * item.qty, 0);
      },

      getTotalAmount: () =>
        get().items.reduce((total, item) => total + item.price * item.qty, 0),

      getCheckoutPayload: () => {
        const { items, getTotalAmount } = get();

        return {
          total_amount: getTotalAmount(),
          items: items.map((item) => ({
            item_id: item.id,
            type: item.type,
            price: item.price,
            qty: item.qty,
          })),
        };
      },
    }),
    {
      name: "cashier-cart-storage",
    },
  ),
);
