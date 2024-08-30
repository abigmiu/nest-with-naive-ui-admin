import type { dateStr } from "@/util";
import type { IPaginationQuery } from "./base";
import type { IRole } from "./role";

export interface ILoginRequest {
	username: string;
	password: string;
}

export interface ILoginResponse {
	id: number;
	createdAt: string;
	updatedAt: string;
	username: string;
	roleId: number;
	token: string;
}

export interface IUserPageRequest extends IPaginationQuery {
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