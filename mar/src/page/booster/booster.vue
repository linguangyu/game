<template>
  <div class="booster">
    <div class="booster_header clearfix">
      <img src="./imgaes/jiantou.png" alt="" v-show="true" @click="returnHome">
      <p>炉石代练</p>
    </div>
    <div class="all_list" style="padding-bottom: 2.6rem;overflow:auto;-webkit-overflow-scrolling: touch;">
      <div class="booster_center" @click="bgShowClick(item.id,index,listIndex=index)" v-for="(item,index) in items">
        <div class="center_intermediate">
          <img :src="'https://api.k5game.com/Temp/Downloads/'+item.packagePic" alt=""
               class="intermediate_bg">
          <transition name="bounce">
            <div class="intermediate_bg_show" v-if="index===listIndex" :style="{
              'background':'url(https://api.k5game.com/Temp/Downloads/'+item.packagePic+') no-repeat top right',
              'background-size': '18.67rem 6.4rem',
              '-webkit-background-size': '18.67rem 6.4rem;'
              }">
            </div>
          </transition>
          <transition name="baibian">
            <div class="intermediate_baibian" v-if="index===listIndex"></div>
          </transition>
          <div class="clearfix intermediate_text_bg">
            {{item.packageName}}
            <img src="./imgaes/left.png" alt="" class="intermediate_left">
            <img src="./imgaes/right.png" alt="" class="intermediate_right">
          </div>
        </div>
      </div>
    </div>
    <div class="CoverLayer" v-show="donghua" @touchmove.prevent></div>
  </div>
</template>
<script charset="UTF-8">
  import * as api from '../../api/booster'

  export default {
    data() {
      return {
        //用于在动画过程中连续点击，跳转到别的动画里面去了
        donghua: false,
        //接收数据
        items: [],
        //用于判断点击的indeex
        listIndex: '',
      }
    },
    mounted() {
      this.getBoosterList();
    },
    methods: {
      returnHome() {
        this.$router.push({path: '/market/booster/'});
      },
      //获取列表清单数据
      getBoosterList() {
        api.GetPackageInfo({
          sorting: "",
        }).then(
          res => {
            console.log(res)
            this.items = res.data.result.packages["炉石代练"]
          },
          err => {
            $.toast(err);
          }
        )
      },
      //点击页面动效
      bgShowClick(packageid, index) {
        console.log(packageid)
        this.donghua = true;
        let slef = this;
        //2.8秒之后进行级金币加头像页面
        setTimeout(function () {
          slef.$router.push({ name: 'goldAvatar0',params:{DailianId:packageid+'.html'}});
        }, 1300)
      }
    },

  }
</script>
<style lang="scss" scoped>
  @import 'booster';
</style>
