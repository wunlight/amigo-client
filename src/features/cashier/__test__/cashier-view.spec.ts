import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vite-plus/test'
import { useCartStore } from '../stores/use-cart-store.ts'
import CashierView from '../views/cashier-view.vue'

describe('CashierView', () => {
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

    const wrapper = mount(CashierView, {
      global: {
        stubs: {
          MenuBar: true,
          OperationCatalog: true,
          SparepartCatalog: true,
          CartList: true,
          Button: {
            template: '<button @click="$emit(\'click\')"><slot>{{ label }}</slot></button>',
            props: ['label'],
          },
          InputText: true,
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

    const wrapper = mount(CashierView, {
      global: {
        stubs: {
          MenuBar: true,
          OperationCatalog: true,
          SparepartCatalog: true,
          CartList: true,
          Button: {
            template:
              '<button class="clear-btn" @click="$emit(\'click\')"><slot>{{ label }}</slot></button>',
            props: ['label'],
          },
          InputText: true,
        },
      },
    })

    expect(cartStore.items.length).toBe(1)

    const clearButton = wrapper.find('.clear-btn')
    await clearButton.trigger('click')

    expect(cartStore.items.length).toBe(0)
  })
})
