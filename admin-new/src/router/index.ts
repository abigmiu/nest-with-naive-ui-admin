import { createRouter, createWebHistory } from 'vue-router';
import loginRoute from './modules/login';
import { VLayout } from './lazyRoute';
import dashboardRoute from './modules/dashboard';
import contentRoute from './modules/content';
import companyRoute from './modules/user';

// 整个文件都加载进来了， 没必要
// const modules = import.meta.glob('./modules/**/*.ts', { eager: true })

const publicRoutes = [loginRoute];

const authRoutes = [
  dashboardRoute,
  contentRoute,
  companyRoute
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...publicRoutes,
    ...authRoutes.sort((a, b) => a.meta!.order! - b.meta!.order!)
  ]
});

router.beforeEach((to) => {
  const { title } = to.meta;
  if (title) {
    document.title = title;
  }
});

export default router;
