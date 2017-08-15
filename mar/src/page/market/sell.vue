<template>
    <div class='buy marginTop'>
      <!--头部-->
      <header class="bar bar-nav">
       <router-link :to='{path:"/routerview"}'  v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></router-link>
      <h1 class="title">上架确认</h1>
      </header>
     <!--兑换券说明-->
     <div class='certificate clearfix'>
      <!--<p><img src="../../assets/img/11.jpg" alt=""></p>-->
      <p>
         友谊赛任务 <br>
       <span>本产品为炉石传说友谊赛任务兑换券，用于跟其他好友兑换友谊赛使用</span>
      </p>
     </div>
     <!--价格数量-->
     <div class='price-quantity'>
      <p>物品单价<span>12kb</span></p>
      <p>数量<span>1件</span></p>
     </div>
     <!--总价-->
     <div class='rental'>
        <p>订单总额<span>12kb</span></p>
     </div>
     <!--表单按钮-->
     <div class='buy-form'>
      <label><input name="rules" type="checkbox" value="" />我已经阅读友谊赛使用说明</label> <br>
      <label><input name="rules" type="checkbox" value="" />我同意购买条款</label>
        <button>上架</button>
     </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../assets/css/market.scss';
</style>

<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
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

    },
  }
</script>
