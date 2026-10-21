<script setup lang="ts">
import { ref } from 'vue'
import { deleteSparepart } from '../api/index.ts'
import { useSparepartStore } from '../stores/use-sparepart-store.ts'

const sparepartStore = useSparepartStore()

const show = ref<boolean>(false)
const sparepartId = ref<string | null>(null)

function openDialog(id?: string) {
  show.value = true
  if (id) sparepartId.value = id
}

function closeDialog() {
  show.value = false
  sparepartId.value = null
}

async function handleDelete() {
  try {
    if (sparepartId.value) {
      await deleteSparepart(sparepartId.value)
    }
    closeDialog()
    sparepartStore.fetchSpareparts()
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <slot name="trigger" :open="openDialog" />

  <Dialog v-model:visible="show" modal header="Delete Sparepart?">
    <div class="flex flex-col w-80">
      <p>Are you sure to delete this sparepart? This action cannot be undone.</p>
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
