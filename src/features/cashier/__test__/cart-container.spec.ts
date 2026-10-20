import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vite-plus/test'
import CartContainer from '../components/cart/cart-container.vue'
import { useCartStore } from '../stores/use-cart-store.ts'

describe('CartContainer', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should display correct total amounts when cart has items', async () => {
    const cartStore = useCartStore()

    cartStore.addItem({
      type: 'sparepart',
      id: 'part-1',
      name: 'Oli Mesin',
      availableStock: 5,
      price: 50000,
      quantity: 2,
    })

    cartStore.addItem({
      type: 'operation',
      id: 'op-1',
      name: 'Jasa Ganti',
      availableStock: 1,
      price: 20000,
      quantity: 1,
    })

    const wrapper = mount(CartContainer, {
      global: {
        stubs: {
          Button: {
            template: '<button @click="$emit(\'click\')"><slot>{{ label }}</slot></button>',
            props: ['label'],
          },
        },
      },
    })

    expect(wrapper.text()).toContain('100,000')
    expect(wrapper.text()).toContain('20,000')
    expect(wrapper.text()).toContain('120,000')
  })

  it('should clear cart when clear button is clicked', async () => {
    const cartStore = useCartStore()
    cartStore.addItem({
      type: 'sparepart',
      id: 'part-1',
      name: 'Busi',
      availableStock: 5,
      price: 15000,
      quantity: 1,
    })

    const wrapper = mount(CartContainer, {
      global: {
        stubs: {
          Button: {
            template:
              '<button class="clear-btn" @click="$emit(\'click\')"><slot>{{ label }}</slot></button>',
            props: ['label'],
          },
        },
      },
    })

    expect(cartStore.items.length).toBe(1)

    const clearButton = wrapper.find('.clear-btn')
    await clearButton.trigger('click')

    expect(cartStore.items.length).toBe(0)
  })

  it('should display "No items in cart" message when cart is empty', () => {
    const cartStore = useCartStore()

    expect(cartStore.items.length).toBe(0)

    const wrapper = mount(CartContainer, {
      global: {
        stubs: {
          ScrollContainer: {
            template: '<div class="scroll-container-stub"><slot /></div>',
          },
          CartItem: true,
          Button: true,
        },
      },
    })

    expect(wrapper.text()).toContain('No items in cart')

    expect(wrapper.find('.scroll-container-stub').exists()).toBe(false)
  })
})
