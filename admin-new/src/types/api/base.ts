export interface IBaseResponse<T = any> {
    result: T;
    code: number;
    message: string;
}