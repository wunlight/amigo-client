import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listServices } from '../api'
import type { ServiceDTO } from '../types/service'

export const useServiceStore = defineStore('service', () => {
  const serviceList = ref<ServiceDTO[]>([])
  const isLoading = ref<boolean>(false)

  async function fetchServices() {
    isLoading.value = true
    try {
      const { data } = await listServices()
      serviceList.value = data.data
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return { serviceList, isLoading, fetchServices }
})
