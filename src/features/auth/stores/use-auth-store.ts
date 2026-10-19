import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { LoginResponse } from '../types/auth'

export const useAuthStore = defineStore('auth', () => {
  const auth = ref<null | LoginResponse>(null)
  const isLoading = ref<boolean>(false)

  function setAuth(response: LoginResponse | null) {
    auth.value = response
  }

  return {
    auth,
    isLoading,
    setAuth,
  }
})
