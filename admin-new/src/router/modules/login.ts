import type { RouteRecordRaw } from "vue-router"

export const loginRouteConstant = {
    index: {
        path: '/login',
        name: 'login',
    }
}

const loginRoute: RouteRecordRaw = {
    name: loginRouteConstant.index.name,
    path: loginRouteConstant.index.path,
    component: () => import("@/views/Login/LoginPage.vue"),
    meta: {
        title: "登录"
    }
}

export default loginRoute