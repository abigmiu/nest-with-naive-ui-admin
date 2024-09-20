import type { VNode, VNodeChild } from "vue";

declare module "vue-router" {
    interface RouteMeta {
        isPublic?: boolean; // 是否是开放路由
        permission?: string | string[]; // 权限
        order?: number; // 菜单排序
        title: string; // 路由标题 
        menu?: boolean; // 是否展示在侧边栏菜单
        tab?: boolean; // 是否展示在顶部tabsList
        super?: boolean; // 是否是一级路由
        keepAlive: boolean; // 是否缓存
        icon?: () => VNode; 
        tabDisallowClose?: boolean; // 是否不可关闭标签页
    }
}

export { };