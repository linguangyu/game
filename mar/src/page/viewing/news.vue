<template>
  <div class="news colorfff">
    <header class="bar bar-nav">
      <a @click='$router.go(-1)' v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></a>
      <a class="icon icon-share pull-right"  id="addCardWrongCardExt"></a>
      <h1 class="title"> K5电竞</h1>
    </header>
    <div class='news-box' style="padding-bottom: 2.6rem;overflow:auto;-webkit-overflow-scrolling: touch;">
      <h1>{{items.title}}</h1>
      <i></i>
      <span>{{items.author}}</span>
      <span>{{items.publishTime | aaaa}}</span>
      <img :src="'https://api.k5game.com/Temp/Downloads/'+ items.picture">
      <p style="width: 100%" v-html="items.content"></p>
      <!--<div class='news-explain'>-->
      <!--<p v-html="items.content"></p>-->
      <!--</div>-->
      <p class='news-views'><img src="../../assets/img/see.png" alt="">{{items.traffic}}</p>
    </div>
    <!--<wxfx></wxfx>-->
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/viewing.scss';
</style>
<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc';
  import * as api from '../../api/news'
  //  import wxfx from '../../components/wxfx/wxfx.vue'
  import {GetSignature} from '../../api/wx'
  import wx from 'weixin-js-sdk'
  export default {
    computed: {},
    mounted() {
      this.getnewsForView();

      this.getWx();
    },
    created() {

      let aa = this.$route.params.newsId; //23.html
      if (aa.indexOf('.') !== -1) {
        let bb = aa.indexOf('.');
        this.htmla = aa.substring(0, bb)
      } else {
        this.htmla = aa
      }
    },
    filters: {
      aaaa(value) {
        if (!value) {
          return false
        }
        let aa = value;
        let bb = aa.substring(0, 10);
        let cc = aa.substring(12, 16);
        value = bb + ' ' + cc
        return value
      },
    },
    data() {
      return {
        items: '',
        Zindex: '',
        htmla: '',

        atitle: ''
      }
    },
    components: {
//      wxfx
    },
    methods: {
      getWx() {
        GetSignature({
          url: window.location.href
        }).then(
          res => {
            console.log(res)
            console.log(window.location.href)
            let links = 'www.baidu.com';  //分享出去的链接
            let title = 'text';   //分享的标题
            let desc = '11111';  //分享的详情介绍
            wx.config({
              debug: false,
              appId: res.data.result.appId,
              timestamp: res.data.result.timestamp,
              nonceStr: res.data.result.noncestr,
              signature: res.data.result.signature,
              jsApiList: [
                'onMenuShareAppMessage'
              ]
            });
            wx.ready(function () {
              // alert("done")
              // alert(title)
              //微信分享菜单测试
              document.querySelector('#addCardWrongCardExt').onclick = function () {
                wx.onMenuShareAppMessage({
                  title: title, // 分享标题
                  desc: desc, // 分享描述
                  link: links, // 分享链接
                  imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502858420&di=a133a5fc4415b8268a7e2454d4170a82&imgtype=jpg&er=1&src=http%3A%2F%2Fpic1.cxtuku.com%2F00%2F07%2F70%2Fb90090a53de9.jpg', // 分享图标
                  success: function () {
                    // 分享纪录
                    alert("成功分享给朋友")
                  },
                  cancel: function () {
                    alert("分享失败,您取消了分享!")
                  }
                });
              }
            });
            wx.error(function (res) {
              alert("error")
              // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });

          },
          err => {
          }
        )
      },
      getnewsForView() {
        api.ArticleShow({
          articleid: this.htmla
        }).then(
          res => {
            this.items = res.data.result;
            this.atitle = res.data.result.title
          },
          err => {
            $.toast(err)
          }
        )
      },
    }
  }
</script>
