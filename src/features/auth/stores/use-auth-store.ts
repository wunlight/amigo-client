import { defineStore } from 'pinia'
import { ref } from 'vue'
import { me } from '../api'
import type { LoginResponse } from '../types/auth'

export const useAuthStore = defineStore('auth', () => {
  const auth = ref<null | LoginResponse>(null)
  const isLoading = ref<boolean>(false)

  function setAuth(response: LoginResponse | null) {
    auth.value = response
  }

  async function loadAuth() {
    try {
      const { data } = await me()
      auth.value = data.data
    } catch (e) {
      console.error(e)
    }
  }

  return {
    auth,
    isLoading,
    setAuth,
    loadAuth,
  }
})
