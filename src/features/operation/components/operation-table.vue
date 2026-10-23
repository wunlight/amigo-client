<script setup lang="ts">
import { onMounted } from 'vue'
import { useOperationStore } from '../stores/use-operation-store.ts'

type Props = {
  title: string
}

defineProps<Props>()

const store = useOperationStore()

function handlePageChange(event: any) {
  store.fetchOperations(event.page + 1, event.rows)
}

onMounted(() => {
  store.fetchOperations()
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
      :value="store.operationList"
      scrollable
      scroll-height="flex"
      :loading="store.isLoading"
      :lazy="true"
      :paginator="true"
      :rows="store.perPage"
      :total-records="store.total"
      @page="handlePageChange"
      class="min-h-0"
    >
      <template #empty>
        <p class="py-3 text-center">
          {{ store.isLoading ? 'Loading...' : 'No Data Found!' }}
        </p>
      </template>
      <Column field="name" header="Name" />
      <Column field="selling_price" header="Price">
        <template #body="{ data }">
          <p>{{ data.selling_price.toLocaleString('en-US') }}</p>
        </template>
      </Column>
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
