<script setup lang="ts">
import DeleteSparepartDialog from '../components/delete-sparepart-dialog.vue'
import SparepartFormDialog from '../components/sparepart-form-dialog.vue'
import SparepartTable from '../components/sparepart-table.vue'
import { useSparepartStore } from '../stores/use-sparepart-store.ts'

const store = useSparepartStore()
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
        <SparepartTable title="Sparepart Manager">
          <template #table-actions>
            <SparepartFormDialog :refetch="store.fetchSpareparts">
              <template #trigger="{ open }">
                <Button icon="icon-[tabler--plus]" label="Add New Sparepart" @click="open()" />
              </template>
            </SparepartFormDialog>
          </template>
          <template #actions="{ data }">
            <SparepartFormDialog :refetch="store.fetchSpareparts">
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
      </template>
    </Card>
  </div>
</template>
