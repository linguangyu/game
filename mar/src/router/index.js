import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import * as checkJs from '../assets/js/pubFunc'
import store from '../store/';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  hashbang: true,
  linkActiveClass: 'active',
  routes
});
router.beforeEach((to, from, next) => {
  next();
  if (to.query.p) {
    localStorage.setItem('p', to.query.p);
  }
  if (to.path === '/market/') {
    store.state.global.blankPage = false;
    store.state.global.footerhide = true;
  } else if (checkJs.getCookie('token') && to.path === '/') {
    next({
      path: '/market/'
    });
  }
  // else if (!checkJs.getCookie('token') && this.$router && this.$router.currentRoute.fullPath !== '/' && this.$router.currentRoute.fullPath !== '/resetpassword') {
  //   next({
  //     path: '/'
  //   })

  //如果已经登录。 还想跳到./让他挑到 market/'
  // }
  // } else if (!navigator.onLine) {
  //   next({
  //     path: '/notFoundPage'
  //   });
  // }
  else {
    next();
    store.state.global.blankPage = false;
  }
//   // if (to.query.p ) {
//   //   //写到存储 记录ID ， 来源IP  ，  记录日期 。    来源IP记录日期    = 记录ID
//   //   sessionStorage.setItem('p', to.query.p);
//   // } else {
//   // }
//   // if (!checkJs.getCookie('token') && to.path !== '/' && to.path !== '/resetpassword') {
//   //   next('/');
//   // } else if ((checkJs.getCookie('token') && from.path === '/login') || (checkJs.getCookie('token') && to.path === '/')) {
//   //   next({
//   //     path: '/market'
//   //   });
//   // } else if (!navigator.onLine && to.path !== '/notFoundPage') {
//   //   next({
//   //     path: '/notFoundPage'
//   //   });
//   // } else {
//   //   store.state.global.blankPage = false;
//   //   store.state.global.footerhide = true;
//   //   next();
//   // }
});
router.afterEach(transition => {

});
export default router
