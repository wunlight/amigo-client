import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listSales } from '../api/index.ts'
import type { SaleDTO } from '../types/sale.type.ts'

export const useSaleStore = defineStore('sale', () => {
  const saleList = ref<SaleDTO[]>([])
  const isLoading = ref<boolean>(false)
  const currentPage = ref<number>(1)
  const perPage = ref<number>(10)
  const total = ref<number>(0)
  const totalPage = ref<number>(0)

  async function fetchSales(page: number = 1, perPageValue: number = 10) {
    isLoading.value = true
    try {
      const { data } = await listSales(page, perPageValue)
      saleList.value = data.data
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

  return { saleList, isLoading, currentPage, perPage, total, totalPage, fetchSales }
})
