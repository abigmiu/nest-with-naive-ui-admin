import type { dateStr } from "@/util";
import { http } from "@/utils/http";

export interface IArticleBase {
    title: string;
    content: string;
    id: number;
    createdAt: dateStr;
    updatedAt: dateStr;
}

export function reqArticleRequest(data: any) {
    return http.request({
        url: '/api/article/create',
        method: 'POST',
        data,
    });
}