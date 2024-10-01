
import { http } from "@/utils/http";

/** 权限简单列表响应 */
export interface IPermissionSimpleListResponse {
    id: number;
    name: string;
    parentId?: number;
    type: number; // 1 是菜单， 2 是功能
}

/** 获取权限简单列表 */
export function reqPermissionSimpleList() {
    return http.request<IPermissionSimpleListResponse[]>({
        url: '/api/permission/simple-list',
    });
}