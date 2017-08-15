<template>
 <div class="salefirend colorfff marginTop">
    <header class="bar bar-nav">
      <!--v-if='this.$store.state.global.judge' :to="{ path: '/routerview/center'}" -->
      <a @click='$router.go(-1)' class="icon icon-left pull-left"></a>
      <h1 class='title'>
        <div class="buttons-row">
          <a href="#tab1" @click='tabButton($event)' class="tab-link active button">出售中</a>
          <a href="#tab2" @click='tabButton($event)' class="tab-link button">已出售</a>
      </div>
      </h1>
    </header>
  <div class="tabs">
      <div id="tab1" class="tab active">
        <div class="content-block">
          <div class='salefirend-onSale'>
            <ul>
              <li class='clearfix' v-for='item in items'>

                <dl class='salefirend-onSale-lt'>
                  <dt>友谊赛出售中</dt>
                  <dd>{{item.creationTime}}</dd>
                </dl>

                <div class='salefirend-onSale-lt'>
                    <div class='salefirend-on' @click='saleFirendOffOn($event,item.id)'>
                    </div>
                </div>

                <dl class='salefirend-onSale-lt'>
                  <dt>单价：{{item.price}}KB</dt>
                  <dd>x{{item.amount}}</dd>
                </dl>

              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="tab2" class="tab">
        <div class="content-block">
            <div class='salefirend-beSold' ref="scrollContainer">
              <ul>
                <li class='clearfix' v-for='item in okItems'>
                  <dl>
                    <dt>已出售友谊赛</dt>
                    <dd>{{item.creationTime}}</dd>
                  </dl>

                  <dl >
                    <dt>单价：{{item.price}}KB</dt>
                    <dd>x{{item.amount}}</dd>
                  </dl>
                </li>
                <mugen-scroll :handler="fetchData" :should-handle="!loading" scroll-container="scrollContainer">
                   <div class="infinite-scroll-preloader">
                      <div class="preloader" ref="scrollShowa"></div>
                  </div>
                  </mugen-scroll>
              </ul>
            </div>
        </div>
      </div>
    </div>
 </div>
</template>
<style lang="scss" scoped>
@import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
import * as checkJs from '../../assets/js/pubFunc'
import { GetMySaleOrdersApi } from '../../api/transaction.js'
import { CancelSaleOrderApi } from  '../../api/transaction.js'
import MugenScroll from 'vue-mugen-scroll'

export default{
     computed:{

      },
    mounted () {
      this.getMySaleOrders();
      this.getMySaleOkOrder();
      this.$refs.scrollShowa.style.display = 'none';
    },
    data () {
      return {
        items:[],
        okItems:[],
        skipCount:10,
        loading:false,
      }
    },
    components: {
    MugenScroll
    },
    methods: {
      fetchData() {//底部无限滚动方法
        this.loading = true
            let PendingOrders = {
               status: "已完成",
                maxResultCount: 1,
                skipCount: this.skipCount
            }
           GetMySaleOrdersApi(PendingOrders).then(
                  res=>{
                      for(let i=0;i<res.data.result.items.length;i++){
                        res.data.result.items[i].creationTime=checkJs.formatDate(new Date(res.data.result.items[i].creationTime),"yyyy-MM-dd hh:mm")
                        this.okItems.push(res.data.result.items[i])
                      }
                    },err=>{
                      $.toast(err)
                    }
                  )
                this.skipCount+=1;
                this.loading = false
        },
      saleFirendOffOn(e,id){
        let self=this;
          $.alert('确定下架吗?', function () {
            $(e.target).addClass('salefirend-off').removeClass('salefirend-on').text('下架')
            CancelSaleOrderApi({id:id}).then(
              res=>{
                if(res.data.success){
                  $.toast('取消成功!')
                  self.$router.go(0);
                }
              },err=>{
                $.toast(err)
              }
            )
          });
      },
      getMySaleOrders(){
        GetMySaleOrdersApi({
          status: "销售中",
          maxResultCount: 10,
          skipCount: 0
        }).then(
          res=>{
            for(let i=0;i<res.data.result.items.length;i++){
              res.data.result.items[i].creationTime=checkJs.formatDate(new Date(res.data.result.items[i].creationTime),'yyyy-MM-dd')
            }
              this.items=res.data.result.items
             if(this.items.length==0){
             this.$store.state.global.blankPage=true
            }
          },
          err=>{
            $.toast(err)
          }
        )
      },
      getMySaleOkOrder(){
        GetMySaleOrdersApi({
          status: "已完成",
          maxResultCount: 10,
          skipCount: 0
        }).then(
          res=>{
            for(let i=0;i<res.data.result.items.length;i++){
              res.data.result.items[i].creationTime=checkJs.formatDate(new Date(res.data.result.items[i].creationTime),'yyyy-MM-dd')
            }
              this.okItems=res.data.result.items

          },
          err=>{
            $.toast(err)
          }
        )
      },
      tabButton(e){
        if(e.target.innerHTML=='出售中'){
           if(this.items.length==0){
             this.$store.state.global.blankPage=true
           }else{
             this.$store.state.global.blankPage=false
           }
        }else{
          if(this.okItems.length==0){
             this.$store.state.global.blankPage=true
          }else{
             this.$store.state.global.blankPage=false
          }
        }
      }
  }
  }
</script>
