export interface IBaseResponse<T = any> {
    result: T;
    code: number;
    message: string;
}

export interface IPageData<T = any> {
    list: T[];
    page: number;
    pageSize: number;
    pageCount: number;
    itemCount: number;
}

export interface IPaginationQuery {
    page: number;
    pageSize: number;
}