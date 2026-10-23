import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listSpareparts } from '../api'
import type { SparepartDTO } from '../types/sparepart.type'

export const useSparepartStore = defineStore('sparepart', () => {
  const sparepartList = ref<SparepartDTO[]>([])
  const isLoading = ref<boolean>(false)
  const currentPage = ref<number>(1)
  const perPage = ref<number>(10)
  const total = ref<number>(0)
  const totalPage = ref<number>(0)

  async function fetchSpareparts(page: number = 1, perPageValue: number = 10) {
    isLoading.value = true
    try {
      const { data } = await listSpareparts(page, perPageValue)
      sparepartList.value = data.data
      currentPage.value = data.meta.page
      perPage.value = data.meta.per_page
      total.value = data.meta.total
      totalPage.value = data.meta.total_page
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return { sparepartList, isLoading, currentPage, perPage, total, totalPage, fetchSpareparts }
})
