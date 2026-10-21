<script setup lang="ts">
interface Props {
  sparepartOptions: Array<{ label: string; value: string }>
}

defineProps<Props>()

const sparepartId = defineModel<string>('sparepartId', { default: '' })
const quantity = defineModel<number>('quantity', { default: 0 })
const unitCost = defineModel<number>('unitCost', { default: 0 })

const emit = defineEmits<{
  remove: []
}>()
</script>

<template>
  <div class="flex flex-col gap-3 p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg">
    <div class="grid grid-cols-10 gap-3">
      <div class="col-span-10 flex gap-3 items-end">
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
    </div>

    <div class="grid grid-cols-10 gap-3">
      <div class="col-span-6 flex flex-col gap-1">
        <label for="unit_cost" class="text-sm font-medium">Unit Cost</label>
        <InputNumber
          id="unit_cost"
          v-model="unitCost"
          :min="0"
          placeholder="0"
          :pt="{ root: 'min-w-0!', pcInputText: { root: 'min-w-0!' } }"
        />
      </div>
      <div class="col-span-4 flex flex-col gap-1">
        <label for="quantity" class="text-sm font-medium">Quantity</label>
        <InputNumber
          id="quantity"
          v-model="quantity"
          :min="0"
          placeholder="0"
          :pt="{ root: 'min-w-0!', pcInputText: { root: 'min-w-0!' } }"
        />
      </div>
    </div>
  </div>
</template>
