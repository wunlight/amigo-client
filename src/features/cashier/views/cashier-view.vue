<script setup lang="ts">
import { ref } from 'vue'
import CartContainer from '../components/cart/cart-container.vue'
import OperationCatalog from '../components/catalog/operation-catalog.vue'
import SparepartCatalog from '../components/catalog/sparepart-catalog.vue'

const searchQuery = ref('')
</script>

<template>
  <div class="grid grid-cols-4 gap-1.5 h-full overflow-hidden">
    <Teleport defer to="#menubar-left-content">
      <InputText v-model="searchQuery" placeholder="Search..." class="w-64!" />
    </Teleport>

    <div class="col-span-3 flex flex-col gap-6 min-h-0">
      <OperationCatalog :search-query="searchQuery" class="shrink-0" />
      <SparepartCatalog :search-query="searchQuery" />
    </div>

    <CartContainer class="col-span-1" />
  </div>
</template>
