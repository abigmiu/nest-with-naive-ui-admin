import { STORE_NAMES } from "@/utils/constant";
import { defineStore } from "pinia";
import store from "./store";

interface IState {
    keepComps: string[];
}


export const useAliveStore = defineStore(STORE_NAMES.ALIVE, {
    state(): IState {
        return {
            keepComps: [],
        };
    },
    actions: {
        setKeepCmp(name: string, status: boolean) {
            const index = this.keepComps.indexOf(name);
            if (index < 0 && status) {
                this.keepComps.push(name);
                return;
            }
            if (index >= 0 && !status) {
                this.keepComps.splice(index, 1);
            }
        }
    }
});


export const useAliveStoreWithout = () => {
    return useAliveStore(store);
};