import {request} from '../../src/utils/request.js'

//GET请求模板
//export const getArticleApi = () => {
//  return request('/rest/getArticles')
//}

//*** CreateOrder ***快速提取友谊赛
export const CreateOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchExtract/CreateOrder', data: params})
}

//*** GetFriendMatchOrder ***快速获取友谊赛订单详情
export const GetFriendMatchOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchExtract/GetOrder', data: params})
}

//*** SwitchUser ***友谊赛换人
export const SwitchUserApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchExtract/SwitchUser', data: params})
}

//*** ReleaseOrder ***友谊赛释放订单
export const ReleaseOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchExtract/ReleaseOrder', data: params})
}

//*** CancelOrder ***友谊赛取消订单
export const CancelOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchExtract/CancelOrder', data: params})
}
//*** PauseOrder ***友谊赛暂停订单
export const PauseOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchExtract/PauseOrder', data: params})
}
//*** ResumeOrder ***友谊赛开始订单
export const ResumeOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchExtract/ResumeOrder', data: params})
}
//*** DepositCreateOrder ***创建存入订单
export const DepositCreateOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchDeposit/CreateOrder', data: params})
}

//*** DepositGetOrder ***获取存入订单详情
export const DepositGetOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchDeposit/GetOrder', data: params})
}

//*** CancelOrder ***存入订单--取消
export const DepositCancelOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchDeposit/CancelOrder', data: params})
}

//*** DepositCompleteOrder ***存入订单--完成订单
export const DepositCompleteOrderApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchDeposit/CompleteOrder', data: params})
}

//*** GetUserTagsApi ***获取用户所要TAG
export const GetUserTagsApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchTag/GetUserTags', data: params})
}
//*** GetUserTagsApi ***获取待处理提取订单列表
export const GetPendingOrdersApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchExtract/GetPendingOrders', data: params})
}
//*** GetUserTagsApi ***获取当前用户的提取订单列表
export const GetOrdersApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchExtract/GetOrders', data: params})
}
//*** GetUserTagsApi ***获取当前用户的存入订单列表
export const GetDepositOrdersApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchDeposit/GetOrders', data: params})
}
//*** CheckOrdersApi ***验收订单
export const CheckOrdersApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchExtract/CheckOrder', data: params})
}
//*** CreateTagApi ***创建TAG
export const CreateTagApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchTag/CreateTag', data: params})
}

//*** DeleteTag ***删除TAG
export const DeleteTagApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchTag/DeleteTag', data: params})
}
//*** GetProblemOrdersApi ***获取问题单
export const GetProblemOrdersApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchDeposit/GetProblemOrders', data: params})
}
//*** GetProblemsApi ***获取协商记录
export const GetProblemsApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchDeposit/GetProblems', data: params})
}
//*** CloseProblemApi ***关闭争议（创建者）
export const CloseProblemApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchDeposit/CloseProblem', data: params})
}
//*** ConfirmProblemApi ***确认争议（存入方）
export const ConfirmProblemApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchDeposit/ConfirmProblem', data: params})
}
//*** ArbitrateProblem *** 仲裁争议（客服）
export const ArbitrateProblemApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchDeposit/ArbitrateProblem', data: params})
}
//*** ConsultProblemApi *** 协商
export const ConsultProblemApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchDeposit/ConsultProblem', data: params})
}

//*** GetMyProblemOrders *** 获取到自己的问题单
export const GetMyProblemOrders = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hsFriendMatchDeposit/GetMyProblemOrders', data: params})
}





