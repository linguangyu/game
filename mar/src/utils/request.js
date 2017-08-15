import axios from 'axios'
import store from '../store/';
import router from '../router/'
import * as checkJs from '../assets/js/pubFunc'

// 默认配置
axios.defaults.baseURL = 'https://api.k5game.com'
axios.defaults.headers.post['Content-Type'] = 'application/json'
export const request = (config) => {
  return axios(config)
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  store.dispatch('show_loading');
  if (store.state.global.token) {
    config.headers.Authorization = 'Bearer ' + `${store.state.global.token}`;
    // router.push({path:router.currentRoute.query.redirect})
  }
  return config;
}, function (error) {
  store.dispatch('hide_loading');
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  store.dispatch('hide_loading');
  return response;
}, function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        $.toast('请先登录！！')
        checkJs.clearCookie('token');
        sessionStorage.removeItem('p');
        sessionStorage.removeItem('user');
        router.replace({
          path: '/login/',
          query: {redirect: router.currentRoute.fullPath}
        });
        sessionStorage.setItem('router', router.currentRoute.fullPath);
    }
  }
  store.dispatch('hide_loading');
  return Promise.reject(error)   // 返回接口返回的错误信息
});
