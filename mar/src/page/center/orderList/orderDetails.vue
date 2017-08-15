<template>
  <div class="orderDetails" ref="orderDetails" v-show="orderDetails">
    <div class="orderDetails_header clearfix">
      <img src="./imgaes/jiantou.png" alt="" v-show="true" @click="ExitPayment">
      <p>订单详情</p>
    </div>
    <div class="orderDetails_information">
      <p class="information_title">个人信息</p>
      <div class="information_avatar">
        <img :src="Avatar" alt="">
      </div>
      <div class="information_content">
        <div class="content_title clearfix">
          <p class="title_left">{{item.nickName}}</p>
          <div class="title_right">
            <img src="./imgaes/dianuha.png" alt="">
            <p>{{item.phoneNum}}</p>
          </div>
        </div>
        <div class="content_intermediate">
          <p>游戏账号:{{item.accountNum}}</p>
          <p>登录密码:{{item.accountPwd}}</p>
          <p>安全锁:{{item.safetyLock}}</p>
        </div>
        <p class="content_foot">
          手机号:{{item.phoneNum}}
        </p>
      </div>
    </div>
    <div class="orderDetails_Notice">
      <div class="foot_details">
        <div class="details_left">
          <img v-if="item.packagePic" :src="'https://api.k5game.com/Temp/Downloads/'+ item.packagePic"  alt="">
          <img v-if="!item.packagePic" src="../../../assets/img/tpwzx.png" alt="">
        </div>
        <div class="details_right">
          <div class="right_title clearfix">
            <p class="title_Career">{{item.productTitle}}</p>
            <p class="title_KB">{{item.orderAmount?item.orderAmount+'kb':'待修改价格'}}</p>
          </div>
          <p class="right_mode">商品类型:{{item.packageName}}【{{item.productGroup}}】</p>
          <p class="right_game">所属游戏:{{item.gameName}}</p>
        </div>
      </div>
      <div class="foot_details_safeQuestion clearfix">
        <div class="safeQuestion_left">
          <span>购买安全问题</span>
          <img src="./imgaes/wenhao.png" alt="">
        </div>
        <div class="safeQuestion_right">
          <img src="./imgaes/jiantou.png" alt="">
        </div>
      </div>
      <div class="foot_details_service clearfix">
        <div class="safeQuestion_left">
          <span>售后服务</span>
          <img src="./imgaes/wenhao.png" alt="">
        </div>
        <div class="safeQuestion_right">
          <img src="./imgaes/jiantou.png" alt="">
        </div>
      </div>
    </div>
    <div class="orderDetails_date">
      <p>订单编号 :<span ref="Number"> {{item.id}}</span></p>
      <p>支付方式 :<span> {{item.payWayName? item.payWayName:'用户取消订单'}}</span></p>
      <p>创建日期 :<span> {{downOrderTime}}</span></p>
      <p>下单日期 :<span> {{downOrderTime}}</span></p>
      <p v-if="aTime">付款日期 :<span> {{payTime}}</span></p>
      <p v-if="cTime">取消日期 :<span> {{cancelOrderTime}}</span></p>
    </div>
  </div>
</template>
<script charset="UTF-8">
  import * as api from '../../../api/booster'
  import * as fun from '../../../assets/js/pubFunc.js'

  export default {
    props: {
      payOrderCodeB: {}
    },
    filters: {},
    data() {
      return {
        orderDetails: false,
        //数据集
        item: [],
//       头像
        Avatar: '',
        //        处理一个时间
        aTime: '',
        bTime: '',
        cTime: '',

        downOrderTime: '',
        payTime: '',
        cancelOrderTime: '',
      }
    },
    watch: {
      payOrderCodeB: function () {
        this.GetUserDetails()
      },
      aTime: function (val) {
        if(!val){
          return false
        }
        let aa = val.substring(0, 4)
        let bb = val.substring(5, 7).replace(/(^\s*)/g, "") - 1
        let cc = val.substring(8, 10)
        let dd = val.substring(11, 13)
        let ee = val.substring(14, 16)
        let earliestSDate = new Date(aa, bb, cc, dd, ee)
        earliestSDate = earliestSDate.getTime() + 1000 * 60 * 60 * 8;
        this.payTime = fun.formatDate(new Date(earliestSDate), "yyyy-MM-dd hh:mm");
      },
      bTime: function (val) {
        if(!val){
          return false
        }
        let aa = val.substring(0, 4)
        let bb = val.substring(5, 7).replace(/(^\s*)/g, "") - 1
        let cc = val.substring(8, 10)
        let dd = val.substring(11, 13)
        let ee = val.substring(14, 16)
        let earliestSDate = new Date(aa, bb, cc, dd, ee)
        earliestSDate = earliestSDate.getTime() + 1000 * 60 * 60 * 8;
        this.downOrderTime = fun.formatDate(new Date(earliestSDate), "yyyy-MM-dd hh:mm");
      },
      cTime: function (val) {
        if(!val){
          return false
        }
        let aa = val.substring(0, 4)
        let bb = val.substring(5, 7).replace(/(^\s*)/g, "") - 1
        let cc = val.substring(8, 10)
        let dd = val.substring(11, 13)
        let ee = val.substring(14, 16)
        let earliestSDate = new Date(aa, bb, cc, dd, ee)
        earliestSDate = earliestSDate.getTime() + 1000 * 60 * 60 * 8;
        this.cancelOrderTime = fun.formatDate(new Date(earliestSDate), "yyyy-MM-dd hh:mm");
      }
    },
    mounted() {

    },
    methods: {
      payHide() {
        this.orderDetails = false
      },
      payShow() {
        this.orderDetails = true
      },

      //退出
      ExitPayment() {
        this.orderDetails = false
      },
      GetUserDetails() {
        api.GetMyOrderInfo({
          orderId: this.payOrderCodeB
        }).then(
          res => {
            console.log(res)
            this.item = res.data.result
            if (!res.data.result.profilePictureId) {
              this.Avatar = 'https://api.k5game.com/Profile/GetProfilePictureById'
            } else {
              this.Avatar = 'https://api.k5game.com/Profile/GetProfilePictureById?id=' + res.data.result.profilePictureId
            }
            this.aTime = res.data.result.payTime;
            this.bTime = res.data.result.downOrderTime;
            this.cTime=res.data.result.cancelOrderTime
          },
          err => {
          }
        )
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import 'orderDetails';
</style>
