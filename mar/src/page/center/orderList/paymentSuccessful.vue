<template>
  <div class="paymentSuccessful" v-show="paymentSuccessful" ref="paymentSuccessful">
    <div class="paymentSuccessful_header clearfix">
      <img src="./imgaes/jiantou.png" alt="" v-show="true" @click="ExitPayment">
      <p>支付成功</p>
    </div>
    <div class="paymentSuccessful_title">
      <div class="title_Avatar">
        <img :src="Avatar" alt="">
      </div>
      <p class="title_name">{{item.nickName}}</p>
      <p class="title_phone">{{item.phoneNum}}</p>
      <p class="title_status">订单已生成</p>
      <img src="./imgaes/xingxing.png" alt="" class="title_bg">
    </div>
    <div class="paymentSuccessful_checkOrder">
      <div class="checkOrder" @click="zcheckOrder">
        查看订单
      </div>
    </div>
    <div class="paymentSuccessful_OrderContent">
      <div class="OrderContent_title">
        <div class="title_top clearfix">
          <p class="top_left">订单号:{{item.id}}</p>
          <p class="top_right">{{payTime}}</p>
        </div>
        <div class="title_under clearfix">
          <p class="under_left">支付方式</p>
          <p class="under_right">{{item.payWayString}}</p>
        </div>
      </div>
      <div class="OrderContent_center">
        <div class="details_left">
          <img v-if="item.packagePic" :src="'https://api.k5game.com/Temp/Downloads/'+ item.packagePic"  alt="">
          <img v-if="!item.packagePic" src="../../../assets/img/tpwzx.png" alt="">
        </div>
        <div class="details_right">
          <div class="right_title clearfix">
            <p class="title_Career">{{item.productTitle}}</p>
            <p class="title_KB">{{item.orderAmount}}kb</p>
          </div>
          <p class="right_mode">商品类型:{{item.packageName}}【{{item.productGroup}}】</p>
          <p class="right_game">所属游戏:{{item.gameName}}</p>
        </div>
      </div>
      <div class="OrderContent_foot">
        <span class="foot_shifu">实付:</span><span class="foot_price">{{item.orderAmount}}kb</span>
      </div>
    </div>
  </div>
</template>
<script charset="UTF-8">
  import * as api from '../../../api/booster'
  import * as fun from '../../../assets/js/pubFunc.js'

  export default {
    props: {
      payOrderCodeA: {},
    },
    data() {
      return {
        paymentSuccessful: false,
        //数据集
        item: [],
//       头像
        Avatar: '',
//        处理一个时间
        aTime: '',

        payTime: ''

      }
    },
    watch: {
      payOrderCodeA: function () {
        this.GetUserDetails()
      },
      aTime: function (val) {
        let aa = val.substring(0, 4)
        let bb = val.substring(5, 7).replace(/(^\s*)/g, "") - 1
        let cc = val.substring(8, 10)
        let dd = val.substring(11, 13)
        let ee = val.substring(14, 16)
        let earliestSDate = new Date(aa, bb, cc, dd, ee)
        earliestSDate = earliestSDate.getTime() + 1000 * 60 * 60 * 8;
        this.payTime = fun.formatDate(new Date(earliestSDate), "yyyy-MM-dd hh:mm");
      }
    },
    mounted() {
    },
    methods: {
      ExitPayment() {
        this.paymentSuccessful = false
      },
      SuccessShow() {
        this.paymentSuccessful = true
      },
      zcheckOrder() {
        this.$emit('changType')
        this.paymentSuccessful = false
      },
      //     获取用户的订单详情
      GetUserDetails() {
        api.GetMyOrderInfo({
          orderId: this.payOrderCodeA
        }).then(
          res => {
            this.item = res.data.result
            if (!res.data.result.profilePictureId) {
              this.Avatar = 'https://api.k5game.com/Profile/GetProfilePictureById'
            } else {
              this.Avatar = 'https://api.k5game.com/Profile/GetProfilePictureById?id=' + res.data.result.profilePictureId
            }
            this.aTime = res.data.result.payTime
          }
        )
      }

    }
  }
</script>
<style lang="scss" scoped>
  @import 'paymentSuccessful';
</style>
