import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDashboard, getDashboardOverview } from '../api/index'
import type { DashboardResponse, OverviewResponse } from '@/features/dashboard/types/dashboard.type'

export const useDashboardStore = defineStore('dashboard', () => {
  const overview = ref<OverviewResponse | null>(null)
  const dashboard = ref<DashboardResponse | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchOverview() {
    isLoading.value = true
    error.value = null

    try {
      const { data } = await getDashboardOverview()
      overview.value = data.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch overview'
      console.error('Failed to fetch dashboard overview:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchDashboard() {
    isLoading.value = true
    error.value = null

    try {
      const { data } = await getDashboard()
      dashboard.value = data.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch dashboard'
      console.error('Failed to fetch dashboard:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchAll() {
    isLoading.value = true
    error.value = null

    try {
      const [overviewRes, dashboardRes] = await Promise.all([
        getDashboardOverview(),
        getDashboard(),
      ])
      overview.value = overviewRes.data.data
      dashboard.value = dashboardRes.data.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch dashboard data'
      console.error('Failed to fetch dashboard data:', err)
    } finally {
      isLoading.value = false
    }
  }

  function reset() {
    overview.value = null
    dashboard.value = null
    error.value = null
  }

  return {
    overview,
    dashboard,
    isLoading,
    error,
    fetchOverview,
    fetchDashboard,
    fetchAll,
    reset,
  }
})
