import { defineStore } from "pinia";
import { PERMISSIONS, STORE_NAMES } from "@/utils/constant";

interface IState {
    collapsed: boolean;
}

export const useMenuStore = defineStore(STORE_NAMES.MENU, {
    state(): IState {
        return {
            collapsed: false,
        };
    },
    actions: {
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
        }
    }
});