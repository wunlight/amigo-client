<script setup lang="ts">
import ScrollContainer from '@/components/scroll-container.vue'
import OperationFormDialog from '@/features/operation/components/operation-form-dialog.vue'
import { useOperationStore } from '@/features/operation/stores/use-operation-store.ts'
import { computed, onMounted } from 'vue'
import { useCartStore } from '../../stores/use-cart-store.ts'
import OperationItem from './operation-item.vue'

const operationStore = useOperationStore()
const cartStore = useCartStore()

const sortedOperations = computed(() => {
  return [...operationStore.operationList].sort((a, b) => {
    const aInCart = cartStore.isInCart(a.id)
    const bInCart = cartStore.isInCart(b.id)

    if (aInCart && !bInCart) return -1
    if (!aInCart && bInCart) return 1

    return 0
  })
})

const lastInCartIdx = computed(() => {
  let lastIndex = -1
  sortedOperations.value.forEach((item, index) => {
    if (cartStore.isInCart(item.id)) {
      lastIndex = index
    }
  })
  return lastIndex
})

onMounted(() => {
  operationStore.fetchOperations()
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      class="flex items-center justify-between px-3 pb-3 border-b border-zinc-300 dark:border-zinc-700"
    >
      <h6 class="font-semibold text-xl">Operations</h6>
      <OperationFormDialog>
        <template #trigger="{ open }">
          <Button
            icon="icon-[tabler--plus]"
            label="Add New Operation"
            outlined
            :pt="{ label: 'text-xs!' }"
            @click="open()"
          />
        </template>
      </OperationFormDialog>
    </div>
    <ScrollContainer
      v-if="operationStore.operationList.length > 0"
      direction="horizontal"
      content-class="gap-3"
    >
      <template v-for="(item, idx) in sortedOperations" :key="item.id">
        <OperationItem :data="item" />
        <div
          v-if="idx === lastInCartIdx && idx !== sortedOperations.length - 1"
          class="border-r border-dashed border-zinc-300 dark:border-zinc-700"
        />
      </template>
    </ScrollContainer>
    <div v-else class="flex flex-col items-center justify-center gap-1.5 h-19 text-zinc-500">
      <span class="icon-[tabler--clipboard-off] size-9" />
      <p class="text-sm">
        {{ operationStore.isLoading ? 'Loading...' : 'No Data Found!' }}
      </p>
    </div>
  </div>
</template>
