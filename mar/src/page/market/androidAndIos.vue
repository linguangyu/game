<template>
  <div class="androidAndios">
      <header class="bar bar-nav">
      <a @click='$router.go(-1)'  v-if='this.$store.state.global.judge' class="icon icon-left pull-left" ></a>
         <div class="buttons-row">
            <a href="#tab1" class="tab-link active button">IOS</a>
            <a href="#tab2" class="tab-link button">Android</a>
          </div>
      </header>
      <div class="content">
        <div class="content-block">
        
        </div>
        <div class="tabs">
          <div id="tab1" class="tab active">
            <div class="content-block">
              <div class='system-box'>
                <img src="../../assets/img/ios.png" alt="">
              </div>
              <p>扫一扫二维码下载K5点击APP</p>
              <strong>当前为ios系统，切换请点击顶部</strong>
            </div>
          </div>
          <div id="tab2" class="tab">
            <div class="content-block">
              <div class='system-box'>
                <img src="../../assets/img/Android1.png" alt="">
              </div>
              <p>扫一扫二维码下载K5点击APP</p>
              <strong>当前为Android系统，切换请点击顶部</strong>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<style lang="scss">
  @import './../../assets/css/market.scss';
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
     
    }
  }
</script>
