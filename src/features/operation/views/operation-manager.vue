<script setup lang="ts">
import DeleteOperationDialog from '../components/delete-operation-dialog.vue'
import OperationFormDialog from '../components/operation-form-dialog.vue'
import OperationTable from '../components/operation-table.vue'
import { useOperationStore } from '../stores/use-operation-store.ts'

const store = useOperationStore()
</script>

<template>
  <div class="flex flex-col gap-3 min-h-0">
    <Card
      :pt="{
        root: 'min-h-0 border border-zinc-300 dark:border-zinc-700 overflow-hidden',
        body: 'min-h-0 p-4.5!',
        content: 'min-h-0',
      }"
    >
      <template #content>
        <OperationTable title="Operation List">
          <template #table-actions>
            <OperationFormDialog :refetch="store.fetchOperations">
              <template #trigger="{ open }">
                <Button icon="icon-[tabler--plus]" label="Add New Operation" @click="open()" />
              </template>
            </OperationFormDialog>
          </template>
          <template #actions="{ data }">
            <OperationFormDialog :refetch="store.fetchOperations">
              <template #trigger="{ open }">
                <Button
                  icon="icon-[tabler--pencil]"
                  severity="info"
                  outlined
                  rounded
                  @click="open(data.id)"
                />
              </template>
            </OperationFormDialog>
            <DeleteOperationDialog>
              <template #trigger="{ open }">
                <Button
                  icon="icon-[tabler--trash]"
                  severity="danger"
                  outlined
                  rounded
                  @click="open(data.id)"
                />
              </template>
            </DeleteOperationDialog>
          </template>
        </OperationTable>
      </template>
    </Card>
  </div>
</template>
