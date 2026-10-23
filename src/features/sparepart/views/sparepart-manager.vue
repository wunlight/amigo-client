<script setup lang="ts">
import DeleteSparepartDialog from '../components/delete-sparepart-dialog.vue'
import SparepartFormDialog from '../components/sparepart-form-dialog.vue'
import SparepartTable from '../components/sparepart-table.vue'
</script>

<template>
  <div class="flex flex-col gap-3">
    <Card class="border border-zinc-300 dark:border-zinc-700">
      <template #content>
        <div class="flex flex-col gap-3">
          <div class="flex justify-between">
            <h6 class="self-center text-lg font-medium">Sparepart Manager</h6>
            <SparepartFormDialog>
              <template #trigger="{ open }">
                <Button icon="icon-[tabler--plus]" label="Add New Sparepart" @click="open()" />
              </template>
            </SparepartFormDialog>
          </div>
          <SparepartTable>
            <template #actions="{ data }">
              <SparepartFormDialog>
                <template #trigger="{ open }">
                  <Button
                    icon="icon-[tabler--pencil]"
                    severity="info"
                    outlined
                    rounded
                    @click="open(data.id)"
                  />
                </template>
              </SparepartFormDialog>
              <DeleteSparepartDialog>
                <template #trigger="{ open }">
                  <Button
                    icon="icon-[tabler--trash]"
                    severity="danger"
                    outlined
                    rounded
                    @click="open(data.id)"
                  />
                </template>
              </DeleteSparepartDialog>
            </template>
          </SparepartTable>
        </div>
      </template>
    </Card>
  </div>
</template>
