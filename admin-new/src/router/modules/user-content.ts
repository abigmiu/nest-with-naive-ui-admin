import type { RouteRecordRaw } from "vue-router";
import { worksRouteConstant } from "../constant";
import { userContentRouteConstant } from "../userConstant";

export const worksVideoRoute: RouteRecordRaw = {
    path: userContentRouteConstant.createVideo.path,
    name: userContentRouteConstant.createVideo.name,
    component: () => import('@/views/Works/UploadVideo.vue'),
    meta: {
        title: '作品上传',
        tab: true,
        keepAlive: false,
    }
};

export const worksPublishRoute: RouteRecordRaw = {
    path: userContentRouteConstant.publishVideo.path,
    name: userContentRouteConstant.publishVideo.name,
    component: () => import('@/views/Works/PublishVideo.vue'),
    meta: {
        title: '作品发布',
        tab: true,
        keepAlive: false,
    }
};