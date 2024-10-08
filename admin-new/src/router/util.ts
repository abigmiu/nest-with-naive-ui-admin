import { NIcon } from "naive-ui";
import { h, type Component } from "vue";
import type { RouteRecordRaw } from "vue-router";

/** 合并路由url路径 */
export function mergeRoutePath(...paths: string[]): string {
    return paths.reduce((prePath, currentPath) => {
        if (currentPath.startsWith('/')) {
            currentPath = currentPath.slice(1);
        }
        return `${prePath}/${currentPath}`;
    },  '');
}

export function flatRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
    return [];
}

export function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) });
}