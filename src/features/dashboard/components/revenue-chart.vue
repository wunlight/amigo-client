<script setup lang="ts">
import type { RevenueTrend } from '@/features/dashboard/types/dashboard.type'
import { computed } from 'vue'

interface Props {
  data?: RevenueTrend[]
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const chartData = computed(() => ({
  labels: props.data?.map((d) => formatDate(d.date)) ?? [],
  datasets: [
    {
      label: 'Revenue',
      data: props.data?.map((d) => d.amount) ?? [],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: '#10b981',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointHoverRadius: 7,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: document.documentElement.classList.contains('dark') ? '#d4d4d8' : '#71717a',
        font: {
          size: 12,
        },
      },
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
          return `Rp. ${context.parsed.y.toLocaleString('en-US')}`
        },
      },
    },
  },
  scales: {
    x: {
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
    y: {
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
        callback: (value: any) => {
          if (typeof value === 'number') {
            return `Rp. ${(value / 1000000).toFixed(1)}M`
          }
          return value
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
        <h6 class="text-lg font-medium">Revenue Trend - Last 7 Days</h6>
        <div v-if="isLoading" class="h-80">
          <Skeleton height="100%" />
        </div>
        <div v-else class="h-80">
          <Chart type="line" :data="chartData" :options="chartOptions" class="h-full" />
        </div>
      </div>
    </template>
  </Card>
</template>
