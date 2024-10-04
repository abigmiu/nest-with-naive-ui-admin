import { appRequest, request } from '@/utils/request'

export interface IHttpPhonePasswordLoginReq {
  type: 1;
  phone: string;
  password: string;
}


export interface IHttpUserSelfStats {
  likeCount: number;
  fansCount: number;
  followCount: number;
  friendCount: number;
}

/** 登录 */
export function httpPhonePasswordLogin(data: IHttpPhonePasswordLoginReq) {
  return appRequest({
    url: '/api/app/user/login-phone-password',
    method: 'POST',
    data,
  })
}

/** 获取用户自己的统计数据 */
export function httpUserSelfStats() {
  return appRequest<IHttpUserSelfStats>({
    url: '/api/app/user/stats',
  })
}

export function userinfo(params?: any, data?: any) {
  return request({ url: '/user/userinfo', method: 'get', params, data })
}

export function userVideoList(params?: any, data?: any) {
  return request({ url: '/user/video_list', method: 'get', params, data })
}

export function panel(params?: any, data?: any) {
  return request({ url: '/user/panel', method: 'get', params, data })
}

export function friends(params?: any, data?: any) {
  return request({ url: '/user/friends', method: 'get', params, data })
}

export function userCollect(params?: any, data?: any) {
  return request({ url: '/user/collect', method: 'get', params, data })
}

export function recommendedPost(params?: any, data?: any) {
  return request({ url: '/post/recommended', method: 'get', params, data })
}

export function recommendedShop(params?: any, data?: any) {
  return request({ url: '/shop/recommended', method: 'get', params, data })
}
