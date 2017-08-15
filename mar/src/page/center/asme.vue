<template>
 <div class="asme colorfff marginTop">

    <header class="bar bar-nav">
      <router-link v-if='this.$store.state.global.judge' :to="{ path: '/center'}" class="icon icon-left pull-left"></router-link>
      <h1 class="title">关于我们</h1>
    </header>
    <div class='asme-box'>
      <ul>
      <!--
         <li >
          <div id='one'></div>
           <img class='asmeimg' src="../../assets/img/gsjj.png" alt="">
            <a href="#two"> <img src="../../assets/img/huansejtou.png" alt=""></a>
         </li>
         -->
         <li >
            <div id='two'></div>
           <img class='asmeimg' src="../../assets/img/appjiesao.png" alt="">
            <a href="#three"> <img src="../../assets/img/heisejtou.png" alt=""></a>
         </li>
         <li >
            <div id='three'></div>
           <img class='asmeimg' src="../../assets/img/heikeshuo.png" alt="">
            <a href="#four"> <img src="../../assets/img/huansejtou.png" alt=""></a>
         </li>
         <li >
            <div id='four'></div>
           <img class='asmeimg' src="../../assets/img/kekaoshade.png" alt="">
            <a href="#five"> <img src="../../assets/img/huansejtou.png" alt=""></a>
         </li>
         <li >
          <div id='five'></div>
           <img class='asmeimg' src="../../assets/img/quanszi.png" alt="">
            <a href="#six"> <img src="../../assets/img/huansejtou.png" alt=""></a>
         </li>
         <li >
           <div id='six'></div>
           <img class='asmeimg' src="../../assets/img/xiexieguans.png" alt="">
            <a href="#two"> <img src="../../assets/img/huanseshang.png" alt=""></a>
         </li>
      </ul>
    </div>
 </div>
</template>
<style lang="scss" scoped>
@import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
import * as checkJs from '../../assets/js/pubFunc'
import { GetCurrentLoginInformationsApi } from '../../api/account.js'
export default{
     computed:{

      },
    mounted () {
    },
    data () {
      return {
        }
      },
    components: {

    },
    methods: {

    }
  }
</script>
