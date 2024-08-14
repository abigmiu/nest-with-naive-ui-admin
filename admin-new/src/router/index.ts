import { createRouter, createWebHistory } from 'vue-router'
import loginRoute from './modules/login';

// 整个文件都加载进来了， 没必要
// const modules = import.meta.glob('./modules/**/*.ts', { eager: true })

const publicRoutes = [loginRoute];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes]
})

router.beforeEach((to) => {
  const { title } = to.meta;
  if (title) {
    document.title = title;
  }
})

export default router
