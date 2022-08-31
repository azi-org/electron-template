import {
  type Router,
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/:W+',
    component: () => import('@/pages/notfound/index.vue'),
    meta: {
      title: '访问的页面找不到',
    },
  },
]

const router: Router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach((to, from, next) => {
  NProgress.set(0.2)
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
