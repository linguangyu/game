<template>
  <div class='TheOrderDetails'>
    <header class="bar bar-nav">
      <a class="icon icon-left pull-left" @click="$router.push({path:'/accountNumber'})"></a>
      <h1 class="title">订单详情</h1>
    </header>
    <div class="userlogo">
      <p><img :src="userlogoImg" alt=""></p>
      <h2>{{nickName}}</h2>
      <p>{{phoneNumber}}</p>
      <h1>订单已生成</h1>
      <div class="goumaichengon"><img src="../accountNumber/imgaes/goumaichengon.png" alt=""></div>
    </div>
    <div class="TheOrderDetails_getAccount">
      <button @click="modelShow">查看订单</button>
    </div>
    <div class="TheOrderDetails_Details">
      <p>订单号：{{purchaseId}} <span>{{creationTime}}</span></p>
      <p>支付方式 <span>KB</span></p>
      <div class="clearfix">
        <img v-if="screenshots" :src="screenshots" alt="">
        <img v-if="!screenshots" src="../../assets/img/tpwzx.png" alt="">
        <h1>产品名:{{accountName}}<span>{{accountPrice}}kb</span></h1>
        <p>商品类型：{{accountType}}</p>
        <p>所属区服：{{gameArea}}</p>
      </div>
      <p class="RealPay">实付: <span>{{accountPrice}}kb</span></p>
    </div>
    <div class="accountNumberModel" v-if="modelhide">
      <h6>商品信息</h6>
      <p><span>游戏账号：</span>{{accountNumber}}</p>
      <p><span>游戏密码：</span>{{accountPassWord}}</p>
      <p><span>安全锁：</span>{{accountTheLock}}</p>
      <div>请使用游戏账号和密码登入游戏校验商品,并修改登入密码</div>
      <button @click.self="modelHideBtn()">知道了</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'accountNumber';

</style>
<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc';
  import {GetMyPurchaseAccountTransactiondetailsApi} from '../../api/accountNumber.js';
  import {GetCurrentLoginInformationsApi} from '../../api/account.js';

  export default {
    computed: {},
    mounted() {
      this.getUserInfo();
      this.getaccountDatails();
    },
    data() {
      return {
        userlogoImg: '',
        phoneNumber: '',
        nickName: '',
        accountName: '',
        screenshots: '',
        accountPrice: '',
        accountType: '',
        purchaseId: '',
        creationTime: '',
        gameArea: '',
        accountNumber: '',
        accountPassWord: '',
        accountTheLock: '',
        modelhide: false
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
        GetMyPurchaseAccountTransactiondetailsApi({id: this.$route.params.TheOrderDetailsId}).then(
          res => {
            if(res.data.result.saleOrder.screenshots[0]){
              this.screenshots = 'https://api.k5game.com/Upload/Downloads/' + res.data.result.saleOrder.screenshots[0].url;
            }else{
              this.screenshots='';
            }
            this.creationTime = checkJs.formatDate(new Date(res.data.result.creationTime), "yyyy-MM-dd hh:mm");
            this.purchaseId = res.data.result.id;
            this.accountName = res.data.result.saleOrder.accountName;
            this.accountType = res.data.result.saleOrder.accountType;
            this.accountPrice = res.data.result.saleOrder.accountPrice;
            this.gameArea = res.data.result.saleOrder.gameArea;
            this.accountNumber = res.data.result.saleOrder.accountNumber;
            this.accountPassWord = res.data.result.saleOrder.accountPassWord;
            this.accountTheLock = res.data.result.saleOrder.accountTheLock;
          }, err => {
            $.toast(err)
          }
        )
      },
      modelShow() {
        this.$router.push({name: 'OrderLists', params: {activeIndex: 4, ModifyTheState: 1, JumpName: "已发货"}})
      },
      modelHideBtn() {
        this.modelhide = false;
      }
    },
  }
</script>
