import type { ISettingTableColumn, ISettingTable } from "@/types/setting";
import { STORE_NAMES } from "@/utils/constant";
import { cloneDeep } from "es-toolkit";
import { defineStore } from "pinia";

interface IState {
    visible: boolean;
    menuDark: boolean;
    headerDark: boolean;
    tableSetting: Record<'default' | string, {
        table: ISettingTable;
        column: ISettingTableColumn;
    }>;
    themeColor: string;
    enableAnimation: boolean;
    animationName: string;
}

export const useSettingStore = defineStore(STORE_NAMES.SETTING, {
    persist: true,
    state(): IState {
        return {
            visible: false,
            menuDark: true,
            headerDark: false,
            tableSetting: {
                default: {
                    table: {
                        striped: false,
                        density: 'medium',
                        selection: false,
                        border: false,
                        resizable: false,
                        realtime: true,
                    },
                    column: []
                }
            },
            themeColor: '#409EF0',
            enableAnimation: true,
            animationName: 'fade'
        };
    },
    actions: {
        toggleVisible() {
            this.visible = !this.visible;
        },
        /** 设置头部变黑 */
        setHeaderDark(status?: boolean) {
            if (status === undefined) {
                this.headerDark = !this.headerDark;
            } else {
                this.headerDark = status;
            }
        },
        /** 设置左侧菜单栏变黑 */
        setMenuDark(status?: boolean) {
            if (status === undefined) {
                this.menuDark = !this.menuDark;
            } else {
                this.menuDark = status;
            }

        },
        getTableSetting(tableKey: string) {
            return this.initTableSetting(tableKey);
        },
        /** 初始化表格和表格列设置 */
        initTableSetting(tableKey: string) {
            if (this.tableSetting[tableKey]) {
                return this.tableSetting[tableKey];
            }
            
            this.tableSetting[tableKey] = {
                table: cloneDeep(this.tableSetting.default.table),
                column: [],
            };
            return this.tableSetting[tableKey];
        },

        /** 重置表格总体设置 */
        resetTableSetting(tableKey: string) {
            if (!this.tableSetting[tableKey]) {
                throw new Error('重置表格设置失败, 无初始值');
            }
            this.tableSetting[tableKey].table = cloneDeep(this.tableSetting.default.table);
            this.tableSetting[tableKey].column = [];
        }
    }
});