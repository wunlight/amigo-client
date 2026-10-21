<script setup lang="ts">
import { ref } from 'vue'
import RestockForm from './restock-form.vue'

const show = ref<boolean>(false)

function openDialog(): void {
  show.value = true
}

function closeDialog(): void {
  show.value = false
}
</script>

<template>
  <slot name="trigger" :open="openDialog" />

  <Dialog v-model:visible="show" modal header="Restock Items">
    <RestockForm :close-dialog="closeDialog" />
  </Dialog>
</template>
