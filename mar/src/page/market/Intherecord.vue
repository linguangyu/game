<template>
    <div class='extractrecords marginTop'>
      <!--头部-->
      <header class="bar bar-nav">
      <a @click='$router.go(-1)'  v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></a>
      <h1 class="title">存入记录</h1>
      </header>
      <ul class='clearfix'>
                <li>
                状态：
                <select  v-model='depositOrders.status'  >
                  <option value="代练中">代练中</option>
                  <option value="已取消">已取消</option>
                  <option value="已完成">已完成</option>
                  <option value="待验收">待验收</option>
                  <option value="协商中">协商中</option>
                  <option value="待仲裁">待仲裁</option>
                  <option value="已结算">已结算</option>
               </select>
                </li>
                <li>
                服务器：
                  <select v-model='depositOrders.server'>
                      <option value="国服">国服</option>
                      <option value="美服">美服</option>
                      <option value="欧服">欧服</option>
                      <option value="亚服">亚服</option>
                    </select>
                </li>
                <li>
                <a @click='depositComfig()' >确定</a>
                </li>
              </ul>
              <div class='extractrecords-content'>
               <ul class='clearfix'>
                             <li v-if='isdeposit=="代练中"' v-for='item in depositItems' :key='item.id'>
                              <p>订单：{{item.id}} <span>创建时间：{{item.creationTime}}</span></p>
                              <p>TAG：{{item.userTag}}</p>
                              <p>订单状态：{{item.statusName}}</p>
                            </li>
                            <li v-if='isdeposit=="已取消"' v-for='item in depositItems' :key='item.id'>
                              <p>订单：{{item.id}} <span>创建时间：{{item.creationTime}}</span></p>
                              <p>TAG:{{item.userTag}} <span v-if='item.cancelTime'>取消时间：{{item.cancelTime}}</span><span  v-if='item.completionTime'>完成时间：{{item.completionTime}}</span></p>
                              <p>订单状态：{{item.statusName}} </p>
                            </li>
                             <li v-if='isdeposit=="已完成"' v-for='item in  depositItems' :key='item.id'>
                              <p>订单：{{item.id}} <span>创建时间：{{item.creationTime}}</span></p>
                              <p>TAG:{{item.userTag}}  <span>完成时间：{{item.completionTime}}</span></p>
                              <p>订单状态：{{item.statusName}}</p>
                            </li>
                             <li v-if='isdeposit=="待验收"' v-for='item in  depositItems' :key='item.id'>
                             <p>订单：{{item.id}} <span>创建时间：{{item.creationTime}}</span></p>
                              <p>TAG：{{item.userTag}} <span>完成时间：{{item.completionTime}}</span> </p>
                              <p>订单状态：{{item.statusName}}</p>
                            </li>
                            <li class='xieshang' v-if='isdeposit=="协商中"' v-for='item in  depositItems' :key='item.id'>
                             <p>订单：{{item.id}} <span>创建时间：{{item.creationTime}}</span></p>
                              <p>TAG：{{item.userTag}} <span><a @click='getfightTag(item.id)'>查看对手</a></span> </p>
                              <p>订单状态：{{item.statusName}}</p>
                              <p v-if='item.completionTime'>完成时间：{{item.completionTime}}</p>
                              <p v-if='item.checkTime'>验收时间：{{item.checkTime}}</p>
                              <p v-if='item.cancelTime'>取消时间：{{item.cancelTime}}</p>
                              <p></p>
                              <p style='margin-top:.5rem;'><a @click='unfinishedbtn(item.id)'>未完成</a> <router-link :to='{name:"neimg",params:{neimgId:item.id}}'>上传游戏过程截图</router-link>  </p>
                            </li>
                            <li v-if='isdeposit=="待仲裁"' v-for='item in  depositItems' :key='item.id'>
                             <p>订单：{{item.id}} <span>创建时间：{{item.creationTime}}</span> </p>
                              <p>TAG: {{item.userTag}} <span>完成时间：{{item.completionTime}}</span></p>
                              <p>订单状态：{{item.statusName}}</p>
                              <p></p>
                            </li>
                            <li v-if='isdeposit=="已结算"' v-for='item in  depositItems' :key='item.id'>
                              <p>订单：{{item.id}} <span>创建时间：{{item.creationTime}}</span></p>
                              <p>TAG：{{item.userTag}} <span>完成时间：{{item.completionTime}}</span> </p>
                              <p>订单状态：{{item.statusName}}</p>
                            </li>
                           
                          </ul>
              </div>
               <!--查看对手model-->
                <div class='chakan' v-if='hidemodel'>
                  <div class='chakan-model'>
                  <i @click='hidebtn()'>x</i>
                    <span>对手tag：{{fightTag}}</span> <br>
                    <span>服务器：{{fightserver}}</span>
                  </div>
                </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../assets/css/market.scss';
</style>

<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import * as api from '../../api/order.js'
  export default{
    computed:{

    },
    mounted () {
      this.depositComfig();
        },
    data () {
      return {
      depositOrders:{
          status:'',
          server:'国服',
          maxResultCount:10,
          skipCount:0
        },
        isdeposit:'',
        depositItems:'',
        hidemodel:false,
        fightTag:'',
        fightserver:''
      }
    },
    components: {

    },
    methods: {
    depositComfig(){
      if(!this.depositOrders.status){
          this.depositOrders.status=sessionStorage.getItem("depstatus") 
        }
      this.isdeposit=this.depositOrders.status;
      sessionStorage.setItem("depstatus",this.depositOrders.status)
              // 获取用户存入列表
              api.GetDepositOrdersApi(this.depositOrders).then(
                res=>{
                  for(let i=0;i<res.data.result.items.length;i++){
                      res.data.result.items[i].creationTime=checkJs.formatDate(new Date(res.data.result.items[i].creationTime),"yyyy-MM-dd hh:mm")
                      if(res.data.result.items[i].completionTime){
                      res.data.result.items[i].completionTime=checkJs.formatDate(new Date(res.data.result.items[i].completionTime),"yyyy-MM-dd hh:mm")
                      }
                      if( res.data.result.items[i].cancelTime){
                        res.data.result.items[i].cancelTime=checkJs.formatDate(new Date(res.data.result.items[i].cancelTime),"yyyy-MM-dd hh:mm")
                      }
                      if(res.data.result.items[i].checkTime){
                      res.data.result.items[i].checkTime=checkJs.formatDate(new Date(res.data.result.items[i].checkTime),"yyyy-MM-dd hh:mm")
                      }
                    }
                    this.depositItems=res.data.result.items;
                },err=>{
                  $.toast(err)
                }
              )
        },
         unfinishedbtn(id){
        api.ConfirmProblemApi({id:`${id}`}).then(
          res=>{
            if(res.data.success){
              $.toast('确认未完成')
              this.depositComfig()
            }
          },err=>{
            $.toast(err.response.data.error.message)
          }
        )
      },
       getfightTag(id){
        this.hidemodel=true;
         api.DepositGetOrderApi({id:id}).then(
          res=>{
           this.fightTag=res.data.result.extractOrder.userTag;
           this.fightserver=res.data.result.extractOrder.gameServer;
          },err=>{
           $.toast(err)
        }
       )
      },
      hidebtn(){
        this.hidemodel=false;
      },
    },
  }
</script>
