<template>
  <div class='accountNumberDateils'>
    <!--头-->
    <div class="accountNumberIcon">
      <img class="accountNumberIcon_jt" src="./imgaes/jiantou.png" alt="" @click="$router.go(-1)">
      <div class="accountNumberIcon_right clearfix">
        <div class="accountNumberIcon_right_kf" @click="ContactService">
          <img src="./imgaes/kefutouxian.png" alt="">
          <p>联系客服</p>
        </div>
        <div class="accountNumberIcon_right_fx">
          <img src="./imgaes/fenx.png" alt="">
        </div>
      </div>
    </div>
    <!--标题和价格-->
    <div class="accountNumberDateils_herder">
      <div class="accountNumberDateils_herder_left">
        {{accountDateils.accountName}}
      </div>
      <div class="accountNumberDateils_herder_right">
        <p class="accountNumberDateils_herder_right_first">{{accountDateils.accountPrice}}kb</p>
        <p class="accountNumberDateils_herder_right_scend">更新时间：{{accountDateils.auditTime | agetTime}}</p>
      </div>
    </div>
    <!--轮播图-->
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- 这部分放你要渲染的那些内容 -->
      <swiper-slide v-for="(img,index) in Carousel" :key='index'>
        <img v-if="img.url" :src="'https://api.k5game.com/Upload/Downloads/'+img.url" alt="">
      </swiper-slide>
      <!-- 这是轮播的小圆点 -->
      <img v-if="Carousel.length===0" src="../../assets/img/tpzw.png" alt="">
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!--内容-->
    <div class="accountNumberDateils_Dateils" ref="SwitchStateR">
      <div class="Dateils_Dateils_SwitchState" @click="SwitchStateC">
        <img v-if="!SwitchStateD" src="./imgaes/zkai.png" alt="">
        <img v-if="SwitchStateD" src="./imgaes/qux.png" alt="">
      </div>
      <!--商品详情-->
      <div class="accountdescribe">
        <div class="accountdescribe_tr">
          <div class="accountdescribe_td accountdescribe_s">商品类型</div>
          <div class="accountdescribe_td ">:</div>
          <div class="accountdescribe_td accountdescribe_t">{{accountDateils.accountType}}</div>
        </div>
        <div class="accountdescribe_tr">
          <div class="accountdescribe_td">身份证号</div>
          <div class="accountdescribe_td">:</div>
          <div class="accountdescribe_td">{{accountDateils.authentication ? "是" : '否'}}</div>
        </div>
        <div class="accountdescribe_tr">
          <div class="accountdescribe_td">手机号码</div>
          <div class="accountdescribe_td">:</div>
          <div class="accountdescribe_td">{{accountDateils.phoenValidation ? "是" : '否'}}</div>
        </div>
        <div class="accountdescribe_tr">
          <div class="accountdescribe_td">邮箱验证</div>
          <div class="accountdescribe_td">:</div>
          <div class="accountdescribe_td">{{accountDateils.emailVaildation ? "是" : '否'}}</div>
        </div>
        <div class="accountdescribe_tr">
          <div class="accountdescribe_td">商 品 I D</div>
          <div class="accountdescribe_td">:</div>
          <div class="accountdescribe_td">{{accountDateils.id}}</div>
        </div>
        <div class="accountdescribe_tr">
          <div class="accountdescribe_td">所属游戏</div>
          <div class="accountdescribe_td">:</div>
          <div class="accountdescribe_td">{{accountDateils.gameName}}</div>
        </div>
        <div class="accountdescribe_tr">
          <div class="accountdescribe_td">客 户 端</div>
          <div class="accountdescribe_td">:</div>
          <div class="accountdescribe_td">{{accountDateils.client}}</div>
        </div>
        <div class="accountdescribe_tr">
          <div class="accountdescribe_td">游戏区服</div>
          <div class="accountdescribe_td">:</div>
          <div class="accountdescribe_td">{{accountDateils.gameArea}}</div>
        </div>
      </div>
      <!--账号描述-->
      <div class="businessDescription">
        <p>商品描述</p>
        <div>{{accountDateils.description}}
        </div>
        <p>账号亮点</p>
        <div>{{accountDateils.accountWindow}}
        </div>
      </div>
      <!--确定购买按钮-->
      <div class="accountBtn" v-if="accountDateils.status===1 && JudgmentStateJS!==1">
        <button v-if="!modelHide" @click="TheReserved()">购买</button>
        <button v-if="modelHide" @click="DetermineBuy()">确定</button>
      </div>
    </div>
    <!--预留电话或者其他的联系方式-->
    <div class="theReserved_model" v-if="modelHide" @click.self="modelHide=false">
      <div class="theReserved_content">
        <h1>预留联系方式</h1>
        <input type="text" placeholder="手机号码" v-model="phoneNumber">
        <p>注:留下联系方式，方便客服联系您,进行售后服务</p>
      </div>
    </div>
    <!--联系客服-->

    <Whether ref="Whether"></Whether>
  </div>
</template>
<style lang="scss" scoped>
  @import 'accountNumber';
  @import '../../assets/css/sm-extend.min.css';
</style>
<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc';
  import {GetSaleAccountTransactionsdetailsApi} from '../../api/accountNumber.js';
  import {CreatePurchaseAccountTransactionApi} from '../../api/accountNumber.js';
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import Whether from '../../components/Whether/Whether.vue'

  export default {
    computed: {},
    created() {
      let aa = this.$route.params.newsId; //23.html
      if (aa.indexOf('.') !== -1) {
        let bb = aa.indexOf('.');
        this.htmla = aa.substring(0, bb)
      } else {
        this.htmla = aa
      }
    },
    mounted() {
      this.getaccountDatails();
      this.JudgmentStateJS = this.$route.params.JudgmentState
//      this.ReturnPage=this.$route.params.ReturnPage
    },
    filters: {
      agetTime(value) {
        if (!value) {
          return
        } else {
          let aa = value.substring(0, 10);
          value = aa
          return value
        }

      }
    },
    components: {
      swiper,
      swiperSlide,
      Whether
    },
    created() {
      this.JudgmentStateJS = this.$route.params.JudgmentState;

      let aa = this.$route.params.accoutNumberDateilsId; //23.html
      if (aa.indexOf('.') !== -1) {
        let bb = aa.indexOf('.');
        this.htmla = aa.substring(0, bb)
      } else {
        this.htmla = aa
      }
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
//          loop: true,
          initialSlide: 0,
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            this.page = swiper.realIndex + 1;
            this.index = swiper.realIndex;
          }
        },
        htmla: '',
        accountDateils: '',
        phoneNumber: '',
        modelHide: false,

//       接收图片地址
        JimageZoom: '',
        SimageZoom: false,
//       改变图片使用
        SwitchStateD: false,
//        轮播图
        Carousel: [],
//       联系客服
        CustomerService: false,
        message: "Rasy003",
//        用于不同的跳转页面
        ReturnPage: '',

//      用于判断 购买按钮是否现实。 在购买调到详情的时候
        JudgmentStateJS: ''

      }
    },
    methods: {
      ContactService() {
        this.$store.state.global.CustomerService = true
      },
//      获取销售订单详情
      getaccountDatails() {
        GetSaleAccountTransactionsdetailsApi({id: this.htmla}).then(
          res => {
            this.accountDateils = res.data.result;
            this.Carousel = res.data.result.screenshots;
          }, err => {
            $.toast(err)
          }
        )
      },
      TheReserved() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.modelHide = true;
        }
      },

      DetermineBuy() {
        if (!this.phoneNumber) {
          $.toast('至少填写一个联系方式');
          return;
        }
        CreatePurchaseAccountTransactionApi({
          saleOrderId: this.htmla,
          userContact: this.phoneNumber
        }).then(
          res => {
            this.$router.push({
              name: 'PaymentOrder',
              params: {PaymentOrderId: res.data.result, State: 2}
            })
          }, err => {
            $.toast(err);
          }
        )

      },
//      改变图片状态
      SwitchStateC() {
        if (!this.SwitchStateD) {
          this.$refs.SwitchStateR.style.bottom = 0;
          this.SwitchStateD = true
        } else {
          this.$refs.SwitchStateR.style.bottom = -280.5 + 'px';
          this.SwitchStateD = false
        }
      }

    },
  }
</script>
