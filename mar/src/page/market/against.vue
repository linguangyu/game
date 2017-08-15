<template>
    <div class='against marginTops'>
      <!--头部-->
      <header class="bar bar-nav">
       <router-link :to='{path:"/routerview"}'  v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></router-link>
      <h1 class="title">友谊赛记录</h1>
      </header>

     <div class="content">
        <div class="buttons-tab">
          <a href="#tab1" class="tab-link button" :class="{ 'active': this.$store.state.global.tabvalue ==='提取友谊赛' }" @click='getvaule($event)'>提取友谊赛</a>
          <a href="#tab2" class="tab-link button" :class="{ 'active': this.$store.state.global.tabvalue ==='存入友谊赛' }"  @click='getvaule($event)'>存入友谊赛</a>
        </div>
        <div class='against-selected'>
          <ul class='clearfix'>
            <li>
            状态：
              <select  v-model='PendingOrders.status' v-if='this.$store.state.global.tabvalue=="提取友谊赛"'>
                <option value="待处理_代练中">待处理_代练中</option>
                <option value="已取消">已取消</option>
                <option value="协商中">协商中</option>
                <option value="待仲裁">待仲裁</option>
                <option value="已结算">已结算</option>
              </select>
              <select  v-model='depositOrders.status'  v-if='this.$store.state.global.tabvalue=="存入友谊赛"'>
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
              <select name="" id="" v-model='server'>
                  <option value="国服">国服</option>
                  <option value="美服">美服</option>
                  <option value="欧服">欧服</option>
                  <option value="亚服">亚服</option>
                </select>
            </li>
            <li>
            <a @click='againstComfig()' v-if='this.$store.state.global.tabvalue=="提取友谊赛"' >确定</a>
            <a @click='depositComfig()' v-if='this.$store.state.global.tabvalue=="存入友谊赛"' >确定</a>
            </li>
          </ul>
        </div>
        <div class="content-block">
            <div class="tabs">
                <div id="tab1" class="tab" :class="{ 'active': this.$store.state.global.tabvalue ==='提取友谊赛' }">
                  <div class="content-block">
                        <div class="list-block">
                        <ul>
                          <li v-if='isStatus=="待处理_代练中"' v-for='item in items' :key='item.id'>
                            <p>订单：{{item.id}} <span>创建时间：{{item.creationTime}}</span></p>
                            <p style='text-align:center;'>游戏开始时间: {{item.tradeBeginTime}}</p>
                            <p>我的tag：{{item.userTag}} <i>vs</i><span>好友tag：{{item.lockUserTag}}</span></p>
                          </li>
                          <li v-if='isStatus=="已取消"' v-for='item in items' :key='item.id'>
                            <p>订单：{{item.id}} </p>
                            <p>我的tag：{{item.userTag}} <span ><router-link :to="{name:'checkOrder',params:{checkId:item.id}}" @click='CheckOrders(item.id)' v-if='item.statusName=="取消单(待验收)"'>待验收</router-link></span></p>
                            <p>创建时间：{{item.creationTime}}</p>
                            <p>取消时间: {{item.cancelTime}}</p>
                          </li>
                          <li v-if='isStatus=="协商中"' v-for='item in items' :key='item.id'>
                            <p>订单：{{item.id}} </p>
                            <p>创建时间：{{item.creationTime}}</p>
                            <p>游戏开始时间: {{item.tradeBeginTime}}</p>
                            <p>取消时间：{{item.cancelTime}}</p>
                            <p>订单状态：{{item.statusName}}</p>
                            <p>我的tag：{{item.userTag}} <span><router-link :to='{name:"negotiate",params:{negotiateId:item.id}}'>查看详情</router-link></span></p>
                          </li>
                           <li v-if='isStatus=="待仲裁"' v-for='item in items' :key='item.id'>
                            <p>订单：{{item.id}}  <span>创建时间：{{item.creationTime}}</span></p>
                            <p style='text-align:center;'>游戏开始时间: {{item.tradeBeginTime}}</p>
                            <p>我的tag：{{item.userTag}} <span>好友tag：{{item.lockUserTag}}</span></p>
                          </li>
                          <li v-if='isStatus=="已结算"' v-for='item in items' :key='item.id'>
                            <p>订单：{{item.id}} <span>创建时间：{{item.creationTime}}</span></p>
                            <p>我的tag：{{item.userTag}} <span>结算时间: {{item.cancelTime}}</span></p>
                          </li>
                        </ul>
                      </div>
                  </div>
                </div>
                <div id="tab2" class="tab" :class="{ 'active': this.$store.state.global.tabvalue ==='存入友谊赛' }">
                  <div class="content-block">
                    <div class="list-block">
                          <ul>
                             <li v-if='isdeposit=="代练中"' v-for='item in depositItems' :key='item.id'>
                              <p>主订单：{{item.extractOrderId}}  </p>
                              <p>子订单：{{item.id}}</p>
                              <p>创建时间：{{item.creationTime}}</p>
                              <p>我的tag：{{item.userTag}} </p>
                            </li>
                            <li v-if='isdeposit=="已取消"' v-for='item in depositItems' :key='item.id'>
                              <p>主订单：{{item.extractOrderId}}</p>
                              <p>子订单：{{item.id}}</p>
                              <p>创建时间：{{item.creationTime}}</p>
                              <p>取消时间：{{item.cancelTime}}</p>
                              <p>我的tag：{{item.userTag}} </p>
                            </li>
                             <li v-if='isdeposit=="已完成"' v-for='item in  depositItems' :key='item.id'>
                              <p>主订单：{{item.extractOrderId}}</p>
                              <p>子订单：{{item.id}} </p>
                              <p>创建时间：{{item.creationTime}}</p>
                              <p>完成时间：{{item.completionTime}}</p>
                              <p>我的tag：{{item.userTag}} </p>
                            </li>
                             <li v-if='isdeposit=="待验收"' v-for='item in  depositItems' :key='item.id'>
                             <p>主订单：{{item.extractOrderId}}</p>
                              <p>子订单：{{item.id}} </p>
                              <p>创建时间：{{item.creationTime}}</p>
                              <p>完成时间：{{item.completionTime}}</p>
                              <p>我的tag：{{item.userTag}} </p>
                            </li>
                            <li class='xieshang' v-if='isdeposit=="协商中"' v-for='item in  depositItems' :key='item.id'>
                             <p>主订单：{{item.extractOrderId}}</p>
                              <p>子订单：{{item.id}} </p>
                              <p>创建时间：{{item.creationTime}}</p>
                              <p v-if='item.completionTime'>完成时间：{{item.completionTime}}</p>
                              <p v-if='item.checkTime'>验收时间：{{item.checkTime}}</p>
                              <p v-if='item.cancelTime'>验收时间：{{item.cancelTime}}</p>
                              <p>我的tag：{{item.userTag}} <span><a @click='getfightTag(item.id)'>查看对手</a></span></p>
                              <p><a @click='unfinishedbtn(item.id)'>未完成</a> <router-link :to='{name:"neimg",params:{neimgId:item.id}}'>上传游戏过程截图</router-link>  </p>
                            </li>
                            <li v-if='isdeposit=="待仲裁"' v-for='item in  depositItems' :key='item.id'>
                             <p>主订单：{{item.extractOrderId}}</p>
                              <p>子订单：{{item.id}} </p>
                              <p>创建时间：{{item.creationTime}}</p>
                              <p>完成时间：{{item.completionTime}}</p>
                              <p>验收时间：{{item.checkTime}}</p>
                              <p>我的tag：{{item.userTag}} </p>
                            </li>
                            <li v-if='isdeposit=="已结算"' v-for='item in  depositItems' :key='item.id'>
                              <p>主订单：{{item.extractOrderId}}</p>
                              <p>子订单：{{item.id}} </p>
                              <p>创建时间：{{item.creationTime}}</p>
                              <p>完成时间：{{item.completionTime}}</p>
                              <p>验收时间：{{item.checkTime}}</p>
                              <p>我的tag：{{item.userTag}} </p>
                            </li>
                           
                          </ul>
                        </div>
                  </div>
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
        this.againstComfig();
        this.depositComfig();
        },
    data () {
      return {
        PendingOrders:{
          status:'协商中',
          server:'',
          maxResultCount:10,
          skipCount:0
        },
        depositOrders:{
          status:'协商中',
          server:'',
          maxResultCount:10,
          skipCount:0
        },
        isStatus:'',
        items:[],
        server:'国服',
        isdeposit:'', 
        depositItems:[], 
        fightTag:'',
        fightserver:'',
        hidemodel:false,
       
      }
    },
    components: {
     
    },
    methods: {
      againstComfig(){
          this.isStatus=this.PendingOrders.status;
        this.PendingOrders.server=this.server;
        // 获取用户提取列表
        api.GetOrdersApi(this.PendingOrders).then(
           res=>{
              for(let i=0;i<res.data.result.items.length;i++){
                 res.data.result.items[i].creationTime=checkJs.formatDate(new Date(res.data.result.items[i].creationTime),"yyyy-MM-dd hh:mm")
                 res.data.result.items[i].tradeBeginTime=checkJs.formatDate(new Date(res.data.result.items[i].tradeBeginTime),"yyyy-MM-dd hh:mm")
                 res.data.result.items[i].cancelTime=checkJs.formatDate(new Date(res.data.result.items[i].cancelTime),"yyyy-MM-dd hh:mm")
              }
              this.items=res.data.result.items;
           },
           err=>{
             $.toast(err)
           }
         ) 
      },

      getvaule(e){
        this.$store.dispatch('tabvalue',e.target.innerHTML)
      },

      depositComfig(){
        this.isdeposit=this.depositOrders.status;
        this.depositOrders.server=this.server;
        // 获取用户存入列表
        api.GetDepositOrdersApi(this.depositOrders).then(
          res=>{
             for(let i=0;i<res.data.result.items.length;i++){
                 res.data.result.items[i].creationTime=checkJs.formatDate(new Date(res.data.result.items[i].creationTime),"yyyy-MM-dd hh:mm")
                 if(res.data.result.items[i].completionTime){
                 res.data.result.items[i].completionTime=checkJs.formatDate(new Date(res.data.result.items[i].completionTime),"yyyy-MM-dd hh:mm")
                 }
                 if( res.data.result.items[i].cancelTime){
                   res.data.result.items[i].cancelTime=checkJs.formatDate(new Date(  res.data.result.items[i].cancelTime),"yyyy-MM-dd hh:mm")
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
    },
  }
</script>
