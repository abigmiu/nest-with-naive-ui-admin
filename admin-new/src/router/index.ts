import { createRouter, createWebHistory } from 'vue-router'
import loginRoute from './modules/login';
import { VLayout } from './lazyRoute';
import dashboardRoute from './modules/dashboard';
import contentRoute from './modules/content';

// 整个文件都加载进来了， 没必要
// const modules = import.meta.glob('./modules/**/*.ts', { eager: true })

const publicRoutes = [loginRoute];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes,
  {
    path: '/test',
    component: VLayout,
  },
    dashboardRoute,
    contentRoute
  ]
})

router.beforeEach((to) => {
  const { title } = to.meta;
  if (title) {
    document.title = title;
  }
})

export default router
