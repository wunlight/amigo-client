<script setup lang="ts">
import { onMounted } from 'vue'
import CriticalItemsTable from '../components/critical-items-table.vue'
import OverviewCards from '../components/overview-cards.vue'
import RecentSalesTable from '../components/recent-sales-table.vue'
import RevenueChart from '../components/revenue-chart.vue'
import TopSparepartChart from '../components/top-sparepart-chart.vue'
import { useDashboardStore } from '../stores/use-dashboard-store'

const store = useDashboardStore()

onMounted(() => {
  store.fetchAll()
})
</script>

<template>
  <div class="grid grid-cols-12 gap-3 min-h-0 overflow-auto">
    <div class="col-span-5 flex flex-col gap-3">
      <OverviewCards :data="store.overview ?? undefined" :is-loading="store.isLoading" />
      <RecentSalesTable :data="store.dashboard?.recent_sales" :is-loading="store.isLoading" />
      <CriticalItemsTable :data="store.dashboard?.critical_items" :is-loading="store.isLoading" />
    </div>
    <div class="col-span-7 flex flex-col gap-3">
      <RevenueChart :data="store.dashboard?.revenue_data" :is-loading="store.isLoading" />
      <TopSparepartChart
        :data="store.dashboard?.top_sold_sparepart"
        :is-loading="store.isLoading"
      />
    </div>
  </div>
</template>
