<template>
  <div class="orderDetails" ref="orderDetails" v-show="orderDetails">
    <div class="orderDetails_header clearfix">
      <img src="./imgaes/jiantou.png" alt="" v-show="true" @click="TState">
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
            <p>{{userPhone}}</p>
          </div>
        </div>
        <p class="content_foot">
          手机号:{{item.userContact}}
        </p>
      </div>
    </div>
    <div class="orderDetails_Notice">
      <div class="foot_details">
        <div class="details_left">
          <img v-if="ProductBg" :src="ProductBg" alt="">
          <img v-if="!ProductBg" src="../../assets/img/tpwzx.png" alt="">
        </div>
        <div class="details_right" @click="JumpDetailsC(item.saleOrder.id,item.status)">
          <div class="right_title clearfix">
            <p class="title_Career">{{item.saleOrder.accountName}}</p>
            <p class="title_KB">{{item.saleOrder.accountPrice}}kb</p>
          </div>
          <p class="right_mode">商品类型:{{item.saleOrder.accountType}}</p>
          <p class="right_game">所属游戏:炉石传说</p>
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
      <p v-if="item.saleOrder.accountPrice">支付方式 :<span> {{item.saleOrder.accountPrice ? 'k币支付' : '用户取消订单'}}</span></p>
      <p v-if="aTime">创建日期 :<span> {{aTimea}}</span></p>
      <p v-if="bTime">下单日期 :<span> {{aTimeb}}</span></p>
      <p v-if="cTime">付款日期 :<span> {{aTimec}}</span></p>
      <p v-if="dTime">取消日期 :<span> {{aTimed}}</span></p>
    </div>
  </div>
</template>
<script charset="UTF-8">
  import * as api from '../../api/accountNumber.js';
  import * as fun from '../../assets/js/pubFunc.js'

  export default {
    filters: {},
    created() {

    },
    data() {
      return {
        orderDetails: true,
        //数据集
        item: {
          saleOrder: {}
        },
//       头像
        Avatar: '',
        //        处理一个时间
        aTime: '',
        bTime: '',
        cTime: '',
        dTime: '',

        aTimea: '',
        aTimeb: '',
        aTimec: '',
        aTimed: '',
        payOrderCodeB: '',
//       获取用户的信息
        userPhone: '',
//        用于跳转时候的状态
        JState: '',
//       图片
        ProductBg: ''
      }
    },
    watch: {
      payOrderCodeB: function () {
        this.GetUserDetails()
      },

      aTime: function (val) {
        if (!val) {
          return false
        }
        let aa = val.substring(0, 4)
        let bb = val.substring(5, 7).replace(/(^\s*)/g, "") - 1
        let cc = val.substring(8, 10)
        let dd = val.substring(11, 13)
        let ee = val.substring(14, 16)
        let earliestSDate = new Date(aa, bb, cc, dd, ee)
        earliestSDate = earliestSDate.getTime() + 1000 * 60 * 60 * 8;
        this.aTimea = fun.formatDate(new Date(earliestSDate), "yyyy-MM-dd hh:mm");
      },
      bTime: function (val) {
        if (!val) {
          return false
        }
        let aa = val.substring(0, 4)
        let bb = val.substring(5, 7).replace(/(^\s*)/g, "") - 1
        let cc = val.substring(8, 10)
        let dd = val.substring(11, 13)
        let ee = val.substring(14, 16)
        let earliestSDate = new Date(aa, bb, cc, dd, ee)
        earliestSDate = earliestSDate.getTime() + 1000 * 60 * 60 * 8;
        this.aTimeb = fun.formatDate(new Date(earliestSDate), "yyyy-MM-dd hh:mm");
      },
      cTime: function (val) {
        if (!val) {
          return false
        }
        let aa = val.substring(0, 4)
        let bb = val.substring(5, 7).replace(/(^\s*)/g, "") - 1
        let cc = val.substring(8, 10)
        let dd = val.substring(11, 13)
        let ee = val.substring(14, 16)
        let earliestSDate = new Date(aa, bb, cc, dd, ee)
        earliestSDate = earliestSDate.getTime() + 1000 * 60 * 60 * 8;
        this.aTimec = fun.formatDate(new Date(earliestSDate), "yyyy-MM-dd hh:mm");
      },
      dTime: function (val) {
        if (!val) {
          return false
        }
        let aa = val.substring(0, 4)
        let bb = val.substring(5, 7).replace(/(^\s*)/g, "") - 1
        let cc = val.substring(8, 10)
        let dd = val.substring(11, 13)
        let ee = val.substring(14, 16)
        let earliestSDate = new Date(aa, bb, cc, dd, ee)
        earliestSDate = earliestSDate.getTime() + 1000 * 60 * 60 * 8;
        this.aTimed = fun.formatDate(new Date(earliestSDate), "yyyy-MM-dd hh:mm");
      }
    },
    mounted() {
      this.getPersonalUser();
      if (this.$route.params.PaymentOrderId) {
        this.payOrderCodeB = this.$route.params.PaymentOrderId
        this.JState = this.$route.params.State
        sessionStorage.setItem('payOrderCodeB', this.$route.params.PaymentOrderId)
        sessionStorage.setItem('JState', this.$route.params.State)
      } else {
        this.payOrderCodeB = sessionStorage.getItem('payOrderCodeB');
        this.JState = Number(sessionStorage.getItem('JState'))
      }
    },
    methods: {
      payHide() {
        this.orderDetails = false
      },
      payShow() {
        this.orderDetails = true
      },
      GetUserDetails() {
        api.GetMyPurchaseAccountTransactiondetails({
          id: this.payOrderCodeB
        }).then(
          res => {
            this.item = res.data.result;
            //            创建时间
            this.aTime = res.data.result.creationTime;
//            下单时间
            this.bTime = res.data.result.placeOrderTime;
//            付款时间
            this.cTime = res.data.result.paymentTime
//            取消时间
            this.dTime = res.data.result.cancelTime;
            if (res.data.result.saleOrder.screenshots[0]) {
              this.ProductBg = 'https://api.k5game.com/Upload/Downloads/' + res.data.result.saleOrder.screenshots["0"].url
            } else {
              this.ProductBg = ''
            }
          },
          err => {
          }
        )
      },
      TState() {
        if (this.JState === 1) {
          this.$router.push({name: 'OrderLists', params: {activeIndex: 2, ModifyTheState: 1, JumpName: '待发货'}})
        } else if (this.JState === 3) {
          this.$router.push({name: 'OrderLists', params: {activeIndex: 6, ModifyTheState: 1, JumpName: '已完成'}})
        } else if (this.JState === -1) {
          this.$router.push({name: 'OrderLists', params: {activeIndex: 5, ModifyTheState: 1, JumpName: '已取消'}})
        } else if (this.JState === 2) {
          this.$router.push({name: 'OrderLists', params: {activeIndex: 4, ModifyTheState: 1, JumpName: '已发货'}})
        } else {
          this.$router.push({name: 'OrderLists', params: {activeIndex: null, ModifyTheState: 1, JumpName: ''}})
        }
        sessionStorage.removeItem('payOrderCodeB');
        sessionStorage.removeItem('JState');
      },
//    获取用户信息
      getPersonalUser() {
        api.GetCurrentLoginInformationsApi().then(
          res => {
            this.userPhone = res.data.result.user.phoneNumber
            if (!res.data.result.user.profilePictureId) {
              this.Avatar = 'https://api.k5game.com/Profile/GetProfilePictureById'
            } else {
              this.Avatar = 'https://api.k5game.com/Profile/GetProfilePictureById?id=' + res.data.result.user.profilePictureId
            }
          },
          err => {
            $.toast(err);
          }
        )
      },
//    跳到账号详情
      JumpDetailsC(id, status) {
        this.$router.push({name: 'accoutNumberDateils', params: {gameName:'id',accoutNumberDateilsId: id}})
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import 'orderDetails';
</style>
