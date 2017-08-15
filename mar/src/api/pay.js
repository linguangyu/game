import {request} from '../../src/utils/request.js'

//*** CreateCoinOrderpi  ***创建充值订单
export const CreateCoinOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/userCoinOrder/CreateCoinOrder', data: params})
}
//*** GetCoinOrderpi  ***获取充值订单信息
export const GetCoinOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/userCoinOrder/GetCoinOrder', data: params})
}
//*** GetCoinOrderpi  ***获取充值订单列表
export const GetCoinOrdersApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/userCoinOrder/GetCoinOrders', data: params})
}
//***CancelCoinOrderpi  ***取消充值订单
export const CancelCoinOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/userCoinOrder/CancelCoinOrder', data: params})
}
//*** CreatePayApi  ***获取支付参数
export const CreatePayApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/payment/Create', data: params})
}

