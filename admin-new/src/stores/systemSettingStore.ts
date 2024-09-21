import { reqSystemSettingList } from "@/api/setting";
import { defineStore } from "pinia";

interface IState {
    config: {
        watermark: boolean
    },
 
    inited: boolean;

}

export const useSystemSettingStore = defineStore('system-store', {
    state(): IState {
        return {
            inited: false,
            config: {
                watermark: false,
            },
        };
    },
    actions: {
        async getList() {
            if (this.inited) return this.config;
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
            this.inited = true;
            return this.config;
        }
    }
});