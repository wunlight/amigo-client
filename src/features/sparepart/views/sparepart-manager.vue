<script setup lang="ts">
import MenuBar from '@/components/menu-bar.vue'
import { onMounted } from 'vue'
import DeleteSparepartDialog from '../components/delete-sparepart-dialog.vue'
import SparepartFormDialog from '../components/sparepart-form-dialog.vue'
import { useSparepartStore } from '../stores/use-sparepart-store.ts'

const store = useSparepartStore()

onMounted(() => {
  store.fetchSpareparts()
})
</script>

<template>
  <div class="flex flex-col gap-3 p-1.5 h-svh bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
    <MenuBar />

    <Card class="border border-zinc-300 dark:border-zinc-700">
      <template #content>
        <div class="flex flex-col gap-3">
          <div class="flex justify-between">
            <h6 class="self-center text-lg font-medium">Sparepart List</h6>
            <SparepartFormDialog>
              <template #trigger="{ open }">
                <Button
                  icon="icon-[tabler--plus] text-base!"
                  label="Add New Sparepart"
                  class="text-sm!"
                  @click="open()"
                />
              </template>
            </SparepartFormDialog>
          </div>
          <DataTable
            :value="store.sparepartList"
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
            <Column field="stock" header="Stock">
              <template #body="{ data }">
                <p>{{ data.stock }}</p>
              </template>
            </Column>
            <Column>
              <template #body="{ data }">
                <div class="flex justify-end gap-3">
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
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
