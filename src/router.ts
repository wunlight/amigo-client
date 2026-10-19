import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/login', component: () => import('@/features/auth/views/login-view.vue') },
  { path: '/', component: () => import('@/features/cashier/views/cashier-view.vue') },
  { path: '/users', component: () => import('@/features/user/views/user-manager.vue') },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
