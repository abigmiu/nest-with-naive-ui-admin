import { reqSystemSettingList } from "@/api/setting";
import { defineStore } from "pinia";
import store from "./store";

interface IState {
    config: {
        watermark: boolean
    },
    initialized: boolean;
}

/** 系统全局设置，由接口传入 */
export const useSystemSettingStore = defineStore('system-store', {
    state(): IState {
        return {
            initialized: false,
            config: {
                watermark: false,
            },
        };
    },
    actions: {
        async getList() {
            if (this.initialized) return this.config;
            const res = await reqSystemSettingList();
            const newState = res.reduce((prev, curr) => {
                // @ts-ignore
                if (this.config[curr.filed] !== void 0) {
                    prev[curr.filed] = curr.value;
                }
              
                return prev;
            }, {} as Record<string, any>);
            this.$patch({
                config: newState
            });
            this.initialized = true;
            return this.config;
        }
    }
});

export const useSystemSettingStoreOutside = () => {
    useSystemSettingStore(store);
};