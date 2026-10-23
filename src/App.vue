<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useTheme } from './composables/use-theme'
import AppLayout from './layouts/app-layout.vue'

const theme = useTheme()

onMounted(() => {
  theme.applyTheme(theme.isDark)
})
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>

  <Toast />
</template>
