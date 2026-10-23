<script setup lang="ts">
import DeleteOperationDialog from '../components/delete-operation-dialog.vue'
import OperationFormDialog from '../components/operation-form-dialog.vue'
import OperationTable from '../components/operation-table.vue'
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
        <div class="flex flex-col gap-3 min-h-0 max-h-full">
          <div class="flex justify-between">
            <h6 class="self-center text-lg font-medium">Operation List</h6>
            <OperationFormDialog>
              <template #trigger="{ open }">
                <Button icon="icon-[tabler--plus]" label="Add New Operation" @click="open()" />
              </template>
            </OperationFormDialog>
          </div>
          <OperationTable>
            <template #actions="{ data }">
              <OperationFormDialog>
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
        </div>
      </template>
    </Card>
  </div>
</template>
