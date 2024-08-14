import type { RouteRecordRaw } from "vue-router";

export interface IRouteModule {
    default: RouteRecordRaw | RouteRecordRaw[]
}