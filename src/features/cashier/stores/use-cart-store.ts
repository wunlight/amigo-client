import { defineStore } from 'pinia'
import type { CartItem, CheckoutPayload } from '../types/cart.type'

const STORAGE_KEY = 'cart_session'

type CartState = {
  items: CartItem[]
  notes: string
  idempotency_key: string
}

const loadSavedState = (): CartState => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    const parsed = JSON.parse(saved)
    if (parsed && Array.isArray(parsed.items)) {
      return parsed
    }
  }

  return {
    items: [],
    notes: '',
    idempotency_key: crypto.randomUUID(),
  }
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => loadSavedState(),

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

    getCheckoutPayload: (state): CheckoutPayload => ({
      items: state.items.map((i) => ({
        type: i.type,
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        unit_price: i.price,
      })),
      notes: state.notes,
      idempotency_key: state.idempotency_key,
    }),
  },

  actions: {
    addItem(data: CartItem) {
      const isInCart = this.isInCart(data.id)

      const normalizedData: CartItem = {
        ...data,
        available_stock: data.type === 'operation' ? 1 : data.available_stock,
        quantity: data.type === 'operation' ? 1 : data.quantity,
      }

      if (!isInCart) {
        const initialQty = Math.min(normalizedData.quantity, normalizedData.available_stock)
        if (initialQty > 0) {
          this.items.push({ ...normalizedData, quantity: initialQty })
        }
      } else if (data.type === 'sparepart') {
        this.increaseQty(data.id)
      }

      this.persist()
    },

    removeItem(id: string) {
      const index = this.items.findIndex((item) => item.id === id)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
      if (this.items.length <= 0) this.clearCart()
      else this.persist()
    },

    increaseQty(id: string) {
      const item = this.items.find((item) => item.id === id)
      if (!item || item.type === 'operation') return
      if (item.quantity < item.available_stock) {
        item.quantity++
        this.persist()
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
      if (this.items.length <= 0) this.clearCart()
      else this.persist()
    },

    updatePrice(id: string, newPrice: number) {
      const index = this.items.findIndex((item) => item.id === id)
      if (index !== -1 && newPrice >= 0) {
        this.items[index].price = newPrice
      }
      this.persist()
    },

    updateNotes(notes: string) {
      this.notes = notes
      this.persist()
    },

    clearCart() {
      this.items = []
      this.notes = ''
      this.idempotency_key = crypto.randomUUID()
      localStorage.removeItem(STORAGE_KEY)
    },

    persist() {
      const stateToSave: CartState = {
        items: this.items,
        notes: this.notes,
        idempotency_key: this.idempotency_key,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
    },
  },
})
