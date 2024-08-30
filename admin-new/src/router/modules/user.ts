import { mergeRoutePath } from "../util";
import { VLayout } from "../lazyRoute";
import type { RouteRecordRaw } from "vue-router";

export const companyRouteConstant = {
    index: {
        path: '/company',
        name: 'company',
    },
    role: {
        path: 'auth',
        name: 'company.role'
    },
    crew: {
        path: 'crew',
        name: 'company.crew'
    }
};

const companyRoute: RouteRecordRaw = {
    name: companyRouteConstant.index.name,
    path: companyRouteConstant.index.path,
    component: VLayout,
    meta: {
        title: '公司管理',
        super: true,
        menu: true,
        order: 3,
    },
    children: [
        {
            path: mergeRoutePath(companyRouteConstant.index.path, companyRouteConstant.role.path),
            name: companyRouteConstant.role.name,
            component: () => import('@/views/Dashboard/DashboardWorkspace.vue'),
            meta: {
                tab: true,
                title: '角色管理',
            }
        },
        {
            path: mergeRoutePath(companyRouteConstant.index.path, companyRouteConstant.crew.path),
            name: companyRouteConstant.crew.name,
            component: () => import('@/views/Company/CrewPage.vue'),
            meta: {
                tab: true,
                title: '用户管理',
            }
        }
    ]
};

export default companyRoute;