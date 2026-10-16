<script setup lang="ts">
import ServiceItem from './service-item.vue'
</script>

<template>
  <div class="flex flex-col gap-3">
    <h6 class="font-bold text-xl">Services</h6>
    <div class="flex gap-3 overflow-x-auto">
      <ServiceItem v-for="i in 6" :key="i" />
    </div>
  </div>
</template>
