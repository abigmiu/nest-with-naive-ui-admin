import type { IBaseResponse } from "@/types/api/base";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from "axios";
import axios from "axios";

class VAxios {
    private axiosInstance: AxiosInstance;
    private options: CreateAxiosDefaults;

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
                config.headers['Authorization'] = `Bearer ${token}`
            }

            return config;
        })

        this.axiosInstance.interceptors.response.use((response: AxiosResponse<IBaseResponse>) => {
            return response.data.result;
        })
    }
}


export const http = new VAxios({});
