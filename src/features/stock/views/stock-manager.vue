<script setup lang="ts">
import SparepartTable from '@/features/sparepart/components/sparepart-table.vue'
import { onMounted } from 'vue'
import OpnameFormDialog from '../components/opname/opname-form-dialog.vue'
import OverviewCard from '../components/overview-card.vue'
import RestockFormDialog from '../components/restock/restock-form-dialog.vue'
import { useStockStore } from '../stores/use-stock-store.ts'

const store = useStockStore()

onMounted(() => {
  store.fetchStockOverview()
})
</script>

<template>
  <div class="flex flex-col gap-3 min-h-0">
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

    <Card
      :pt="{
        root: 'min-h-0 border border-zinc-300 dark:border-zinc-700 overflow-hidden',
        body: 'min-h-0 p-4.5!',
        content: 'min-h-0',
      }"
    >
      <template #content>
        <SparepartTable title="Stock Manager">
          <template #table-actions>
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
          </template>
        </SparepartTable>
      </template>
    </Card>
  </div>
</template>
