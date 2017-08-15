<template>
<div class="content">
  <!-- Slider -->
  <div class="swiper-container" data-space-between='10'>
    <div class="swiper-wrapper">
      <div class="swiper-slide"><img src="../../assets/img/qidonye0.png" alt=""></div>
      <div class="swiper-slide"><img src="../../assets/img/qidonye1.png" alt=""></div>
      <div class="swiper-slide"><img src="../../assets/img/qidonye2.png" alt=""><router-link :to="{name:'login'}" class='startbtn'>马上进入</router-link></div>
    </div>
  </div>
</div>
</template>
<style lang="scss" scoped>
.swiper-slide img{
  width:100%;
}

.swiper-container{
  padding-bottom:0px;
}
.startbtn{
  position:absolute;
  top:80%;
  left:39.5%;
  color:#fff;
  border:1px solid #ffb800;
  padding:.3rem .5rem;
  border-radius:10px;
  font-size:.8rem;
}
</style>
<script charset="UTF-8">
import * as checkJs from '../../assets/js/pubFunc'
export default{
     computed:{

      },
    mounted () {
      // console.log(123)
      let self=this
        $(function() {
             $(".swiper-container").swiper({
                  pagination: '.swiper-pagination',
                  paginationClickable: true,
                  autoplayDisableOnInteraction:false,
                  autoplay:3000,
                  effect: 'fade',
                  loop: true,
             });
         });
      setTimeout(function(){
         self.$router.push({path:'/login'})
      },10000)
    },
    data () {
      return {
        }
      },
    components: {

    },
    methods: {

    }
  }
</script>
