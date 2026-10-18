import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/features/cashier/views/cashier-view.vue') },
  { path: '/users', component: () => import('@/features/user/views/user-manager.vue') },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
