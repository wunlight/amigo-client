<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '../stores/use-user-store.ts'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<template>
  <DataTable
    :value="userStore.userList"
    scrollable
    scroll-height="flex"
    :loading="userStore.isLoading"
    class="min-h-0"
  >
    <template #empty>
      <p class="py-3 text-center">
        {{ userStore.isLoading ? 'Loading...' : 'No Data Found!' }}
      </p>
    </template>

    <Column field="name" header="Name" />
    <Column>
      <template #body="{ data }">
        <div class="flex justify-end gap-3">
          <slot name="actions" :data="data" />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
