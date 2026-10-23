<script setup lang="ts">
import RefundSaleDialog from '../components/refund-sale-dialog.vue'
import SaleTable from '../components/sale-table.vue'
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
            <h6 class="self-center text-lg font-medium">Sales List</h6>
          </div>
          <SaleTable>
            <template #actions="{ data }">
              <RefundSaleDialog>
                <template #trigger="{ open }">
                  <Button
                    icon="icon-[tabler--arrow-back]"
                    severity="danger"
                    outlined
                    rounded
                    :disabled="data.status === 'refunded'"
                    @click="open(data.id)"
                    v-tooltip.top="data.status === 'refunded' ? 'Already refunded' : 'Refund'"
                  />
                </template>
              </RefundSaleDialog>
            </template>
          </SaleTable>
        </div>
      </template>
    </Card>
  </div>
</template>
