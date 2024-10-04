import { httpUserSelfStats, type IHttpUserSelfStats } from "@/api/user";
import { defineStore } from "pinia";

interface IState {
    userInfo: null | Record<string, any>;
    stats: IHttpUserSelfStats
}

export const useUserStore = defineStore('user-store', {
    persist: true,
    state(): IState {
        return {
            userInfo: null,
            stats: {
                lickCount: 0,
                fansCount: 0,
                followCount: 0,
                friendCount: 0,
            }
        }
    },
    actions: {
        setUserInfo(data: Record<string, any>) {
            this.userInfo = data;
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
        },
        /** 获取用户统计数据 */
        async getUserStats() {
            const res = await httpUserSelfStats();
            this.stats = res;
        }
    }
})