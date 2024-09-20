import { STORE_NAMES } from "@/utils/constant";
import { defineStore } from "pinia";
import store from "./sotre";
import type { ILoginResponse } from "@/types/api/user";

export function useUserStoreWithout() {
    return useUserStore(store);
}

type IUserInfo = ILoginResponse;
interface IUserStoreState {
    userInfo: IUserInfo | null;
}


export const useUserStore = defineStore(STORE_NAMES.USER, {
    persist: true,
    state(): IUserStoreState {
        return {
            userInfo: null,
        };
    },
    actions: {
        setUserInfo(data: IUserInfo) {
            this.userInfo = data;
            localStorage.setItem('token', data.token);
        },
        clearUserInfo() {
            this.userInfo = null;
            localStorage.removeItem('token');
        },
        hasMenuPermissions(permissions: string | string[]) {
            if (!Array.isArray(permissions)) {
                permissions = [permissions];
            }

            return permissions.every((p) => this.userInfo!.menuPermissions.includes(p));
        },
        hasActionPermissions(permissions: string | string[]) {
            if (!Array.isArray(permissions)) {
                permissions = [permissions];
            }  
            return permissions.every((p) => this.userInfo!.actionPermissions.includes(p));
        }
    }
});