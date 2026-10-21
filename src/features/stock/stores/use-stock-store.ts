import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getStockOverview } from '../api'
import type { StockOverview } from '../types/stock.type'

export const useStockStore = defineStore('stock', () => {
  const stockOverview = ref<StockOverview>()
  const isLoading = ref<boolean>(false)

  async function fetchStockOverview() {
    isLoading.value = true
    try {
      const { data } = await getStockOverview()
      stockOverview.value = data.data
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    stockOverview,
    isLoading,
    fetchStockOverview,
  }
})
