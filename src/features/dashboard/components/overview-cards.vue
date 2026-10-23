<script setup lang="ts">
import type { OverviewResponse } from '@/features/dashboard/types/dashboard.type'
import OverviewCard from './overview-card.vue'

interface Props {
  data?: OverviewResponse
  isLoading: boolean
}

withDefaults(defineProps<Props>(), {
  data: undefined,
  isLoading: false,
})
</script>

<template>
  <div class="grid grid-cols-2 gap-3">
    <OverviewCard
      icon="icon-[tabler--cash]"
      label="Daily Revenue"
      :value="`Rp. ${data?.daily_revenue.toLocaleString('en-US') ?? 0}`"
      tag-severity="success"
    />
    <OverviewCard
      icon="icon-[tabler--shopping-cart]"
      label="Today's Transactions"
      :value="`${data?.todays_transactions.toLocaleString('en-US') ?? 0}`"
      tag-severity="primary"
    />
    <OverviewCard
      icon="icon-[tabler--trending-down]"
      label="Low Stock Items"
      :value="`${data?.low_stock_items.length.toLocaleString('en-US') ?? 0}`"
      tag-severity="warn"
    />
    <OverviewCard
      icon="icon-[tabler--circle-x]"
      label="Out of Stock"
      :value="`${data?.out_of_stock_items?.length.toLocaleString('en-US') ?? 0}`"
      tag-severity="danger"
    />
  </div>
</template>
