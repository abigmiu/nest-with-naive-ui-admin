import type { RouteRecordRaw } from "vue-router";

/** 合并路由url路径 */
export function mergePath(...args: string[]): string {
    return args.reduce((prePath, currentPath) => `${[prePath]}/${currentPath}`,  '')
}

export function flatRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
    return [];
}