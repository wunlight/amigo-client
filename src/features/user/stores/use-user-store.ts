import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listUsers } from '../api/index.ts'
import type { UserDTO } from '../types/user.type.ts'

export const useUserStore = defineStore('user', () => {
  const userList = ref<UserDTO[]>([])
  const isLoading = ref<boolean>(false)

  async function fetchUsers() {
    isLoading.value = true
    try {
      const { data } = await listUsers()
      userList.value = data.data
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return { userList, isLoading, fetchUsers }
})
