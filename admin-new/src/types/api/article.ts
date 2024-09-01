import type { IArticleBase } from "@/api/article";
import { http } from "@/utils/http";

export function reqArticlePageRequest(query: Record<string, any>) {
    return http.request<IArticleBase[]>({
        url: '/api/article/page',
        params: query
    });
}