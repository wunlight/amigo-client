<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const layouts = {
  Main: defineAsyncComponent(() => import('@/layouts/main-layout.vue')),
  Auth: defineAsyncComponent(() => import('@/layouts/auth-layout.vue')),
}

const route = useRoute()
const layout = computed(() => {
  const layoutName = route.meta.layout
  if (layoutName && layoutName in layouts) {
    return layouts[layoutName]
  }
  return layouts.Auth
})
</script>

<template>
  <Component :is="layout">
    <slot />
  </Component>
</template>
