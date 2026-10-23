<script setup lang="ts">
import { ref } from 'vue'
import { refundSale } from '../api/index.ts'
import { useSaleStore } from '../stores/use-sale-store.ts'

const saleStore = useSaleStore()

const show = ref<boolean>(false)
const saleId = ref<string | null>(null)
const isLoading = ref<boolean>(false)

function openDialog(id?: string) {
  show.value = true
  if (id) saleId.value = id
}

function closeDialog() {
  show.value = false
  saleId.value = null
  isLoading.value = false
}

async function handleRefund() {
  try {
    isLoading.value = true
    if (saleId.value) {
      await refundSale(saleId.value)
    }
    closeDialog()
    saleStore.fetchSales(saleStore.currentPage, saleStore.perPage)
  } catch (e) {
    console.error(e)
    isLoading.value = false
  }
}
</script>

<template>
  <slot name="trigger" :open="openDialog" />

  <Dialog v-model:visible="show" modal header="Refund Sale?">
    <div class="flex flex-col w-80">
      <p>Are you sure to refund this sale? This action cannot be undone.</p>
      <Divider class="my-3!" />
      <div class="flex justify-end gap-3">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          class="text-sm!"
          @click="closeDialog"
          :disabled="isLoading"
        />
        <Button
          label="Refund"
          severity="danger"
          class="text-sm!"
          @click="handleRefund"
          :loading="isLoading"
        />
      </div>
    </div>
  </Dialog>
</template>
