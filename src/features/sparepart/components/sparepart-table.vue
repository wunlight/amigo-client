<script setup lang="ts">
import { onMounted } from 'vue'
import { useSparepartStore } from '../stores/use-sparepart-store.ts'

const store = useSparepartStore()

onMounted(() => {
  store.fetchSpareparts()
})
</script>

<template>
  <DataTable
    :value="store.sparepartList"
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
        <p>Rp. {{ data.selling_price.toLocaleString('en-US') }}</p>
      </template>
    </Column>
    <Column field="stock" header="Stock">
      <template #body="{ data }">
        <p>{{ data.stock }}</p>
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
