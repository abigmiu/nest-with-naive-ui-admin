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
    })
}