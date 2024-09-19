import type {  RouteRecordRaw } from "vue-router";
import { dashboardRouteConstant } from "../constant";




export const dashboardWorkspaceRoute: RouteRecordRaw = {
    path: dashboardRouteConstant.workspace.path,
    name: dashboardRouteConstant.workspace.name,
    component: () => import('@/views/Dashboard/DashboardWorkspace.vue'),
    meta: {
        tab: true,
        title: '工作台',
        keepAlive: true,
        tabDisallowClose: true
    }
};