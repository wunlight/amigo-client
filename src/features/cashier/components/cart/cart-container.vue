<script setup lang="ts">
import ScrollContainer from '@/components/scroll-container.vue'
import { useSparepartStore } from '@/features/sparepart/stores/use-sparepart-store.ts'
import { computed, ref } from 'vue'
import { checkout } from '../../api/index.ts'
import { useCartStore } from '../../stores/use-cart-store'
import type { CheckoutResponse } from '../../types/cart.type'
import CartItem from './cart-item.vue'
import CartNotesDialog from './cart-notes-dialog.vue'
import ReceiptPreview from './receipt-preview.vue'

const store = useCartStore()
const sparepartStore = useSparepartStore()

const showDialog = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const showReceipt = ref<boolean>(false)
const receiptData = ref<CheckoutResponse | null>(null)

const totalAmount = computed(() => {
  return {
    all: store.getTotalAmount('all'),
    sparepart: store.getTotalAmount('sparepart'),
    operation: store.getTotalAmount('operation'),
  }
})

async function handleCheckout() {
  showDialog.value = true
  isLoading.value = true

  const payload = store.getCheckoutPayload

  try {
    const { data } = await checkout(payload)
    if (data.success) {
      store.clearCart()
      sparepartStore.fetchSpareparts()
      openReceipt(data.data)
    }
  } catch (e) {
    console.error(e)
    showDialog.value = false
  } finally {
    isLoading.value = false
  }
}

function openReceipt(data: CheckoutResponse) {
  receiptData.value = data
  showReceipt.value = true
}

const closeReceipt = () => {
  showDialog.value = false
  showReceipt.value = false
  receiptData.value = null
}
</script>

<template>
  <div
    class="flex flex-col p-3 min-h-0 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg"
  >
    <div
      class="flex items-center justify-between gap-3 pb-3 border-b border-zinc-300 dark:border-zinc-700"
    >
      <div class="flex flex-col overflow-hidden">
        <h6 class="font-medium text-lg">Transaction Cart</h6>
        <p v-if="store.notes" class="truncate text-xs text-zinc-500">{{ store.notes }}</p>
      </div>
      <Button
        v-if="store.items.length > 0"
        label="Clear"
        severity="secondary"
        size="small"
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
    <p v-else class="h-full py-6 text-center text-zinc-500">No items in cart</p>

    <div class="flex flex-col gap-1.5 border-t border-zinc-300 dark:border-zinc-700">
      <div class="flex justify-between px-1.5 pt-3">
        <span class="text-zinc-500">Spareparts</span>
        <span class="text-zinc-500">Rp. {{ totalAmount.sparepart.toLocaleString('en-US') }}</span>
      </div>
      <div class="flex justify-between px-1.5">
        <span class="text-zinc-500">Operations</span>
        <span class="text-zinc-500">Rp. {{ totalAmount.operation.toLocaleString('en-US') }}</span>
      </div>
      <div class="flex justify-between px-1.5 pb-1.5">
        <span class="font-medium">Total</span>
        <span class="font-medium">Rp. {{ totalAmount.all.toLocaleString('en-US') }}</span>
      </div>
      <div class="flex gap-3">
        <Button
          label="Process Transaction"
          fluid
          :disabled="store.items.length <= 0"
          @click="handleCheckout"
        />
        <CartNotesDialog>
          <template #trigger="{ open }">
            <Button
              icon="icon-[tabler--note]"
              severity="secondary"
              :disabled="store.items.length <= 0"
              class="shrink-0"
              @click="open"
            />
          </template>
        </CartNotesDialog>
      </div>
    </div>

    <Dialog v-model:visible="showDialog" modal @hide="closeReceipt">
      <div class="relative">
        <div v-if="isLoading" class="absolute inset-0 grid place-content-center bg-black/50">
          <ProgressSpinner />
        </div>
        <ReceiptPreview v-if="showReceipt && receiptData" :receipt="receiptData" />
      </div>
    </Dialog>
  </div>
</template>
