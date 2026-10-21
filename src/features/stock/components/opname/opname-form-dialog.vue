<script setup lang="ts">
import { ref } from 'vue'
import OpnameForm from './opname-form.vue'

const show = ref<boolean>(false)

function openDialog() {
  show.value = true
}

function closeDialog() {
  show.value = false
}
</script>

<template>
  <slot name="trigger" :open="openDialog" />

  <Dialog v-model:visible="show" modal header="Stock Opname">
    <OpnameForm :close-dialog="closeDialog" />
  </Dialog>
</template>
