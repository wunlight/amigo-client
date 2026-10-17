<script setup lang="ts">
import ScrollContainer from '@/components/scroll-container.vue'
import ServiceItem from './service-item.vue'
</script>

<template>
  <div class="flex flex-col gap-3">
    <h6 class="font-semibold text-xl">Services</h6>
    <ScrollContainer direction="horizontal" content-class="gap-3">
      <ServiceItem v-for="i in 6" :key="i" />
    </ScrollContainer>
  </div>
</template>
