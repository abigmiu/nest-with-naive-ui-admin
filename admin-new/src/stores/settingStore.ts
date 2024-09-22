import type { ISettingTableColumn, ISettingTable } from "@/types/setting";
import { STORE_NAMES } from "@/utils/constant";
import { cloneDeep } from "es-toolkit";
import { defineStore } from "pinia";
import store from "./store";

interface IState {
    asideCollapsed: boolean;
    settingVisible: boolean;
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


const defaultTableSetting: IState['tableSetting'][keyof IState['tableSetting']]['table'] = {
    striped: false,
    density: 'medium',
    selection: false,
    border: false,
    resizable: false,
    realtime: true,
};

export const useSettingStore = defineStore(STORE_NAMES.SETTING, {
    persist: true,
    state(): IState {
        return {
            asideCollapsed: false,
            settingVisible: false,
            menuDark: true,
            headerDark: false,
            tableSetting: {
                default: {
                    table: defaultTableSetting,
                    column: []
                }
            },
            themeColor: '#409EF0',
            enableAnimation: true,
            animationName: 'fade'
        };
    },
    actions: {
        toggleAsideCollapsed(status?: boolean) {
            if (typeof status === 'boolean') {
                this.asideCollapsed = status;
            } else {
                this.asideCollapsed = !this.asideCollapsed;
            }
        },
        toggleSettingVisible(status?: boolean) {
            if (typeof status === 'boolean') {
                this.settingVisible = status;
            } else {
                this.settingVisible =  !this.settingVisible;
            }
            
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

export const useSettingStoreOutside = () => {
    return useSettingStore(store);
};