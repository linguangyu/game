<template>
 <div class="kbi colorfff marginTop">
    <header class="bar bar-nav">
      <a  v-if='this.$store.state.global.judge' @click='$router.go(-1)' class="icon icon-left pull-left"></a>
      <a v-show='!hidden'  class="icon pull-right" style='color:#8c8c8c;font-size:.6rem;'>冻结{{frozenCoins}}kb</a>
      <h1 v-show="hidden" class="title">K币详情</h1>
      <h1 v-show='!hidden'  class="title" style='color:#ffb800;'>可用 <span style='color:#ffb800;font-size:1.5rem;'>{{availableCoins}}</span> kb</h1>
    </header>

    <div class='kbi-details' @scroll='scrollhidden()' ref="scrollContainer">
    <div class='kbi-chart'>
    <!--半圆-->
      <div class='kbi-area'>
        <p>可用 <span>{{availableCoins}}</span> KB</p>
        <span>已用{{frozenCoins}}kB</span>
      </div>
    </div>
      <ul>
        <li v-for="item in items" class='clearfix'>
         <dl>
          <dt>{{item.title}}</dt>
          <dd>{{item.creationTime}}</dd>
         </dl>
          <span>{{item.amount}}KB</span>
        </li>
         <mugen-scroll :handler="fetchData" :should-handle="!loading" scroll-container="scrollContainer">
          <div class="infinite-scroll-preloader">
              <div class="preloader" ></div>
          </div>
        </mugen-scroll>
      </ul>
    </div>

 </div>
   <!--
    <canvas v-show='hidden' id='kbicanvas'></canvas>
    <div  v-show='hidden' class='kbidata'>
    <span class='zero'> 0kb</span>
    <p class='kbiusable'>可用 <span>{{availableCoins}}</span> kb</p>
    <span class='kbfreeze'>冻结{{frozenCoins}}kb</span>
    <span class='twooo'>200kb</span>
    </div>
   -->
</template>
<style lang="scss" scoped>
@import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
import * as checkJs from '../../assets/js/pubFunc'
import { GetCurrentLoginInformationsApi } from '../../api/account.js'
import { GetMyPurchaseOrdersApi } from '../../api/transaction.js'
import {  GetUserCoinLogsApi  } from '../../api/transaction.js'
import MugenScroll from 'vue-mugen-scroll'
export default{
     computed:{

      },

    data () {
      return {
          availableCoins:'',
          frozenCoins:'',
          hidden:true,
          items:[],
          loading:false,
          skipCount:10
        }
      },
       mounted () {
      this.getuesrfund();
      this.GetUserCoinLogsApi();
    },
    components: {
    MugenScroll
    },
    methods: {
       fetchData() {//底部无限滚动方法
        this.loading = true
            let PendingOrders = {
              maxResultCount:5,
              skipCount:this.skipCount
            }
           GetUserCoinLogsApi(PendingOrders).then(
                  res=>{
                      for(let i=0;i<res.data.result.items.length;i++){
                        res.data.result.items[i].creationTime=checkJs.formatDate(new Date(res.data.result.items[i].creationTime),"yyyy-MM-dd hh:mm")
                          switch(res.data.result.items[i].source){
                             case 0:
                              res.data.result.items[i].title='系统赠送';
                              break;
                              case 1:
                              res.data.result.items[i].title='任务奖励';
                              break;
                              case 2:
                              res.data.result.items[i].title='消费奖励';
                              break;
                              case 3:
                              res.data.result.items[i].title='佣金奖励';
                              break;
                              case 4:
                              res.data.result.items[i].title='购买友谊赛';
                              break;
                              case 5:
                              res.data.result.items[i].title='出售友谊赛';
                              break;
                              case 6:
                              res.data.result.items[i].title='充值K币';
                              break;
                              case 7:
                              res.data.result.items[i].title='购买账号';
                              break;
                              case 8:
                              res.data.result.items[i].title='出售账号';
                              break;
                        }
                        if(res.data.result.items[i].remark.indexOf('增加')>=0){
                          res.data.result.items[i].amount='+'+res.data.result.items[i].amount
                        }else{
                            res.data.result.items[i].amount='-'+res.data.result.items[i].amount
                        }
                        this.items.push(res.data.result.items[i])
                      }
                    },err=>{
                      $.toast(err)
                    }
                  )
                this.skipCount+=5;
                this.loading = false
      },
      getuesrfund(){
       GetCurrentLoginInformationsApi().then(
          res=>{
            this.availableCoins=res.data.result.userAsset.availableCoins;
            this. frozenCoins=res.data.result.userAsset.frozenCoins
          },
          err=>{
            $.toast(err);
          }
        )
      },
      GetUserCoinLogsApi(){
         GetUserCoinLogsApi({maxResultCount: 20,skipCount: 0}).then(
          res=>{
            console.log(res)
            for(let i=0;i<res.data.result.items.length;i++){
               res.data.result.items[i].creationTime=checkJs.formatDate(new Date(res.data.result.items[i].creationTime),"yyyy-MM-dd hh:mm")
                switch(res.data.result.items[i].source){
                  case 0:
                  res.data.result.items[i].title='系统赠送';
                  break;
                  case 1:
                  res.data.result.items[i].title='任务奖励';
                  break;
                  case 2:
                  res.data.result.items[i].title='消费奖励';
                  break;
                  case 3:
                  res.data.result.items[i].title='佣金奖励';
                  break;
                  case 4:
                  res.data.result.items[i].title='购买友谊赛';
                  break;
                  case 5:
                  res.data.result.items[i].title='出售友谊赛';
                  break;
                  case 6:
                  res.data.result.items[i].title='充值K币';
                  break;
                  case 7:
                  res.data.result.items[i].title='购买账号';
                  break;
                  case 8:
                  res.data.result.items[i].title='出售账号';
                  break;
                  case 11:
                    res.data.result.items[i].title='代练购买';
                    break;
              }
               if(res.data.result.items[i].remark.indexOf('增加')>=0){
                 res.data.result.items[i].amount='+'+res.data.result.items[i].amount
               }else{
                  res.data.result.items[i].amount='-'+res.data.result.items[i].amount
               }
            }
            this.items=res.data.result.items;
            if(this.items.length==0){
              this.$store.state.global.blankPage=true
            }
          },err=>{
            $.toast(err)
          }
        )
      },
      scrollhidden(){
       if($('.kbi-details')[0].scrollTop<200){
         this.hidden=true;
         return;
       }else{
         this.hidden=false;
         return;
       }
      },
    }
  }
</script>
