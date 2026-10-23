<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSparepartStore } from '../stores/use-sparepart-store.ts'
import type { SparepartFilterParams } from '../types/sparepart.type'

type Props = {
  title: string
}

defineProps<Props>()

const store = useSparepartStore()

const searchName = ref<string>('')
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)
const minStock = ref<number | null>(null)
const maxStock = ref<number | null>(null)
const sortBy = ref<'name' | 'selling_price' | 'stock' | 'created_at'>('name')
const sortOrder = ref<'asc' | 'desc'>('asc')
const showFilters = ref<boolean>(false)

function handlePageChange(event: any) {
  store.fetchSpareparts(event.page + 1, event.rows)
}

function applyFilters() {
  const filters: SparepartFilterParams = {}
  if (searchName.value) filters.name = searchName.value
  if (minPrice.value !== null) filters.min_price = minPrice.value
  if (maxPrice.value !== null) filters.max_price = maxPrice.value
  if (minStock.value !== null) filters.min_stock = minStock.value
  if (maxStock.value !== null) filters.max_stock = maxStock.value
  filters.sort_by = sortBy.value
  filters.sort_order = sortOrder.value

  store.setFilters(filters)
  store.fetchSpareparts(1, store.perPage)
}

function resetFilters() {
  searchName.value = ''
  minPrice.value = null
  maxPrice.value = null
  minStock.value = null
  maxStock.value = null
  sortBy.value = 'name'
  sortOrder.value = 'asc'

  store.resetFilters()
  store.fetchSpareparts()
}

onMounted(() => {
  store.fetchSpareparts()
})
</script>

<template>
  <div class="flex flex-col gap-3 min-h-0 max-h-full">
    <div class="flex gap-3 items-center">
      <h6 class="text-lg font-medium">{{ title }}</h6>
      <div class="mr-auto" />
      <!-- <Button
        :icon="showFilters ? 'icon-[tabler--filter-off]' : 'icon-[tabler--filter]'"
        :label="showFilters ? 'Hide Filters' : 'Show Filters'"
        @click="showFilters = !showFilters"
        severity="secondary"
        outlined
      />
      <span v-if="Object.keys(store.filters).length > 0" class="text-sm text-blue-500">
        {{ Object.keys(store.filters).length }} filter(s) active
      </span> -->
      <slot name="table-actions" />
    </div>

    <!-- <div v-if="showFilters" class="border border-zinc-300 dark:border-zinc-700 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div>
          <label class="text-sm font-medium">Search Name</label>
          <InputText v-model="searchName" placeholder="Search by name..." class="w-full" />
        </div>
        <div>
          <label class="text-sm font-medium">Min Price</label>
          <InputNumber v-model="minPrice" placeholder="Min price" class="w-full" />
        </div>
        <div>
          <label class="text-sm font-medium">Max Price</label>
          <InputNumber v-model="maxPrice" placeholder="Max price" class="w-full" />
        </div>
        <div>
          <label class="text-sm font-medium">Min Stock</label>
          <InputNumber v-model="minStock" placeholder="Min stock" class="w-full" />
        </div>
        <div>
          <label class="text-sm font-medium">Max Stock</label>
          <InputNumber v-model="maxStock" placeholder="Max stock" class="w-full" />
        </div>
        <div>
          <label class="text-sm font-medium">Sort By</label>
          <Dropdown
            v-model="sortBy"
            :options="[
              { label: 'Name', value: 'name' },
              { label: 'Price', value: 'selling_price' },
              { label: 'Stock', value: 'stock' },
              { label: 'Created Date', value: 'created_at' },
            ]"
            option-label="label"
            option-value="value"
            class="w-full"
          />
        </div>
        <div>
          <label class="text-sm font-medium">Sort Order</label>
          <Dropdown
            v-model="sortOrder"
            :options="[
              { label: 'Ascending', value: 'asc' },
              { label: 'Descending', value: 'desc' },
            ]"
            option-label="label"
            option-value="value"
            class="w-full"
          />
        </div>
        <div class="flex gap-2 items-end">
          <Button label="Apply" @click="applyFilters" severity="success" />
          <Button label="Reset" @click="resetFilters" severity="warning" outlined />
        </div>
      </div>
    </div> -->

    <DataTable
      :value="store.sparepartList"
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
  </div>
</template>
