<script setup lang="ts">
import ScrollContainer from '@/components/scroll-container.vue'
import { useCartStore } from '../../stores/use-cart-store.ts'
import CartItem from './cart-item.vue'

const store = useCartStore()
</script>

<template>
  <ScrollContainer
    v-if="store.items.length > 0"
    direction="vertical"
    class="h-full"
    content-class="divide-y divide-zinc-300 dark:divide-zinc-700"
  >
    <CartItem v-for="item in store.items" :key="item.id" :data="item" />
  </ScrollContainer>
  <p v-else class="h-full py-6 text-sm text-center text-zinc-500">No items in cart</p>
</template>
