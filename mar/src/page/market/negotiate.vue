<template>
    <div class='negotiate marginTops'>
      <!--头部-->
      <header class="bar bar-nav">
      <a @click='$router.go(-1)'  v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></a>
      <h1 class="title">协商详情</h1>
      </header>
        <div class='negotiate-content'>
          <ul>
            <li v-for='item in items' :key='item.id'>
              <div class='negotiate-content-header clearfix'><p>{{item.extractUserTag}} <br><span>我的TAG</span> </p> <span class='vsclass'>vs</span> <p>{{item.userTag}}<br><span>对方TAG</span> </p></div>
              <div class='negotiate-content-main'>
                <p>订单编号：{{item.id}} <span>状态：{{item.statusName}}</span></p>
                <p>创建时间: {{item.creationTime}}</p>
                <p>完成时间：{{item.completionTime}}</p>
              </div>
              <div class='negotiate-content-footer  clearfix'>
               <span class='negotiate-content-footerlt' @click='closeProblem(item.id)'>确认完成</span>
               <router-link :to="{name:'consultationRecord',params:{'consultationRecordId':item.id}}" tag='span' class='negotiate-content-footerrt'>协商记录</router-link>
              </div>
            </li>
          </ul>
      </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../assets/css/market.scss';
</style>

<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import { GetProblemOrdersApi } from '../../api/order.js'
  import { CloseProblemApi } from '../../api/order.js'
  import { GetMyProblemOrders  } from '../../api/order.js'
  export default{
    computed:{

    },

    mounted () {
      this.getProblemOrders()
    },
    data () {
      return {
       items:'',
      }
    },

    components: {

    },
    methods: {
      getProblemOrders(){//获取问题订单
       GetMyProblemOrders({server: "国服",maxResultCount: 10,skipCount: 0}).then(
          res=>{
            for(let i=0;i<res.data.result.items.length;i++){
                res.data.result.items[i].creationTime=checkJs.formatDate(new Date(res.data.result.items[i].creationTime),'yyyy-MM-dd hh:mm:ss');
                res.data.result.items[i].completionTime=checkJs.formatDate(new Date(res.data.result.items[i].completionTime),'yyyy-MM-dd hh:mm:ss');
            }
            this.items=res.data.result.items;
            if(this.items.length==0){
              this.$store.state.global.blankPage=true
            }
          },err=>{
          }
        )
      },
      closeProblem(id){//关闭争议
        let self=this;
       $.confirm('确定关闭订单吗？', function () {
       CloseProblemApi({id:id}).then(
          res=>{
            if(res.data.success){
              self.$router.go(0);
            }
          },
          err=>{
          }
        )
       });
      },
      // gotoRouter(){
      //   this.$router.go(-1)
      //   this.$store.state.global.blankPage=false;
      // }
    },
  }
</script>
