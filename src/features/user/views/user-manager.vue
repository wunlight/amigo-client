<script setup lang="ts">
import DeleteUserDialog from '../components/delete-user-dialog.vue'
import UserFormDialog from '../components/user-form-dialog.vue'
import UserTable from '../components/user-table.vue'
</script>

<template>
  <div class="flex flex-col gap-3">
    <Card
      :pt="{
        root: 'min-h-0 border border-zinc-300 dark:border-zinc-700 overflow-hidden',
        body: 'min-h-0 p-4.5!',
        content: 'min-h-0',
      }"
    >
      <template #content>
        <UserTable title="User List">
          <template #table-actions>
            <UserFormDialog>
              <template #trigger="{ open }">
                <Button icon="icon-[tabler--plus]" label="Add New User" @click="open()" />
              </template>
            </UserFormDialog>
          </template>
          <template #actions="{ data }">
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
          </template>
        </UserTable>
      </template>
    </Card>
  </div>
</template>
