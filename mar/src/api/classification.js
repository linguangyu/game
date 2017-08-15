import {request} from '../../src/utils/request.js'


//GET请求模板
//export const getArticleApi = () => {
//  return request('/rest/getArticles')
//}

//*** getCode ***快速注册获取验证码
export const GetGameName = (params) => {
  return request({method: 'post', url: '/api/services/k5game/gameInfo/GetGameName', data: params})
};

