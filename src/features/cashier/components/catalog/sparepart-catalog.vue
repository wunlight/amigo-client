<script setup lang="ts">
import ScrollContainer from '@/components/scroll-container.vue'
import SparepartFormDialog from '@/features/sparepart/components/sparepart-form-dialog.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useCartStore } from '../../stores/use-cart-store.ts'
import { useCatalogStore } from '../../stores/use-catalog-store.ts'
import SparepartItem from './sparepart-item.vue'

const catalogStore = useCatalogStore()
const cartStore = useCartStore()

const progressSpinnerRef = ref<HTMLDivElement>()

let observer: IntersectionObserver | null = null

const sortedSpareparts = computed(() => {
  const filtered = catalogStore.filteredSpareparts

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
  sortedSpareparts.value.forEach((item, index) => {
    if (cartStore.isInCart(item.id)) {
      lastIndex = index
    }
  })
  return lastIndex
})

const showProgressSpinner = computed(() => {
  return !catalogStore.isSparepartsFullyLoaded
})

onMounted(async () => {
  if (catalogStore.spareparts.length === 0) {
    await catalogStore.fetchSpareparts(1)
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          showProgressSpinner.value &&
          !catalogStore.isFetching &&
          !catalogStore.isLoadingSpareparts
        ) {
          catalogStore.loadNextSparepartsPage()
        }
      })
    },
    {
      threshold: 0.3,
      rootMargin: '100px',
    },
  )

  if (progressSpinnerRef.value) {
    observer.observe(progressSpinnerRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="flex flex-col gap-3 min-h-0">
    <div
      class="flex items-center justify-between px-3 pb-3 border-b border-zinc-300 dark:border-zinc-700"
    >
      <h6 class="font-semibold text-xl">Spareparts</h6>
      <SparepartFormDialog :refetch="catalogStore.fetchSpareparts">
        <template #trigger="{ open }">
          <Button
            icon="icon-[tabler--plus]"
            label="Add New Sparepart"
            outlined
            :pt="{ label: 'text-sm!' }"
            @click="open()"
          />
        </template>
      </SparepartFormDialog>
    </div>
    <ScrollContainer
      v-if="sortedSpareparts.length > 0"
      direction="vertical"
      content-class="grid grid-cols-4 gap-3"
    >
      <template v-for="(item, idx) in sortedSpareparts" :key="item.id">
        <SparepartItem :data="item" />
        <div
          v-if="idx === lastInCartIdx && idx !== sortedSpareparts.length - 1"
          class="col-span-full border-b border-dashed border-zinc-300 dark:border-zinc-700"
        />
      </template>
      <div
        v-if="showProgressSpinner"
        ref="progressSpinnerRef"
        class="col-span-full flex justify-center py-4"
      >
        <ProgressSpinner stroke-width="4" fill="none" class="size-10!" />
      </div>
    </ScrollContainer>
    <div v-else class="flex flex-col items-center justify-center gap-1.5 py-9 text-zinc-500">
      <span class="icon-[tabler--tools-off] size-9" />
      <p class="text-sm">
        {{ catalogStore.isLoadingSpareparts ? 'Loading...' : 'No Data Found!' }}
      </p>
    </div>
  </div>
</template>
