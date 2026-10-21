<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../../stores/use-cart-store'
import type { CartItem } from '../../types/cart.type'

type Props = {
  data: CartItem
}

const props = defineProps<Props>()

const store = useCartStore()

const isEditPrice = ref<boolean>(false)
const itemPrice = ref(props.data.price)

function handleUpdatePrice() {
  store.updatePrice(props.data.id, Number(itemPrice.value))
  isEditPrice.value = false
}
</script>

<template>
  <div class="flex items-center justify-between gap-3 p-3">
    <div class="flex flex-col gap-1.5 overflow-hidden">
      <span class="font-medium truncate">{{ data.name }}</span>
      <div class="group/item flex gap-1.5">
        <template v-if="isEditPrice">
          <input
            v-model="itemPrice"
            type="text"
            class="h-5 min-w-0 text-sm border-b border-zinc-300 dark:border-zinc-700 outline-0"
          />
          <Button
            icon="icon-[tabler--x]"
            severity="danger"
            text
            class="shrink-0 size-4!"
            @click="isEditPrice = false"
          />
          <Button
            icon="icon-[tabler--check]"
            text
            class="shrink-0 size-4!"
            @click="handleUpdatePrice"
          />
        </template>
        <template v-else>
          <span class="text-sm text-zinc-500">Rp. {{ data.price.toLocaleString('en-US') }}</span>
          <Button
            icon="icon-[tabler--pencil]"
            severity="secondary"
            text
            class="hidden! group-hover/item:flex! size-4!"
            @click="isEditPrice = true"
          />
        </template>
      </div>
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
          class="grid place-content-center size-6 text-sm bg-zinc-100 dark:bg-zinc-950 rounded-md"
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
