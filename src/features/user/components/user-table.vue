<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '../stores/use-user-store.ts'

type Props = {
  title: string
}

defineProps<Props>()

const userStore = useUserStore()

function handlePageChange(event: any) {
  userStore.fetchUsers(event.page + 1, event.rows)
}

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<template>
  <div class="flex flex-col gap-3 min-h-0 max-h-full">
    <div class="flex gap-3 items-center">
      <h6 class="text-lg font-medium">{{ title }}</h6>
      <div class="mr-auto" />
      <slot name="table-actions" />
    </div>

    <DataTable
      :value="userStore.userList"
      scrollable
      scroll-height="flex"
      :loading="userStore.isLoading"
      :lazy="true"
      :paginator="true"
      :rows="userStore.perPage"
      :total-records="userStore.total"
      @page="handlePageChange"
      class="min-h-0"
    >
      <template #empty>
        <p class="py-3 text-center">
          {{ userStore.isLoading ? 'Loading...' : 'No Data Found!' }}
        </p>
      </template>

      <Column field="name" header="Name" />
      <Column field="email" header="Email" />
      <Column>
        <template #body="{ data }">
          <div class="flex justify-end gap-3">
            <slot name="actions" :data="data" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
