<script setup lang="ts">
import { ref } from 'vue'
import { useSparepartStore } from '../stores/use-sparepart-store.ts'
import SparepartForm from './sparepart-form.vue'

const store = useSparepartStore()

const show = ref<boolean>(false)
const sparepartId = ref<string | null>(null)

function openDialog(id?: string) {
  show.value = true
  if (id) sparepartId.value = id
}

function closeDialog(refetch?: boolean) {
  show.value = false
  sparepartId.value = null

  if (refetch) {
    store.fetchSpareparts()
  }
}
</script>

<template>
  <slot name="trigger" :open="openDialog" />

  <Dialog
    v-model:visible="show"
    modal
    :header="!!sparepartId ? 'Edit Sparepart' : 'Add New Sparepart'"
  >
    <SparepartForm
      :close-dialog="closeDialog"
      :is-update="!!sparepartId"
      :sparepart-id="sparepartId"
    />
  </Dialog>
</template>
