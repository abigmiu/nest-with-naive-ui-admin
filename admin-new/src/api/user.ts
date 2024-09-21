import type { IPageData } from "@/types/api/base";
import type { IBaseUserInfoResponse, ILoginRequest, ILoginResponse, IUserCreateRequest, IUserEditRequest, IUserPageRequest } from "@/types/api/user";
import { http } from "@/utils/http";


export interface IReqUserUpdateProfile {
    username?: string;
    avatar?: string;
}

/** 修改用户密码 */
export interface IReqUserUpdatePassword {
    password: string;
}


export function reqUserPage(query: IUserPageRequest): Promise<IPageData<ILoginResponse>> {
    return http.request<IPageData<ILoginResponse>>({
        url: '/api/user/page',
        params: query,
    });
}

export function reqUserCreate(data: IUserCreateRequest) {
    return http.request({
        url: '/api/user',
        method: 'POST',
        data
    });
}

/** 获取用户基本信息 */
export function reqUserBaseInfo(userId: number) {
    return http.request<IBaseUserInfoResponse>({
        url: '/api/user/base-info',
        params: {
            userId,
        }
    });
}

/** 重置用户密码 */
export function reqUserResetPassword(userId: number) {
    return http.request({
        url: '/api/user/reset-password',
        method: 'POST',
        data: {
            userId
        }
    });
}

/** 获取用户导入模板 */
export function reqUserTemplate() {
    return http.request({
        url: '/api/user/import-template',
        responseType: 'blob',
    });
}

/** 获取用户导出数据 */
export function reqUserExport() {
    return http.request({
        url: '/api/user/export',
        responseType: 'blob',
    });
}

/** 用户导入 */
export function reqUserImport(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return http.request({
        url: '/api/user/import',
        method: 'POST',
        data: formData
    });
}

/** 用户编辑 */
export function reqUserEdit(data: IUserEditRequest) {
    return http.request({
        url: '/api/user/edit',
        method: 'POST',
        data
    });
}

/** 更新用户自己的基本信息 */
export function reqUserUpdateProfile(data: IReqUserUpdateProfile) {
    return http.request({
        url: '/api/user/update-profile',
        method: 'POST',
        data,
    });
}

/** 修改用户密码 */
export function reqUserUpdatePassword(data: IReqUserUpdatePassword) {
    return http.request({
        url: '/api/user/update-password',
        method: 'POST',
        data,
    });
}

export interface IReqLoginLogResponse {
    loginAt: Date | null;
    ip: string;
    device: string;
    id: number;
}

/** 用户自己的最近登录日志 */
export function reqUserRecentLoginLog() {
    return http.request<IReqLoginLogResponse[]>({
        url: '/api/login-log/recent'
    });
}