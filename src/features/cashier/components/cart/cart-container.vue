<script setup lang="ts">
import ScrollContainer from '@/components/scroll-container.vue'
import { computed } from 'vue'
import { checkout } from '../../api/index.ts'
import { useCartStore } from '../../stores/use-cart-store'
import CartItem from './cart-item.vue'

const store = useCartStore()

const totalAmount = computed(() => {
  return {
    all: store.getTotalAmount('all'),
    sparepart: store.getTotalAmount('sparepart'),
    operation: store.getTotalAmount('operation'),
  }
})

async function handleCheckout() {
  const payload = store.getCheckoutPayload

  try {
    const { data } = await checkout(payload)
    if (data.success) {
      store.clearCart()
    }
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div
    class="flex flex-col p-3 min-h-0 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg"
  >
    <div
      class="flex items-center justify-between pb-3 border-b border-zinc-300 dark:border-zinc-700"
    >
      <h6 class="font-bold">Transaction Cart</h6>
      <Button
        label="Clear"
        severity="secondary"
        size="small"
        :class="
          store.items.length > 0
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        "
        @click="store.clearCart"
      />
    </div>

    <ScrollContainer
      v-if="store.items.length > 0"
      direction="vertical"
      class="h-full"
      content-class="divide-y divide-zinc-300 dark:divide-zinc-700"
    >
      <CartItem v-for="item in store.items" :key="item.id" :data="item" />
    </ScrollContainer>
    <p v-else class="h-full py-6 text-sm text-center text-zinc-500">No items in cart</p>

    <div class="flex flex-col gap-3 pt-3 border-t border-zinc-300 dark:border-zinc-700">
      <div class="flex justify-between">
        <span class="text-sm text-zinc-500">Spareparts</span>
        <span class="text-sm text-zinc-500"
          >Rp. {{ totalAmount.sparepart.toLocaleString('en-US') }}</span
        >
      </div>
      <div class="flex justify-between">
        <span class="text-sm text-zinc-500">Operations</span>
        <span class="text-sm text-zinc-500"
          >Rp. {{ totalAmount.operation.toLocaleString('en-US') }}</span
        >
      </div>
      <div class="flex justify-between">
        <span class="text-sm font-medium">Total</span>
        <span class="text-sm font-medium">Rp. {{ totalAmount.all.toLocaleString('en-US') }}</span>
      </div>
      <div class="flex gap-3">
        <Button
          label="Process Transaction"
          fluid
          :disabled="store.items.length <= 0"
          class="text-sm!"
          @click="handleCheckout"
        />
        <Button
          icon="icon-[tabler--note]"
          severity="secondary"
          :disabled="store.items.length <= 0"
          class="shrink-0"
        />
      </div>
    </div>
  </div>
</template>
