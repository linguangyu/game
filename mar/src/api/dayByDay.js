import {request} from '../../src/utils/request.js'

//获取道具列表
export const HomePageDisplay = (params) => {
  return request({method: 'post', url: '/api/services/k5game/polylh/HomePageDisplay', data: params})
}

//获取列表
export const PriceChangeNameHoursShow = (params) => {
  return request({method: 'post', url: '/api/services/k5game/polylh/PriceChangeNameHoursShow', data: params})
}


//收藏
export const PollyUserCollectionTAdd = (params) => {
  return request({method: 'post', url: '/api/services/k5game/polylh/PollyUserCollectionTAdd', data: params})
}

//取消收藏
export const PollyUserCollectionTDelete = (params) => {
  return request({method: 'post', url: '/api/services/k5game/polylh/PollyUserCollectionTDelete', data: params})
}




//收藏列表
export const CollectionShow = (params) => {
  return request({method: 'post', url: '/api/services/k5game/polylh/CollectionShow', data: params})
}




//搜索记录
export const PriceChangeNameFuzzy = (params) => {
  return request({method: 'post', url: '/api/services/k5game/polylh/PriceChangeNameFuzzy', data: params})
}





