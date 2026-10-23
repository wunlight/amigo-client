<script setup lang="ts">
import { onMounted } from 'vue'
import { useOperationStore } from '../stores/use-operation-store.ts'

const store = useOperationStore()

onMounted(() => {
  store.fetchOperations()
})
</script>

<template>
  <DataTable
    :value="store.operationList"
    scrollable
    scroll-height="flex"
    :loading="store.isLoading"
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
</template>
