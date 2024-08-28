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