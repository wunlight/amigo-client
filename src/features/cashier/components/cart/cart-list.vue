<script setup lang="ts">
import CartItem from './cart-item.vue'
</script>

<template>
  <div
    class="flex flex-col gap-1.5 h-full divide-y divide-zinc-300 dark:divide-zinc-700 overflow-y-auto"
  >
    <CartItem v-for="i in 7" :key="i" />
  </div>
</template>
