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
      backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
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
      backgroundColor: document.documentElement.classList.contains('dark')
        ? 'rgba(39, 39, 42, 0.95)'
        : 'rgba(255, 255, 255, 0.95)',
      titleColor: document.documentElement.classList.contains('dark') ? '#fafafa' : '#000',
      bodyColor: document.documentElement.classList.contains('dark') ? '#d4d4d8' : '#71717a',
      borderColor: document.documentElement.classList.contains('dark') ? '#3f3f46' : '#e4e4e7',
      borderWidth: 1,
      padding: 12,
      displayColors: false,
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
        color: document.documentElement.classList.contains('dark')
          ? 'rgba(113, 113, 122, 0.1)'
          : 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        color: document.documentElement.classList.contains('dark') ? '#d4d4d8' : '#71717a',
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
        color: document.documentElement.classList.contains('dark') ? '#d4d4d8' : '#71717a',
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
