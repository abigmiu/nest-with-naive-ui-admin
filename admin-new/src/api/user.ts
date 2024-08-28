import type { IPageData } from "@/types/api/base";
import type { ILoginRequest, ILoginResponse, IUserPageRequest } from "@/types/api/user";
import { http } from "@/utils/http";



export function reqUserPage(query: IUserPageRequest): Promise<IPageData<ILoginResponse>> {
    return http.request<IPageData<ILoginResponse>>({
        url: '/api/user/page',
        params: query,
    });
}