<script setup lang="ts">
import { onMounted, ref } from 'vue'

const DARK_MODE_KEY = 'dark-mode'

const isDark = ref(localStorage.getItem(DARK_MODE_KEY) === 'true')

function applyTheme(value: boolean) {
  isDark.value = value
  document.documentElement.classList.toggle('dark', value)
  localStorage.setItem(DARK_MODE_KEY, String(value))
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
      <Button icon="icon-[tabler--menu-2-filled]" severity="secondary" class="size-9!" />
      <slot name="left-content" />
    </div>
    <Button
      icon="icon-[tabler--sun]"
      severity="secondary"
      class="size-9!"
      @click="applyTheme(!isDark)"
    />
  </div>
</template>
