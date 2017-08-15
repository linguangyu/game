<template>
  <div class=" market marginTop">
    <!-- header -->
    <header class="bar bar-nav">
      <h1 class="title">K5市场</h1>
    </header>
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- 这部分放你要渲染的那些内容 -->
      <swiper-slide v-for="item in items" :key='item.articleid'>
        <!--<router-link >-->
        <img :src="'https://api.k5game.com/Temp/Downloads/'+ item.picture" @click="swiperJump(item.correspondingLink)">
        <!--@click="GetOriginalState(item.articleTypeid,item.articleid,item.correspondingLink,item.showTheLocationid,item.wheelChartNumber)"-->
        <!--</router-link>-->
      </swiper-slide>
      <!-- 这是轮播的小圆点 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="market-list">
      <ul>
        <router-link :to="{path:'/market/HSFriend/'}" tag="li"><p><img src="../../assets/img/youyisaitub.png" alt="">
        </p>炉石友谊赛 <span>The legend of the legend</span>
        </router-link>
        <!--<router-link :to="{name:'accountNumber'}" tag="li"><p><img src="../../assets/img/zhanghaojiaoyitub.png" alt=""></p>账号交易<span>Account trasaction</span></router-link>-->
        <router-link :to="{ path: '/market/AccountTarde/'}" tag="li"><p><img
          src="../../assets/img/zhanghaojiaoyitub.png" alt="">
        </p>账号交易<span>Account trasaction</span></router-link>
        <router-link :to="{path: '/market/booster/'}" tag="li">
          <p>
            <img src="../../assets/img/youxidailtub.png" alt="">
          </p>
          游戏代练<span>Game Dailian</span>
        </router-link>

        <!--<li>-->
          <!--<p><img src="../../assets/img/jifengshangctub.png" alt="">-->
        <!--</p>积分商城<span>Points Mall</span>-->
        <!--</li>-->
        <router-link :to="{path: '/classification/'}" tag="li">
          <p><img src="../../assets/img/jifengshangctub.png" alt="">
          </p>积分商城<span>Points Mall</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import './../../assets/css/market.scss';
  @import '../../assets/css/sm-extend.min.css';
</style>
<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import * as api from '../../api/news'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    computed: {},
    mounted() {
      this.GetHomePageImage();

    },
    created() {

//      if (sessionStorage.getItem('key1')) {
//        this.swiperOption.initialSlide = 1
//        sessionStorage.removeItem('key1')
//      } else if (sessionStorage.getItem('key2')) {
//        this.swiperOption.initialSlide = 2
//        sessionStorage.removeItem('key2')
//      } else if (sessionStorage.getItem('key3')) {
//        this.swiperOption.initialSlide = 3
//        sessionStorage.removeItem('key3')
//      } else if (sessionStorage.getItem('key4')) {
//        this.swiperOption.initialSlide = 0
//        sessionStorage.removeItem('key4')
//      } else {
//        this.swiperOption.initialSlide = 1
//      }

    },
//    beforeRouteEnter(to, from, next) {
//      next((vm) => {
//        console.log(vm.swiperOption.initialSlide);  // 这里是可以打印出来。
//        vm.swiperOption.initialSlide = '3'    // 但是这里面修改不了。
//      })
//    },
    data() {
      return {
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          autoplayDisableOnInteraction: false,
          effect: "fade",
          pagination: '.swiper-pagination',
          paginationClickable: true,
          centeredSlides: true,
          loop: true,
          observer: true,
          initialSlide: 1,
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            this.page = swiper.realIndex + 1;
            this.index = swiper.realIndex;
          }
        },
        items: [],
//       用于防止URL 默认的游戏名字
        DgameName: ''
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    methods: {

//      获取图片接口
      GetHomePageImage() {
        api.CorrespondingDataFrontEnd({
          articleid: 1
        }).then(
          res => {
            this.items = res.data.result;
          },
          err => {
          }
        )
      },
//      跳转页面
      swiperJump(Link) {
        if (Link.indexOf('SharePage') !== -1) {
            this.$router.push({path: Link})
        } else {
          return false
        }
      }
//      GetOriginalState(articleTypeid, articleid, correspondingLink, showTheLocationid, wheelChartNumber) {
//        if (articleTypeid === 7) {
//          return
//        } else if (articleTypeid === 8) {
//          if (wheelChartNumber === 1) {
//            sessionStorage.setItem('key1', 1)
//          } else if (wheelChartNumber === 2) {
//            sessionStorage.setItem('key2', 2)
//          } else if (wheelChartNumber === 3) {
//            sessionStorage.setItem('key3', 3)
//          } else {
//            sessionStorage.setItem('key4', 4)
//          }
//          this.$router.push({
//            name: 'news', params: {newsId: articleid, showTheLocationida: showTheLocationid}
//          })
//        }else{
//          this.$router.push({
//            name: correspondingLink, params:{JumpState:1}
//          })
//        }
//
//
//      }
    }
  }
</script>
