<template>
  <div id="app">
    <router-view></router-view>
    <loading v-show="this.$store.state.global.ajax_loading"></loading>
    <blankPage v-show='this.$store.state.global.blankPage'></blankPage>
    <CustomerService v-show="this.$store.state.global.CustomerService"></CustomerService>
  </div>
</template>

<script>
  import loading from './components/Spinner'
  import blankPage from './components/BlankPage.vue'
  import * as checkJs from '../src/assets/js/pubFunc'
  import CustomerService from './components/CustomerService/CustomerService.vue'

  export default {
    name: 'app',
    components: {
      loading, blankPage, CustomerService,
    },
    data() {
      return {}
    },
    watch: {
      $route(to, from) {
        if (to.path === '/mark') {
          this.$router.replace({query: {}})
        }
        else {
          if (checkJs.getCookie('token')) {
            this.$router.replace({query: {p: localStorage.getItem('user')}})
          } else {
            return false
          }
        }
      }
    },
    mounted() {
//    if(!navigator.onLine){
//          this.$router.push({path:'/notFoundPage'})
//        }
      this.$store.state.global.footerhide = true;
    },
  }
</script>
<style lang="scss">
  @import './assets/css/base.scss';
</style>
