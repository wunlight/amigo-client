<script setup lang="ts">
import { ref } from 'vue'
import { deleteUser } from '../api/index.ts'
import { useUserStore } from '../stores/use-user-store.ts'

const userStore = useUserStore()

const show = ref<boolean>(false)
const userId = ref<string | null>(null)

function openDialog(id?: string) {
  show.value = true
  if (id) userId.value = id
}

function closeDialog() {
  show.value = false
  userId.value = null
}

async function handleDelete() {
  try {
    if (userId.value) {
      await deleteUser(userId.value)
    }
    closeDialog()
    userStore.fetchUsers()
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <slot name="trigger" :open="openDialog" />

  <Dialog v-model:visible="show" modal header="Delete User?">
    <div class="flex flex-col w-80">
      <p>Are you sure to delete this user? This action cannot be undone.</p>
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
