import { http } from "@/utils/http";

interface ICreateVideoRequest {
    title: string;
    desc: string;
    videoUrl: string;
}

export const reqCreateVideo = (data: ICreateVideoRequest) => {
    return http.request({
        url: '/api/user-video/create',
        data,
        method: 'POST',
    });
};