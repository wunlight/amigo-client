<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useTheme } from './composables/use-theme'

const theme = useTheme()

onMounted(() => {
  theme.applyTheme(theme.isDark)
})
</script>

<template>
  <RouterView />
  <Toast />
</template>
