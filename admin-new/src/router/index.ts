import { createRouter, createWebHistory } from 'vue-router';
import loginRoute, { loginRouteConstant } from './modules/login';
import { VLayout } from './lazyRoute';
import dashboardRoute from './modules/dashboard';
import contentRoute from './modules/content';
import companyRoute from './modules/company';
import { useUserStoreWithout } from '@/stores/userStore';
import { message } from '@/utils/global';
import { useAliveStoreWithout } from '@/stores/aliveStore';

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
  console.log(to);
  const { title, permission, keepAlive } = to.meta;
  console.log("🚀 ~ router.beforeEach ~ keepAlive:", keepAlive);
  if (title) {
    document.title = title;
  }
  // 权限
  if (permission) {
    const userStore = useUserStoreWithout();
    if (!userStore.userInfo) {
      message.info('请先登录');
      return { name: loginRouteConstant.index.name };
    }
  }
  // keepAlive
  if (keepAlive) {
    const keepAliveStore = useAliveStoreWithout();
    const matchedCmp = to.matched.find((matched) => matched.name === to.name);
    const cmpName = matchedCmp?.name;
    console.log("🚀 ~ router.beforeEach ~ cmpName:", cmpName);
    if (cmpName) {
      keepAliveStore.setKeepCmp(cmpName as string, true);
    }
  }
});

export default router;
