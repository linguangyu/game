import {request} from '../../src/utils/request.js'

//*** GetFaqListApi ***获取FAQ分类
export const GetCategoriesApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/issue/GetCategories', data: params})
}
//*** GetFaqListApi ***获取FAQ列表
export const GetFaqListApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/issue/GetFaqList', data: params})
}
//*** GetFaqListApi ***获取FAQ详情
export const GetFaqApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/issue/GetFaq', data: params})
}
//*** CreateFeedback ***创建问题反馈
export const CreateFeedbackApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/issue/CreateFeedback', data: params})
}
//*** GetFaqListApi ***获取反馈列表
export const GetFeedbackListApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/issue/GetFeedbackList', data: params})
}
//*** GetFaqListApi ***获取反馈详情
export const GetFeedbackApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/issue/GetFeedback', data: params})
}
//流汗 的获取FAQ列表
export const CategoryAndQueryLocationShow = (params) => {
  return request({method: 'post', url: '/api/services/k5game/gameNews/CategoryAndQueryLocationShow', data: params})
}

