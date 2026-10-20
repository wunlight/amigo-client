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

    getTotalAmount: (state) => {
      return (type: 'all' | 'sparepart' | 'operation') => {
        return state.items
          .filter((val) => type === 'all' || val.type === type)
          .reduce((acc, val) => acc + val.price * val.quantity, 0)
      }
    },
  },

  actions: {
    addItem(data: CartItem) {
      const isInCart = this.isInCart(data.id)

      const normalizedData: CartItem = {
        ...data,
        availableStock: data.type === 'operation' ? 1 : data.availableStock,
        quantity: data.type === 'operation' ? 1 : data.quantity,
      }

      if (!isInCart) {
        const initialQty = Math.min(normalizedData.quantity, normalizedData.availableStock)
        if (initialQty > 0) {
          this.items.push({ ...normalizedData, quantity: initialQty })
        }
      } else if (data.type === 'sparepart') {
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
      if (!item || item.type === 'operation') return
      if (item.quantity < item.availableStock) {
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

    clearCart() {
      this.items = []
    },
  },
})
