import type { RouteRecordRaw } from "vue-router";
import { systemRouteConstant } from "../constant";

export const systemGlobalSettingRoute: RouteRecordRaw = {
    path: systemRouteConstant.globalSetting.path,
    name: systemRouteConstant.globalSetting.name,
    component: () => import('@/views/System/GlobalSetting.vue'),
    meta: {
        // TODO: 权限
        // permission: 
        title: '全局设置',
        tab: true,
        keepAlive: false,
    }
};