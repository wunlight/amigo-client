<script setup lang="ts">
import { useToast } from 'primevue'
import { onMounted, ref } from 'vue'
import { createOperation, getOperationById, updateOperation } from '../api'

const toast = useToast()

const props = defineProps<{
  closeDialog: (refetch?: boolean) => void
  isUpdate: boolean
  operationId: string | null
}>()

const form = ref({
  name: '',
  selling_price: 0,
  initial_stock: 0,
})

async function loadOperationData(id: string) {
  try {
    const { data } = await getOperationById(id)

    form.value = {
      name: data.data.name,
      selling_price: data.data.selling_price,
      initial_stock: 0,
    }
  } catch (e) {
    console.error(e)
    props.closeDialog()
    toast.add({
      summary: 'Operation Not Found!',
      detail: JSON.stringify(e),
      life: 5000,
      severity: 'error',
    })
  }
}

async function handleSubmit(e: SubmitEvent) {
  e.preventDefault()

  const formValue = form.value
  let success = false

  try {
    if (props.isUpdate && props.operationId) {
      const { data } = await updateOperation(props.operationId, {
        name: formValue.name,
        selling_price: formValue.selling_price,
      })
      success = data.success
    } else {
      const { data } = await createOperation({
        name: formValue.name,
        selling_price: formValue.selling_price,
      })
      success = data.success
    }

    props.closeDialog(success)
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  if (props.operationId) {
    loadOperationData(props.operationId)
  }
})
</script>

<template>
  <form @submit="handleSubmit" class="flex flex-col gap-3">
    <div class="flex flex-col gap-1">
      <label for="name" class="text-sm">Name</label>
      <InputText v-model="form.name" id="name" />
    </div>
    <div class="flex flex-col gap-1">
      <label for="selling_price" class="text-sm">Selling Price</label>
      <InputNumber v-model="form.selling_price" id="selling_price" />
    </div>
    <Divider class="my-1.5!" />
    <div class="flex justify-end gap-3">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        outlined
        class="text-sm!"
        @click="closeDialog()"
      />
      <Button type="submit" :label="isUpdate ? 'Save Changes' : 'Add Operation'" class="text-sm!" />
    </div>
  </form>
</template>
