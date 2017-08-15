import {request} from '../../src/utils/request.js';

//*** CreateSaleOrderApi ***创建销售订单
export const CreateSaleOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchTrade/CreateSaleOrder', data: params})
}
//*** CancelSaleOrderApi ***取消销售订单
export const CancelSaleOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchTrade/CancelSaleOrder', data: params})
}
//*** GetSaleOrdersApi ***获取销售订单列表
export const GetSaleOrdersApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchTrade/GetSaleOrders', data: params})
}
//*** CreatePurchaseOrderApi ***创建购买订单
export const CreatePurchaseOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchTrade/CreatePurchaseOrder', data: params})
}
//*** GetMySaleOrdersApi  ***获取我的销售订单列表
export const GetMySaleOrdersApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchTrade/GetMySaleOrders', data: params})
}
//*** CreateSaleOrderApi ***获取我的销售订单详情（含购买订单列表）
export const GetMySaleOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchTrade/GetMySaleOrder', data: params})
}
//*** GetMyPurchaseOrdersApi **获取我的购买订单列表
export const GetMyPurchaseOrdersApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchTrade/GetMyPurchaseOrders', data: params})
}

//*** GetUserCoinLogsApi  ***获取虚拟币资产日志
export const GetUserCoinLogsApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/userAsset/GetUserCoinLogs', data: params})
}
//*** GetUserFriendMatchLogsApi ***获取友谊赛资产日志
export const GetUserFriendMatchLogsApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/userAsset/GetUserFriendMatchLogs', data: params})
}
