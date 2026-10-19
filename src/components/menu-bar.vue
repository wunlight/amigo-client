<script setup lang="ts">
import { useAuthStore } from '@/features/auth/stores/use-auth-store'
import { onMounted, ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const DARK_MODE_KEY = 'dark-mode'
const MENU_ITEMS = [
  {
    label: 'Cashier',
    icon: 'icon-[tabler--shopping-bag]',
    command: () => navigateTo('/'),
  },
  {
    label: 'User',
    icon: 'icon-[tabler--user]',
    command: () => navigateTo('/users'),
  },
]

const isDark = ref<boolean>(localStorage.getItem(DARK_MODE_KEY) === 'true')
const showDrawer = ref<boolean>(false)

const userMenu = useTemplateRef('user-menu')

function applyTheme(value: boolean) {
  isDark.value = value
  document.documentElement.classList.toggle('dark', value)
  localStorage.setItem(DARK_MODE_KEY, String(value))
}

function navigateTo(path: string) {
  router.push(path)
  showDrawer.value = false
}

function toggleUserMenu(e: MouseEvent) {
  userMenu.value?.toggle(e)
}

onMounted(() => {
  applyTheme(isDark.value)
})
</script>

<template>
  <div
    class="flex justify-between p-1.5 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg"
  >
    <div class="flex gap-3">
      <Button
        icon="icon-[tabler--menu-2-filled]"
        severity="secondary"
        class="size-9!"
        @click="showDrawer = true"
      />
      <Drawer v-model:visible="showDrawer" header="Menu">
        <Menu :model="MENU_ITEMS" :pt="{ root: 'border-0!', itemContent: 'py-1.5' }" />
      </Drawer>
      <slot name="left-content" />
    </div>
    <div class="flex gap-3">
      <Button
        icon="icon-[tabler--sun]"
        severity="secondary"
        class="size-9!"
        @click="applyTheme(!isDark)"
      />
      <Button
        icon="icon-[tabler--user]"
        :label="authStore.auth?.name ?? 'Not Authenticated'"
        severity="secondary"
        :pt="{ label: 'text-sm!' }"
        @click="toggleUserMenu"
      />
      <Menu ref="user-menu" popup></Menu>
    </div>
  </div>
</template>
