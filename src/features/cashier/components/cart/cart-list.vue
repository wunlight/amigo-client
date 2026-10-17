<script setup lang="ts">
import ScrollContainer from '@/components/scroll-container.vue'
import CartItem from './cart-item.vue'
</script>

<template>
  <ScrollContainer
    direction="vertical"
    class="h-full"
    content-class="divide-y divide-zinc-300 dark:divide-zinc-700"
  >
    <CartItem v-for="i in 7" :key="i" />
  </ScrollContainer>
</template>
