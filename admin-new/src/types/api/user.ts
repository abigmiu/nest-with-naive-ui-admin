import type { dateStr } from "@/util";
import type { IPaginationQuery } from "./base";

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

/** 创建用户 */
export interface IUserCreateRequest {
	account: string;
	username: string;
	password?: string;
	roleId: number;
}

/** 用户列表项 */
export interface IUserPageResponse {
	id: number;
	createdAt: dateStr;
	updatedAt: dateStr;
	username: string;
	account: string;
	roleId: number;
}