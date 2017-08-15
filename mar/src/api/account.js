import {request} from '../../src/utils/request.js'


//GET请求模板
//export const getArticleApi = () => {
//  return request('/rest/getArticles')
//}

//*** getCode ***快速注册获取验证码
export const getRegisterCodeApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/account/SendRegisterCode', data: params})
}

//*** quickRegister ***快速注册
export const quickRegisterApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/account/QuickRegister', data: params})
}

//*** sendResetPasswordCode ***重置密码获取验证码
export const getResetPasswordCodeApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/account/SendPasswordResetCode', data: params})
}

//*** ResetPassword ***重置密码
export const ResetPasswordApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/account/ResetPassword', data: params})
}
// //*** ResetPassword ***测试
// export const ResetPasswordApiddd = (params) => {
//   return request({method: 'get', url: 'http://www2.ruianer.com/Profile/GetProfilePicture?t='+new Date().getTime(), data: params})
// }

//*** userLogin ***用户登录
export const userLoginApi = (params) => {
  return request({method: 'post', url: '/api/TokenAuth', data: params})
}

//*** userLogin ***获取用户登录信息
export const GetCurrentLoginInformationsApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/profile/GetCurrentLoginInformations', data: params})
}
//*** userLogin ***获取当前用户信息用于编辑
export const GetCurrentUserProfileForEditApi = (params) => {
  return request({method: 'post', url: '/api/services/k5game/profile/GetCurrentUserProfileForEdit', data: params})
}
//*** userLogin ***获取当前用户头像编号
export const GetProfilePictureOutputApi = (params) => {
  return request({method:'post',url: '/api/services/k5game/profile/GetProfilePicture',data:params})
}
//*** UpdateCurrentUserProfile ***更新用户当前信息
export const UpdateCurrentUserProfile = (params) => {
  return request({method:'post',url: '/api/services/k5game/profile/UpdateCurrentUserProfile',data:params})
}
//*** UpdateProfilePictureApi ***更新用户当前头像
export const UpdateProfilePictureApi = (params) => {
  return request({method:'post',url: '/api/services/k5game/profile/UpdateProfilePicture',data:params})
}
//*** HasPermissionApi 判断用户是否有存入权限
export const HasPermissionApi = (params) => {
  return request({method:'post',url: '/api/services/k5game/profile/HasPermission',data:params})
}



