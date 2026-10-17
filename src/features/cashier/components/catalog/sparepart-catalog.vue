<script setup lang="ts">
import ScrollContainer from '@/components/scroll-container.vue'
import SparepartItem from './sparepart-item.vue'
</script>

<template>
  <div class="flex flex-col gap-3 min-h-0">
    <h6 class="font-bold text-xl">Spareparts</h6>
    <!-- <div class="grid grid-cols-4 gap-3 overflow-y-auto"> -->
    <ScrollContainer direction="vertical" content-class="grid grid-cols-4 gap-4">
      <SparepartItem v-for="i in 27" :key="i" />
    </ScrollContainer>
    <!-- </div> -->
  </div>
</template>
