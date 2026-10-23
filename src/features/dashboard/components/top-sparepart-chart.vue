<script setup lang="ts">
import type { TopSparepartItem } from '@/features/dashboard/types/dashboard.type'
import { computed } from 'vue'

interface Props {
  data?: TopSparepartItem[]
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

const chartData = computed(() => ({
  labels: props.data?.map((d) => d.name) ?? [],
  datasets: [
    {
      label: 'Quantity Sold',
      data: props.data?.map((d) => d.total_qty) ?? [],
      backgroundColor: ['#00bc7d', '#00b8db', '#615fff', '#ff2056', '#fd9a00'],
      borderRadius: 4,
      borderSkipped: false,
    },
  ],
}))

const chartOptions = computed(() => ({
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          return `${context.parsed.x} units sold`
        },
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: '#71717b',
      },
      ticks: {
        color: '#71717b',
        font: {
          size: 11,
        },
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#71717b',
        font: {
          size: 11,
        },
      },
    },
  },
}))
</script>

<template>
  <Card class="border border-zinc-300 dark:border-zinc-700">
    <template #content>
      <div class="flex flex-col gap-3">
        <h6 class="text-lg font-medium">Top 5 Best Selling Spareparts</h6>
        <div v-if="isLoading" class="h-80">
          <Skeleton height="100%" />
        </div>
        <div v-else class="h-80">
          <Chart type="bar" :data="chartData" :options="chartOptions" class="h-full" />
        </div>
      </div>
    </template>
  </Card>
</template>
