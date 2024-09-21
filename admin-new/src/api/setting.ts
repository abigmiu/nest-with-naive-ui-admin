import { http } from "@/utils/http";

export interface ISystemSettingBase {
    filed: string;
    value: any;
    createdAt: Date;
    updatedAt: Date;
}

export type ISystemSettingUpdate = Pick<ISystemSettingBase, 'filed' | 'value'>

/** 获取配置列表 */
export function reqSystemSettingList(){
    return http.request<ISystemSettingBase[]>({
        url: '/api/setting/list'
    });
}

/** 更新配置 */
export function resSystemSettingUpdate(data: ISystemSettingUpdate) {
    return http.request<ISystemSettingBase>({
        url: '/api/setting/update',
        data,
        method: 'POST'
    });
}

/** 批量更新配置 */
export function reqSystemSettingGroupUpdate(data: ISystemSettingUpdate[]) {
    return http.request({
        url: '/api/setting/group-update',
        data,
        method: 'POST'
    });
}