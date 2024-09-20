import type { RouteRecordRaw } from "vue-router";
import { userRouteConstant } from "../constant";

export const userRoute: RouteRecordRaw = {
    path: userRouteConstant.index.path,
    name: userRouteConstant.index.name,
    component: () => import('@/views/User/User.vue'),
    meta: {
        tab: true,
        title: '个人资料',
        keepAlive: false,
    }
};

