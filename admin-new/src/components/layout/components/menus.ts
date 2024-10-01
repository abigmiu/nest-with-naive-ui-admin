import { companyCrewRoute, companyRoleRoute } from "@/router/modules/company";
import { renderIcon } from "@/router/util";
import ManageAccountsOutlined from "@vicons/material/es/ManageAccountsOutlined";
import type { MenuOption } from "naive-ui";
import {  dashboardWorkspaceRoute } from "@/router/modules/dashboard";
import { DashboardOutlined, SettingOutlined } from "@vicons/antd";
import { contentArticleRoute, contentImageRoute } from "@/router/modules/content";

import { ArticleOutlined } from '@vicons/material';
import { dashboardRouteConstant, companyRouteConstant, contentRouteConstant, systemRouteConstant } from "@/router/constant";

export type IMenuMeta = {
    routeName: string;
    permission?: string | string[];
}

export type ILayoutMenuOptions = Array<MenuOption & {
    meta?: IMenuMeta
}>

const dashboardMenus: ILayoutMenuOptions = [
    {
        label: '控制台',
        icon: renderIcon(DashboardOutlined),
        key: dashboardRouteConstant.index.name,
        children: [
            {
                label: '工作台',
                key: dashboardRouteConstant.workspace.name,
                meta: {
                    routeName: dashboardRouteConstant.workspace.name,
                    permission: dashboardWorkspaceRoute.meta?.permission,
                } as IMenuMeta,
            },
            {
                label: '数据平台',
                key: dashboardRouteConstant.dataTable.name,
                meta: {
                    routeName: dashboardRouteConstant.dataTable.name,
                } as IMenuMeta
            },
            {
                label: '工作看板'
            }
        ]

    },
];

const companyMenus: ILayoutMenuOptions = [

    {
        label: '公司管理',
        icon: renderIcon(ManageAccountsOutlined),
        key: companyRouteConstant.index.name,
        children: [
            {
                label: '角色管理',
                meta: {
                    routeName: companyRouteConstant.role.name,
                    permission: companyRoleRoute.meta?.permission
                } as IMenuMeta,
                key: companyRouteConstant.role.name,
            },
            {
                label: '用户管理',
                meta: {
                    routeName: companyRouteConstant.crew.name,
                    permission: companyCrewRoute.meta?.permission,
                } as IMenuMeta,
                key: companyRouteConstant.crew.name
            }
        ]
    }
];

const contentMenus: ILayoutMenuOptions = [
    {
        label: '内容管理',
        key: contentRouteConstant.index.name,
        icon: renderIcon(ArticleOutlined),
        children: [
            {
                label: '文章管理',
                key: contentRouteConstant.article.name,
                meta: {
                    routeName: contentRouteConstant.article.name,
                    permission: contentArticleRoute.meta?.permission
                } as IMenuMeta,
            },
            {
                label: '图片管理',
                key: contentRouteConstant.image.name,
                meta: {
                    routeName: contentRouteConstant.image.name,
                    permission: contentImageRoute.meta?.permission
                } as IMenuMeta
            },
            {
                label: '通知管理',
                key: contentRouteConstant.notify.name,
                meta: {
                    routeName: contentRouteConstant.notify.name,
                    // TODO: 权限
                    // permission: 
                } as IMenuMeta,
            }

        ]
    }
];

const systemMenus: ILayoutMenuOptions = [
    {
        label: '系统设置',
        key: systemRouteConstant.index.name,
        icon: renderIcon(SettingOutlined),
        children: [
            {
                label: '全局设置',
                key: systemRouteConstant.globalSetting.name,
                meta: {
                    routeName: systemRouteConstant.globalSetting.name,
                    // TODO: 权限
                } as IMenuMeta,
            }
        ]
    }
];

const sellMenus: ILayoutMenuOptions = [
    {
        label: '销售管理',
        children: [
            {
                label: '商品管理'
            },
            {
                label: '订单管理'
            },
            {
                label: '评价管理'
            }
        ]
    }   
];

export const layoutMenus: ILayoutMenuOptions = [
    ...dashboardMenus,
    ...companyMenus,
    ...contentMenus,
    ...systemMenus
];