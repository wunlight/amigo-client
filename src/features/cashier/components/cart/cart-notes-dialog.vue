<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '../../stores/use-cart-store'

const store = useCartStore()

const show = ref<boolean>(false)
const notes = ref<string>('')

function openDialog() {
  show.value = true
  notes.value = store.notes
}

function closeDialog() {
  show.value = false
  notes.value = ''
}

function handleSubmit() {
  store.updateNotes(notes.value)
  closeDialog()
}
</script>

<template>
  <slot name="trigger" :open="openDialog" />

  <Dialog v-model:visible="show" modal header="Transaction Notes">
    <form class="flex flex-col gap-3">
      <div class="flex flex-col gap-1">
        <label for="notes" class="text-sm">Notes</label>
        <Textarea v-model="notes" rows="4" id="notes" />
      </div>
      <Divider class="my-1.5!" />
      <div class="flex justify-end gap-3">
        <Button
          label="Cancel"
          severity="secondary"
          outlined
          class="text-sm!"
          @click="closeDialog()"
        />
        <Button label="Save" class="text-sm!" @click="handleSubmit" />
      </div>
    </form>
  </Dialog>
</template>
