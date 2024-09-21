import type { IPageQuery } from "@/types/api/base";
import { http } from "@/utils/http";

export type INotifyPageQuery = IPageQuery;

export interface INotifyBase {
    title: string;
    content: string;
    id: number;
}

export type INotifyCreateRequest = INotifyBase;

/** 通知分页 */
export function reqNotifyPage(query: INotifyPageQuery) {
    return http.request<INotifyBase[]>({
        url: '/api/notify/page',
        params: query
    });
}

/** 获取已发布通知 */
export function reqPublishNotify() {
    return http.request<INotifyBase[]>({
        url: '/api/notify/published'
    });
}

/** 新增通知 */
export function reqCreateNotify(data: INotifyCreateRequest) {
    return http.request<INotifyBase>({
        url: '/api/notify/create',
        method: 'POST',
        data,
    });
}