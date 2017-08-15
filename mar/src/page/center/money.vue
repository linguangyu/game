<template>
 <div class="money colorfff marginTop">
    <header class="bar bar-nav">
      <a  v-if='this.$store.state.global.judge' @click='$router.go(-1)' class="icon icon-left pull-left"></a>
      <h1 class="title">资金管理</h1>
    </header>
    <div class='money-list'>
      <div class="list-block">
        <ul>
            <router-link :to="{name:'kbi'}"  tag='li'class="card">
              <div class="card-header">k币<span class="icon icon-right"></span></div>
              <div class="card-content">
                <div class="card-content-inner">可用K币 ：<span>{{availableCoins}}</span></div>
              </div>
              <div class="card-footer">冻结K币 ：<span>{{frozenCoins}}</span></div>
            </router-link>
          <router-link :to="{name:'kbi'}" tag='li' class="card">
              <div class="card-header">积分<span class="icon icon-right"></span></div>
              <div class="card-content">
                <div class="card-content-inner">可用积分 : <span>{{availablePoints}}</span></div>
              </div>
              <div class="card-footer">冻结积分 : <span>{{frozenPoints}}</span></div>
            </router-link >

          <router-link :to="{name:'kbi'}" tag='li' class="card">
              <div class="card-header">友谊赛<span class="icon icon-right"></span></div>
              <div class="card-content">
                <div class="card-content-inner">可用友谊赛 : <span>{{availableFriendlyMatchs}}</span></div>
              </div>
              <div class="card-footer">冻结友谊赛 ：<span>{{frozenFriendlyMatchs}}</span></div>
            </router-link>
        </ul>
      </div>
    </div>

 </div>
</template>
<style lang="scss" scoped>
@import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
import * as checkJs from '../../assets/js/pubFunc'
import { GetCurrentLoginInformationsApi } from '../../api/account.js'
export default{
     computed:{

      },
    mounted () {
      this.gerusermoney();
    },
    data () {
      return {
        availableCoins:'',
        frozenCoins:'',
        availablePoints:'',
        frozenPoints:'',
        availableFriendlyMatchs :'',
        frozenFriendlyMatchs :''
        }
      },
    components: {

    },
    methods: {
      gerusermoney(){
        GetCurrentLoginInformationsApi().then(
          res=>{
            this.availableCoins=res.data.result.userAsset.availableCoins;
            this.frozenCoins=res.data.result.userAsset.frozenCoins;
            this.availablePoints=res.data.result.userAsset.availablePoints;
            this.frozenPoints=res.data.result.userAsset.frozenPoints;
            this.availableFriendlyMatchs=res.data.result.userAsset.availableFriendlyMatchs;
            this.frozenFriendlyMatchs=res.data.result.userAsset.frozenFriendlyMatchs;
          },
          err=>{
             $.toast(err);
          }
        )
      }
    }
  }
</script>
