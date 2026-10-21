<script setup lang="ts">
import MenuBar from '@/components/menu-bar.vue'
import { useSparepartStore } from '@/features/sparepart/stores/use-sparepart-store.ts'
import { onMounted } from 'vue'
import OpnameFormDialog from '../components/opname/opname-form-dialog.vue'
import RestockFormDialog from '../components/restock/restock-form-dialog.vue'
import { useStockStore } from '../stores/use-stock-store.ts'

const store = useStockStore()
const sparepartStore = useSparepartStore()

onMounted(() => {
  store.fetchStockOverview()
})
</script>

<template>
  <div class="flex flex-col gap-3 p-1.5 h-svh bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
    <MenuBar />

    <div class="grid grid-cols-4 gap-3">
      <Card class="border border-zinc-300 dark:border-zinc-700">
        <template #content>
          <div class="flex items-center gap-3">
            <Tag
              icon="icon-[tabler--packages]"
              class="size-9! rounded-full!"
              :pt="{ icon: 'size-4.5!' }"
            />
            <div class="flex flex-col gap-1.5">
              <label class="text-sm text-zinc-500">Total Spareparts</label>
              <h6 class="text-3xl font-medium">
                {{ store.stockOverview?.total_spareparts.toLocaleString('en-US') ?? 0 }}
              </h6>
            </div>
          </div>
        </template>
      </Card>
      <Card class="border border-zinc-300 dark:border-zinc-700">
        <template #content>
          <div class="flex items-center gap-3">
            <Tag
              severity="warn"
              icon="icon-[tabler--trending-down]"
              class="size-9! rounded-full!"
              :pt="{ icon: 'size-4.5!' }"
            />
            <div class="flex flex-col gap-1.5">
              <label class="text-sm text-zinc-500">Low Stock Items</label>
              <h6 class="text-3xl font-medium">
                {{ store.stockOverview?.low_stock_items.toLocaleString('en-US') ?? 0 }}
              </h6>
            </div>
          </div>
        </template>
      </Card>
      <Card class="border border-zinc-300 dark:border-zinc-700">
        <template #content>
          <div class="flex items-center gap-3">
            <Tag
              severity="danger"
              icon="icon-[tabler--circle-x]"
              class="size-9! rounded-full!"
              :pt="{ icon: 'size-4.5!' }"
            />
            <div class="flex flex-col gap-1.5">
              <label class="text-sm text-zinc-500">Out of Stock</label>
              <h6 class="text-3xl font-medium">
                {{ store.stockOverview?.out_of_stock_items.toLocaleString('en-US') ?? 0 }}
              </h6>
            </div>
          </div>
        </template>
      </Card>
      <Card class="border border-zinc-300 dark:border-zinc-700">
        <template #content>
          <div class="flex items-center gap-3">
            <Tag
              severity="success"
              icon="icon-[tabler--cash]"
              class="size-9! rounded-full!"
              :pt="{ icon: 'size-4.5!' }"
            />
            <div class="flex flex-col gap-1.5">
              <label class="text-sm text-zinc-500">Total Inventory Value</label>
              <h6 class="text-3xl font-medium">
                {{ store.stockOverview?.total_inventory_value.toLocaleString('en-US') ?? 0 }}
              </h6>
            </div>
          </div>
        </template>
      </Card>
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
