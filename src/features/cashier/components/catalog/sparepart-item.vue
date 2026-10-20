<script setup lang="ts">
import type { SparepartDTO } from '@/features/sparepart/types/sparepart.type'
import { useCartStore } from '../../stores/use-cart-store'

type SparepartItemProps = {
  data: SparepartDTO
}

const props = defineProps<SparepartItemProps>()

const cartStore = useCartStore()

function addToCart() {
  cartStore.addItem({
    available_stock: props.data.stock,
    id: props.data.id,
    name: props.data.name,
    price: props.data.selling_price,
    quantity: 1,
    type: 'sparepart',
  })
}
</script>

<template>
  <div
    class="flex items-center justify-between gap-3 p-3 h-32 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg"
  >
    <div class="flex flex-col gap-1.5 h-full overflow-hidden">
      <span class="font-medium truncate">{{ data.name }}</span>
      <span class="text-sm text-zinc-500"
        >Rp. {{ data.selling_price.toLocaleString('en-US') }}</span
      >
      <span class="mt-auto text-sm text-zinc-500">Stock: {{ data.stock }}</span>
    </div>
    <div v-if="cartStore.isInCart(data.id)" class="flex flex-col gap-1.5">
      <Button
        icon="icon-[tabler--plus]"
        class="shrink-0 size-7!"
        @click="cartStore.increaseQty(data.id)"
      />
      <div class="grid place-content-center size-7 text-sm bg-zinc-100 dark:bg-zinc-950 rounded-md">
        {{ cartStore.getQty(data.id) }}
      </div>
      <Button
        icon="icon-[tabler--minus]"
        severity="secondary"
        outlined
        class="shrink-0 size-7!"
        @click="cartStore.decreaseQty(data.id)"
      />
    </div>
    <Button
      v-else
      icon="icon-[tabler--plus]"
      class="self-center shrink-0 size-7!"
      @click="addToCart"
    />
  </div>
</template>
