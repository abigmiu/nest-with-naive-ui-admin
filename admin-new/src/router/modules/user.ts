import { mergeRoutePath } from "../util"
import { VLayout } from "../lazyRoute";
import type { RouteRecordRaw } from "vue-router";

export const userRouteConstant = {
    index: {
        path: '/user',
        name: 'user',
    },
    role: {
        path: 'auth',
        name: 'user.role'
    },
    crew: {
        path: 'crew',
        name: 'crew'
    }
}

const userRoute: RouteRecordRaw = {
    name: userRouteConstant.index.name,
    path: userRouteConstant.index.path,
    component: VLayout,
    meta: {
        title: '用户管理',
        super: true,
        menu: true,
        order: 3,
    },
    children: [
        {
            path: mergeRoutePath(userRouteConstant.index.path, userRouteConstant.role.path),
            name: userRouteConstant.role.name,
            component: () => import('@/views/Dashboard/DashboardWorkspace.vue'),
            meta: {
                tab: true,
                title: '角色管理',
            }
        },
        {
            path: mergeRoutePath(userRouteConstant.index.path, userRouteConstant.crew.path),
            name: userRouteConstant.crew.name,
            component: () => import('@/views/User/CrewPage.vue'),
            meta: {
                tab: true,
                title: '用户管理',
            }
        }
    ]
}

export default userRoute;