import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { path: '/home' },
  },
  {
    path: '/home',
    component: () => import('@/pages/home/index.vue'),
  },
  {
    path: '/404',
    component: () => import('@/pages/notfound/index.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/pages/notfound/index.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router
