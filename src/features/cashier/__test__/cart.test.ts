import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vite-plus/test'
import { useCartStore } from '../stores/cart'
import type { CartItem } from '../types/cart.type'

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize cart with blank state', () => {
    const store = useCartStore()
    expect(store.items).toEqual([])
  })

  it('will add new item to cart', () => {
    const store = useCartStore()
    const newItem: CartItem = {
      id: 'item-1',
      name: 'Kampas Rem',
      availableStock: 5,
      price: 50000,
      quantity: 1,
    }

    store.addItem(newItem)

    expect(store.items.length).toBe(1)
    expect(store.items[0]).toEqual(newItem)
    expect(store.isInCart('item-1')).toEqual(true)
  })

  it('will +1 quantity if added item in cart', () => {
    const store = useCartStore()
    const item: CartItem = {
      id: 'item-1',
      name: 'Kampas Rem',
      availableStock: 5,
      price: 50000,
      quantity: 1,
    }

    store.addItem(item)
    store.addItem(item)

    expect(store.items.length).toBe(1)
    expect(store.items[0].quantity).toBe(2)
  })

  it('unable to add quantity more than available stock', () => {
    const store = useCartStore()
    const item: CartItem = {
      id: 'item-1',
      name: 'Kampas Rem',
      availableStock: 2,
      price: 50000,
      quantity: 1,
    }

    store.addItem(item)
    store.increaseQty(item.id)
    store.increaseQty(item.id)

    expect(store.items[0].quantity).toBe(2)
  })

  it('will remove item if quantity = 0', () => {
    const store = useCartStore()
    const item: CartItem = {
      id: 'item-1',
      name: 'Kampas Rem',
      availableStock: 5,
      price: 50000,
      quantity: 1,
    }

    store.addItem(item)
    expect(store.isInCart(item.id)).toBe(true)

    store.decreaseQty(item.id)

    expect(store.items.length).toBe(0)
    expect(store.isInCart(item.id)).toBe(false)
  })

  it('will update item price', () => {
    const store = useCartStore()
    const item: CartItem = {
      id: 'item-1',
      name: 'Kampas Rem',
      availableStock: 5,
      price: 50000,
      quantity: 1,
    }

    store.addItem(item)
    expect(store.isInCart(item.id)).toBe(true)

    store.updatePrice(item.id, 60000)

    expect(store.items[0].price).toBe(60000)
  })
})
