import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { VLayout } from './lazyRoute';
import { useUserStoreWithout } from '@/stores/userStore';
import { message } from '@/utils/global';
import { useAliveStoreWithout } from '@/stores/aliveStore';
import { dashboardRouteConstant, loginRouteConstant } from './constant';
import { loginRoute } from './login';

const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
const allRoutes: RouteRecordRaw[] = Object.values(modules)
  .flatMap((routeModule) => Object.values(routeModule as Record<string, RouteRecordRaw>));
console.log("🚀 ~ allRoutes:", allRoutes);



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    loginRoute,
    {
      path: '/',
      component: VLayout,
      children: allRoutes,
      redirect: {
        name: dashboardRouteConstant.workspace.name
      }
    },
  ]
});

router.beforeEach((to) => {
  const { title, permission, keepAlive, isPublic } = to.meta;
  if (title) {
    document.title = title;
  }
  const userStore = useUserStoreWithout();
  // 是否登录
  if (permission || !isPublic) {
    if (!userStore.userInfo) {
      message.info('请先登录');
      return { name: loginRouteConstant.index.name };
    }
  }
  // 权限
  if (permission) {
    if (!userStore.hasMenuPermissions(permission)) {
      message.info('没有权限');
      return false;
    }
  }
  // keepAlive
  if (keepAlive) {
    const keepAliveStore = useAliveStoreWithout();
    const matchedCmp = to.matched.find((matched) => matched.name === to.name);
    const cmpName = matchedCmp?.name;
    if (cmpName) {
      keepAliveStore.setKeepCmp(cmpName as string, true);
    }
  }
});

export default router;
