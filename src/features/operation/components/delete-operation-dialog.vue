<script setup lang="ts">
import { ref } from 'vue'
import { deleteOperation } from '../api/index.ts'
import { useOperationStore } from '../stores/use-operation-store.ts'

const operationStore = useOperationStore()

const show = ref<boolean>(false)
const operationId = ref<string | null>(null)

function openDialog(id?: string) {
  show.value = true
  if (id) operationId.value = id
}

function closeDialog() {
  show.value = false
  operationId.value = null
}

async function handleDelete() {
  try {
    if (operationId.value) {
      await deleteOperation(operationId.value)
    }
    closeDialog()
    operationStore.fetchOperations()
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <slot name="trigger" :open="openDialog" />

  <Dialog v-model:visible="show" modal header="Delete Operation?">
    <div class="flex flex-col w-80">
      <p>Are you sure to delete this operation? This action cannot be undone.</p>
      <Divider class="my-3!" />
      <div class="flex justify-end gap-3">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          class="text-sm!"
          @click="closeDialog"
        />
        <Button label="Delete" severity="danger" class="text-sm!" @click="handleDelete" />
      </div>
    </div>
  </Dialog>
</template>
