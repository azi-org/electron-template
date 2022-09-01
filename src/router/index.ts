import {
  type Router,
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/404',
    component: () => import('@/pages/notfound/index.vue'),
    meta: {
      title: '访问的页面找不到',
    },
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/pages/notfound/index.vue'),
    meta: {
      title: '访问的页面找不到',
    },
  },
]

const router: Router = createRouter({
  routes,
  history: createWebHashHistory(),
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | electron-template`
  }
  next()
})

export default router
