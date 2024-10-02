import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import routes from './routes'
import { useBaseStore, useBaseStoreOutside } from '@/store/pinia'
import { IS_SUB_DOMAIN } from '@/config'

const router = createRouter({
  history: IS_SUB_DOMAIN ? createWebHashHistory() : createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log('savedPosition', savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

let position = 0;
router.beforeEach((to, from) => {
  console.log('beforeEach')
  const baseStore = useBaseStoreOutside()
  const isBack = position > window.history.state.position;
  console.log("🚀 ~ router.beforeEach ~ isBack:", isBack);
  baseStore.isRouteBack = isBack;

  const transitionMeta = isBack ? from.meta : to.meta;
  console.log("🚀 ~ router.beforeEach ~ transitionMeta:", transitionMeta);
  const { customTransition, enterTransition, leaveTransition } = transitionMeta;

  baseStore.useCustomTransition = !!customTransition;
  baseStore.transitionName = baseStore.useCustomTransition 
    ? (isBack ? leaveTransition : enterTransition) as string 
    : '';
  
  //footer下面的5个按钮，对跳不要用动画
  const noAnimation = ['/', '/home', '/me', '/shop', '/message', '/publish', '/home/live', '/test']
  if (noAnimation.indexOf(from.path) !== -1 && noAnimation.indexOf(to.path) !== -1) {
    return true
  }

  const toDepth = routes.findIndex((v) => v.path === to.path)
  const fromDepth = routes.findIndex((v) => v.path === from.path)
  // const fromDepth = routeDeep.indexOf(from.path)

  if (toDepth > fromDepth) {
    if (to.matched && to.matched.length) {
      const toComponentName = to.matched[0].components?.default.name
      baseStore.updateExcludeNames({ type: 'remove', value: toComponentName })
      // console.log('前进')
      // console.log('删除', toComponentName)
    }
  } else {
    if (from.matched && from.matched.length) {
      const fromComponentName = from.matched[0].components?.default.name
      baseStore.updateExcludeNames({ type: 'add', value: fromComponentName })

      // console.log('后退')
      // console.log('添加', fromComponentName)
    }
  }
  return true
})
router.afterEach(() => {
  position = window.history.state.position;
})

export default router
