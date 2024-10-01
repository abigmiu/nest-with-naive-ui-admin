import type { IPageData } from "@/api/base";
import { http } from "@/utils/http";

import type { dateStr } from "@/util";
import type { IPageQuery } from "./base";
import type { IRole } from "./role";

export interface ILoginRequest {
	account: string;
	password: string;
}

export interface ILoginResponse {
	createdAt: dateStr;
	username: string;
	permissions: string[];
	token: string;
	avatar: string | null;
}

export interface IUserPageRequest extends IPageQuery {
	username: string;
}


export interface IUserInfo {
	id: number;
	createdAt: dateStr;
	updatedAt: dateStr;
	username: string;
	account: string;
	roleId: number;
}


/** 创建用户 */
export interface IUserCreateRequest {
	account: string;
	username: string;
	password?: string;
	roleId: number;
}

/** 用户列表项 */
export interface IUserPageResponse extends IUserInfo {
	rolename: string;
}

export interface IBaseUserInfoResponse extends IUserInfo {
	role: IRole;
}

/** 用户编辑表单数据 */
export interface IUserEditForm {
	account: string;
	username: string;
	roleId: number;
}

/** 用户编辑提交数据 */
export interface IUserEditRequest extends IUserEditForm {
	id: number;
}
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