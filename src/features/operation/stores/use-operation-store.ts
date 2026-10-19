import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listOperations } from '../api'
import type { OperationDTO } from '../types/operation'

export const useOperationStore = defineStore('operation', () => {
  const operationList = ref<OperationDTO[]>([])
  const isLoading = ref<boolean>(false)

  async function fetchOperations() {
    isLoading.value = true
    try {
      const { data } = await listOperations()
      operationList.value = data.data
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return { operationList, isLoading, fetchOperations }
})
