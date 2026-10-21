<script setup lang="ts">
import { useToast } from 'primevue'
import { onMounted, ref } from 'vue'
import { createUser, getUserById, updateUser } from '../api'

type Props = {
  closeDialog: (refetch?: boolean) => void
  isUpdate: boolean
  userId: string | null
}

const props = defineProps<Props>()

const toast = useToast()

const form = ref({
  name: '',
  email: '',
  password: '',
})

async function loadUserData(id: string) {
  try {
    const { data } = await getUserById(id)

    form.value = {
      name: data.data.name,
      email: data.data.email,
      password: '',
    }
  } catch (e) {
    console.error(e)
    props.closeDialog()
    toast.add({
      summary: 'User Not Found!',
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
    if (props.isUpdate && props.userId) {
      const { data } = await updateUser(props.userId, {
        name: formValue.name,
        email: formValue.email,
      })
      success = data.success
    } else {
      const { data } = await createUser({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
      })
      success = data.success
    }

    props.closeDialog(success)
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  if (props.userId) {
    loadUserData(props.userId)
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
      <label for="email" class="text-sm">E-mail</label>
      <InputText v-model="form.email" disabled id="email" />
    </div>
    <div v-if="!isUpdate" class="flex flex-col gap-1">
      <label for="password" class="text-sm">Password</label>
      <Password v-model="form.password" toggle-mask id="password" />
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
      <Button type="submit" :label="isUpdate ? 'Save Changes' : 'Add User'" class="text-sm!" />
    </div>
  </form>
</template>
