<template>
    <div class='puysuccee marginTop'>
      <!--头部-->
      <header class="bar bar-nav">
      <router-link :to="{name:'purchase'}"  v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></router-link>
       <a class="icon icon-share pull-right" @click='hidden=true'></a>
      <h1 class="title">支付详情</h1>
      </header>
      <div class='puysuccee-logo'>
       <p><img :src="profilePictureId" alt=""></p>
       <p>{{nickName}} <br><span style='font-size:11px;color:#bebebe;'>{{phoneNumber}}</span> </p>

       <p>订单已完成</p>
      </div>
      <div class='puysuccee-content'>
        <ul>
        <li>
          <p>订单号：{{details.id}} <span>时间 : {{details.paymentTime}}</span></p>
          <p>支付方式 <span>{{details.payment}}</span></p>
        </li>
        <li>
          <p>充值k币 <span>{{details.rechargeAmount}}</span></p>
          <p>赠送k币<span>{{details.giftAmount}}</span></p>
        </li>
        <li>
          <p>实付金额 &ensp;  &ensp;  &ensp;{{details.paymentGross }}<span>k币总额  &ensp; &ensp;&ensp;{{details.totalAmount}}</span></p>
        </li>
        </ul>
      </div>

      <div class='lottery_Draw' v-if='hidden'>
        <div class='lottery_Draw_img'>
          <div class='lottery_Draw_num'>
           {{kb_number}}
          </div>
          <span @click='hiddenBtn()'><img src="../../assets/img/cuocuocuo.png" alt=""></span>
        </div>
      </div>
      <canvas id='scrub' v-if='hidden'> </canvas>

    </div>
</template>

<style lang="scss" scoped>
    @import '../../assets/css/market.scss';
</style>

<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import { GetCoinOrderApi } from '../../api/pay.js'
  import { GetCurrentLoginInformationsApi } from '../../api/account.js'
  import wx from 'weixin-js-sdk'

  export default{
    computed:{

    },
    mounted () {
      let appId = 'wxb18364b950363395';
      let appsecret = '551a8654bfc96a44b5b246276d5b81ec';
      // let jsapi_ticket = make_ticket($appId,$appsecret);
      // let nonceStr = make_nonceStr();
      // let url = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
      // let signature = make_signature($nonceStr,$timestamp,$jsapi_ticket,$url);

       wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: appId, // 必填，公众号的唯一标识
          timestamp: new Date().getTime(), // 必填，生成签名的时间戳
          nonceStr: this.make_nonceStr(), // 必填，生成签名的随机串
          signature: '',// 必填，签名，见附录1
          jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
       dplus.track('充值成功',{name:'充值成功返回页面'})//Dplus 充值成功返回页面
       this.make_nonceStr()
        //刮刮卡
        this.getCoinOrder();//获取支付详情
        this.getUserLoginInfor();
        if(this.hidden){

          var scrub =  document.getElementById('scrub');
          scrub.width = scrub.offsetWidth;
          scrub.height = scrub.offsetHeight;
          scrub.removeEventListener('touchstart',touch);
          scrub.addEventListener('touchstart',touch,false);
          scrub.removeEventListener('touchmove',touch);
          scrub.addEventListener('touchmove',touch,false);
          var x1,x2,y1,y2;
          var ctx = scrub.getContext('2d');

          ctx.beginPath();
          ctx.fillStyle = 'gray';
          ctx.rect(0,0,scrub.width,scrub.height);
          ctx.fill();
          ctx.beginPath();
          ctx.lineWidth = '5';
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalCompositeOperation = 'destination-out';

          function touch(event){
              event.preventDefault();
              switch(event.type){
                  case 'touchstart':
                  x1 = event.touches[0].clientX-scrub.offsetLeft;
                  y1 = event.touches[0].clientY-scrub.offsetTop;
                  ctx.moveTo(x1,y1);
                  break;
                  case 'touchmove':
                  x2 = event.touches[0].clientX-scrub.offsetLeft;
                  y2 = event.touches[0].clientY-scrub.offsetTop;
                  ctx.lineTo(x2,y2);
                  ctx.stroke();
                  break;
              }
          }
        }

        },
    data () {
      return {
        img:require('../../assets/img/bolan.png'),
        hidden:false,
        details:'',
        profilePictureId:'',
        nickName:'',
        phoneNumber:'',
        kb_number:'分享获得K币'
      }
    },
    components: {

    },
    methods: {
      makeTicket(appId,appsecret){
          //       // access_token 应该全局存储与更新，以下代码以写入到文件中做示例
          // let data = json_decode(file_get_contents("access_token.json"));
          // if ($data->expire_time < time()) {
          //   let TOKEN_URL="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appId+"&secret="+$appsecret;
          //   let json = file_get_contents(TOKEN_URL);
          //   let result = json_decode(json,true);
          //   let access_token = $result['access_token'];
          //   if (access_token) {
          //     data->expire_time = time() + 7000;
          //     data->access_token = $access_token;
          //     let fp = fopen("access_token.json", "w");
          //     fwrite(fp, json_encode(data));
          //     fclose(fp);
          //   }
          // }else{
          //   $access_token = $data->access_token;
          // }
          // // jsapi_ticket 应该全局存储与更新，以下代码以写入到文件中做示例
          // $data = json_decode(file_get_contents("jsapi_ticket.json"));
          // if ($data->expire_time < time()) {
          //   $ticket_URL="https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=".$access_token."&type=jsapi";
          //   $json = file_get_contents($ticket_URL);
          //   $result = json_decode($json,true);
          //   $ticket = $result['ticket'];
          //   if ($ticket) {
          //     $data->expire_time = time() + 7000;
          //     $data->jsapi_ticket = $ticket;
          //     $fp = fopen("jsapi_ticket.json", "w");
          //     fwrite($fp, json_encode($data));
          //     fclose($fp);
          //   }
          // }else{
          //   $ticket = $data->jsapi_ticket;
          // }
          // return $ticket;
      },
      make_nonceStr(){
          let codeSet = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
          let codes='';
          for (let i = 0; i<16; i++) {
           codes=codes+codeSet[Math.round(Math.random()*codeSet.length-1)];
          }
          return codes;
        },
       getUserLoginInfor(){//获取用户登入信息
       GetCurrentLoginInformationsApi().then(
         res=>{
           this.profilePictureId=res.data.result.user.profilePictureId?'https://api.k5game.com/Profile/GetProfilePictureById?id='+res.data.result.user.profilePictureId: 'https://api.g5game.com/Profile/GetProfilePictureById';
           this.nickName=res.data.result.user.nickName;
           this.phoneNumber=res.data.result.user.phoneNumber;
         },err=>{
           $.toast(err)
         }
       )
     },
      getCoinOrder(){
        GetCoinOrderApi({id:window.location.href.slice(window.location.href.indexOf('out_trade_no')+'out_trade_no='.length,-12)}).then(
          res=>{
            this.details=res.data.result
            this.details.paymentTime=checkJs.formatDate(new Date(this.details.paymentTime),'yyyy-MM-dd hh:mm:ss')
            if(this.url.indexOf('alipay')>0){
             this.details.payment='支付宝'
            }

          },err=>{
            $.toast(err)
          }
        )
        //     let self=this;
        // setTimeout(function(){
        //       self.hidden=true;
        //     },2000)
      },
      hiddenBtn(){
        this.hidden=false;
      }
    },
  }
</script>
