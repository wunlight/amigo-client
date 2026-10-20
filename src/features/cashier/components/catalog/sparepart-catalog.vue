<script setup lang="ts">
import ScrollContainer from '@/components/scroll-container.vue'
import SparepartFormDialog from '@/features/sparepart/components/sparepart-form-dialog.vue'
import { useSparepartStore } from '@/features/sparepart/stores/use-sparepart-store.ts'
import { computed, onMounted } from 'vue'
import { useCartStore } from '../../stores/use-cart-store.ts'
import SparepartItem from './sparepart-item.vue'

type SparepartCatalog = {
  searchQuery: string
}

const props = defineProps<SparepartCatalog>()

const sparepartStore = useSparepartStore()
const cartStore = useCartStore()

const sortedSpareparts = computed(() => {
  const filtered = sparepartStore.sparepartList.filter((item) => {
    if (!props.searchQuery) return true
    return item.name.toLowerCase().includes(props.searchQuery.toLowerCase())
  })

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

onMounted(() => {
  sparepartStore.fetchSpareparts()
})
</script>

<template>
  <div class="flex flex-col gap-3 min-h-0">
    <div
      class="flex items-center justify-between px-3 pb-3 border-b border-zinc-300 dark:border-zinc-700"
    >
      <h6 class="font-semibold text-xl">Spareparts</h6>
      <SparepartFormDialog>
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
    </ScrollContainer>
    <div v-else class="flex flex-col items-center justify-center gap-1.5 py-9 text-zinc-500">
      <span class="icon-[tabler--tools-off] size-9" />
      <p class="text-sm">
        {{ sparepartStore.isLoading ? 'Loading...' : 'No Data Found!' }}
      </p>
    </div>
  </div>
</template>
