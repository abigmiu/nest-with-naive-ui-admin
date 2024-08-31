import type { IPermissionSimpleListResponse } from "@/types/api/permission";
import { http } from "@/utils/http";

/** 获取权限简单列表 */
export function reqPermissionSimpleList() {
    return http.request<IPermissionSimpleListResponse[]>({
        url: '/api/permission/simple-list',
    });
}