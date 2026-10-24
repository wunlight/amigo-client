import { listOperations } from '@/features/operation/api'
import type { OperationDTO } from '@/features/operation/types/operation.type'
import { listSpareparts } from '@/features/sparepart/api'
import type { SparepartDTO } from '@/features/sparepart/types/sparepart.type'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const DEFAULT_LIMIT = 20

export const useCatalogStore = defineStore('cashier-catalog', () => {
  const operations = ref<OperationDTO[]>([])
  const spareparts = ref<SparepartDTO[]>([])
  const searchQuery = ref<string>('')
  const operationsCurrentPage = ref<number>(1)
  const sparepartsCurrentPage = ref<number>(1)
  const operationsTotal = ref<number>(0)
  const sparepartsTotal = ref<number>(0)
  const isLoadingOperations = ref<boolean>(false)
  const isLoadingSpareparts = ref<boolean>(false)

  const isOperationsFullyLoaded = computed(() => {
    return operations.value.length >= operationsTotal.value
  })

  const isSparepartsFullyLoaded = computed(() => {
    return spareparts.value.length >= sparepartsTotal.value
  })

  const filteredOperations = computed(() => {
    if (!searchQuery.value) return operations.value
    return operations.value.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  })

  const filteredSpareparts = computed(() => {
    if (!searchQuery.value) return spareparts.value
    return spareparts.value.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  })

  async function fetchOperations(page: number = 1) {
    isLoadingOperations.value = true
    try {
      const { data } = await listOperations(page, DEFAULT_LIMIT)

      if (page === 1) {
        operations.value = data.data
      } else {
        operations.value.push(...data.data)
      }

      operationsCurrentPage.value = data.meta.page
      operationsTotal.value = data.meta.total
    } catch (e) {
      console.error(e)
    } finally {
      isLoadingOperations.value = false
    }
  }

  async function fetchSpareparts(page: number = 1) {
    isLoadingSpareparts.value = true
    try {
      const { data } = await listSpareparts(page, DEFAULT_LIMIT)

      if (page === 1) {
        spareparts.value = data.data
      } else {
        spareparts.value.push(...data.data)
      }

      sparepartsCurrentPage.value = data.meta.page
      sparepartsTotal.value = data.meta.total
    } catch (e) {
      console.error(e)
    } finally {
      isLoadingSpareparts.value = false
    }
  }

  async function loadNextOperationsPage() {
    if (!isOperationsFullyLoaded.value && !isLoadingOperations.value) {
      await fetchOperations(operationsCurrentPage.value + 1)
    }
  }

  async function loadNextSparepartsPage() {
    if (!isSparepartsFullyLoaded.value && !isLoadingSpareparts.value) {
      await fetchSpareparts(sparepartsCurrentPage.value + 1)
    }
  }

  function updateSearchQuery(query: string) {
    searchQuery.value = query
  }

  function resetCatalog() {
    operations.value = []
    spareparts.value = []
    searchQuery.value = ''
    operationsCurrentPage.value = 1
    sparepartsCurrentPage.value = 1
    operationsTotal.value = 0
    sparepartsTotal.value = 0
    isLoadingOperations.value = false
    isLoadingSpareparts.value = false
  }

  return {
    // state
    operations,
    spareparts,
    searchQuery,
    operationsCurrentPage,
    sparepartsCurrentPage,
    operationsTotal,
    sparepartsTotal,
    isLoadingOperations,
    isLoadingSpareparts,
    // computed
    isOperationsFullyLoaded,
    isSparepartsFullyLoaded,
    filteredOperations,
    filteredSpareparts,
    // actions
    fetchOperations,
    fetchSpareparts,
    loadNextOperationsPage,
    loadNextSparepartsPage,
    updateSearchQuery,
    resetCatalog,
  }
})
