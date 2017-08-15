<style scoped >
  .tagbtn{
    position: absolute;
    right: 10px;
    top: 8px;
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 0rem .4rem;
    background-color: #323542;
    margin-left: 0.5rem;
    font-size: 12px;
    z-index:100;
  }
</style>
<template>
  <div class='extract'>
    <!--header-->
    <header class="bar bar-nav">
      <a v-if='this.$store.state.global.judge' @click="$router.push({path:'/market/HSFriend/'})" class="icon icon-left pull-left"></a>
      <!-- <button class="tagbtn" @click='$router.push({path: "/tagCharge"})'>TAG管理</button>-->
      <h1 class="title">友谊赛提取</h1>
    </header>
    <div class='choose clearfix'>
      <span> 暴雪修改了友谊赛的上限，24小时只可以打一次。请各位注意不要多打！</span>
      <p class='clearfix' @click='SelectBtn($event)'>
        <span class='inputclass'>TAG选择</span> <span class="icon icon-caret iconclass "></span>
      <ul class='pactive'>
        <li v-for="(item,index) in tagList" @click.stop='TheSelected($event)'>{{item.userTag}} <span @click.stop='deleteTag($event,item.id)'><img src="../../assets/img/tuqizhoncuo.png" alt=""></span></li>
        <li @click="addFriendTag()">新建TAG（格式：昵称#数字）</li>
      </ul>
      </p>
      <p class='clearfix'  @click='SelectBtn($event)'>
        <span class='inputclass'>选择场次</span> <span class="icon icon-caret iconclass"></span>
      <ul class='pactive' >
        <li v-for="index in 1" @click.stop='TheSelected($event)'>{{index}}场</li>
      </ul>
      </p>
      <p class='clearfix' >
        <span class='inputclass'>国服</span> <span class="icon icon-caret iconclass"></span>
      </p>
      <p class='clearfix'>
        <span class='inputclass'>{{createData.userPhone}}</span> <span class="icon icon-caret iconclass"></span>
      </p>
      <div class='tishi5can'>每一个TAG一天最多提取1场友谊赛</div>
      <div class="button button-big button-fill button-success mybutton" @click="CreateOrder($event)"><img src="../../assets/img/shandianhei.png" style='height:20px;width:10px;margin-right:8px;'>准备对战</div>
      <div class='dailynumber'> <img src="../../assets/img/shangdianhuan.png" alt=""> <span style='font-size:22px;'>{{availableFriendlyMatchs}}</span><br>剩余次数 </div>
    </div>
    <div  class='addfriend-box' v-if='addfriendhide' @click.self='addFriendTagHide($event)'>
      <div class='addfriend'>
        <h1>添加TAG</h1>
        <input type="text" placeholder='请输入TAG' v-model='tagvalue'>
        <button @click='addNewTag()'> 保存</button>
      </div>
    </div>
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
        createData:{
          userPhone:'',
          userTag:'',
          gameServer:'国服',
          totalAmount:'',
          remark:''
        },
        tagList:[], //获取用户所有TAG列表
        availableFriendlyMatchs:'',
        addfriendhide:false,
        tagvalue:'',//添加tag的值
        pasDue:[],//过了24小时的订单
      }
    },
    components: {

    },
    methods: {
      CreateOrder(e){ //获取当前用户的提取订单列表
        /*进入record的准备*/
        this.createData.userTag=checkJs.trim($('.inputclass')[0].innerHTML);//创建友谊赛需要的tag
        this.createData.totalAmount=$('.inputclass')[1].innerHTML.slice(0,1);//创建友谊赛需要的场次
        this.createData.remark='玩家TAG'+this.createData.userTag;
        if (this.createData.userTag=='TAG选择') {//判断用户是否选择了tag
          $.toast('请选择tag！');
          return;
        }
        if (this.createData.totalAmount=='选择场次') {//判断用户是否选择了场次
          $.toast('请填写提取场次！');
          return;
        }
        let pending={
          server: "国服",
          status: "待验收",
          maxResultCount: 100,
          skipCount: 0
        };
        api.GetOrdersApi(pending).then(
          res=>{
            if(res.data.result.items.length==0){//如果用户是新号 直接进入；
              if(this.availableFriendlyMatchs<this.createData.totalAmount){//判断用户提取的场次是否大于拥有的友谊赛
                $.toast('友谊赛场次不足');
                return;
              }
              dplus.track('准备对战',{name:'准备对战按钮'})//Dplus 提取友谊赛准备对战按钮
              //提取之后闪电的位子变化
              $(document.querySelector('.dailynumber')).children('img').addClass('move').parent().css({'background-position':'1%'+' '+(-(85-this.availableFriendlyMatchs/30))+'%','transition':'background-position 2s'})
              let slef=this
              //1秒之后进行提取友谊赛，进入提取日志页面
              setTimeout(function(){
                slef.CreateOrderbtn();
              },1000)
              return;
            }
            let totalAmount=0;//记录循环出来的提取次数
            for(let i=0;i<res.data.result.items.length;i++){
              if(this.createData.userTag==res.data.result.items[i].userTag&&new Date()<new Date(new Date(res.data.result.items[i].tradeBeginTime).getTime()+86400000)){//筛选出当前的tag在24小时内的订单获得 提取的次数
                totalAmount=totalAmount+res.data.result.items[i].totalAmount-res.data.result.items[i].needAmount;
              }else if(this.createData.userTag==res.data.result.items[i].userTag&&new Date()>new Date(new Date(res.data.result.items[i].tradeBeginTime).getTime()+86400000)){
                this.pasDue.push(res.data.result.items[i]);
              }
            }
            if(totalAmount>=5){//如果提取的次数大于5场就直接退出
              $.toast('一天最多提5场友谊赛哦！');
              return;
            }else{//如果小于5场的话 就进入
              if(this.availableFriendlyMatchs<this.createData.totalAmount){//判断用户提取的场次是否大于拥有的友谊赛
                $.toast('友谊赛场次不足');
                return;
              }
              if((5-totalAmount)<this.createData.totalAmount){
                $.toast('还可以提取'+(5-totalAmount)+'场')
                return;
              }
              dplus.track('准备对战',{name:'准备对战按钮'})//Dplus 提取友谊赛准备对战按钮
              //提取之后闪电的位子变化
              $(document.querySelector('.dailynumber')).children('img').addClass('move').parent().css({'background-position':'1%'+' '+(-(85-this.availableFriendlyMatchs/30))+'%','transition':'background-position 2s'})
              let slef=this
              //1秒之后进行提取友谊赛，进入提取日志页面
              setTimeout(function(){
                slef.CreateOrderbtn();
              },1000)
              return;
            }
            if(this.pasDue.length>0&&totalAmount==0){
              if(this.availableFriendlyMatchs<this.createData.totalAmount){//判断用户提取的场次是否大于拥有的友谊赛
                $.toast('友谊赛场次不足');
                return;
              }
              dplus.track('准备对战',{name:'准备对战按钮'})//Dplus 提取友谊赛准备对战按钮
              //提取之后闪电的位子变化
              $(document.querySelector('.dailynumber')).css({'background-position':'1%'+' '+(-(85-this.availableFriendlyMatchs/30))+'%','transition':'background-position 2s'})
              let slef=this
              //1秒之后进行提取友谊赛，进入提取日志页面
              setTimeout(function(){
                slef.CreateOrderbtn();
              },1000)
              return;
            }

          },err=>{
            $.toast(err);
          }
        )
      },
      CreateOrderbtn(){//创建友谊赛
        api.CreateOrderApi(this.createData).then(
          res =>{
            if(res.data.success){
              this.$router.push({ name: 'record',params:{orderId:res.data.result}});
            }
          },
          err=>{
            $.toast(err);
          }
        )
      },
      //  getfiveinnings(){//获取剩余的场次

      //     if(!localStorage.fiveinnings||localStorage.fiveinnings<=0||isNaN(localStorage.fiveinnings)){
      //       this.fiveinnings=5
      //       localStorage.fiveinnings=this.fiveinnings;
      //     }else{
      //       this.fiveinnings=localStorage.fiveinnings;
      //     }
      //   },
      getPendingOrder(){//已经提取的直接进入
        let pending={
          server: "国服",
          status: "待处理_代练中",
          maxResultCount: 10,
          skipCount: 0
        };
        let self=this;
        api.GetOrdersApi(pending).then(
          res=>{
            if(res.status){
              if(res.data.result.items.length==0){return;}
              $.toast('订单已经提取直接进入')
              setTimeout(function(){
                self.$router.push({name:'record',params:{orderId:res.data.result.items[0].id}})
              },2000)
            }
          },err=>{
            $.toast(err)
          }
        )
      },
      getUserInfo(){//获取到手机号
        GetCurrentLoginInformationsApi().then(
          res=>{
            this.createData.userPhone = res.data.result.user.phoneNumber;
            this.availableFriendlyMatchs=res.data.result.userAsset.availableFriendlyMatchs;
            $(document.querySelector('.dailynumber')).css({'background-position':'1%'+' '+(-(85-this.availableFriendlyMatchs/30))+'%','transition':'background-position 2s'})

          },
          err=>{
            $.toast(err.response.data.error.message);
          }
        )
      },
      getUserTag(){//获取用户的所有tag
        api.GetUserTagsApi().then(
          res=>{
            this.tagList=res.data.result.items
          },
          err=>{
            $.toast(err.response.data.error.message);
          }
        );
      },
      deleteTag(e,value){ //删除tagBTN
        let self = this;
        $.confirm('确定删除吗?',
          function () {
            api.DeleteTagApi({id:`${value}`}).then(
              res=>{
                self.getUserTag()
              },
              err=>{
                $.toast(err);
              }
            )
          },
        );
      },
      addNewTag(){//增加tagbtn
        if (checkJs.isNullOrEmpty(this.tagvalue)) {
          $.toast('TAG不能为空！')
          return;
        }
        if(!(new RegExp(/\S+#[1-9][0-9]*/).test(this.tagvalue))){
          $.toast('TAG格式错误!')
          return;
        }
        api.CreateTagApi({userTag:this.tagvalue}).then(
          res=>{
            $.toast('创建成功！');
            this.getUserTag()
            this.addfriendhide=false;

          },
          err=>{
            $.toast(err);
          }
        )
      },
      addFriendTag(){
        this.addfriendhide=true;
      },
      addFriendTagHide(e){
        this.addfriendhide=false;
      },

      SelectBtn(e){ //下拉选择
        $(e.currentTarget).addClass('pactive').children('ul').show(1000).prev().addClass('pyramid').parent().siblings('p').removeClass('pactive').children('ul').hide().prev().removeClass('pyramid')
      },
      TheSelected(e){ //选中btn
        $(e.currentTarget).parent().hide().prev().prev().text($(e.currentTarget).text()).parent().removeClass('pactive').children('.iconclass').removeClass('pyramid')
      },
    },
    mounted () {
      this.getUserInfo();//获取用户的手机号
      this.getUserTag();//获取用户所有的TAG
      this.getPendingOrder();//获取代练中的订单 如果有 直接进入提取日记页面
      // this.getfiveinnings();//获取剩余的场次
    },

  }

</script>
