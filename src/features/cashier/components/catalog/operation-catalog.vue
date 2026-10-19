<script setup lang="ts">
import ScrollContainer from '@/components/scroll-container.vue'
import OperationFormDialog from '@/features/operation/components/operation-form-dialog.vue'
import { useOperationStore } from '@/features/operation/stores/use-operation-store.ts'
import { onMounted } from 'vue'
import OperationItem from './operation-item.vue'

const store = useOperationStore()

onMounted(() => {
  store.fetchOperations()
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      class="flex items-center justify-between pb-3 border-b border-zinc-300 dark:border-zinc-700"
    >
      <h6 class="px-3 font-semibold text-xl">Operations</h6>
      <OperationFormDialog>
        <template #trigger="{ open }">
          <Button
            icon="icon-[tabler--plus]"
            label="Add New Operation"
            outlined
            :pt="{ label: 'text-sm!' }"
            @click="open()" /></template
      ></OperationFormDialog>
    </div>
    <ScrollContainer
      v-if="store.operationList.length > 0"
      direction="horizontal"
      content-class="gap-3"
    >
      <OperationItem v-for="item in store.operationList" :key="item.id" :data="item" />
    </ScrollContainer>
    <div v-else class="flex flex-col items-center justify-center gap-1.5 h-19 text-zinc-500">
      <span class="icon-[tabler--clipboard-off] size-9" />
      <p class="text-sm">
        {{ store.isLoading ? 'Loading...' : 'No Data Found!' }}
      </p>
    </div>
  </div>
</template>
