<script setup lang="ts">
import { useSparepartStore } from '@/features/sparepart/stores/use-sparepart-store'
import { useToast } from 'primevue/usetoast'
import { computed, onMounted, ref } from 'vue'
import { createRestock } from '../../api/index.ts'
import type { CreateRestockPayload, RestockItem } from '../../types/restock.type.ts'
import RestockControl from './restock-control.vue'

interface Props {
  closeDialog: () => void
}

const props = defineProps<Props>()

const toast = useToast()

const sparepartStore = useSparepartStore()

const items = ref<RestockItem[]>([])
const notes = ref<string>('')
const isLoading = ref<boolean>(false)
const idempotencyKey = ref<string>('')

const sparepartOptions = computed(() => {
  return sparepartStore.sparepartList.map((sp) => ({
    label: sp.name,
    value: sp.id,
  }))
})

onMounted(() => {
  idempotencyKey.value = crypto.randomUUID()
  sparepartStore.fetchSpareparts()
  addItem()
})

function addItem(): void {
  items.value.push({
    sparepart_id: '',
    quantity: 0,
    unit_cost: 0,
  })
}

function removeItem(index: number): void {
  items.value.splice(index, 1)
}

async function handleSubmit(): Promise<void> {
  if (items.value.length === 0) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'At least one item is required',
      life: 5000,
    })
    return
  }

  for (const item of items.value) {
    if (!item.sparepart_id) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select a sparepart for all items',
        life: 5000,
      })
      return
    }
    if (item.quantity <= 0) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Quantity must be greater than 0',
        life: 5000,
      })
      return
    }
    if (item.unit_cost < 0) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Unit cost must be non-negative',
        life: 5000,
      })
      return
    }
  }

  try {
    isLoading.value = true
    const payload: CreateRestockPayload = {
      idempotency_key: idempotencyKey.value,
      notes: notes.value,
      items: items.value,
    }

    await createRestock(payload)

    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Restock created successfully',
      life: 5000,
    })

    items.value = []
    notes.value = ''
    idempotencyKey.value = crypto.randomUUID()
    addItem()

    props.closeDialog()
  } catch (error: any) {
    console.error('Error creating restock:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error?.response?.data?.message || 'Failed to create restock',
      life: 5000,
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-3">
      <label class="text-sm font-semibold">Items</label>
      <div class="flex flex-col gap-3 w-96">
        <RestockControl
          v-for="(_, index) in items"
          :key="index"
          v-model:sparepart-id="items[index].sparepart_id"
          v-model:quantity="items[index].quantity"
          v-model:unit-cost="items[index].unit_cost"
          :sparepart-options="sparepartOptions"
          @remove="removeItem(index)"
        />
      </div>
      <Button
        icon="icon-[tabler--plus]"
        label="Add Item"
        severity="secondary"
        @click="addItem"
        class="w-fit"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label for="notes" class="text-sm font-semibold">Notes</label>
      <Textarea id="notes" v-model="notes" rows="3" placeholder="Add any additional notes..." />
    </div>

    <div class="flex justify-end gap-3 pt-3 border-t border-zinc-300 dark:border-zinc-700">
      <Button label="Cancel" severity="secondary" @click="closeDialog" :disabled="isLoading" />
      <Button label="Submit" @click="handleSubmit" :loading="isLoading" />
    </div>
  </div>
</template>
