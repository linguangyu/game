<template>
  <div class="OrderPayment" ref="OrderPayment" v-show="OrderPayment">
    <div class="OrderPayment_header clearfix">
      <img src="./imgaes/jiantou.png" alt="" v-show="true" @click="ExitPayment">
      <p>支付订单</p>
    </div>
    <div class="OrderPayment_information">
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
          <p>游戏账号：{{item.accountNum}}</p>
          <p>登录密码：{{item.accountPwd}}</p>
          <p>安全锁：{{item.safetyLock}}</p>
        </div>
        <p class="content_foot">
          手机号：{{item.phoneNum}}
        </p>
      </div>
    </div>
    <div class="OrderPayment_Notice">
      <div class="foot_details">
        <div class="details_left">
          <img v-if="item.packagePic" :src="'https://api.k5game.com/Temp/Downloads/'+ item.packagePic"  alt="">
          <img v-if="!item.packagePic" src="../../assets/img/tpwzx.png" alt="">
        </div>
        <div class="details_right">
          <div class="right_title clearfix">
            <p class="title_Career">{{item.productTitle}}</p>
            <p class="title_KB">{{item.orderAmount}}kb</p>
          </div>
          <p class="right_mode">商品类型：{{item.packageName}}【{{item.productGroup}}】</p>
          <p class="right_game">所属游戏：{{item.gameName}}</p>
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
    <div class="OrderPayment_foot">
      <div class="foot_price">还需支付<span class="price">{{item.orderAmount}}</span><span class="KB">kb</span></div>
      <div class="foot_pay" @click="payImmediately">立即支付</div>
    </div>
  </div>
</template>
<script charset="UTF-8">
  import * as api from '../../api/booster'

  export default {
    props: {
      payOrderCode: {},
      ProductnPrice: {},
    },
    filters: {},
    data() {
      return {
        OrderPayment: false,
        //个人用户的KB
        availableCoins: '',
        //数据集
        item: [],
//       头像
        Avatar: '',
      }
    },
    watch: {
      payOrderCode: function () {
        this.GetUserDetails()
      }
    },
    mounted() {
      this.getPersonalUser()
    },
    methods: {
      payHide() {
        this.OrderPayment = false
      },
      payShow() {
        this.OrderPayment = true
      },

      //立即支付支付
      payImmediately() {
        if (this.availableCoins < this.ProductnPrice) {
          $.toast("KB不足，充值后，进入个人中心查看未付款订单");
          setTimeout(function () {
            window.location.reload();
          }, 2000)
        } else {
          api.UserPayment({
            orderId: this.payOrderCode.orderId
          }).then(
            res => {
              $.toast('购买成功');
              this.$emit('success', this.item.id);
              this.OrderPayment = false
            },
            err => {
              $.toast(err);
            }
          )
        }
      },
      //退出支付
      ExitPayment() {
        $.toast('已在个人订单里面生成待付款订单');
        self=this
        setTimeout(function () {
          window.location.reload()
        }, 2000)
      },
      //获取个人用户的KB 进行判断
      getPersonalUser() {
        api.GetCurrentLoginInformationsApi().then(
          res => {
            console.log(res)
            this.availableCoins = res.data.result.userAsset.availableCoins;
          },
          err => {
            $.toast(err);
          }
        )
      },
//     获取用户的订单详情
      GetUserDetails() {
        api.GetMyOrderInfo({
          orderId: this.payOrderCode.orderId
        }).then(
          res => {
            this.item = res.data.result
            if (!res.data.result.profilePictureId) {
              this.Avatar = 'https://api.k5game.com/Profile/GetProfilePictureById'
            } else {
              this.Avatar = 'https://api.k5game.com/Profile/GetProfilePictureById?id=' + res.data.result.profilePictureId
            }
          },
          err => {

          }
        )
      }
    }


  }
</script>
<style lang="scss" scoped>
  @import 'OrderPayment';
</style>
