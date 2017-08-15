<template>
  <div class="viewing colorfff">
    <header class="bar bar-nav">
      <h1 class="title">K5视角</h1>
    </header>
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- 这部分放你要渲染的那些内容 -->
      <swiper-slide v-for="item in itemb" :key='item.articleid'>
        <img :src="'https://api.k5game.com/Temp/Downloads/'+ item.picture" @click="swiperJump(item.correspondingLink)"
        >
        <!--@click="GetOriginalState(item.articleTypeid,item.articleid,item.correspondingLink,item.showTheLocationid,item.wheelChartNumber)"-->
      </swiper-slide>
      <!-- 这是轮播的小圆点 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class='viewing-list'>
      <div class="list-block media-list">
        <ul>
          <router-link @click.native='gotonews()'
                       :to="{name:'news',params:{newsId:item.id+'.html',ProductID:item.articleTypeid}}"
                       tag='li'
                       v-for='item in items' :key='item.id'>
            <div class="item-content">
              <div class="item-media"><img :src="'https://api.k5game.com/Temp/Downloads/'+ item.picture"></div>
              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title">{{item.title}}</div>
                </div>
                <div style='font-size:.7rem;color:#B6B6B6;'>{{item.publishTime | newtel}}</div>
                <div class="item-subtitle"><span>{{item.traffic}}</span> <img src="../../assets/img/see.png" alt="">
                </div>
              </div>
            </div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/viewing.scss';
  @import '../../assets/css/sm-extend.min.css';
</style>
<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc';
  import * as api from '../../api/news'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  import * as apiwx from '../../api/wx'
  import wx from 'weixin-js-sdk'

  export default {
    mounted() {
      // 获取新闻列表
      this.GetPerspectiveNews();
      this.GetPerspectivePageImage();
    },
    methods: {
      gotonews() {
        dplus.track('新闻详情', {name: '进入新闻详情'})//Dplus 进入新闻详情
      },
      GetPerspectiveNews() {
        api.ArticleLhTitleListShow({
          showTheLocationid: 13,
          belongsToGameid: this.$route.params.GName,
        }).then(
          res => {
            console.log(res)
            this.items = res.data.result.items;
          },
          err => {
            $.toast(err);
          }
        )
      },
//      获取视角轮播图图片
      GetPerspectivePageImage() {
        api.CorrespondingDataFrontEnd({
          articleid: 2
        }).then(
          res => {
            this.itemb = res.data.result;
          },
          err => {
            $.toast(err);
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
//            name: 'news',
//            params: {newsId: articleid, showTheLocationida: showTheLocationid}
//          })
//        } else {
//          this.$router.push({
//            name: correspondingLink, params:{JumpState:3}
//          })
//        }
//
//
//      }
    },
    filters: {
      newtel(value) {
        let aa = value;
        let bb = aa.substring(0, 10);
        let cc = aa.substring(12, 16);
        value = bb + ' ' + cc;
        return value
      },
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
          initialSlide: 1,
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            this.page = swiper.realIndex + 1;
            this.index = swiper.realIndex;
          }
        },
        items: '',
        itemb: '',
        picture1: '',
        picture2: '',
        picture3: '',
      }
    },
    components: {
      swiper,
      swiperSlide
    },

  }
</script>
