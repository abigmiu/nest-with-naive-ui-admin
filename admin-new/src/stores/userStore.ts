import { STORE_NAMES } from "@/utils/constant";
import { defineStore } from "pinia";
import store from "./sotre";

export function useUserStoreWithout() {
    return useUserStore(store);
}

interface IUserInfo {
    username: string;
    token: string;
}

interface IUserStoreState {
    userInfo: IUserInfo | null;
}


export const useUserStore = defineStore(STORE_NAMES.USER, {
    state(): IUserStoreState {
        return {
            userInfo: null,
        }
    },
    actions: {
        setUserInfo(data: IUserInfo) {
            this.userInfo = data;
            localStorage.setItem('token', data.token);
        }
    }
})