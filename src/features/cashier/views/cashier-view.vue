<script setup lang="ts">
import { onMounted } from 'vue'
import CartContainer from '../components/cart/cart-container.vue'
import OperationCatalog from '../components/catalog/operation-catalog.vue'
import SparepartCatalog from '../components/catalog/sparepart-catalog.vue'
import { useCatalogStore } from '../stores/use-catalog-store'

const catalogStore = useCatalogStore()

onMounted(() => {
  catalogStore.addToQueue({ itemType: 'operation', page: 1 })
  catalogStore.addToQueue({ itemType: 'sparepart', page: 1 })
  catalogStore.processQueue()
})
</script>

<template>
  <div class="grid grid-cols-4 gap-1.5 h-full overflow-hidden">
    <Teleport defer to="#menubar-left-content">
      <InputText v-model="catalogStore.searchQuery" placeholder="Search..." class="w-64!" />
    </Teleport>

    <div class="col-span-3 flex flex-col gap-6 min-h-0">
      <OperationCatalog class="shrink-0" />
      <SparepartCatalog />
    </div>

    <CartContainer class="col-span-1" />
  </div>
</template>
