<template>
  <div class='game'>
    <!--头部-->
    <header class="bar bar-nav">
      <a v-if='this.$store.state.global.judge' class="icon icon-left pull-left"
         @click="$router.push({path: '/market/'})"></a>
      <h1 class="title">友谊赛市场</h1>
    </header>
    <!--图片-->
    <div class='game-map'>
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- 这部分放你要渲染的那些内容 -->
        <swiper-slide v-for="item in itemz" :key='item.articleid'>
          <!--<router-link >-->
          <img :src="'https://api.k5game.com/Temp/Downloads/'+ item.picture" @click="swiperJump(item.correspondingLink)"
          >
          <!--@click="GetOriginalState(item.articleTypeid,item.articleid,item.correspondingLink,item.showTheLocationid,item.wheelChartNumber)"-->
          <!--</router-link>-->
        </swiper-slide>
        <!-- 这是轮播的小圆点 -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!--当前-->
    <div class='game-current clearfix'>
      <ul class='clearfix'>
        <li>
          <dl @click='gotopurchase()'>
            <dt><img src="../../assets/img/kbichonzhi.png" alt=""></dt>
            <dd>k币充值</dd>
          </dl>
          <!--<router-link :to="{name:'money'}">K币记录</router-link>-->
        </li>
        <li>
          <!-- 提取-->
          <!--<router-link @click.native='gotoectract()' :to="{ path:'/market/HSFriend/extract/' }" tag='dl'>-->
          <dl @click.native='gotoectract()' @click="ExtractGame">
            <dt><img src="../../assets/img/tiqubisai.png" alt=""></dt>
            <dd>提取比赛</dd>
          </dl>
          <!--</router-link>-->
          <!-- <router-link :to="{name:'extractrecords'}">提取记录</router-link>-->
        </li>
        <li>
          <!--存入-->
          <dl @click='getGranted($event)'>
            <dt><img src="../../assets/img/cunrbisai.png" alt=""></dt>
            <dd>存入比赛<br></dd>
          </dl>
          <!-- <a  @click='getGranted($event)' >存入记录</a>-->
        </li>

      </ul>
    </div>
    <!--销售列表-->
    <div class="setHeight">
      <div class='game' style="padding-bottom: 2.6rem;overflow:auto;-webkit-overflow-scrolling: touch;"
           ref="scrollContainer">
        <div class="bbbbbbbbbb"></div>
        <div class="buy-list" v-for="(item,index) in items">
          <div class="buy__user tab-item">
            <div class="buy__user__avatar"><img :src="item.profilePictureId" alt=""></div>
            <p class="buy__user__name">{{item.nickName}}</p>
            <p class="buy__user__number">x{{item.rest}}<span>场</span></p>
          </div>
          <div class="buy__buy tab-item">
            <div class="buy__buy__text">
              <p>出售友谊赛</p>
            </div>
            <div class="buy__buy__button">
              <p @click="buyGoods(item)">购买</p>
            </div>
          </div>
          <div class="buy__price tab-item">
            <p class="buy__price__text1">单价</p>
            <p class="buy__price__text2">{{item.price}}</p>
            <p class="buy__price__text3">kb</p>
          </div>
        </div>
        <div class="aaaaaaaaaa"></div>
        <!--aaaaaaaaaa 用于增加占位-->
        <mugen-scroll :handler="fetchData" :should-handle="!loading" scroll-container="scrollContainer">
          <div class="infinite-scroll-preloader">
            <div class="preloader"></div>
          </div>
        </mugen-scroll>
      </div>
    </div>
    <!--出售-->
    <transition name="slide-fade">
      <div class="case" v-if="show" @touchmove.prevent>
        <div class="case__Count">
          <div class="case__Count__Less" @click="lessNumber"><p>-</p></div>
          <div class="case__Count__number">{{ reversedMessage }}</div>
          <div class="case__Count__plus" @click="plusNumber"><p>+</p></div>
        </div>
        <div class="case__input">
          <p class="case__input__price">单价 :</p>
          <input type="text" class="form_input" placeholder="请输入出售单价" onfocus="this.placeholder=''"
                 onblur="if (this.placeholder === '') {this.placeholder='请输入出售单价'}" v-model="inputName">
          <p class="case__input__name">kb</p>
        </div>
        <div class="case__box" @click="sellBoxHide">
          <div class="case__box__button"></div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="sell-wrapper" v-show="sellWrapperHide" @click="sellWrapperButton" @touchmove.prevent></div>
    </transition>
    <div class="sell" @touchmove.prevent>
      <div class="sell__match tab-item">
        <div class="sell__match__number">{{availableFriendlyMatchs}}</div>
        <div class="sell__match__game">友谊赛</div>
      </div>
      <div class="sell__seller tab-item" @click="sellBoxText" v-show="sellBoxSell">
        <p>我要出售</p>
      </div>
      <div class="sell__seller tab-item" v-show="sellBoxSure" @click="sellBtn()">
        <p>确认出售</p>
      </div>
      <div class="sell__kb tab-item">
        <div class="sell__kb__number">{{availableCoins}}</div>
        <div class="sell__kb__kb">k币</div>
      </div>
    </div>
    <div class="box-wrapper" v-show="boxWrapperHide" @click="cancelDisplay" @touchmove.prevent></div>
    <!--确认购买-->
    <div class="boxaaa" v-show="boxWrapperHide">
      <div class="box__title">购买声明</div>
      <div class="box__checkbox">
        <div class="box__input1" @click="hide">
          <input type="checkbox" value="1" id="checkbox1">
          <img src="../../assets/img/game_gou.png" alt="" class="box__input1_bg" v-show="boxBgShow">
        </div>
        <div class="box_text">
          <router-link :to='{name:"BuyAmerican"}' tag='p'>我已同意《K5电竞友谊赛购买条款》</router-link>
        </div>
      </div>

      <div class="box__totalCost">
        <div class="box__totalCost_number">
          <p class="number_quantity">数量 :<span>{{itemNickName}}场</span></p>
        </div>
        <div class="box__totalCost_price">
          <p class="price_total">合计 :<span> {{calculateTotalPrice}}kb</span></p>
        </div>
      </div>
      <div class="box__button" @click="makeSureBuy">确定</div>
    </div>
    <div class="wenhaoshuoming" @click='gotoRouter($event)'><img src="../../assets/img/wenhao.png" alt=""></div>
    <Whether ref="Whether"></Whether>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/market.scss';
  @import '../../assets/css/sm-extend.min.css';
</style>
<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import {GetCurrentLoginInformationsApi} from '../../api/account.js'
  import {HasPermissionApi} from '../../api/account.js'
  import * as api from '../../api/transaction.js'
  import MugenScroll from 'vue-mugen-scroll'
  import * as apia from '../../api/news'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import Whether from '../../components/Whether/Whether.vue'

  //  var storage=window.localStorage;
  export default {
    computed: {
      reversedMessage: function () {
        return this.digital < 10 ? '0' + this.digital : this.digital;
      },
      calculateTotalPrice: function () {
        return this.itemsAmount * this.itemsPrice;
      },
      itemNickName: function () {
        return this.itemsAmount;
      }
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
    mounted() {
      this.salesOrderList();
      this.gerusermoney();
      this.GetHomePageImage();
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
          initialSlide: 1,
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            this.page = swiper.realIndex + 1;
            this.index = swiper.realIndex;
          }
        },
        Kbi: 10,
        availableCoins: '',//虚拟货币
        availablePoints: '',//账户积分
        availableFriendlyMatchs: '',//友谊赛场次
        items: [],//销售列表
        itemsId: '',//购买的ID地址
        itemz: [],//轮播图片
        itemsAmount: '',//购买的场次
        itemsPrice: '',//购买的原始价格
        totalCount: '',//清单总数
        //交互动态
//        isGranted: '',
        boxBgShow: false,
        boxWrapperHide: false,
        show: false,
        sellBoxSell: true,
        sellBoxSure: false,
        sellWrapperHide: false,
        digital: null,
        inputName: null,
        loading: false,
        skipCount: 10,

      }
    },
    components: {
      MugenScroll,
      swiper,
      swiperSlide,
      Whether
    },
    methods: {
      gotoectract() {//进入提取页面
        dplus.track('提取比赛', {name: '提取比赛按钮'})//Dplus 市场页面的购买按钮
      },
      gotopurchase() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          dplus.track('k币充值', {name: 'K币充值按钮'}) //Dplus 市场页面的购买按钮
          this.$router.push({path: '/market/purchase'})
        }
      },
      ExtractGame() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({path: '/market/HSFriend/extract/'})
        }
      },
      gotoRouter(e) {
        this.$router.push({path: '/market/electric'})
      },
      fetchData() {//底部无线滚动
        if (this.items.length === 0) {
          return
        }
        this.loading = true;
        api.GetSaleOrdersApi({sorting: 'price', maxResultCount: 10, skipCount: this.skipCount}).then(
          res => {
            for (let i = 0; i < res.data.result.items.length; i++) {
              if (res.data.result.items[i].profilePictureId) {
                res.data.result.items[i].profilePictureId = 'https://api.k5game.com/Profile/GetProfilePictureById?id=' + res.data.result.items[i].profilePictureId;
              } else {
                res.data.result.items[i].profilePictureId = 'https://api.k5game.com/Profile/GetProfilePictureById'
              }
              this.items.push(res.data.result.items[i]);
            }

          },
          err => {
            $.toast(err)
          }
        );
        if (this.skipCount > this.totalCount) {
          return;
        }
        this.skipCount += 10;
        this.loading = false
      },
      makeSureBuy() {//确定购买
        if (!this.boxBgShow) {
          return $.toast('请阅读以及同意购买条款');
        }
        api.CreatePurchaseOrderApi({
          saleOrderId: this.itemsId,
          amount: this.itemsAmount
        }).then(
          res => {
            $.toast('恭喜！购买成功');
            this.boxWrapperHide = false;
            dplus.track('确定购买', {name: '购买确定按钮'})//Dplus 市场页面的购买按钮
            setTimeout(function () {
              window.location.reload();
            }, 500)
            localStorage.boxBgShow = this.boxBgShow
          }, err => {
            $.toast(err)
          }
        )
      },
      sellBtn() {//出售按钮
        if (this.digital <= 0 && this.inputName <= 0) {
          return $.toast('请输入您要出售的场次和价格');
        }
        if (this.inputName <= 0) {
          return $.toast('请输入您要出售的价格');
        }
        if (this.inputName !== this.inputName.replace(/^[0-9]\d?(\.[1-9])?$/)) {
        } else {
          this.inputName = '';
          return $.alert('目前规定的价格范围（0.1-99.9）');
        }
        if (this.digital <= 0) {
          return $.toast('输入您要出售的的场次');
        }
        if (this.digital > 0 && this.inputName > 0) {
          api.CreateSaleOrderApi({
            price: this.inputName,
            amount: this.digital,
          }).then(
            res => {
              $.toast('出售成功');
              this.sellWrapperHide = false;
              this.show = false;
              this.sellBoxSure = false;
              this.sellBoxSell = true;
              dplus.track('出售按钮', {name: '出售按钮'})//Dplus 市场页面的出售按钮
              setTimeout(function () {
                window.location.reload();
              }, 500)
            }, err => {
              $.toast(err)
            }
          );
          return;
        }
      },
      gerusermoney() {
        GetCurrentLoginInformationsApi().then(
          res => {
            this.availableCoins = res.data.result.userAsset.availableCoins;
            this.availablePoints = res.data.result.userAsset.availablePoints;
            this.availableFriendlyMatchs = res.data.result.userAsset.availableFriendlyMatchs;
          },
          err => {
            $.toast(err);
          }
        )
      },
      salesOrderList() {//获取销售订单列表
        api.GetSaleOrdersApi({sorting: 'price', maxResultCount: 10, skipCount: 0}).then(
          res => {
            for (let i = 0; i < res.data.result.items.length; i++) {
              if (res.data.result.items[i].profilePictureId) {
                res.data.result.items[i].profilePictureId = 'https://api.k5game.com/Profile/GetProfilePictureById?id=' + res.data.result.items[i].profilePictureId;
              } else {
                res.data.result.items[i].profilePictureId = 'https://api.k5game.com/Profile/GetProfilePictureById'
              }
            }
            this.items = res.data.result.items;
            if (this.items.length == 0) {
              this.$store.state.global.blankPage = true
            }
            this.totalCount = res.data.result.totalCount;
          },
          err => {
            $.toast(err);
          }
        )
      },
      hide() {
        if (this.boxBgShow === false) {
          this.boxBgShow = true;
        } else {
          this.boxBgShow = false;
        }
      },
//      hideThree() {
//        if (this.boxBgShowThree === false) {
//          this.boxBgShowThree = true;
//        } else {
//          this.boxBgShowThree = false;
//        }
//      },
      buyGoods(item) {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.itemsPrice = item.price;
          this.itemsAmount = item.rest;
          if (this.availableCoins < this.itemsAmount * this.itemsPrice) {
            return $.toast('kb不够' + this.itemsAmount * this.itemsPrice + '请充值')
          }
          this.boxWrapperHide = true;
          this.itemsId = item.id;
          this.boxBgShow = localStorage.boxBgShow;

        }
      },
      cancelDisplay() {
        this.boxWrapperHide = false;
      },
      sellBoxText() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.sellBoxSell = false;
          this.sellBoxSure = true;
          this.show = !this.show;
          this.sellWrapperHide = true;
          this.digital += 0;
        }
      },
      sellWrapperButton() {
        this.sellBoxSell = true;
        this.sellBoxSure = false;
        this.show = !this.show;
        this.sellWrapperHide = false;
        this.inputName = '';
        this.availableFriendlyMatchs += this.digital;
        this.digital = 0;
      },
      sellBoxHide() {
        this.sellBoxSell = true;
        this.sellBoxSure = false;
        this.show = !this.show;
        this.sellWrapperHide = false;
        this.inputName = '';
        this.availableFriendlyMatchs += this.digital;
        this.digital = 0;
      },
      plusNumber() {
        if (this.digital === 5) {
          this.digital += 0;
          return $.toast('一次出售,最多出售5场')
        }
        if (this.availableFriendlyMatchs === 0) {
          this.availableFriendlyMatchs += 0;
          return $.toast('您目前没有可出售的场次')
        } else {
          this.digital += 1;
          this.availableFriendlyMatchs -= 1;
        }
      },
      lessNumber() {
        if (this.digital === 0) {
          return this.digital;
        } else {
          this.digital -= 1;
          this.availableFriendlyMatchs += 1;
        }
      },
      getGranted(e) {//存入友谊赛的权限
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          HasPermissionApi({id: 'Pages.HearthStone.FriendMatch.CreateDepositOrder'}).then(
            res => {
              if (!res.data.result) {
                $.alert('请添加微信Rasy003开通权限');
                return;
              } else {
                if (e.target.innerHTML == '存入记录') {
                  this.$router.push({name: 'Intherecord'})
                } else {
                  this.$router.push({path: '/market/HSFriend/deposit/'})
                }
              }
            }, err => {
              $.toast(err)
            }
          )
        }
      },
      //轮播图片
      GetHomePageImage() {
        apia.CorrespondingDataFrontEnd({
          articleid: 3
        }).then(
          res => {

            this.itemz = res.data.result;
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
      },
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
//        }else{
//          this.$router.push({
//            name: correspondingLink, params:{JumpState:2}
//          })
//        }
//
//
//      }
    },
  }
</script>

