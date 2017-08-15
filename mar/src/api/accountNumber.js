/**
 * Created by Administrator on 2017/6/24.
 */
import {request} from '../../src/utils/request.js'
//*** GetSaleAccountTransactionsApi ***获取销售列表
export const GetSaleAccountTransactionsApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/accountTransaction/GetSaleAccountTransactions', data: params})
};
//*** GetSaleAccountTransactionsdetailsApi ***获取销售详情
export const GetSaleAccountTransactionsdetailsApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/accountTransaction/GetSaleAccountTransactionsdetails', data: params})
};
//*** CreatePurchaseAccountTransactionApi ***创建购买订单
export const CreatePurchaseAccountTransactionApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/accountTransaction/CreatePurchaseAccountTransaction', data: params})
};

//*** GetMyPurchaseAccountTransactiondetailsApi ***获取购买订单详情
export const GetMyPurchaseAccountTransactiondetailsApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/accountTransaction/GetMyPurchaseAccountTransactiondetails', data: params})
};
//*** PayPurchaseAccountTransaction ***支付
export const PayPurchaseAccountTransaction = (params) => {
  return request({method: 'post', url: '/api/services/k5game/accountTransaction/PayPurchaseAccountTransaction', data: params})
};

//*** PayPurchaseAccountTransaction ***购买订单详情
export const GetMyPurchaseAccountTransactiondetails = (params) => {
  return request({method: 'post', url: '/api/services/k5game/accountTransaction/GetMyPurchaseAccountTransactiondetails', data: params})
};


//*** userLogin ***获取用户登录信息
export const GetCurrentLoginInformationsApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/profile/GetCurrentLoginInformations', data: params})
}
