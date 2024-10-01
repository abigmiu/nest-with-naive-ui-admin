import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from "axios";

import { IgnoreLastRequestError } from "./errors";
import type { IBaseResponse } from "@/api/base";
import { download, getHttpHeaderFilename } from "@/utils/index";
import { message } from "./global";
import { reqLogin } from "@/api/auth";

class VAxios {
    private axiosInstance: AxiosInstance;

    constructor(options: CreateAxiosDefaults) {
        this.axiosInstance = axios.create(options);
        this.setupInterceptors();
    }

    request<T>(config: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.request(config);
    }

    private setupInterceptors() {
        this.axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            if (config.method?.toUpperCase() === 'GET') {
                config.params = config.params ?? {};
                config.params['_t'] = new Date().getTime();
            }

            return config;
        });

        this.axiosInstance.interceptors.response.use((response: AxiosResponse<IBaseResponse>) => {
            if (response.config.responseType === 'blob') {
                download(response.data, getHttpHeaderFilename(response.headers['content-disposition']));
                return response.data;
            }

            if (response.data.code !== 200) {
                message.error(response?.data?.message || '服务器错误');
                return Promise.reject(response);
            }

            return response.data.result;
        });
    }
}


export const http = new VAxios({});


/**
 * 忽略上一次请求，只获取最新的请求结果
 * @param fn 请求函数
 * @returns 
 */
export function useNewestRequest<T extends any[], R extends any>(fn: (...args: T) => Promise<R>) {
    let id = 0;

    return async (...args: T): Promise<R> => {
        id = id + 1;
        const currentRequestId = id;
        return new Promise((resolve, reject) => {
            fn(...args)
                .then((data) => {
                    if (currentRequestId === id) {
                        resolve(data);
                    } else {
                        throw new IgnoreLastRequestError();
                    }
                })
                .catch((error) => {
                    if (currentRequestId === id) {
                        reject(error);
                    } else {
                        throw new IgnoreLastRequestError();
                    }
                });
        });
    };
}


const a = useNewestRequest(reqLogin);