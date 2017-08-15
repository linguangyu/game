<template>
    <div class='record'>
    <!--header-->
     <header class="bar bar-nav">
      <h1 class="title">
      <a href="#" class="confirm-ok"  @click='conFirm()'><img src="../../assets/img/cuo.png" alt=""> </a>
      <span style='float:right;'>{{needAmount+'/'+totalAmount}}</span>
      对战记录</h1>
    </header>
    <!--content-->
    <div class='record-content'>
      <ul>
            <li v-for="item in fightlog">
                <div class='mine'  :class="{ self: item.self }">
                    <p class='record-name'>K5平台</p>
                    <img class='record-logo' src="../../assets/img/K5game.png" alt="">
                    <div class="text">{{item.remark}}</div>
                   <span class="time">{{item.creationTime.slice(0,2)>12?'PM '+item.creationTime:'AM '+item.creationTime}}</span>
                </div>
            </li>
        </ul>
    </div>

    <!--footer-->
    <footer>
      <p :class="{zantindd:hidden}"  @click='sendBtn($event)'><img src="../../assets/img/zantin.png" alt=""><br>暂停订单</p>
      <p :class="{kaisdd:hidden}"  @click='sendBtn($event)'><img src="../../assets/img/kaishidd.png" alt=""><br>开始订单</p>
      <p :class="{quxiaodd:hidden}"   @click=' abolishbtnhide()'><img src="../../assets/img/quxiaodd.png" alt=""><br>取消订单</p>
      <p :class="{huanren:hidden}"    @click='sendBtn($event)'><img src="../../assets/img/huanren.png" alt=""><br>换人</p>
      <div @click='fasonBtn($event)'><img src="../../assets/img/fasonhei.png" >发送</div>
    </footer>

    </div>
</template>

<style lang="scss">
    @import '../../assets/css/market.scss';
   .fade-enter-active, .fade-leave-active {
      transition: opacity 1s
    }
   .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
      opacity: 0
    }
</style>

<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import * as api from '../../api/order'
  import { GetCurrentLoginInformationsApi } from '../../api/account.js'
  export default{
    computed:{

    },
    data () {
      return {
        fightlog:[],
        orderId:'',
        remark:'',
        timer:'',
        needAmount:'',
        totalAmount:'',
        myName:'',
        img:'',
        hidden:false,
        depositOrders:''
      }
    },
    components: {

    },
    methods: {
      getOrderDetail(obj){   // ***快速获取友谊赛订单详情
        this.orderId = this.$route.params.orderId;
        let self = this
        api.GetFriendMatchOrderApi({id:`${self.orderId}`}).then(
          res=>{
             let self=this;
             this.myName=res.data.result.userTag
             this.needAmount=res.data.result.needAmount;
             this.totalAmount=res.data.result.totalAmount;
             this.depositOrders=res.data.result.depositOrders;
              for(let i=0;i<res.data.result.extractLogs.length;i++){
               res.data.result.extractLogs[i].creationTime=checkJs.formatDate(new Date(res.data.result.extractLogs[i].creationTime),'hh:mm');
              }
              if(obj){
                this.fightlog.push(obj);
              }
              if(this.fightlog.length==0){
                this.fightlog=res.data.result.extractLogs;
              }
              if(this.fightlog[this.fightlog.length-1].remark!=res.data.result.extractLogs[res.data.result.extractLogs.length-1].remark){
                this.fightlog.push(res.data.result.extractLogs[res.data.result.extractLogs.length-1]);
              }


          },
          err=>{
            $.toast(err.response.data.error.message);
          }
        )
      },
      timeOut(){
            let self = this
            this.timer=setInterval(function(){
              self.getOrderDetail()
            },5000)
        },
      conFirm(){ //退出窗口
        var self=this;
         dplus.track('退出',{name:'退出按钮'})//Dplus 暂停订单按钮
          $.confirm('对战过程中切勿直接退出<br> 回到首页', function () {
          self.$router.push({path:'/market'});
          clearInterval(self.timer)
        });
      },
      sendBtn(e){ //友谊赛换人 暂停订单 开始订单
        if(checkJs.trim(e.currentTarget.textContent) =='换人'){
          //  ***友谊赛换人
          api.SwitchUserApi({
            "releaseOrder": true,
            "id": `${this.orderId}`
          }).then(
            res=>{
              this.getOrderDetail({remark:'换人',self:true,creationTime:checkJs.formatDate(new Date(),'hh:mm')})
               dplus.track('换人',{name:'换人按钮'})//Dplus 暂停订单按钮
              this.hidden=false
            },
            err=>{
              $.toast(err.response.data.error.message);
            }
          )
        }else if(checkJs.trim(e.currentTarget.textContent)=='暂停订单'){
          //  ***友谊赛暂停订单
            api.PauseOrderApi({
              "id": `${this.orderId}`
            }).then(
              res=>{
              this.getOrderDetail({remark:'暂停订单',self:true,creationTime:checkJs.formatDate(new Date(),'hh:mm')})
               dplus.track('暂停订单',{name:'暂停订单按钮'})//Dplus 暂停订单按钮
              this.hidden=false
              },
              err=>{
                $.toast(err.response.data.error.message);
              }
            )
         }else if(checkJs.trim(e.currentTarget.textContent )== '开始订单'){
          //  ***友谊赛开始订单
            api.ResumeOrderApi({
              "id": `${this.orderId}`
            }).then(
            res=>{
              this.getOrderDetail({remark:'开始订单',self:true,creationTime:checkJs.formatDate(new Date(),'hh:mm')})
               dplus.track('开始订单',{name:'开始订单按钮'})//Dplus 开始订单按钮
              this.hidden=false
            },
              err=>{
                $.toast(err.response.data.error.message);
              }
          )
        }
      },
      abolishbtnhide(){  //  ***友谊赛取消订单
        //  ***友谊赛取消订单
        api.CancelOrderApi({
          "id": `${this.orderId}`,
           "remark":'默认说明'
        }).then(
            res=>{
            this.getOrderDetail({remark:'取消订单',self:true,creationTime:checkJs.formatDate(new Date(),'hh:mm')})
            dplus.track('取消订单',{name:'取消订单按钮'})//Dplus 取消订单按钮
            this.hidden=false
            let self=this;
            $.toast('取消游戏退出')
            setTimeout(function(){
            clearInterval(self.timer)
            self.$router.push({path:'/market/HSFriend/extract'});
            },2000)

            },
            err=>{
                $.toast(err.response.data.error.message);
            }
           )
      },
      abolishbtnquxiao(){
        this.selected=''
      },
      fasonBtn(e){ //发送按钮
      $('.record-content')[0].scrollTop=parseInt($('.record-content ul').css('height'))+180;
        if(this.hidden){
          this.hidden=false;
        }else{
          this.hidden=true;
        }
      }
      },
      mounted () {
          this.timeOut();
        GetCurrentLoginInformationsApi().then(
            res=>{
              this.img=res.data.result.user.profilePictureId?'https://api.k5game.com/Profile/GetProfilePictureById?id='+res.data.result.user.profilePictureId : 'https://api.k5game.com/Profile/GetProfilePictureById';
            },
              err=>{
                $.toast(err);
              }
          );
      },
      updated(){
        for(let i=0;i<$('.time').prev().length;i++){
          $($('.time')[i]).css({'left':10+$('.time').prev()[i].offsetWidth,'top':$('.time').parent()[i].offsetHeight-15})
          if($('.time').prev()[i].innerHTML=='暂停订单'||$('.time').prev()[i].innerHTML=='换人'||$('.time').prev()[i].innerHTML=='取消订单'||$('.time').prev()[i].innerHTML=='开始订单'){
            $($('.time')[i]).css('right',10+$('.time').prev()[i].offsetWidth).parent().children('.record-name').text(this.myName).next().attr('src',this.img)
          }
        }
      $('.record-content')[0].scrollTop=parseInt($('.record-content ul').css('height'))+180;
      }
  }

</script>
