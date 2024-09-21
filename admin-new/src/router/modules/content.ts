import type { RouteRecordRaw } from "vue-router";
import { mergeRoutePath } from "../util";
import { PERMISSIONS } from "@/utils/constant";
import { contentRouteConstant } from "../constant";


/** 内容管理 - 文章管理路由 */
export const contentArticleRoute: RouteRecordRaw = {
    name: contentRouteConstant.article.name,
    path: contentRouteConstant.article.path,
    component: () => import('@/views/Content/ArticlePage.vue'),
    meta: {
        tab: true,
        title: '文章管理',
        menu: true,
        keepAlive: true,
        permission: PERMISSIONS.ARTICLE
    }
};

/** 内容管理 - 创建管理路由 */
export const contentCreateArticleRoute: RouteRecordRaw = {
    name: contentRouteConstant.articleCreate.name,
    path: contentRouteConstant.articleCreate.path,
    component: () => import('@/views/Content/CreateArticle.vue'),
    meta: {
        tab: true,
        title: '文章创建',
        menu: true,
        keepAlive: false,
        permission: PERMISSIONS.ARTICLE_CREATE
    }
};

/** 内容管理 - 图片管理路由 */
export const contentImageRoute: RouteRecordRaw = {
    name: contentRouteConstant.image.name,
    path: contentRouteConstant.image.path,
    component: () => import('@/views/Content/ImagePage.vue'),
    meta: {
        tab: true,
        title: '图片管理',
        menu: true,
        keepAlive: true,
        permission: PERMISSIONS.IMAGE
    },
};

/** 内容管理 - 创建管理路由 */
export const contentCreateImageRoute: RouteRecordRaw = {
    name: contentRouteConstant.imageCreate.name,
    path: contentRouteConstant.imageCreate.path,
    component: () => import('@/views/Content/CreateImage.vue'),
    meta: {
        tab: true,
        title: '图片创建',
        menu: true,
        keepAlive: false,
        permission: PERMISSIONS.IMAGE_CREATE
    }
};