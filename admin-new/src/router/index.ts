import { createRouter, createWebHistory } from 'vue-router';
import loginRoute, { loginRouteConstant } from './modules/login';
import { VLayout } from './lazyRoute';
import dashboardRoute from './modules/dashboard';
import contentRoute from './modules/content';
import companyRoute from './modules/company';
import { useUserStoreWithout } from '@/stores/userStore';
import { message } from '@/utils/global';

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
    {
      path: '/',
      redirect: {
        name: 'dashboard.workspace'
      }
    },
    ...publicRoutes,
    ...authRoutes.sort((a, b) => a.meta!.order! - b.meta!.order!)
  ]
});

router.beforeEach((to) => {
  const { title, permission } = to.meta;
  if (title) {
    document.title = title;
  }
  if (permission) {
    const userStore = useUserStoreWithout();
    if (!userStore.userInfo) {
      message.info('请先登录');
      return { name: loginRouteConstant.index.name };
    }
  }
});

export default router;
