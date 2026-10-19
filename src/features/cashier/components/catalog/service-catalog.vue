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
    <div
      class="flex items-center justify-between pb-3 border-b border-zinc-300 dark:border-zinc-700"
    >
      <h6 class="px-3 font-semibold text-xl">Services</h6>
      <Button
        icon="icon-[tabler--plus]"
        label="Add New Service"
        outlined
        :pt="{ label: 'text-sm!' }"
      />
    </div>
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
