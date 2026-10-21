import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from './features/auth/stores/use-auth-store'

const routes = [
  { path: '/login', component: () => import('@/features/auth/views/login-view.vue') },
  {
    path: '/',
    component: () => import('@/features/cashier/views/cashier-view.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/stock-manager',
    component: () => import('@/features/stock/views/stock-manager.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/spareparts',
    component: () => import('@/features/sparepart/views/sparepart-manager.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/operations',
    component: () => import('@/features/operation/views/operation-manager.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/users',
    component: () => import('@/features/user/views/user-manager.vue'),
    meta: {
      protected: true,
    },
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  const isProtected = to.matched.some((record) => record.meta.protected)

  if (!authStore.auth) {
    await authStore.loadAuth()
  }

  if (isProtected) {
    if (!authStore.auth) {
      return next({ path: '/login' })
    }
  } else {
    if (authStore.auth && to.path === '/login') {
      return next({ path: '/' })
    }
  }

  next()
})
