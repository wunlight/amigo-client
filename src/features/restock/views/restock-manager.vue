<script setup lang="ts">
import MenuBar from '@/components/menu-bar.vue'
import { onMounted } from 'vue'
import { useRestockStore } from '../store/restock-store'

const store = useRestockStore()

onMounted(() => {
  store.fetchRestockOverview()
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
                {{ store.restockOverview?.total_spareparts.toLocaleString('en-US') ?? 0 }}
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
                {{ store.restockOverview?.low_stock_items.toLocaleString('en-US') ?? 0 }}
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
                {{ store.restockOverview?.out_of_stock_items.toLocaleString('en-US') ?? 0 }}
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
                {{ store.restockOverview?.total_inventory_value.toLocaleString('en-US') ?? 0 }}
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
            <h6 class="self-center text-lg font-medium">Restock Management</h6>
            <Button
              icon="icon-[tabler--package-import] text-base!"
              label="Restock Items"
              class="text-sm!"
            />
          </div>
          <DataTable scrollable scroll-height="flex" class="min-h-0 max-h-full text-sm!">
            <template #empty>
              <p class="py-3 text-center">'No Data Found'</p>
            </template>

            <Column header="Name" />
            <Column header="Stock" />
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
