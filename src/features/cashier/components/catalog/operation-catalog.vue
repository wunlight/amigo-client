<script setup lang="ts">
import ScrollContainer from '@/components/scroll-container.vue'
import OperationFormDialog from '@/features/operation/components/operation-form-dialog.vue'
import { computed, onMounted, ref } from 'vue'
import { useCartStore } from '../../stores/use-cart-store.ts'
import { useCatalogStore } from '../../stores/use-catalog-store.ts'
import OperationItem from './operation-item.vue'

const catalogStore = useCatalogStore()
const cartStore = useCartStore()
const progressSpinnerRef = ref<HTMLDivElement>()

const sortedOperations = computed(() => {
  const filtered = catalogStore.filteredOperations

  return filtered.sort((a, b) => {
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

const showProgressSpinner = computed(() => {
  return !catalogStore.isOperationsFullyLoaded
})

onMounted(() => {
  catalogStore.fetchOperations()

  if (progressSpinnerRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && showProgressSpinner.value) {
            catalogStore.loadNextOperationsPage()
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(progressSpinnerRef.value)

    return () => {
      observer.disconnect()
    }
  }
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
            :pt="{ label: 'text-sm!' }"
            @click="open()"
          />
        </template>
      </OperationFormDialog>
    </div>
    <ScrollContainer
      v-if="sortedOperations.length > 0"
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
      <div
        v-if="showProgressSpinner"
        ref="progressSpinnerRef"
        class="shrink-0 flex items-center justify-center px-4"
      >
        <ProgressSpinner
          stroke-width="4"
          fill="none"
          animation-duration=".8s"
          :pt="{ svg: 'size-6' }"
        />
      </div>
    </ScrollContainer>
    <div v-else class="flex flex-col items-center justify-center gap-1.5 h-19 text-zinc-500">
      <span class="icon-[tabler--clipboard-off] size-9" />
      <p class="text-sm">
        {{ catalogStore.isLoadingOperations ? 'Loading...' : 'No Data Found!' }}
      </p>
    </div>
  </div>
</template>
