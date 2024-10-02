import { defineStore } from "pinia";

interface IState {
    userInfo: null | Record<string, any>
}

export const useUserStore = defineStore('user-store', {
    state(): IState {
        return {
            userInfo: null
        }
    },
    actions: {
        setUserInfo(data: Record<string, any>) {
            this.userInfo = data;
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
        }
    }
})