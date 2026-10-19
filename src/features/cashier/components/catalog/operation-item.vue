<script setup lang="ts">
import type { OperationDTO } from '@/features/operation/types/operation'

type OperationItemProps = {
  data: OperationDTO
}

const props = defineProps<OperationItemProps>()
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
    <Button icon="icon-[tabler--plus]" class="shrink-0 size-7!" />
  </div>
</template>
