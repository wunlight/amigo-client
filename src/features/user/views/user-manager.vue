<script setup lang="ts">
import MenuBar from '@/components/menu-bar.vue'
import { onMounted } from 'vue'
import DeleteUserDialog from '../components/delete-user-dialog.vue'
import UserFormDialog from '../components/user-form-dialog.vue'
import { useUserStore } from '../stores/use-user-store.ts'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<template>
  <div class="flex flex-col gap-3 p-1.5 h-svh bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
    <MenuBar />

    <Card class="border border-zinc-300 dark:border-zinc-700">
      <template #content>
        <div class="flex flex-col gap-3">
          <div class="flex justify-between">
            <h6 class="self-center text-lg font-medium">User List</h6>
            <UserFormDialog>
              <template #trigger="{ open }">
                <Button
                  icon="icon-[tabler--plus] text-base!"
                  label="Add New User"
                  class="text-sm!"
                  @click="open()"
                />
              </template>
            </UserFormDialog>
          </div>
          <DataTable
            :value="userStore.userList"
            scrollable
            scroll-height="flex"
            :loading="userStore.isLoading"
            class="min-h-0 max-h-full text-sm!"
          >
            <template #empty>
              <p class="py-3 text-center">
                {{ userStore.isLoading ? 'Loading...' : 'No Data Found!' }}
              </p>
            </template>

            <Column field="name" header="Name" />
            <Column>
              <template #body="{ data }">
                <div class="flex justify-end gap-3">
                  <UserFormDialog>
                    <template #trigger="{ open }">
                      <Button
                        icon="icon-[tabler--pencil]"
                        severity="info"
                        outlined
                        rounded
                        @click="open(data.id)"
                      />
                    </template>
                  </UserFormDialog>
                  <DeleteUserDialog>
                    <template #trigger="{ open }">
                      <Button
                        icon="icon-[tabler--trash]"
                        severity="danger"
                        outlined
                        rounded
                        @click="open(data.id)"
                      />
                    </template>
                  </DeleteUserDialog>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>
