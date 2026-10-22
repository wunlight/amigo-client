<script setup lang="ts">
import type { RecentSaleItem } from '@/features/dashboard/types/dashboard.type'

interface Props {
  data?: RecentSaleItem[]
  isLoading?: boolean
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
})

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <Card class="border border-zinc-300 dark:border-zinc-700">
    <template #content>
      <div class="flex flex-col gap-3">
        <h6 class="text-lg font-medium">Recent Sales</h6>
        <DataTable
          :value="data ?? []"
          scrollable
          scroll-height="flex"
          :loading="isLoading"
          class="min-h-0 max-h-96"
        >
          <template #empty>
            <p class="py-3 text-center">{{ isLoading ? 'Loading...' : 'No sales found' }}</p>
          </template>
          <Column header="Sale ID" class="max-w-60">
            <template #body="{ data: row }">
              <p class="truncate font-mono text-sm">{{ row.sale_id }}</p>
            </template>
          </Column>
          <Column header="Total Amount">
            <template #body="{ data: row }">
              <p class="font-medium">Rp. {{ row.total_amount.toLocaleString('en-US') }}</p>
            </template>
          </Column>
          <Column header="Items">
            <template #body="{ data: row }">
              <Badge :value="row.item_count.toString()" severity="info" />
            </template>
          </Column>
          <Column header="Date">
            <template #body="{ data: row }">
              <p class="text-sm text-zinc-600 dark:text-zinc-400">
                {{ formatDate(row.created_at) }}
              </p>
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
  </Card>
</template>
