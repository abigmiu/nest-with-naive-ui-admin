import type { ILoginRequest, ILoginResponse } from "@/types/api/user";
import { http } from "@/utils/http";



export function reqLogin(data: ILoginRequest): Promise<ILoginResponse> {
    return http.request<ILoginResponse>({
        url: '/api/auth/login',
        data,
        method: 'POST',
    });
}