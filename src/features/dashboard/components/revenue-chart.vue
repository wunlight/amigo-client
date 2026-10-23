<script setup lang="ts">
import type { RevenueTrend } from '@/features/dashboard/types/dashboard.type'
import { format } from 'date-fns'
import { computed } from 'vue'

interface Props {
  data?: RevenueTrend[]
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

const chartData = computed(() => ({
  labels: props.data?.map((d) => format(d.date, 'MMM dd')) ?? [],
  datasets: [
    {
      label: 'Revenue',
      data: props.data?.map((d) => d.amount) ?? [],
      borderColor: '#00bc7d',
      backgroundColor: 'rgba(0, 188, 125, 0.15)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 6,
      pointBackgroundColor: '#00bc7d',
      pointBorderColor: '#fff',
      pointHoverRadius: 9,
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
        color: '#71717b',
        font: {
          size: 11,
        },
      },
    },
    tooltip: {
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
        color: '#71717b',
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
        color: '#71717b',
        font: {
          size: 11,
        },
        callback: (value: any) => {
          if (typeof value === 'number') {
            return `Rp. ${value}`
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
