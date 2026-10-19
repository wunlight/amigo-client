<script setup lang="ts">
import ScrollContainer from '@/components/scroll-container.vue'
import { useServiceStore } from '@/features/service/stores/use-service-store.ts'
import { onMounted } from 'vue'
import ServiceItem from './service-item.vue'

const store = useServiceStore()

onMounted(() => {
  store.fetchServices()
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <h6 class="font-semibold text-xl">Services</h6>
    <ScrollContainer
      v-if="store.serviceList.length > 0"
      direction="horizontal"
      content-class="gap-3"
    >
      <ServiceItem v-for="item in store.serviceList" :key="item.id" :data="item" />
    </ScrollContainer>
    <div v-else class="flex flex-col items-center justify-center gap-1.5 h-19 text-zinc-500">
      <span class="icon-[tabler--clipboard-off] size-9" />
      <p class="text-sm">
        {{ store.isLoading ? 'Loading...' : 'No Data Found!' }}
      </p>
    </div>
  </div>
</template>
