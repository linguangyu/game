<template>
    <div class='consulttationRecord marginTop'>
      <!--头部-->
      <header class="bar bar-nav">
      <a @click='$router.go(-1)'  v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></a>
      <h1 class="title">协商记录</h1>
      </header>
      <div class='consulttationRecord-box clearfix'>
        <!--<div class='consulttationRecord-box-lt'><img src="../../assets/img/1.png" alt=""></div>-->
        <div class='consulttationRecord-box-rt' v-for='item in items'>
        <p>TAG：{{item.creatorUserName}}</p>
        <p>{{item.content}}</p>
        <div class='consulttationRecord-box-img'>
          <ul class='clearfix'>
            <li v-for='img in item.screenshots'><img :src="img.url" alt=""></li>
          </ul>
        </div>
        <p style='margin-top:9px;text-align:right;color:#C3C3C3;'>时间：{{item.creationTime}} 上传（3）</p>
        </div>
      </div>
      <div class='consulttationRecord-btn'>确认完成</div>
      <p class='consulttationRecord-service'>申请客服介入</p>
      <div class='consulttationRecord-model' @click='hiddenBtn()' v-if='hidden'>
        <div class='consulttationRecord-model-box'>
           <div class="swiper-container" data-space-between='10'>
            <div class="swiper-wrapper">
              <!--<div class="swiper-slide" ><img  @touchend='move($event)' src="../../assets/img/banner.png" alt=""></div>-->
              <!--<div class="swiper-slide" ><img  @touchend='move($event)'src="../../assets/img/banner02.png" alt=""></div>-->
              <!--<div class="swiper-slide" ><img  @touchend='move($event)'src="../../assets/img/banner03.png" alt=""></div>-->
            </div>
           </div>
        </div>
        <div class='consulttationRecord-model-footer'><span>0{{number}}</span> 游戏开场 <span>{{number}}/3</span></div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../assets/css/market.scss';
</style>

<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import { GetProblemsApi } from '../../api/order.js'
  export default{
    computed:{

    },
    mounted () {
      this.getProblems();
  $(function () {
          $(".swiper-container").swiper({
            paginationClickable: true,
            autoplayDisableOnInteraction: false,
            effect: 'fade',
            loop: true,
          });
        });
        },
    data () {
      return {
        number:1,
        hidden:false,
        items:''
      }
    },
    components: {

    },
    methods: {
      getProblems(){

        GetProblemsApi({id:this.$route.params.consultationRecordId}).then(
          res=>{
              console.log(res)
            for(let i=0;i<res.data.result.items.length;i++){
              res.data.result.items[i].creationTime=checkJs.formatDate(new Date(res.data.result.items[i].creationTime),'yyyy-MM-dd hh:mm:ss');
              for(let j=0;j<res.data.result.items[i].screenshots.length;j++){
                  console.log(res.data.result.items[i].screenshots[j])
                res.data.result.items[i].screenshots[j].url='https://api.k5game.com/Upload/Downloads/'+res.data.result.items[i].screenshots[j].url;
              }
            }
           this.items=res.data.result.items
          },err=>{
            $.toast(err)
          }
        )
      },
    move(e){
      console.log(e.target)
    this.number=$(e.target).parent().index()+1;

    console.log($(e.target).parent().index())
    },
    hiddenBtn(){
      this.hidden=false;
      console.log(123)
    },
    showBtn(){
      this.hidden=true;
    }

    },
  }
</script>
