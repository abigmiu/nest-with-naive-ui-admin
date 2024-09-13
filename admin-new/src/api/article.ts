import type { IPageQuery } from "@/types/api/base";
import type { dateStr } from "@/util";
import { http } from "@/utils/http";

/** 文章响应基本字段 */
export interface IArticleApiBase {
    title: string;
    content: string;
    id: number;
    createdAt: dateStr;
    updatedAt: dateStr;
}

/** 文章创建 */
export type IHttpArticleCreateReq = Pick<IArticleApiBase, 'title' | 'content'>;

/** 文章分页查询 */
export type IHttpArticlePageQuery = IPageQuery & Pick<IArticleApiBase, 'title' | 'content'>;

/** 文章创建 */
export function httpArticleCreateReq(data: IHttpArticleCreateReq) {
    return http.request({
        url: '/api/article/create',
        method: 'POST',
        data,
    });
}

/** 文章分页查询 */
export function httpArticlePageQueryReq(query: IHttpArticlePageQuery) {
    return http.request<IArticleApiBase[]>({
        url: '/api/article/page',
        params: query
    });
}