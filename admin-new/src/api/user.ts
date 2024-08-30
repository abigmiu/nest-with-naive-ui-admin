import type { IPageData } from "@/types/api/base";
import type { ILoginRequest, ILoginResponse, IUserCreateRequest, IUserPageRequest } from "@/types/api/user";
import { http } from "@/utils/http";



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