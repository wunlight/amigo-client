import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listSpareparts } from '../api'
import type { SparepartDTO } from '../types/sparepart.type'

export const useSparepartStore = defineStore('sparepart', () => {
  const sparepartList = ref<SparepartDTO[]>([])
  const isLoading = ref<boolean>(false)

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

  return { sparepartList, isLoading, fetchSpareparts }
})
