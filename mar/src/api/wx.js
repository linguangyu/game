import {request} from '../../src/utils/request.js'

//*** CreateCoinOrderpi  **获取签名
export const GetSignature = (params) => {
  return request({method: 'post', url: '/api/services/k5game/wechat/GetSignature', data: params})
}
