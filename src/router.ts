import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{ path: '/', component: () => import('@/features/cashier/views/cashier-view.vue') }]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
