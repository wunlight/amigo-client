<script setup lang="ts">
import type { OperationDTO } from '@/features/operation/types/operation.type'
import { useCartStore } from '../../stores/use-cart-store'

type Props = {
  data: OperationDTO
}

const props = defineProps<Props>()

const cartStore = useCartStore()

function addToCart() {
  cartStore.addItem({
    available_stock: 1,
    id: props.data.id,
    name: props.data.name,
    price: props.data.selling_price,
    quantity: 1,
    type: 'operation',
  })
}
</script>

<template>
  <div
    class="shrink-0 flex items-center justify-between gap-3 p-3 w-50 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg"
  >
    <div class="flex flex-col gap-1.5 overflow-hidden">
      <span class="font-medium truncate">{{ data.name }}</span>
      <span class="text-sm text-zinc-500"
        >Rp. {{ data.selling_price.toLocaleString('en-US') }}</span
      >
    </div>
    <Button
      v-if="cartStore.isInCart(data.id)"
      icon="icon-[tabler--minus]"
      severity="danger"
      outlined
      class="shrink-0 size-7!"
      @click="cartStore.removeItem(data.id)"
    />
    <Button v-else icon="icon-[tabler--plus]" class="shrink-0 size-7!" @click="addToCart" />
  </div>
</template>
