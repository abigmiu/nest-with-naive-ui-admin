import { http } from "@/utils/http";
import type { AxiosRequestConfig } from "axios";

export interface IReqUploadResponse {
    id: number;
    url: string;
}

export interface IReqFileRecordRequest {
    fileId: number;
    fileName: string;
    remark: string;
    tags: string[];
}

/** 上传文件 */
export function reqFileUpload(file: File, options?: AxiosRequestConfig,) {
    const formData = new FormData();
    formData.append('file', file);
    return http.request<IReqUploadResponse>({
        url: '/api/file',
        data: formData,
        method: 'POST',
        ...options,
    });
}

export function reqFileRecord(data: IReqFileRecordRequest) {
    return http.request({
        url: '/api/file/add',
        data,
        method: 'POST'
    });
}