import type { RouteRecord, RouteRecordRaw } from "vue-router";
import { mergeRoutePath, renderIcon } from "../util";
import { VLayout } from "../lazyRoute";
import { DashboardOutlined } from '@vicons/antd';

export const dashboardRouteConstant = {
    index: {
        path: '/dashboard',
        name: 'dashboard',
    },
    workspace: {
        path: 'workspace',
        name: 'dashboard.workspace'
    }
};

const dashboardRoute: RouteRecordRaw = {
    name: dashboardRouteConstant.index.name,
    path: dashboardRouteConstant.index.path,
    component: VLayout,
    meta: {
        title: '控制台',
        super: true,
        menu: true,
        order: 1,
        keepAlive: false,
        icon: renderIcon(DashboardOutlined)
    },
    children: [
        {
            path: mergeRoutePath(dashboardRouteConstant.index.path, dashboardRouteConstant.workspace.path),
            name: dashboardRouteConstant.workspace.name,
            component: () => import('@/views/Dashboard/DashboardWorkspace.vue'),
            meta: {
                tab: true,
                title: '工作台',
                keepAlive: true,
            }
        }
    ]
};

export default dashboardRoute;