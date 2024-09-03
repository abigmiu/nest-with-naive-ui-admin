import type { RouteRecordRaw } from "vue-router";
import { mergeRoutePath, renderIcon } from "../util";
import { VLayout } from "../lazyRoute";
import { PERMISSIONS } from "@/utils/constant";
import { ArticleOutlined } from '@vicons/material';
export const contentRouteConstant = {
    index: {
        path: '/content',
        name: 'content',
    },
    article: {
        path: 'article',
        name: 'content.article'
    },
    articleCreate: {
        path: 'article-create',
        name: 'content.articleCreate'
    },
    image: {
        path: 'image',
        name: 'content.image',
    }
};

const contentRoute: RouteRecordRaw = {
    name: contentRouteConstant.index.name,
    path: contentRouteConstant.index.path,
    meta: {
        menu: true,
        title: '内容管理',
        super: true,
        order: 2,
        keepAlive: false,
        permission: PERMISSIONS.CONTENT,
        icon: renderIcon(ArticleOutlined)
    },
    component: VLayout,
    children: [
        {
            name: contentRouteConstant.article.name,
            path: mergeRoutePath(contentRouteConstant.index.path, contentRouteConstant.article.path),
            component: () => import('@/views/Content/ArticlePage.vue'),
            meta: {
                tab: true,
                title: '文章管理',
                menu: true,
                keepAlive: true,
                permission: PERMISSIONS.ARTICLE
            }
        },
        {
            name: contentRouteConstant.articleCreate.name,
            path: mergeRoutePath(contentRouteConstant.index.path, contentRouteConstant.articleCreate.path),
            component: () => import('@/views/Content/CreateArticle.vue'),
            meta: {
                tab: true,
                title: '文章创建',
                menu: false,
                keepAlive: false,
                permission: PERMISSIONS.ARTICLE_CREATE
            }
        },
        {
            name: contentRouteConstant.image.name,
            path:  mergeRoutePath(contentRouteConstant.index.path, contentRouteConstant.image.path),
            component: () => import('@/views/Content/ImagePage.vue'),
            meta: {
                tab: true,
                title: '图片管理',
                menu: true,
                keepAlive: true,
                permission: PERMISSIONS.IMAGE
            },
        
        }
    ]
};

export default contentRoute;