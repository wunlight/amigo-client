<script setup lang="ts">
import type { RecentSaleItem } from '@/features/dashboard/types/dashboard.type'
import { format } from 'date-fns'

interface Props {
  data?: RecentSaleItem[]
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})
</script>

<template>
  <Card :pt="{ root: 'border border-zinc-300 dark:border-zinc-700', body: 'p-4.5!' }">
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

          <Column header="Sale ID" class="max-w-24">
            <template #body="{ data }">
              <p class="truncate">{{ data.sale_id }}</p>
            </template>
          </Column>
          <Column header="Total Amount">
            <template #body="{ data }">
              <p class="font-medium">Rp. {{ data.total_amount.toLocaleString('en-US') }}</p>
            </template>
          </Column>
          <Column header="Items">
            <template #body="{ data }">
              <Badge :value="data.item_count.toString()" severity="info" />
            </template>
          </Column>
          <Column header="Date">
            <template #body="{ data }">
              <p class="text-sm text-zinc-500">
                {{ format(data.created_at, 'MMM dd, HH:mm bbb') }}
              </p>
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
  </Card>
</template>
