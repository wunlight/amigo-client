import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listOperations } from '../api'
import type { OperationDTO } from '../types/operation.type'

export const useOperationStore = defineStore('operation', () => {
  const operationList = ref<OperationDTO[]>([])
  const isLoading = ref<boolean>(false)
  const currentPage = ref<number>(1)
  const perPage = ref<number>(10)
  const total = ref<number>(0)
  const totalPage = ref<number>(0)

  async function fetchOperations(page: number = 1, perPageValue: number = 10) {
    isLoading.value = true
    try {
      const { data } = await listOperations(page, perPageValue)
      operationList.value = data.data
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

  return { operationList, isLoading, currentPage, perPage, total, totalPage, fetchOperations }
})
