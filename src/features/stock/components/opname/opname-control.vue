<script setup lang="ts">
interface Props {
  sparepartOptions: Array<{ label: string; value: string }>
  currentStock: number
}

defineProps<Props>()

const sparepartId = defineModel<string>('sparepartId', { default: '' })
const quantity = defineModel<number>('quantity', { default: 0 })

const emit = defineEmits<{
  remove: []
}>()
</script>

<template>
  <div class="flex flex-col gap-3 p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg">
    <div class="grid grid-cols-10 gap-3">
      <div class="col-span-10 flex items-end gap-3">
        <div class="flex flex-col gap-1 w-full">
          <label for="sparepart" class="text-sm font-medium">Sparepart</label>
          <Select
            id="sparepart"
            v-model="sparepartId"
            :options="sparepartOptions"
            option-label="label"
            option-value="value"
            placeholder="Select a sparepart"
          />
        </div>
        <Button
          icon="icon-[tabler--trash]"
          severity="danger"
          outlined
          class="shrink-0"
          @click="emit('remove')"
        />
      </div>
      <div class="col-span-5 flex flex-col gap-1">
        <label for="current-quantity" class="text-sm font-medium">Current Stock</label>
        <InputNumber
          id="current-quantity"
          :model-value="currentStock"
          :min="0"
          placeholder="0"
          disabled
          :pt="{ root: 'min-w-0!', pcInputText: { root: 'min-w-0!' } }"
        />
      </div>
      <div class="col-span-5 flex flex-col gap-1">
        <label for="actual-quantity" class="text-sm font-medium">Actual Quantity</label>
        <InputNumber
          id="actual-quantity"
          v-model="quantity"
          :min="0"
          placeholder="0"
          :pt="{ root: 'min-w-0!', pcInputText: { root: 'min-w-0!' } }"
        />
      </div>
    </div>
  </div>
</template>
