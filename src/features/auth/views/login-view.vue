<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../api'
import { useAuthStore } from '../stores/use-auth-store'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
})
const isLoading = ref(false)

async function handleLogin() {
  isLoading.value = true
  const formValue = form.value

  try {
    const { data } = await login({
      email: formValue.email,
      password: formValue.password,
    })

    authStore.setAuth(data.data)
    router.replace('/')
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="grid place-content-center h-svh overflow-hidden">
    <Card class="border border-zinc-300 dark:border-zinc-700">
      <template #content>
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-1">
            <label for="email" class="text-sm">E-mail</label>
            <InputText v-model="form.email" id="email" />
          </div>
          <div class="flex flex-col gap-1">
            <label for="password" class="text-sm">Password</label>
            <Password v-model="form.password" toggle-mask :feedback="false" id="password" />
          </div>
          <Button label="Login" class="mt-4.5 text-sm!" @click="handleLogin" />
        </div>
      </template>
    </Card>
  </div>
</template>
