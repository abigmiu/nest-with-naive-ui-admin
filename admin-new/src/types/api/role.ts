
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