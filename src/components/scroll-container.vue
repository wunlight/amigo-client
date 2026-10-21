<script setup lang="ts">
import { nextTick, onMounted, onUpdated, ref } from 'vue'

type Props = {
  direction: 'vertical' | 'horizontal'
  contentClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'vertical',
})

const scrollRef = ref(null)
const showStartGradient = ref(false)
const showEndGradient = ref(false)

const checkScrollPosition = () => {
  const el = scrollRef.value
  if (!el) return

  if (props.direction === 'vertical') {
    const { scrollTop, scrollHeight, clientHeight } = el
    showStartGradient.value = scrollTop > 5
    showEndGradient.value = Math.ceil(scrollTop + clientHeight) < scrollHeight - 5
  } else {
    const { scrollLeft, scrollWidth, clientWidth } = el
    showStartGradient.value = scrollLeft > 5
    showEndGradient.value = Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5
  }
}

onMounted(() => {
  nextTick(() => {
    checkScrollPosition()
  })
})

onUpdated(() => {
  nextTick(() => {
    checkScrollPosition()
  })
})
</script>

<template>
  <div class="relative overflow-hidden">
    <div
      v-if="showStartGradient"
      :class="[
        'absolute pointer-events-none grid place-content-center z-10 transition-opacity duration-300',
        direction === 'vertical'
          ? 'top-0 left-0 right-0 h-12 bg-linear-to-b from-zinc-300 dark:from-zinc-950 via-zinc-300/75 dark:via-zinc-950/75 to-transparent'
          : 'top-0 bottom-0 left-0 w-12 bg-linear-to-r from-zinc-300 dark:from-zinc-950 via-zinc-300/75 dark:via-zinc-950/75 to-transparent',
      ]"
    >
      <span
        :class="[
          direction === 'vertical' ? 'icon-[tabler--chevron-up]' : 'icon-[tabler--chevron-left]',
          'text-xl',
        ]"
      />
    </div>

    <div
      ref="scrollRef"
      @scroll="checkScrollPosition"
      :class="[
        'no-scrollbar overflow-auto',
        direction === 'vertical' ? 'max-h-full flex flex-col' : 'max-w-full flex flex-row',
        contentClass,
      ]"
    >
      <slot />
    </div>

    <div
      v-if="showEndGradient"
      :class="[
        'absolute pointer-events-none grid place-content-center z-10 transition-opacity duration-300',
        direction === 'vertical'
          ? 'bottom-0 left-0 right-0 h-12 bg-linear-to-t from-zinc-300 dark:from-zinc-950 via-zinc-300/75 dark:via-zinc-950/75 to-transparent'
          : 'top-0 bottom-0 right-0 w-12 bg-linear-to-l from-zinc-300 dark:from-zinc-950 via-zinc-300/75 dark:via-zinc-950/75 to-transparent',
      ]"
    >
      <span
        :class="[
          direction === 'vertical' ? 'icon-[tabler--chevron-down]' : 'icon-[tabler--chevron-right]',
          'text-xl',
        ]"
      />
    </div>
  </div>
</template>
