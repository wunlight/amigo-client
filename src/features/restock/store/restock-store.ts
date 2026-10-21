import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getRestockOverview } from '../api'
import type { RestockOverview } from '../types/restock.type'

export const useRestockStore = defineStore('restock', () => {
  const restockOverview = ref<RestockOverview>()

  async function fetchRestockOverview() {
    try {
      const { data } = await getRestockOverview()
      restockOverview.value = data.data
    } catch (e) {
      console.error(e)
    }
  }

  return { restockOverview, fetchRestockOverview }
})
