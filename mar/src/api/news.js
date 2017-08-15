import {request} from '../../src/utils/request.js'

//*** GetNewsList ***获取新闻分类
export const GetCategoriesApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/news/GetCategories', data: params})
}
//*** GetNewsList ***获取新闻列表
export const GetNewsListApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/news/GetNewsList', data: params})
}
//*** GetNewsList ***获取新闻详情
export const GetNewsForViewApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/news/GetNewsForView', data: params})
}

//新的

//*** CreateCoinOrderpi  ***获取title图片
export const ArticleLhTitleListShow = (params) => {
  return request({method: 'post', url: '/api/services/k5game/gameNews/ArticleLhTitleListShow', data: params})
}

//*** CreateCoinOrderpi  ***获取详情
export const ArticleShow = (params) => {
  return request({method: 'post', url: '/api/services/k5game/gameNews/ArticleShow', data: params})
}


//*** CreateCoinOrderpi  ***轮播图地址
export const CorrespondingDataFrontEnd = (params) => {
  return request({method: 'post', url: '/api/services/k5game/gameNews/CorrespondingDataFrontEnd', data: params})
}
