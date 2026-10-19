<script setup lang="ts">
import ScrollContainer from '@/components/scroll-container.vue'
import { useSparepartStore } from '@/features/sparepart/stores/use-sparepart-store.ts'
import { onMounted } from 'vue'
import SparepartItem from './sparepart-item.vue'

const store = useSparepartStore()

onMounted(() => {
  store.fetchSpareparts()
})
</script>

<template>
  <div class="flex flex-col gap-3 min-h-0">
    <h6 class="font-semibold text-xl">Spareparts</h6>
    <ScrollContainer
      v-if="store.sparepartList.length > 0"
      direction="vertical"
      content-class="grid grid-cols-4 gap-4"
    >
      <SparepartItem v-for="item in store.sparepartList" :key="item.id" :data="item" />
    </ScrollContainer>
    <div v-else class="flex flex-col items-center justify-center gap-1.5 h-19 text-zinc-500">
      <span class="icon-[tabler--tools-off] size-9" />
      <p class="text-sm">
        {{ store.isLoading ? 'Loading...' : 'No Data Found!' }}
      </p>
    </div>
  </div>
</template>
