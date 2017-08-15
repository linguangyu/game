import {request} from '../../src/utils/request.js'

//获取卡片详情
export const CheckHearthstoneCard = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hearthstoneCard/CheckHearthstoneCard', data: params})
}
//收藏
export const CollectHearthstoneCard = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hearthstoneCard/CollectHearthstoneCard', data: params})
}
//不收藏
export const DeleteCollectHearthstoneCard = (params) => {
  return request({
    method: 'post',
    url: '/api/services/k5game/hearthstoneCard/DeleteCollectHearthstoneCard',
    data: params
  })
}
//收藏列表
export const GetCollectHearthstoneCard = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hearthstoneCard/GetCollectHearthstoneCard', data: params})
}


//单卡查询
export const CheckHearthstoneCarddetails = (params) => {
  return request({method: 'post', url: '/api/services/k5game/hearthstoneCard/CheckHearthstoneCarddetails', data: params})
}
