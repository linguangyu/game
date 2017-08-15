import {request} from '../../src/utils/request.js'

//获取订单首页的项目列表
export const GetPackageInfo = (params) => {
  return request({
    method: 'post',
    url: '/api/services/app/hearthStonePowerLevelingProduct/GetPackageInfo',
    data: params
  })
}

//获取订单详情
export const GetProductByPackage = (params) => {
  return request({
    method: 'post',
    url: '/api/services/app/hearthStonePowerLevelingProduct/GetProductByPackage',
    data: params
  })
}
//用户下订单
export const UserDownOrder = (params) => {
  return request({method: 'post', url: '/api/services/app/hearthStonePowerLevelingOrder/UserDownOrder', data: params})
}
//*** userLogin ***获取用户登录信息
export const GetCurrentLoginInformationsApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/profile/GetCurrentLoginInformations', data: params})
}
//支付订单
export const UserPayment = (params) => {
  return request({method: 'post', url: '/api/services/app/hearthStonePowerLevelingOrder/UserPayment', data: params})
}
export const GetMyOrderInfo = (params) => {
  return request({method: 'post', url: '/api/services/app/hearthStonePowerLevelingOrder/GetMyOrderInfo', data: params})
}
