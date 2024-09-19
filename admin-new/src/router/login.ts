import type { RouteRecordRaw } from "vue-router";
import { loginRouteConstant } from "./constant";



export const loginRoute: RouteRecordRaw = {
    name: loginRouteConstant.index.name,
    path: loginRouteConstant.index.path,
    component: () => import("@/views/Login/LoginPage.vue"),
    meta: {
        title: "登录",
        menu: false,
        super: true,
        keepAlive: false
    }
};
