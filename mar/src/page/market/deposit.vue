<template>
    <div class='record'>
    <!--header-->
     <header class="bar bar-nav">

      <h1 class="title">
      <a href="#" class="confirm-ok" @click='confirm()'><img src="../../assets/img/cuo.png" alt=""> </a>
      创建友谊赛</h1>
    </header>
    <!--content-->
      <div class='record-content'>
        <ul>
          <li v-for="item in messagelist">
            <div class='mine'  :class="{ self: item.self }">
              <p class='record-name'>K5平台</p>
              <img class='record-logo' src="../../assets/img/K5game.png" alt="">
              <div class="text">{{item.title}}</div>
              <span class="time"></span>
            </div>
          </li>
        </ul>
      </div>
    <!--footer-->
    <footer>
    <input class="sendInput" type="text" v-if="!tagFlag"  v-model='createData.userTag' placeholder='请输入tag' >
      <select v-if="tagFlag" v-model='selected' >
        <option value="取消订单">取消订单</option>
        <option value="完成订单">完成订单</option>
      </select>
      <a class="sendbtn" href="#" @click='sendbtn()'>发送</a>
    </footer>


    </div>
</template>

<style lang="scss" scoped>
    @import '../../assets/css/market.scss';
</style>

<script charset="UTF-8">
  import { GetCurrentLoginInformationsApi } from '../../api/account'
  import * as api from '../../api/order'
  import * as checkJs from '../../assets/js/pubFunc'
  export default{
    computed:{

    },
    data () {
      return {
        messagelist:[
          {title:'欢迎来到创建友谊赛',time:checkJs.formatDate(new Date(),'hh:mm:ss')}
          ],
        createData:{
          userTag:'',
          userPhone:'',
          gameServer:'国服'
        },
        tagFlag:false,
        selected:'',
        selfselected:'',
        cId:'',
        pendingOrders:{
            "maxResultCount": 10,
            "skipCount": 0
        },
        GetDepositOrders:'',
        extractOrderId:'',
        timer:'',
        statusName:''
      }
    },
    components: {
    },
    methods: {
       confirm(){
        let self=this;
          $.confirm('中途退出可能会造成订单异常？<br>直接退出', function () {
           clearInterval(self.timer)
          self.$router.go(-2)
        });
      },
      getUserInfo(){
          let self = this;
          // 获取用户手机号
          GetCurrentLoginInformationsApi().then(
            res=>{
            self.createData.userPhone = res.data.result.user.phoneNumber;
          },
            err=>{
              $.toast(err.response.data.error.message);
            }
          )
          },

      sendbtn(){
         if (checkJs.isNullOrEmpty(this.createData.userTag)) {
              $.toast('请输入tag！')
              return;
            }

          if(!this.extractOrderId){
            this.messagelist.push({title:`选择tag ${this.createData.userTag}`,time:checkJs.formatDate(new Date(),'hh:mm:ss'),self:true})
            this.createdOrder();
          }

        if(this.selected == '取消订单'){
            this.messagelist.push({title:this.selected,time:checkJs.formatDate(new Date(),'hh:mm:ss'),self:true})
              // 取消订单
              api.DepositCancelOrderApi({
                "id": `${this.cId}`
              }).then(
                res=>{
                  let self=this;
                  this.messagelist.push({title:'取消订单成功',time:checkJs.formatDate(new Date(),'hh:mm:ss')});
                   $.confirm('取消订单请退出', function () {
                      clearInterval(self.timer)
                    self.$router.push({path:'/routerview'})
                  });
                },
                err=>{
                  $.toast(err.response.data.error.message);
                }
              )
              return;
            }

          if(this.selected == '完成订单'){
            this.messagelist.push({title:this.selected,time:checkJs.formatDate(new Date(),'hh:mm:ss'),self:true})
              // 完成订单
              api.DepositCompleteOrderApi({
                "isContinue": false,
                "id": `${this.cId}`
              }).then(
                res=>{
                  let self=this;
                  this.messagelist.push({title:'完成订单操作成功',time:checkJs.formatDate(new Date(),'hh:mm:ss')});
                  $.confirm('完成订单请退出', function () {
                     clearInterval(self.timer)
                    self.$router.push({name:'game'})
                  });
                },
                err=>{
                  $.toast(err.response.data.error.message);
                }
              )
              return;
            }


      },
      createdOrder(){
           // 创建存入订单
            api.DepositCreateOrderApi(this.createData).then(
              res =>{
                  if(!res.data.success){
                    $.toast(res.data.error.message);
                    return;
                  }
                if(res.data.result){
                  this.cId = res.data.result;
                  let self=this;
              // ***获取存入订单详情
                this.timer=setInterval(function(){
                  api.DepositGetOrderApi({id:`${self.cId}`}).then(
                    res=>{
                        self.extractOrderId=res.data.result.extractOrderId;
                        self.tagFlag = true;
                        if(self.statusName!=res.data.result.extractOrder.statusName){
                          if(res.data.result.extractOrder.statusName=='代练中(已暂停)'){
                            self.messagelist.push({title:`${res.data.result.extractOrder.userTag}暂停了游戏`,time:checkJs.formatDate(new Date(),'hh:mm:ss')})
                          }else if(res.data.result.extractOrder.statusName=='代练中'){
                            self.messagelist.push({title:`创建与${res.data.result.extractOrder.userTag}的友谊赛成功`,time:checkJs.formatDate(new Date(),'hh:mm:ss')})
                          }else if(res.data.result.extractOrder.statusName=='取消单(待验收)'){
                            self.messagelist.push({title:`${res.data.result.extractOrder.userTag}取消了游戏，如果有问题请联系客服处理`,time:checkJs.formatDate(new Date(),'hh:mm:ss')})
                          }else if(res.data.result.extractOrder.statusName=='代练中(未分配)'){
                            self.messagelist.push({title:`${res.data.result.extractOrder.userTag}要求换人。请您取消订单`,time:checkJs.formatDate(new Date(),'hh:mm:ss')})
                          }
                        }
                        self.statusName=res.data.result.extractOrder.statusName;

                    },
                    err=>{
                      $.toast(err.response.data.error.message);
                    }
                  )
                  },5000)

                }
              },
              err=>{
                $.toast(err.response.data.error.message);
              }
            )
      },
      getUserTag(){
        // 获取当前用户的存入订单列表
         api.GetDepositOrdersApi(this.pendingOrders).then(
          res=>{
            this.GetDepositOrders=res.data.result.items;
          },
          err=>{
            $.toast(err);
          }
        );
      },
    },
    mounted () {
      this.getUserInfo();
      // this.createdOrder();
    },
  }

</script>
