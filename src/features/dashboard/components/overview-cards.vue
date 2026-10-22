<script setup lang="ts">
import type { OverviewResponse } from '@/features/dashboard/types/dashboard.type'

interface Props {
  data?: OverviewResponse
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-4 gap-3">
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
            <label class="text-sm text-zinc-500">Daily Revenue</label>
            <h6 class="text-3xl font-medium">
              Rp. {{ data?.daily_revenue.toLocaleString('en-US') ?? 0 }}
            </h6>
          </div>
        </div>
      </template>
    </Card>

    <Card class="border border-zinc-300 dark:border-zinc-700">
      <template #content>
        <div class="flex items-center gap-3">
          <Tag
            icon="icon-[tabler--shopping-cart]"
            class="size-9! rounded-full!"
            :pt="{ icon: 'size-4.5!' }"
          />
          <div class="flex flex-col gap-1.5">
            <label class="text-sm text-zinc-500">Today's Transactions</label>
            <h6 class="text-3xl font-medium">
              {{ data?.todays_transactions.toLocaleString('en-US') ?? 0 }}
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
              {{ data?.low_stock_items.length.toLocaleString('en-US') ?? 0 }}
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
              {{ data?.out_of_stock_items?.length.toLocaleString('en-US') ?? 0 }}
            </h6>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
