<template>
  <div class='buy marginTop'>
    <!--头部-->
    <header class="bar bar-nav">
      <a @click="$router.push({path:'/market/HSFriend/'})"  v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></a>
      <router-link :to="{name:'kbi'}" class="icon  pull-right" style='font-size:.7rem;'>记录</router-link>
      <h1 class="title">K币充值</h1>
    </header>
    <div class='buy-user'>
      <div class='buy-content clearfix'>
        <p class='buy-logo'><img :src='profilePictureId' alt=""></p>
        <p class='buy-alipay'><img src="../../assets/img/zhifubaoicon.png" alt=""></p>
        <p class='buy-remaining'>剩余K币： <span>{{availableCoins}}</span></p>
        <p class='buy-name'><span>{{nickName}}</span><br>{{phoneNumber}}</p>
      </div>
    </div>
    <div class='buy-topUp'>
      <!--
        <h1>手动充值</h1>
        <p><input type="text" placeholder='请输入金额' v-model='kbinum' @click='numberChange($event)'></p>
-->
      <p class='buy-package'>优惠套餐</p>
      <div class='clearfix '>
        <dl @click='activeBtn(10)' :class="{'active':this.jsPrice===10}">
          <dt>10<span>K币</span></dt>
          <dd>售价：10元</dd>
        </dl>
        <dl @click='activeBtn(50)' :class="{'active':this.jsPrice===50}">
          <dt>50+5<span>K币</span></dt>
          <dd>售价：50元</dd>
        </dl>
        <dl @click='activeBtn(100)' :class="{'active':this.jsPrice===100}">
          <dt>100+10<span>K币</span>  </dt>
          <dd>售价：100元</dd>
        </dl>
        <dl @click='activeBtn(200)' :class="{'active':this.jsPrice===200}">
          <dt>200+20<span>K币</span></dt>
          <dd>售价：200元</dd>
        </dl>
      </div>
      <div class='buy-Realpay'>
        <p>实付金额：{{kbinum}}元</p>

        <p v-if='!hidden' class='kbi-num'>K币： {{kbinum}}KB</p>
        <p class='kbi-num' v-if='hidden'>K币：{{rmbNum}}KB</p>
        <button @click.prevent='determineRealpay($event)'>确定充值</button>
      </div>
    </div>
    <div class='buy-form' style='display:none;'></div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../assets/css/market.scss';
</style>

<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import {GetCurrentLoginInformationsApi} from '../../api/account.js'
  import * as api from '../../api/pay'

  export default {
    computed: {},
    mounted() {
      this.getUserLoginInfor();
    },
    updated() {
      $('#alipaysubmit').submit();
    },
    data() {
      return {

        profilePictureId: '',
        nickName: '',
        phoneNumber: '',
        availableCoins: '',
        kbinum: '',//kbi 数量
        rmbNum: '',
        packageNum: [50, 100, 200],
        hidden: false,
        jsPrice: ''
      }
    },
    components: {},
    methods: {
      numberChange(e) {//input change时间

//        this.hidden=false;
      },
      getUserLoginInfor() {//获取用户登入信息
        GetCurrentLoginInformationsApi().then(
          res => {
            this.profilePictureId = res.data.result.user.profilePictureId ? 'https://api.k5game.com/Profile/GetProfilePictureById?id=' + res.data.result.user.profilePictureId : 'https://api.k5game.com/Profile/GetProfilePictureById';
            this.nickName = res.data.result.user.nickName;
            this.phoneNumber = res.data.result.user.phoneNumber;
            this.availableCoins = res.data.result.userAsset.availableCoins;
          }, err => {
            $.toast(err)
          }
        )
      },
      activeBtn(price) {//选中套餐按钮
        this.hidden = true;
        if (price === 10) {
          this.jsPrice = 10;
          this.kbinum = 10;
          this.rmbNum = 10;
        } else if (price === 50) {
          this.jsPrice = 50;
          this.kbinum = 50;
          this.rmbNum = 55;
        } else if (price === 100) {
          this.jsPrice = 100;
          this.kbinum = 100;
          this.rmbNum = 110;
        } else {
          this.jsPrice = 200;
          this.kbinum = 200;
          this.rmbNum = 220;
        }
        dplus.track('选中套餐', {name: '选中套餐按钮'})//Dplus 选中套餐按钮
      },
      determineRealpay() {//确定充值按钮
        api.CreateCoinOrderApi({amount: this.jsPrice}).then(
          res => {
            api.CreatePayApi({orderId: res.data.result, paymentMethod: "支付宝"}).then(
              res => {
                if (!checkJs.isWeixinBrowser()) {
                  dplus.track('确定充值', {name: '确定充值按钮'});//Dplus 提取友谊赛准备对战按钮
                  $('.buy-form').append(res.data.result)
                } else {
//                $('.buy-form').append(res.data.result)
                  $.toast('请使用外部浏览器打开网站，登录后在购买')
                }
              }, err => {
                $.toast(err)
              }
            )
          }, err => {
            $.toast(err)
          }
        )
      },

    },
  }
</script>
