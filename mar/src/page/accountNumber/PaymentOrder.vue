<template>
  <div class='PaymentOrder'>
    <header class="bar bar-nav">
      <a class="icon icon-left pull-left" @click="TState"></a>
      <h1 class="title">支付订单</h1>
    </header>
    <div class="userlogo">
      <p><img :src="userlogoImg" alt=""></p>
      <h1>个人信息</h1>
      <p>{{phoneNumber}}</p>
      <p>{{nickName}}</p>
    </div>
    <div class="PaymentOrder_dateil clearfix" @click="GoToDetails">
      <p>
        <img v-if="screenshots" :src="screenshots" alt="">
        <img v-if="!screenshots" src="../../assets/img/tpwzx.png" alt=""></p>
      <div>
        <h1>{{accountName}} <span>{{accountPrice}}KB</span></h1>
        <p>商品类型：{{accountType}}</p>
        <p>所属游戏：{{gameName}}</p>
      </div>
    </div>
    <div class="PaymentOrder_problem">
      <ul>
        <li>购买安全问题  <span class="icon pull-right icon-right"></span></li>
        <li>售后服务  <span class="icon pull-right icon-right"></span></li>
      </ul>
    </div>
    <div class="PaymentBtn clearfix">
      <p>还需支付 <span>{{accountPrice}}KB</span>
        <button @click="createPurchaseOrder()">立即支付</button>
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import 'accountNumber';
</style>
<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc';
  import {GetMyPurchaseAccountTransactiondetailsApi} from '../../api/accountNumber.js';
  import {PayPurchaseAccountTransaction} from '../../api/accountNumber.js';
  import {GetCurrentLoginInformationsApi} from '../../api/account.js';

  export default {
    computed: {},
    mounted() {
      this.getUserInfo();
      this.getaccountDatails();
      this.JState = this.$route.params.State
    },
    data() {
      return {
        userlogoImg: '',
        nickName: '',
        phoneNumber: '',
        accountName: '',
        gameName: '',
        screenshots: '',
        accountPrice: '',
        accountType: '',
        saleAccountId: '',
//       根据状态返回不同的页面
        JState: '',

      }
    },
    components: {},
    methods: {
      getUserInfo() {
        GetCurrentLoginInformationsApi().then(
          res => {
            this.userlogoImg = res.data.result.user.profilePictureId ? 'https://api.k5game.com/Profile/GetProfilePictureById?id=' + res.data.result.user.profilePictureId : 'https://api.k5game.com/Profile/GetProfilePictureById';
            this.phoneNumber = res.data.result.user.phoneNumber;
            this.nickName = res.data.result.user.nickName;
          },
          err => {
            $.toast(err);
          }
        );
      },
      getaccountDatails() {
        GetMyPurchaseAccountTransactiondetailsApi({id: this.$route.params.PaymentOrderId}).then(
          res => {
            if (res.data.result.saleOrder.screenshots[0]) {
              this.screenshots = 'https://api.k5game.com/Upload/Downloads/' + res.data.result.saleOrder.screenshots[0].url;
            } else {
              this.screenshots = '';
            }
            this.accountName = res.data.result.saleOrder.accountName;
            this.gameName = res.data.result.saleOrder.gameName;
            this.accountPrice = res.data.result.saleOrder.accountPrice;
            this.accountType = res.data.result.saleOrder.accountType;
            this.saleAccountId = res.data.result.saleOrder.id;

          }, err => {
            $.toast(err)
          }
        )
      },
      createPurchaseOrder() {
        PayPurchaseAccountTransaction({Id: this.$route.params.PaymentOrderId}).then(
          res => {
            if (res.data.success) {
              this.$router.push({
                name: 'TheOrderDetails',
                params: {TheOrderDetailsId: this.$route.params.PaymentOrderId}
              })
            } else {
              $.toast(res.data.error.message);
              let self = this;
              setTimeout(function () {
                self.$router.push({name: 'OrderLists', params: {activeIndex: 0, ModifyTheState: 1, JumpName: '待支付'}})
              }, 1000)
            }
          }, err => {
            $.toast(err);
          }
        )
      },
      TState() {
        if (sessionStorage.getItem('GoToDetails')) {
          this.$router.push({name: 'OrderLists'})
          sessionStorage.removeItem('GoToDetails')
        } else {
          if (this.JState === 1) {
            this.$router.push({name: 'OrderLists'})
          } else if (this.JState === 3) {
            this.$router.push({name: 'OrderLists', params: {activeIndex: 4, ModifyTheState: 1, JumpName: '已取消'}})
          } else {
            $.toast("退出购买，订单已经生成到个人中心");
            let self = this
            setTimeout(function () {
              self.$router.push({path: '/market/AccountTarde/2/', params: {gameName: 'id'}})
            }, 1000)
          }
        }

      },
      GoToDetails() {
        if (this.JState === 1) {
          sessionStorage.setItem('GoToDetails', 111)
          this.$router.push({
            name: 'accoutNumberDateils',
            params: {gameName: 'id', accoutNumberDateilsId: this.saleAccountId, JudgmentState: 1}
          })
        } else {
          this.$router.push({
            name: 'accoutNumberDateils',
            params: {gameName: 'id', accoutNumberDateilsId: this.saleAccountId, JudgmentState: 1}
          })
        }
      }
    },
  }
</script>
