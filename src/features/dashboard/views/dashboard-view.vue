<script setup lang="ts">
import MenuBar from '@/components/menu-bar.vue'
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
  <div class="flex flex-col gap-3 p-1.5 h-svh bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
    <MenuBar />

    <OverviewCards v-if="store.overview" :data="store.overview" :is-loading="store.isLoading" />

    <div class="flex flex-col gap-3 pb-3 overflow-auto">
      <div class="grid grid-cols-2 gap-3">
        <RevenueChart :data="store.dashboard?.revenue_data" :is-loading="store.isLoading" />
        <TopSparepartChart
          :data="store.dashboard?.top_sold_sparepart"
          :is-loading="store.isLoading"
        />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <RecentSalesTable :data="store.dashboard?.recent_sales" :is-loading="store.isLoading" />
        <CriticalItemsTable :data="store.dashboard?.critical_items" :is-loading="store.isLoading" />
      </div>
    </div>
  </div>
</template>
