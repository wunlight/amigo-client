<script setup lang="ts">
type Props = {
  icon: string
  label: string
  value: string
  tagSeverity: string
}

defineProps<Props>()
</script>

<template>
  <Card class="border border-zinc-300 dark:border-zinc-700">
    <template #content>
      <div class="flex items-center gap-3">
        <Tag
          :icon="icon"
          class="size-9! rounded-full!"
          :severity="tagSeverity"
          :pt="{ icon: 'size-4.5!' }"
        />
        <div class="flex flex-col gap-1.5">
          <label class="text-sm text-zinc-500">{{ label }}</label>
          <h6 class="text-3xl font-medium">
            {{ value }}
          </h6>
        </div>
      </div>
    </template>
  </Card>
</template>
