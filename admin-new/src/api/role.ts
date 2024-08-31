import { type IRoleCreateRequest, type IRoleEditRequest, type IRoleListQueryRequest, type IRoleListResponse, type IRoleSimpleListResponse } from "@/types/api/role";
import { http } from "@/utils/http";

/** 获取角色简单列表 */
export function reqRoleSimpleList() {
    return http.request<IRoleSimpleListResponse[]>({
        url: '/api/role/simple-list',
    });
}

/** 获取角色列表 */
export function reqRoleList(query: IRoleListQueryRequest) {
    return http.request<IRoleListResponse[]>({
        url: '/api/role/list',
        params: query
    });
}

/** 角色新增请求 */
export function reqRoleCreate(data: IRoleCreateRequest) {
    return http.request<IRoleCreateRequest>({
        url: '/api/role',
        method: 'POST',
        data,
    });
}

/** 角色编辑请求 */
export function reqRoleEdit(data: IRoleEditRequest) {
    return http.request({
        url: '/api/role/edit',
        method: 'POST',
        data,
    });
}

/** 获取单个角色信息 */
export function reqRoleInfo(roleId: number) {
    return http.request({
        url: '/api/role/info',
        params: {
            roleId,
        }
    });
}