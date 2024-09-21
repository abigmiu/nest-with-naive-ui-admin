import type { DataTableBaseColumn, TableProps } from "naive-ui";

/** 表格总体设置 */
export interface ISettingTable {
    /** 表格斑马纹 */
    striped: boolean;
    /** 密度 */
    density: TableProps['size'];
    /** 勾选列 */
    selection: boolean;
    /** 表格边框 */
    border: boolean;
    /** 宽度可调整 */
    resizable: boolean;
    /** 实时数据 */
    realtime: boolean;
}

/** 表格列设置 */
export type ISettingTableColumn = {
    filed: string;
    width?: number;
    fixed?: DataTableBaseColumn['fixed'];
    /** 是否展示 */
    show: boolean;
    /** 列标题 */
    title: string;
}[];