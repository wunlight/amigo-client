import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  type: "sparepart" | "service";
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;

  isInCart: (id: string) => boolean;
  getSpareparts: () => CartItem[];
  getServices: () => CartItem[];
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
            if (existingIndex !== -1) {
              return state;
            }
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

      isInCart: (id) => {
        return get().items.some((item) => item.id === id);
      },

      getSpareparts: () => {
        return get().items.filter((item) => item.type === "sparepart");
      },

      getServices: () => {
        return get().items.filter((item) => item.type === "service");
      },
    }),
    {
      name: "cashier-cart-storage",
    },
  ),
);
