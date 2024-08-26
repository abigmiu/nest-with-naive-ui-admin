declare module "vue-router" {
    interface RouteMeta {
        permission?: string | string[]; // 权限
        order?: number; // 菜单排序
        title: string; // 路由标题 
        menu?: boolean; // 是否展示在侧边栏菜单
        tab?: boolean; // 是否展示在顶部tabsList
        super?: boolean; // 是否是一级路由
        
    }
}

export {}