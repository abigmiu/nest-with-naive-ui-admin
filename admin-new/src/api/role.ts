import type { IRoleSimpleListResponse } from "@/types/api/role";
import { http } from "@/utils/http";

/** 获取角色简单列表 */
export function reqRoleSimpleList() {
    return http.request<IRoleSimpleListResponse[]>({
        url: '/api/role/simple-list',
    });
}