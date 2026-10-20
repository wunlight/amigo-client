<script setup lang="ts">
import MenuBar from '@/components/menu-bar.vue'
import { ref } from 'vue'
import CartContainer from '../components/cart/cart-container.vue'
import OperationCatalog from '../components/catalog/operation-catalog.vue'
import SparepartCatalog from '../components/catalog/sparepart-catalog.vue'

const searchQuery = ref('')
</script>

<template>
  <div class="grid grid-cols-4 gap-1.5 p-1.5 h-svh bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
    <div class="col-span-3 flex flex-col gap-3 min-h-0">
      <MenuBar class="shrink-0">
        <template #left-content>
          <InputText v-model="searchQuery" placeholder="Search..." class="w-64!" />
        </template>
      </MenuBar>
      <OperationCatalog :search-query="searchQuery" class="shrink-0" />
      <SparepartCatalog :search-query="searchQuery" />
    </div>

    <CartContainer class="col-span-1" />
  </div>
</template>
