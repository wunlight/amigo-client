<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/use-user-store.ts'
import UserForm from './user-form.vue'

const userStore = useUserStore()

const show = ref<boolean>(false)
const userId = ref<string | null>(null)

function openDialog(id?: string) {
  show.value = true
  if (id) userId.value = id
}

function closeDialog(refetch?: boolean) {
  show.value = false
  userId.value = null

  if (refetch) {
    userStore.fetchUsers()
  }
}
</script>

<template>
  <slot name="trigger" :open="openDialog" />

  <Dialog v-model:visible="show" modal :header="!!userId ? 'Edit User' : 'Add New User'">
    <UserForm :close-dialog="closeDialog" :is-update="!!userId" :user-id="userId" />
  </Dialog>
</template>
