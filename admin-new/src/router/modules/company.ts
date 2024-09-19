import type { RouteRecordRaw } from "vue-router";
import { PERMISSIONS } from "@/utils/constant";
import { companyRouteConstant } from "../constant";


/** 公司管理 - 角色管理路由 */
export const companyRoleRoute: RouteRecordRaw = {
    path: companyRouteConstant.role.path,
    name: companyRouteConstant.role.name,
    component: () => import('@/views/Company/RolePage.vue'),
    meta: {
        tab: true,
        title: '角色管理',
        permission: PERMISSIONS.ROLE,
        keepAlive: true,
    }
};

/** 公司管理 - 职工管理路由 */
export const companyCrewRoute: RouteRecordRaw = {
    path: companyRouteConstant.crew.path,
    name: companyRouteConstant.crew.name,
    component: () => import('@/views/Company/CrewPage.vue'),
    meta: {
        tab: true,
        title: '职工管理',
        keepAlive: true,
        permission: PERMISSIONS.CREW
    }
};