<script setup lang="ts">
import MenuBar from '@/components/menu-bar.vue'
import { onMounted } from 'vue'
import DeleteOperationDialog from '../components/delete-operation-dialog.vue'
import OperationFormDialog from '../components/operation-form-dialog.vue'
import { useOperationStore } from '../stores/use-operation-store.ts'

const store = useOperationStore()

onMounted(() => {
  store.fetchOperations()
})
</script>

<template>
  <div class="flex flex-col gap-3 p-1.5 h-svh bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
    <MenuBar />

    <Card class="border border-zinc-300 dark:border-zinc-700">
      <template #content>
        <div class="flex flex-col gap-3">
          <div class="flex justify-between">
            <h6 class="self-center text-lg font-medium">Operation List</h6>
            <OperationFormDialog>
              <template #trigger="{ open }">
                <Button
                  icon="icon-[tabler--plus] text-base!"
                  label="Add New Operation"
                  class="text-sm!"
                  @click="open()"
                />
              </template>
            </OperationFormDialog>
          </div>
          <DataTable
            :value="store.operationList"
            scrollable
            scroll-height="flex"
            :loading="store.isLoading"
            class="min-h-0 max-h-full text-sm!"
          >
            <template #empty>
              <p class="py-3 text-center">
                {{ store.isLoading ? 'Loading...' : 'No Data Found!' }}
              </p>
            </template>

            <Column field="name" header="Name" />
            <Column field="selling_price" header="Price">
              <template #body="{ data }">
                <p>{{ data.selling_price.toLocaleString('en-US') }}</p>
              </template>
            </Column>
            <Column>
              <template #body="{ data }">
                <div class="flex justify-end gap-3">
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
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
