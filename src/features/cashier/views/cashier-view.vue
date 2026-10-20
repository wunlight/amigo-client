<script setup lang="ts">
import MenuBar from '@/components/menu-bar.vue'
import { computed } from 'vue'
import CartList from '../components/cart/cart-list.vue'
import OperationCatalog from '../components/catalog/operation-catalog.vue'
import SparepartCatalog from '../components/catalog/sparepart-catalog.vue'
import { useCartStore } from '../stores/cart.ts'

const cartStore = useCartStore()

const totalAmount = computed(() => {
  return {
    all: cartStore.getTotalAmount('all'),
    sparepart: cartStore.getTotalAmount('sparepart'),
    operation: cartStore.getTotalAmount('operation'),
  }
})
</script>

<template>
  <div class="grid grid-cols-4 gap-1.5 p-1.5 h-svh bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
    <div class="col-span-3 flex flex-col gap-3 min-h-0">
      <MenuBar>
        <template #left-content>
          <InputText placeholder="Search..." />
        </template>
      </MenuBar>
      <OperationCatalog class="shrink-0" />
      <SparepartCatalog />
    </div>

    <div
      class="col-span-1 flex flex-col p-3 min-h-0 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg"
    >
      <div
        class="flex items-center justify-between pb-3 border-b border-zinc-300 dark:border-zinc-700"
      >
        <h6 class="font-bold">Transaction Cart</h6>
        <Button
          v-if="cartStore.items.length > 0"
          label="Clear"
          severity="secondary"
          size="small"
          @click="cartStore.clearCart"
        />
      </div>

      <CartList />

      <div class="flex flex-col gap-3 pt-3 border-t border-zinc-300 dark:border-zinc-700">
        <div class="flex justify-between">
          <span class="text-sm text-zinc-500">Spareparts</span>
          <span class="text-sm text-zinc-500"
            >Rp. {{ totalAmount.sparepart.toLocaleString('en-US') }}</span
          >
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-zinc-500">Services</span>
          <span class="text-sm text-zinc-500"
            >Rp. {{ totalAmount.operation.toLocaleString('en-US') }}</span
          >
        </div>
        <div class="flex justify-between">
          <span class="text-sm font-bold">Total</span>
          <span class="text-sm text-zinc-500"
            >Rp. {{ totalAmount.all.toLocaleString('en-US') }}</span
          >
        </div>
        <div class="flex gap-3">
          <Button label="Process Transaction" fluid class="text-sm!" />
          <Button icon="icon-[tabler--note]" severity="secondary" class="shrink-0" />
        </div>
      </div>
    </div>
  </div>
</template>
