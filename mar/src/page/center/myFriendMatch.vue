<template>
  <div class="myFriendMatch  marginTop colorfff">
    <header class="bar bar-nav">
      <a v-if='this.$store.state.global.judge' @click='$router.go(-1)' class="icon icon-left pull-left"></a>
      <router-link :to="{name:'userFriendLogs'}" tag='span' class="icon pull-right" style="font-size:16px;">明细
      </router-link>
      <h1 class="title">我的友谊赛</h1>
    </header>
    <div class="myFriendMatch_number">
      <div class="myFriendMatch_number_match">
        <p class="myFriendMatch_number_match_top">{{availableFriendlyMatchs}}</p>
        <p class="myFriendMatch_number_match_name">剩余友谊赛</p>
      </div>
      <div class="myFriendMatch_number_dh">
        <img src="../../assets/img/salefirend/2.png" alt="">
      </div>
    </div>
    <div class="myFriendMatch_all">
      <div class="myFriendMatch_wave"><img src="../../assets/img/yousaidongtu.gif" alt=""></div>
      <div class="myFriendMatch_foot">
        <router-link @click.native='gotoectract()' :to="{ name:'extractrecords' }" tag='div'
                     class="myFriendMatch_foot_one myFriendMatch_foot_all">
          <img src="../../assets/img/salefirend/tiqujilbai.png" alt="">
          <p>提取记录</p>
        </router-link>
        <div class="myFriendMatch_foot_two myFriendMatch_foot_all" @click='getGranted($event)'>
          <img src="../../assets/img/salefirend/cunrujilvbai.png" alt="">
          <p>存入记录</p>
        </div>
        <router-link :to="{ name:'salefirend' }" tag='div'
                     class="myFriendMatch_foot_three myFriendMatch_foot_all">
          <img src="../../assets/img/salefirend/chushouyouyisbai.png" alt="">
          <p>正在出售</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
  import {GetCurrentLoginInformationsApi} from '../../api/account.js'
  import {HasPermissionApi} from '../../api/account.js'

  export default {
    computed: {},
    mounted() {
      this.gerusermoney();
    },
    data() {
      return {
        availableFriendlyMatchs: '',
      }
    },
    components: {},
    methods: {
      gerusermoney() {
        GetCurrentLoginInformationsApi().then(
          res => {
            this.availableFriendlyMatchs = res.data.result.userAsset.availableFriendlyMatchs;
            this.frozenFriendlyMatchs = res.data.result.userAsset.frozenFriendlyMatchs;
          },
          err => {
            $.toast(err);
          }
        )
      },
      gotoectract() {//进入提取页面
        dplus.track('提取比赛', {name: '提取比赛按钮'})//Dplus 市场页面的购买按钮
      },
//      存入比赛
      getGranted(e) {//存入友谊赛的权限
        HasPermissionApi({id: 'Pages.HearthStone.FriendMatch.CreateDepositOrder'}).then(
          res => {
            if (!res.data.result) {
              $.alert('请添加微信:Rasy003开通权限');
              return;
            }
//            else {
//              if (e.target.innerHTML == '存入记录') {
//                this.$router.push({name: 'Intherecord'})
//              } else {
//                this.$router.push({name: 'deposit'})
//              }
//            }
          }, err => {
            $.toast(err)
          }
        )
      },
    }
  }
</script>
