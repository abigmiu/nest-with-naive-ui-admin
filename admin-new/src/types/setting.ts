export interface ISettingTableStyle {
    /** 表格斑马纹 */
    striped: boolean;
    /** 密度 */
    density: string;
}

export interface ISettingTableColumn {
    /** 勾选列 */
    selection: boolean;
    /** 表格边框 */
    border: boolean;
    /** 宽度可调整 */
    resizable: boolean;
}