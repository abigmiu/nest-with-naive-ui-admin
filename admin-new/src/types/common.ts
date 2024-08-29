import type { PaginationProps } from "naive-ui";

export type IBasicPagination = Pick<PaginationProps, 'page' | 'pageSize' | 'itemCount' | 'pageCount'>;