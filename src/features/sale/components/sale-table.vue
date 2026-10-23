<script setup lang="ts">
import { format } from 'date-fns'
import { onMounted } from 'vue'
import { useSaleStore } from '../stores/use-sale-store.ts'

const saleStore = useSaleStore()

function handlePageChange(event: any) {
  saleStore.fetchSales(event.page + 1, event.rows)
}

onMounted(() => {
  saleStore.fetchSales()
})
</script>

<template>
  <DataTable
    :value="saleStore.saleList"
    scrollable
    scroll-height="flex"
    :loading="saleStore.isLoading"
    :lazy="true"
    :paginator="true"
    :rows="saleStore.perPage"
    :total-records="saleStore.total"
    @page="handlePageChange"
    class="min-h-0"
  >
    <template #empty>
      <p class="py-3 text-center">
        {{ saleStore.isLoading ? 'Loading...' : 'No Data Found!' }}
      </p>
    </template>

    <Column field="id" header="Sale ID" class="w-px">
      <template #body="{ data }">
        <span class="">{{ data.id.substring(0, 8) }}...</span>
      </template>
    </Column>
    <Column field="total_amount" header="Total Amount" class="w-36">
      <template #body="{ data }">
        <span class="">Rp. {{ data.total_amount.toLocaleString('en-US') }}</span>
      </template>
    </Column>
    <Column field="status" header="Status" class="w-px">
      <template #body="{ data }">
        <Tag
          :value="data.status"
          :severity="data.status === 'completed' ? 'success' : 'danger'"
          class="uppercase"
        />
      </template>
    </Column>
    <Column field="notes" header="Notes" class="w-48">
      <template #body="{ data }">
        <span class="text-sm text-zinc-500 truncate">
          {{ data.notes || '-' }}
        </span>
      </template>
    </Column>
    <Column field="created_at" header="Created At" style="width: 180px">
      <template #body="{ data }">
        <span class="text-sm">
          {{ format(new Date(data.created_at), 'MMM dd, yyyy, HH:mm:ss') }}
        </span>
      </template>
    </Column>
    <Column style="width: 100px">
      <template #body="{ data }">
        <div class="flex justify-end gap-2">
          <slot name="actions" :data="data" />
        </div>
      </template>
    </Column>
  </DataTable>
</template>
