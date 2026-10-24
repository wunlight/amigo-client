<script setup lang="ts">
import { ref } from 'vue'
import OperationForm from './operation-form.vue'

type Props = {
  refetch: () => void
}

const props = defineProps<Props>()

const show = ref<boolean>(false)
const operationId = ref<string | null>(null)

function openDialog(id?: string) {
  show.value = true
  if (id) operationId.value = id
}

function closeDialog(refetch?: boolean) {
  show.value = false
  operationId.value = null

  if (refetch) {
    props.refetch()
  }
}
</script>

<template>
  <slot name="trigger" :open="openDialog" />

  <Dialog
    v-model:visible="show"
    modal
    :header="!!operationId ? 'Edit Operation' : 'Add New Operation'"
  >
    <OperationForm
      :close-dialog="closeDialog"
      :is-update="!!operationId"
      :operation-id="operationId"
    />
  </Dialog>
</template>
