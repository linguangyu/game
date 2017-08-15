<template>
    <div class='checkOrder marginTops'>
      <!--头部-->
      <header class="bar bar-nav">
       <a class="icon icon-left pull-left"  v-if='this.$store.state.global.judge' @click='$router.go(-1)'></a>
      <h1 class="title">验收订单</h1>
      </header>
      <div class='checkOrder-list'>
        <ul>
          <li v-for='(item,index) in items' :key='item.id'>
            <p>子订单编号：{{item.id}}</p>
            <p>对方账号：{{item.creationUserName}}</p>
            <p>对方tag：{{item.userTag}}</p>
            <p>创建时间：{{item.creationTime}}</p>
            <p>完成时间：{{item.completionTime}}  
            <select  v-model='selected[index]' :key='item.id'>
              <option value="通过">通过</option>
              <option value="不通过">不通过</option>
            </select>
            <p class='beizhu'>备注：<input type="text"  v-model='remark[index]'></label></p>
            <input type="hidden" v-model='sonId[index]' :value='item.id'>
          </p>
          </li>
        </ul>
        <a @click='comfigCheck()'>验收</a>
      </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../assets/css/market.scss';
</style>

<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc';
  import { CheckOrdersApi } from '../../api/order.js'
  import { GetFriendMatchOrderApi } from '../../api/order.js'
  export default{
    computed:{

    },
    mounted () {
      this.checkOrder()
        },
    data () {
      return {
        checkId:'',//主id
        items:[],
        selected:[],
        remark:[],//备注
        sonId:[],//子id
        parameter:{
          pass:[],
          notPass:[],
          id:''
        }
      }
    },
    components: {

    },
    methods: {
      checkOrder(){
        this.checkId=this.$route.params.checkId;
         GetFriendMatchOrderApi({id:`${this.checkId}`}).then(
          res=>{
            for(let i=0;i<res.data.result.depositOrders.length;i++){
                if(res.data.result.depositOrders[i].canChecking){
                   res.data.result.depositOrders[i].creationTime=checkJs.formatDate(new Date(res.data.result.depositOrders[i].creationTime),"yyyy-MM-dd hh:mm")
                   res.data.result.depositOrders[i].completionTime=checkJs.formatDate(new Date(res.data.result.depositOrders[i].completionTime),"yyyy-MM-dd hh:mm")
                  this.items.push(res.data.result.depositOrders[i])
                }
            }
            for(let i=0;i<this.items.length;i++){
              this.sonId.push(this.items[i].id)
            }
          },err=>{
            $.toast(err)
          }
        );
     },
    comfigCheck(){
      if(this.selected.length<this.items.length){
        $.toast('请对订单进行确认 是否通过');
        return;
      }
        for(let i=0;i<this.selected.length;i++){
            if(this.selected[i]=='通过'){
               this.parameter.pass.push({remark:this.remark[i],id:this.sonId[i]})
            }else{
              this.parameter.notPass.push({remark:this.remark[i],id:this.sonId[i]})
            }
        }
        this.parameter.id=this.checkId;
       CheckOrdersApi(this.parameter).then(
         res=>{
           if(res.data.success){
             $.toast('验收完成')
             this.$router.push({name:'extractrecords'})
           }
         },err=>{
           $.toast(err.response.data.error.message)
         }
       )
     },
    }
  }
</script>
