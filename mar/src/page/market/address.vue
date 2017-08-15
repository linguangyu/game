<template>
    <div class='address marginTop'>
      <!--头部-->
      <header class="bar bar-nav">
       <button @click='$router.go(-1)' class="button pull-right">
        完成
      </button>
      <h1 class="title">收货地址</h1>
      </header>
        <div class='address-input'>
          <ul>
            <li>姓名：<input type="text" placeholder='请输入姓名'></li>
            <li>手机：<input type="text" placeholder='请输入手机'></li>
            <li>所在地址：<input type="text" id='city-picker'  placeholder='点击选择'/></li>
            <li @click='add()'>详细地址：<input type="text" placeholder='请输入详细地址'></li>
          </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../assets/css/market.scss';
</style>

<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import city from '../../assets/js/city.js'
  export default{
    computed:{

    },
    mounted () {
        this.addressoption();
        },
    data () {
      return {
        city:''
      }
    },
    components: {

    },
    methods: {
    addressoption(){
     $("#city-picker").cityPicker({
          toolbarTemplate: '<header class="bar bar-nav">\
          <button class="button button-link pull-right close-picker">确定</button>\
          <h1 class="title">选择收货地址</h1>\
          </header>'
        });
    },
    add(){
      this.city=$("#city-picker")[0].value
    }
    },
  }
</script>
