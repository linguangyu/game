// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './../src/router/index.js'
import App from './App'
import store from './store/';
import Vuex from 'vuex'
import VueClipboard from 'vue-clipboard2'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)
Vue.use(VueClipboard);
Vue.use(Vuex);



const FastClick = require('fastclick')
FastClick.attach(document.body)
//开启debug模式
//Vue.config.debug = true
//window.log = console.log

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
