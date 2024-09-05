import type { ISettingTableColumn, ISettingTableStyle } from "@/types/setting";
import { STORE_NAMES } from "@/utils/constant";
import { defineStore } from "pinia";

interface IState {
    visible: boolean;
    menuDark: boolean;
    headerDark: boolean;
    tableSetting: Record<string, {
        style: ISettingTableStyle;
        column: ISettingTableColumn;
    }>
}

export const useSettingStore = defineStore(STORE_NAMES.SETTING, {
    persist: true,
    state(): IState {
        return {
            visible: false,
            menuDark: true,
            headerDark: false,
            tableSetting: {
                default: Object.freeze({

                    style: Object.freeze({
                        striped: false,
                        density: 'medium'
                    }),
                    column: Object.freeze({
                        selection: false,
                        border: false,
                        resizable: false
                    })
                })
            }
        };
    },
    actions: {
        toggleVisible() {
            this.visible = !this.visible;
        },
        setHeaderDark(status?: boolean) {
            if (status === undefined) {
                this.headerDark = !this.headerDark;
            } else {
                this.headerDark = status;
            }
        },
        setMenuDark(status?: boolean) {
            if (status === undefined) {
                this.menuDark = !this.menuDark;
            } else {
                this.menuDark = status;
            }

        }
    }
});