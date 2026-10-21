import { listSpareparts } from '@/features/sparepart/api'
import type { SparepartDTO } from '@/features/sparepart/types/sparepart.type'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getRestockOverview } from '../api'
import type { RestockOverview } from '../types/restock.type'

export const useRestockStore = defineStore('restock', () => {
  const restockOverview = ref<RestockOverview>()
  const sparepartList = ref<SparepartDTO[]>([])
  const isLoading = ref<boolean>(false)

  async function fetchRestockOverview() {
    isLoading.value = true
    try {
      const { data } = await getRestockOverview()
      restockOverview.value = data.data
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchSpareparts() {
    isLoading.value = true
    try {
      const { data } = await listSpareparts()
      sparepartList.value = data.data
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return { restockOverview, sparepartList, isLoading, fetchRestockOverview, fetchSpareparts }
})
