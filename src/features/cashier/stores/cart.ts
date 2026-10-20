import { defineStore } from 'pinia'
import type { CartItem } from '../types/cart.type'

type CartState = {
  items: CartItem[]
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
  }),

  getters: {
    isInCart: (state) => {
      return (id: string) => state.items.some((item) => item.id === id)
    },

    getQty: (state) => {
      return (id: string) => state.items.find((i) => i.id === id)?.quantity ?? 0
    },
  },

  actions: {
    addItem(data: CartItem) {
      const isInCart = this.isInCart(data.id)
      if (!isInCart) {
        const initialQty = Math.min(data.quantity, data.availableStock)
        if (initialQty > 0) {
          this.items.push({ ...data, quantity: initialQty })
        }
      } else {
        this.increaseQty(data.id)
      }
    },

    removeItem(id: string) {
      const index = this.items.findIndex((item) => item.id === id)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    },

    increaseQty(id: string) {
      const item = this.items.find((item) => item.id === id)
      if (item && item.quantity < item.availableStock) {
        item.quantity++
      }
    },

    decreaseQty(id: string) {
      const index = this.items.findIndex((item) => item.id === id)
      if (index !== -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity--
        } else {
          this.removeItem(id)
        }
      }
    },

    updatePrice(id: string, newPrice: number) {
      const index = this.items.findIndex((item) => item.id === id)
      if (index !== -1 && newPrice >= 0) {
        this.items[index].price = newPrice
      }
    },
  },
})
