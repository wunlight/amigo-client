<script setup lang="ts">
import { format } from 'date-fns'
import { onMounted } from 'vue'
import RefundSaleDialog from '../components/refund-sale-dialog.vue'
import { useSaleStore } from '../stores/use-sale-store.ts'

const saleStore = useSaleStore()

onMounted(() => {
  saleStore.fetchSales()
})

function handlePageChange(event: any) {
  saleStore.fetchSales(event.page + 1, event.rows)
}
</script>

<template>
  <div class="flex flex-col gap-3 min-h-0">
    <Card
      :pt="{
        root: 'min-h-0 border border-zinc-300 dark:border-zinc-700 overflow-hidden',
        body: 'min-h-0 p-4.5!',
        content: 'min-h-0',
      }"
    >
      <template #content>
        <div class="flex flex-col gap-3 min-h-0 max-h-full">
          <div class="flex justify-between">
            <h6 class="self-center text-lg font-medium">Sales List</h6>
          </div>
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
                  <RefundSaleDialog>
                    <template #trigger="{ open }">
                      <Button
                        icon="icon-[tabler--arrow-back]"
                        severity="danger"
                        outlined
                        rounded
                        :disabled="data.status === 'refunded'"
                        @click="open(data.id)"
                        v-tooltip.top="data.status === 'refunded' ? 'Already refunded' : 'Refund'"
                      />
                    </template>
                  </RefundSaleDialog>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
