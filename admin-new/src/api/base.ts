/** 接口响应 */
export interface IBaseResponse<T = any> {
    result: T;
    code: number;
    message: string;
}

/** 接口分页数据 */
export interface IPageData<T = any> {
    list: T[];
    page: number;
    pageSize: number;
    pageCount: number;
    itemCount: number;
}

/** 分页查询 */
export interface IPageQuery {
    page: number;
    pageSize: number;
    realtime?: boolean;
    /** 游标 */
    cursorId?: number;
}