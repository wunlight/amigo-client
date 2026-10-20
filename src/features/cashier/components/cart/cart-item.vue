<script setup lang="ts">
import { useCartStore } from '../../stores/cart'
import type { CartItem } from '../../types/cart.type'

type CartItemProps = {
  data: CartItem
}

const props = defineProps<CartItemProps>()

const store = useCartStore()
</script>

<template>
  <div class="flex items-center justify-between gap-3 p-3">
    <div class="flex flex-col gap-1.5 overflow-hidden">
      <span class="font-medium text-sm truncate">{{ data.name }}</span>
      <span class="text-xs text-zinc-500">Rp. {{ data.price.toLocaleString('en-US') }}</span>
    </div>
    <div class="flex gap-1.5">
      <Button
        icon="icon-[tabler--trash]"
        severity="danger"
        outlined
        class="shrink-0 size-6!"
        @click="store.removeItem(data.id)"
      />
      <template v-if="data.type === 'sparepart'">
        <Button
          icon="icon-[tabler--minus]"
          severity="secondary"
          outlined
          class="shrink-0 size-6!"
          @click="store.decreaseQty(data.id)"
        />
        <div
          class="grid place-content-center size-6 text-xs bg-zinc-100 dark:bg-zinc-950 rounded-md"
        >
          {{ store.getQty(data.id) }}
        </div>
        <Button
          icon="icon-[tabler--plus]"
          class="shrink-0 size-6!"
          @click="store.increaseQty(data.id)"
        />
      </template>
    </div>
  </div>
</template>
