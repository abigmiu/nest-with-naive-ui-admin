import { http } from "@/utils/http";


export interface IRole {
    id: number
    name: string
}

export interface IRoleSimpleListResponse  {
    id: number
    name: string
}

/** 角色列表响应 */
export interface IRoleListResponse extends IRole {
    createdAt: string
    updatedAt: string
}

/** 获取角色列表请求 */
export interface IRoleListQueryRequest extends Partial<IRole> {

}

/** 角色新增请求 */
export interface IRoleCreateRequest {
    name: string;
    remark?: string;
    permissionIds: number[];
}

export interface IRoleEditRequest {
    roleId: number;
    name: string;
    remark?: string;
    permissionIds: number[];
}

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