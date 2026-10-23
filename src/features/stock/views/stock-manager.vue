<script setup lang="ts">
import { useSparepartStore } from '@/features/sparepart/stores/use-sparepart-store.ts'
import { onMounted } from 'vue'
import OpnameFormDialog from '../components/opname/opname-form-dialog.vue'
import OverviewCard from '../components/overview-card.vue'
import RestockFormDialog from '../components/restock/restock-form-dialog.vue'
import { useStockStore } from '../stores/use-stock-store.ts'

const store = useStockStore()
const sparepartStore = useSparepartStore()

onMounted(() => {
  store.fetchStockOverview()
  sparepartStore.fetchSpareparts()
})
</script>

<template>
  <div class="flex flex-col gap-3 overflow-hidden">
    <div class="grid grid-cols-4 gap-3">
      <OverviewCard
        icon="icon-[tabler--packages]"
        label="Total Spareparts"
        :value="`${store.stockOverview?.total_spareparts.toLocaleString('en-US') ?? 0}`"
        tag-severity="primary"
      />
      <OverviewCard
        icon="icon-[tabler--trending-down]"
        label="Low Stock Items"
        :value="`${store.stockOverview?.low_stock_items.toLocaleString('en-US') ?? 0}`"
        tag-severity="warn"
      />
      <OverviewCard
        icon="icon-[tabler--circle-x]"
        label="Out of Stock"
        :value="`${store.stockOverview?.out_of_stock_items.toLocaleString('en-US') ?? 0}`"
        tag-severity="danger"
      />
      <OverviewCard
        icon="icon-[tabler--cash]"
        label="Total Inventory Value"
        :value="`Rp. ${store.stockOverview?.total_inventory_value.toLocaleString('en-US') ?? 0}`"
        tag-severity="success"
      />
    </div>

    <Card class="border border-zinc-300 dark:border-zinc-700">
      <template #content>
        <div class="flex flex-col gap-3">
          <div class="flex justify-between">
            <h6 class="self-center text-lg font-medium">Stock Manager</h6>
            <div class="flex gap-3">
              <RestockFormDialog>
                <template #trigger="{ open }">
                  <Button
                    icon="icon-[tabler--package-import]"
                    label="Restock Items"
                    outlined
                    @click="open"
                  />
                </template>
              </RestockFormDialog>
              <OpnameFormDialog>
                <template #trigger="{ open }">
                  <Button
                    icon="icon-[tabler--clipboard-check]"
                    label="Stock Opname"
                    outlined
                    @click="open"
                  />
                </template>
              </OpnameFormDialog>
            </div>
          </div>
          <DataTable
            :value="sparepartStore.sparepartList"
            scrollable
            scroll-height="flex"
            :loading="sparepartStore.isLoading"
            class="min-h-0 max-h-full"
          >
            <template #empty>
              <p class="py-3 text-center">{{ store.isLoading ? 'Loading...' : 'No Data Found' }}</p>
            </template>
            <Column field="name" header="Name" />
            <Column field="stock" header="Stock" />
            <Column field="selling_price" header="Selling Price">
              <template #body="{ data }">
                <p>Rp. {{ data.selling_price.toLocaleString('en-US') }}</p>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
