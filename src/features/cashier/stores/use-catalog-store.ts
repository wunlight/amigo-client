import { listOperations } from '@/features/operation/api'
import type { OperationDTO } from '@/features/operation/types/operation.type'
import { listSpareparts } from '@/features/sparepart/api'
import type { SparepartDTO } from '@/features/sparepart/types/sparepart.type'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const DEFAULT_LIMIT = 20

type FetchQuery = {
  itemType: 'sparepart' | 'operation'
  page: number
}

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
  const fetchQueue = ref<FetchQuery[]>([])
  const isFetching = ref<boolean>(false)

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

  function addToQueue(query: FetchQuery) {
    const isDuplicate = fetchQueue.value.some(
      (q) => q.itemType === query.itemType && q.page === query.page,
    )
    if (!isDuplicate) {
      fetchQueue.value.push(query)
      processQueue()
    }
  }

  async function processQueue() {
    if (isFetching.value || fetchQueue.value.length === 0) return

    const query = fetchQueue.value.shift()
    if (!query) return

    isFetching.value = true
    try {
      if (query.itemType === 'operation') {
        await fetchOperations(query.page)
      } else {
        await fetchSpareparts(query.page)
      }
    } finally {
      isFetching.value = false
    }
  }

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
    addToQueue({ itemType: 'operation', page: operationsCurrentPage.value + 1 })
  }

  async function loadNextSparepartsPage() {
    addToQueue({ itemType: 'sparepart', page: sparepartsCurrentPage.value + 1 })
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
    fetchQueue.value = []
    isFetching.value = false
  }

  watch(
    () => isFetching.value,
    async (newVal) => {
      if (!newVal && fetchQueue.value.length > 0) {
        await processQueue()
      }
    },
  )

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
    fetchQueue,
    isFetching,
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
    addToQueue,
    processQueue,
  }
})
