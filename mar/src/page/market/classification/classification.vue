<template>
  <div class="classification">
    <div class="classification_top">
      <router-link class="classification_header clearfix" tag="div" :to="{path:'/market/'}">
        <img src="./imgaes/jiantou.png" alt="" v-show="true">
        <p>账号交易</p>
      </router-link>
      <div class="top_center">
        <input type="text" class="form_input"
               placeholder="请输入你需要查找的游戏名称" onfocus="this.placeholder=''"
               onblur="if (this.placeholder === '') {this.placeholder='请输入你需要查找的游戏名称'}">
        <img src="./imgaes/sousuoh.png" alt="">
      </div>
      <div class="classification_sort">
        <div class="classification_sort_game active">账户交易</div>
        <div class="classification_sort_dai">游戏代练</div>
      </div>
    </div>
    <!--<swiper :options="swiperOption" ref="mySwiper">-->
      <!--&lt;!&ndash; 这部分放你要渲染的那些内容 &ndash;&gt;-->
      <!--<swiper-slide>-->
        <!--<div class="collectionPictures">-->
          <!--<div class="collectionPictures_one">-->
            <!--<img src="./imgaes/2.png" alt="">-->
            <!--<p class="collectionPictures_one_p">热血传奇手机版</p>-->
            <!--<p>57465</p>-->
          <!--</div>-->
          <!--<div class="collectionPictures_one">-->
            <!--<img src="./imgaes/1.png" alt="">-->
            <!--<p class="collectionPictures_one_p">热血传奇手机版</p>-->
            <!--<p>57465</p>-->
          <!--</div>-->
          <!--<div class="collectionPictures_one">-->
            <!--<img src="./imgaes/2.png" alt="">-->
            <!--<p class="collectionPictures_one_p">热血传奇手机版</p>-->
            <!--<p>57465</p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</swiper-slide>-->

      <!--&lt;!&ndash;<swiper-slide>&ndash;&gt;-->
      <!--&lt;!&ndash;<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502464612401&di=53aeaeb549cbe4c8baa9b0ee3819cc8e&imgtype=0&src=http%3A%2F%2Fimg3.fengniao.com%2Falbum%2Fupload%2F2%2F310%2F61894%2F12378667.jpg" alt="">&ndash;&gt;-->
      <!--&lt;!&ndash;</swiper-slide>&ndash;&gt;-->
      <!--&lt;!&ndash; 这是轮播的小圆点 &ndash;&gt;-->
      <!--<div class="swiper-pagination" slot="pagination"></div>-->
    <!--</swiper>-->
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- 这部分放你要渲染的那些内容 -->
      <swiper-slide>
        <div class="collectionPictures">
          <div class="collectionPictures_one">
            <img src="./imgaes/1.png" alt="">
            <p class="collectionPictures_one_p">热血传奇手机版</p>
            <p>57465</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="collectionPictures_two">
          <div class="collectionPictures_two">
            <img src="./imgaes/2.png" alt="">
            <p class="collectionPictures_one_p">热血传奇手机版</p>
            <p>57465</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="collectionPictures_three">
          <div class="collectionPictures_three">
            <img src="./imgaes/3.png" alt="">
            <p class="collectionPictures_one_p">热血传奇手机版</p>
            <p>57465</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="collectionPictures">
          <div class="collectionPictures_one">
            <img src="./imgaes/4.png" alt="">
            <p class="collectionPictures_one_p">热血传奇手机版</p>
            <p>57465</p>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="collectionPictures_two">
          <div class="collectionPictures_two">
            <img src="./imgaes/5.png" alt="">
            <p class="collectionPictures_one_p">热血传奇手机版</p>
            <p>57465</p>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="collectionPictures_three">
          <div class="collectionPictures_three">
            <img src="./imgaes/6.png" alt="">
            <p class="collectionPictures_one_p">热血传奇手机版</p>
            <p>57465</p>
          </div>
        </div>
      </swiper-slide>
      <!--<swiper-slide>-->
      <!--<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502464612401&di=53aeaeb549cbe4c8baa9b0ee3819cc8e&imgtype=0&src=http%3A%2F%2Fimg3.fengniao.com%2Falbum%2Fupload%2F2%2F310%2F61894%2F12378667.jpg" alt="">-->
      <!--</swiper-slide>-->
      <!-- 这是轮播的小圆点 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="classification_class">
      <div class="classification_class_bg">
        <img src="./imgaes/1.png" alt="">
      </div>
      <div class="classification_class_text">
        <p>炉石传说</p>
        <p>游戏类型：策略类卡牌游戏</p>
        <p>游戏开发：暴雪娱乐公司</p>
        <star :score='4.6'></star>
      </div>
    </div>
  </div>
</template>
<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import star from '../../../components/star/star.vue'
  export default {
    components: {
      swiper,
      swiperSlide,
      star
    },
    computed: {},
    created() {
    },
    mounted() {
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
          observer: true,
          initialSlide: 2,
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            this.page = swiper.realIndex + 1;
            this.index = swiper.realIndex;
          }
        },
      }
    },
    methods: {},
  }
</script>
<style lang="scss" scoped>
  @import 'classification';
</style>
