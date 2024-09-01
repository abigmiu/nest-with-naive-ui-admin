import type { RouteRecordRaw } from "vue-router";
import { mergeRoutePath } from "../util";
import { VLayout } from "../lazyRoute";

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
            },
        
        }
    ]
};

export default contentRoute;