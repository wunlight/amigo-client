import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listUsers } from '../api/index.ts'
import type { UserDTO } from '../types/user.type.ts'

export const useUserStore = defineStore('user', () => {
  const userList = ref<UserDTO[]>([])
  const isLoading = ref<boolean>(false)
  const currentPage = ref<number>(1)
  const perPage = ref<number>(10)
  const total = ref<number>(0)
  const totalPage = ref<number>(0)

  async function fetchUsers(page: number = 1, perPageValue: number = 10) {
    isLoading.value = true
    try {
      const { data } = await listUsers(page, perPageValue)
      userList.value = data.data
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

  return { userList, isLoading, currentPage, perPage, total, totalPage, fetchUsers }
})
