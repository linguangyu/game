import {request} from '../../src/utils/request.js'

//*** GetNewsList ***获取清单代练
export const GetMyOrderList = (params) => {
  return request({method: 'post', url: '/api/services/app/hearthStonePowerLevelingOrder/GetMyOrderList', data: params})
}
//*** GetNewsList **取消订单代练
export const UserCancelOrder = (params) => {
  return request({method: 'post', url: '/api/services/app/hearthStonePowerLevelingOrder/UserCancelOrder', data: params})
}

//*** GetNewsList **删除订单代练
export const UserDeleteOrder = (params) => {
  return request({method: 'post', url: '/api/services/app/hearthStonePowerLevelingOrder/UserDeleteOrder', data: params})
}


//*** GetNewsList **账号订单列表
export const GetMyPurchaseAccountTransactions = (params) => {
  return request({method: 'post', url: '/api/services/k5game/accountTransaction/GetMyPurchaseAccountTransactions', data: params})
}


export const UpdatePurchaseAccountTransaction = (params) => {
  return request({method: 'post', url: '/api/services/k5game/accountTransaction/UpdatePurchaseAccountTransaction', data: params})

}

//*** GetNewsList **账号订单删除
export const DeleteMyPurchaseAccountTransactiondetails = (params) => {
  return request({method: 'post', url: '/api/services/k5game/accountTransaction/DeleteMyPurchaseAccountTransactiondetails', data: params})

}






