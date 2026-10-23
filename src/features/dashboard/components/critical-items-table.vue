<script setup lang="ts">
import type { CriticalStockItem } from '@/features/dashboard/types/dashboard.type'

interface Props {
  data?: CriticalStockItem[]
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
})

function getStatusSeverity(status: string): 'danger' | 'warn' | 'secondary' {
  switch (status) {
    case 'out_of_stock':
      return 'danger'
    case 'critical':
      return 'warn'
    case 'low':
      return 'secondary'
    default:
      return 'secondary'
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'out_of_stock':
      return 'Out of Stock'
    case 'critical':
      return 'Critical'
    case 'low':
      return 'Low Stock'
    default:
      return status
  }
}
</script>

<template>
  <Card :pt="{ root: 'border border-zinc-300 dark:border-zinc-700', body: 'p-4.5!' }">
    <template #content>
      <div class="flex flex-col gap-3">
        <h6 class="text-lg font-medium">Restock Needed</h6>
        <DataTable
          :value="data ?? []"
          scrollable
          scroll-height="flex"
          :loading="isLoading"
          class="min-h-0 max-h-96"
        >
          <template #empty>
            <p class="py-3 text-center">{{ isLoading ? 'Loading...' : 'No critical items' }}</p>
          </template>

          <Column header="Item Name">
            <template #body="{ data }">
              <p class="">{{ data.name }}</p>
            </template>
          </Column>
          <Column header="Stock">
            <template #body="{ data }">
              <p class="">{{ data.current_stock }}</p>
            </template>
          </Column>
          <Column header="Price">
            <template #body="{ data }">
              <p class="">Rp. {{ data.selling_price.toLocaleString('en-US') }}</p>
            </template>
          </Column>
          <Column header="Status">
            <template #body="{ data }">
              <Tag
                :value="getStatusLabel(data.status)"
                :severity="getStatusSeverity(data.status)"
                class="text-xs"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
  </Card>
</template>
