<script setup lang="ts">
import { useToast } from 'primevue'
import { onMounted, ref } from 'vue'
import { createSparepart, getSparepartById, updateSparepart } from '../api'

type Props = {
  closeDialog: (refetch?: boolean) => void
  isUpdate: boolean
  sparepartId: string | null
}

const props = defineProps<Props>()

const toast = useToast()

const form = ref({
  name: '',
  selling_price: 0,
  initial_stock: 0,
})

async function loadSparepartData(id: string) {
  try {
    const { data } = await getSparepartById(id)

    form.value = {
      name: data.data.name,
      selling_price: data.data.selling_price,
      initial_stock: 0,
    }
  } catch (e) {
    console.error(e)
    props.closeDialog()
    toast.add({
      summary: 'Sparepart Not Found!',
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
    if (props.isUpdate && props.sparepartId) {
      const { data } = await updateSparepart(props.sparepartId, {
        name: formValue.name,
        selling_price: formValue.selling_price,
      })
      success = data.success
    } else {
      const { data } = await createSparepart({
        name: formValue.name,
        selling_price: formValue.selling_price,
        initial_stock: formValue.initial_stock,
      })
      success = data.success
    }

    props.closeDialog(success)
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  if (props.sparepartId) {
    loadSparepartData(props.sparepartId)
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
    <div v-if="!isUpdate" class="flex flex-col gap-1">
      <label for="initial_stock" class="text-sm">Initial Stock</label>
      <InputNumber v-model="form.initial_stock" id="initial_stock" />
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
      <Button type="submit" :label="isUpdate ? 'Save Changes' : 'Add Sparepart'" class="text-sm!" />
    </div>
  </form>
</template>
