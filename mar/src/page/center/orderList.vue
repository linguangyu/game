<template>
  <div class="OrderList colorfff marginTop">
    <header class="bar bar-nav">
      <a class="icon icon-left pull-left" @click="$router.push({path:'/center'})"></a>
      <a class="icon  pull-right" @click="getIntroduction" v-show="youshangjiaofalse"><img
        src="../../assets/img/genduo.png" alt=""></a>
      <div class="buttons-row">
        <a href="#tab1" class="tab-link button" @click="AccountTransaction"
           :class="activeStatus===1 ? 'active': ''">账号交易</a>
        <a href="#tab2" class="tab-link button" @click="boosterList"
           :class="activeStatus===2 ? 'active': ''">游戏代练</a>
      </div>
    </header>
    <div class="OrderList-tab" ref="picWrapper">
      <ul class="pic-list">
        <li class="pic-item" :class="[isActive==0?'active':'']" @click="gotoOrder(0)"><span>待支付</span></li>
        <li class="pic-item" :class="[isActive==2?'active':'']" @click="gotoOrder(2)"><span>待发货</span></li>
        <li class="pic-item" :class="[isActive==4?'active':'']" @click="gotoOrder(4)"><span>已发货</span></li>
        <li class="pic-item" :class="[isActive==6?'active':'']" @click="gotoOrder(6)"><span>已完成</span></li>
        +
        <li class="pic-item" :class="[isActive==5?'active':'']" @click="gotoOrder(5)"><span>已取消</span></li>
        <li class="pic-item" :class="[isActive==null?'active':'']" @click="gotoOrder(null)"><span>全部</span></li>
      </ul>
    </div>
    <div class="tabs">
      <div id="tab1" class="tab" :class="activeStatus===1 ? 'active': ''">
        <div class="content-block marginNo">
          <ul ref="scrollAccountNumber" style="padding-bottom: 2.6rem;overflow:auto;-webkit-overflow-scrolling: touch;">
            <li v-for="item in itemz">
              <p>订单编号:{{item.id}} <strong>{{item.statusName}}</strong></p>
              <div class="clearfix" @click="AccountTransactionDetails(item.id,item.status,item.id)">
                <img v-if="item.saleOrder.screenshots[0]"
                     :src="'https://api.k5game.com/Upload/Downloads/'+ item.saleOrder.screenshots[0].url " alt="">
                <img v-if="!item.saleOrder.screenshots[0]" src="../../assets/img/tpwzx.png" alt="">
                <h1>
                  {{item.saleOrder.accountName}} <span>{{item.saleOrder.accountPrice ? item.saleOrder.accountPrice + 'kb' : '待修改价格'}}</span>
                </h1>
                <p>
                  <span>商品类型：{{item.saleOrder.accountType}}</span> <br>
                  <span>所属游戏：炉石传说</span>
                </p>
              </div>
              <p v-if="item.status===0" class="clearfix">
                <button :class="{'cancelOrder':!item.saleOrder.accountPrice}"
                        @click="ContinueToPayJy(item.id)">
                  继续支付
                </button>
                <button class="DeleteOrder" @click="cancelOrderJy(item.id)">取消订单</button>
              </p>
              <p v-if="item.status===1" class="clearfix ">
                <button class="kefu" @click="ContactCustomerService"><img src="../../assets/img/kefutouxian.png" alt="">联系客服
                </button>
              </p>
              <p v-if="item.status===3 || item.status===2" class="clearfix">
                <button class="viewpass"
                        @click="ViewTheAccount(item.saleOrder.accountNumber,item.saleOrder.accountPassWord,item.saleOrder.accountTheLock)">
                  查看账号密码
                </button>
                <button class="kefu" @click="ContactCustomerService"><img src="../../assets/img/kefutouxian.png" alt="">联系客服
                </button>
              </p>
              <p v-if="item.status===-1" class="clearfix">
                <span><img src="../../assets/img/lajiton.png" alt="" @click="DeletePurchaseOrder(item.id)"></span>
                <span class="reason">取消原因:{{item.cancelTheReason ? item.cancelTheReason : '取消购买'}}</span>
              </p>
            </li>
            <mugen-scroll :handler="scrollAccountNumber" :should-handle="!loading"
                          scroll-container="scrollAccountNumber">
              <div class="infinite-scroll-preloader">
                <div class="preloader" ref="scrollShowa"></div>
              </div>
            </mugen-scroll>
          </ul>
        </div>
      </div>
      <div id="tab2" class="tab" :class="activeStatus===2 ? 'active': ''">
        <div class="content-block marginNo">
          <ul ref="scrollContainer" style="padding-bottom: 2.6rem;overflow:auto;-webkit-overflow-scrolling: touch;">
            <li v-for="item in items">
              <p>订单编号:{{item.id}} <strong>{{item.orderStatusString}}</strong></p>
              <div class="clearfix" @click="ClickView(item.id,item.orderAmount,item.orderStatus)">
                <img v-if="item.packagePic" :src="'https://api.k5game.com/Temp/Downloads/'+ item.packagePic" alt="">
                <img v-if="!item.packagePic" src="../../assets/img/tpwzx.png" alt="">
                <h1>{{ item.productTitle}} <span>{{item.orderAmount ? item.orderAmount + 'kb' : '待修改价格'}}</span></h1>
                <p>
                  <span>商品类型：{{item.packageName}}【{{item.productGroup}}】</span> <br>
                  <span>所属游戏：{{item.gameName}}</span>
                </p>
              </div>
              <p v-if="item.orderStatus===0||item.orderStatus===1" class="clearfix">
                <button :class="{'cancelOrder':!item.orderAmount}" @click="ContinueToPay(item.id,item.orderAmount)">
                  继续支付
                </button>
                <button @click="zcancelOrder(item.id)" class="DeleteOrder">取消订单</button>
              </p>
              <p v-if="item.orderStatus===2||item.orderStatus===6||item.orderStatus===4" class="clearfix ">
                <button class="kefu" @click="ContactCustomerService"><img src="../../assets/img/kefutouxian.png" alt="">联系客服
                </button>
              </p>
              <p v-if="item.orderStatus===5" class="clearfix"><span><img src="../../assets/img/lajiton.png"
                                                                         alt="" @click="DeleteOrder(item.id)"></span>
                <span class="reason">取消原因:{{item.cancelOrderReason}}</span>
              </p>
            </li>
            <mugen-scroll :handler="fetchData" :should-handle="!loading" scroll-container="scrollContainer">
              <div class="infinite-scroll-preloader">
                <div class="preloader" ref="scrollShow"></div>
              </div>
            </mugen-scroll>
          </ul>
        </div>
      </div>
    </div>
    <!--右上角的省略号的弹出-->
    <div class="OrderListMore_wrapper" v-show="OrderListMore" @click="OrderListMoreShow">
      <div class="OrderListMore_wrapper_tp">
        <img src="../../assets/img/orderList/lslh.png" alt="">
      </div>
      <div class="OrderList_more" v-show="OrderListMore">
        <div class="more_top" @click="openCustomerService">
          <img src="../../assets/img/orderList/kefutouxian.png" alt="">
          <p>咨询客服</p>
        </div>
        <div class="more_under" @click="openTransactionProcess">
          <img src="../../assets/img/orderList/tubiaoliuc.png" alt="">
          <p>交易流程</p>
        </div>
      </div>
    </div>
    <!--交易流程-->
    <div class="transactionProcess" v-show="transactionProcess">
      <div class="transactionProcess_header clearfix">
        <img src="../../assets/img/orderList/jiantou.png" alt="" v-show="true" @click="returnHome">
        <p>交易流程</p>
      </div>
      <div class="transactionProcess_bg"></div>
      <div class="transactionProcess_Description">
        <p class="Description_title">温馨提示</p>
        <p class="Description_bg">
          <img src="../../assets/img/orderList/laixin.png" alt="" class="Description_bg1">
          <img src="../../assets/img/orderList/laixin.png" alt="" class="Description_bg2">
          <img src="../../assets/img/orderList/laixin.png" alt="" class="Description_bg3">
        </p>
        <div class="Description_Details">
          <span class="tb"></span><span class="text">登录游戏后请立即修改登录密码.</span>
          <span class="tb"></span><span class="text">如对本次交易存在疑问，可直接联系客服。平台客服会专心为您解答。</span>
          <span class="tb"></span><span class="text">如本次交易未实现交易需求，可直接联系客服，客服验单，情况属实当立即为您办理退货退款手续。请在订单完成后的24小时内验收，如超过24小时系统将自动验收。交易结束，并且关闭交易窗口。客服将不再受理该订单。</span>
          <p class="foot">K5电竞，竭诚为您服务</p>
        </div>
      </div>
    </div>
    <!--联系客服-->
    <OrderPayment ref="OrderPayment" :payOrderCode="OrderCode" :ProductnPrice="itemPrice"
                  @success="zSuccess"></OrderPayment>
    <paymentSuccessful ref="paymentSuccessful"
                       :payOrderCodeA="OrderCodeA"
                       @changType="changTypeA"
    ></paymentSuccessful>
    <orderDetails ref="orderDetails" :payOrderCodeB="OrderCodeB"></orderDetails>
    <!--查看账号密码-->
    <div class="accountNumberModel" v-if="modelhide">
      <h6>商品信息</h6>
      <p><span>游戏账号：</span>{{accountNumber}}</p>
      <p><span>游戏密码：</span>{{accountPassWord}}</p>
      <p><span>安全锁：</span>{{accountTheLock}}</p>
      <div>请使用账号和密码登入游戏校验商品,并修改登入密码</div>
      <button @click.self="modelHideBtn">知道了</button>
    </div>
    <!--itme没有length的时候。出现-->
    <div class="numberZero" v-show="numberZeroS"><img src="../../assets/img/konbaigif.gif" alt="">
      <p>空空如也~~~</p></div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import * as api from '../../api/orderList'
  import OrderPayment from './orderList/OrderPayment.vue'
  import paymentSuccessful from './orderList/paymentSuccessful.vue'
  import orderDetails from './orderList/orderDetails.vue'
  import MugenScroll from 'vue-mugen-scroll'
  import BScroll from 'better-scroll';

  export default {
    components: {
      OrderPayment,
      paymentSuccessful,
      orderDetails,
      MugenScroll,
    },
    computed: {},
    created() {
      this.isActive = this.$route.params.activeIndex;
      this.activeStatus = this.$route.params.ModifyTheState;
      if (this.$route.params.ModifyTheState) {
        if (this.activeStatus === 2) {
          this.GetMyOrder(2)
        } else {
          this.AccountStatus = '待发货';
          this.GetAccountTransactionList(this.$route.query.JumpName)
        }
      } else {
        return false
      }
    },
    mounted() {
      this.Sliding();
      if (!this.$route.params.ModifyTheState) {
        this.activeStatus = 1;
        this.isActive = 0;
        this.GetAccountTransactionList(this.AccountStatus)
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
          loop: true,
          observer: true,
          history: 'love',
          onSlideChangeEnd: swiper => {
            //这个位置放swiper的回调方法
            this.page = swiper.realIndex + 1;
            this.index = swiper.realIndex;
          }
        },
        isActive: 0,
        //右上角更多
        OrderListMore: false,
        //交易流程
        transactionProcess: false,
        //客服联系
        CustomerService: false,
//        接收数据
        items: [],
        itemz: [],
//        给子组件传送一个id
        itemPrice: '',
        OrderCode: '',
        //订单编码给支付成功使用
        OrderCodeA: '',
        OrderCodeB: '',
//        底部无限滚动
        loading: false,
        skipCount: 10,
        //用于接受卡片的数量
        totalCount: '',
//        用于传送值给账号交易的接口
        AccountStatus: '待支付',

//      显示状态 代练和账号的账转变
        activeStatus: 1,
//        显示账号和密码
        modelhide: false,
//        账号密码的值
        accountNumber: '',
        accountPassWord: '',
        accountTheLock: '',
        message: 'Rasy003',
        numberZeroS: false,
//       右上角一隐藏
        youshangjiaofalse: true

      }
    },
    methods: {
      Sliding() {
        this.picScroll = new BScroll(this.$refs.picWrapper, {
          scrollX: true,
        });
      },

//      跳转页面
      gotoOrder(n) {
        this.isActive = n;
        this.skipCount = 10;
        if (this.activeStatus === 1) {
          if (n === 0) {
            this.AccountStatus = '待支付'
          }
          else if (n === 2) {
            this.AccountStatus = '待发货'
          } else if (n === 4) {
            this.AccountStatus = '已发货'
          }
          else if (n === 6) {
            this.AccountStatus = '已完成'
          }
          else if (n === 5) {
            this.AccountStatus = '已取消'
          }
          else {
            this.AccountStatus = ""
          }
          this.GetAccountTransactionList(this.AccountStatus)
        } else {
          this.GetMyOrder(n)
        }
      },
      //交易流程隐藏
      returnHome() {
        this.transactionProcess = false;
      },
      //右上角展开
      getIntroduction() {
        this.OrderListMore = true;
        this.youshangjiaofalse=false;
      },
      //右上角隐藏
      OrderListMoreShow() {
        this.OrderListMore = false;
        this.youshangjiaofalse=true
      },
      openCustomerService() {
        this.OrderListMore = false;
        this.$store.state.global.CustomerService = true
      },
      openTransactionProcess() {
        this.OrderListMore = false;
        this.transactionProcess = true;
      },

//     进入页面获取数据  代练 点击的
      boosterList() {
        this.isActive = 0;
        this.GetMyOrder(0);
        this.activeStatus = 2;
        this.skipCount = 10;
      },
//      获取数据的封装
      GetMyOrder(id) {
        api.GetMyOrderList({
          orderStatus: id,
          maxResultCount: 10,
          skipCount: 0
        }).then(
          res => {
            this.$refs.scrollContainer.scrollTop = 0;
            this.$refs.scrollShow.style.display = 'inline-block';
            this.items = res.data.result.items;
            if (this.items.length < 10) {
              this.$refs.scrollShow.style.display = 'none';
            } else {
              this.$refs.scrollShow.style.display = 'inline-block';
            }
            this.totalCount = res.data.result.totalCount;
            if (this.items.length <= 0) {
              this.numberZeroS = true;
            } else {
              this.numberZeroS = false;
            }
          },
          err => {
            $.toast(err);
          }
        )
      },
//     取消订单
      zcancelOrder(id) {
        api.UserCancelOrder({
          orderId: id
        }).then(
          res => {
            $.toast("取消成功");
            this.GetMyOrder(0)

          },
          err => {
            $.toast(err);
          }
        )
      },
//      继续支付
      ContinueToPay(id, price) {
        if (!price) {
          $.toast('价格修改成功才可以支付');
          return false
        } else {
          this.itemPrice = price;
          this.OrderCode = id;
          this.$refs.OrderPayment.payShow();
        }
      },
      //弹出支付详情页
      zSuccess(val) {
        this.OrderCodeA = val;
        this.$refs.paymentSuccessful.SuccessShow();
      },
//      点击查看详细 或者支付
      ClickView(id, price, numer) {
        if (numer === 0 || numer === 1) {
          this.ContinueToPay(id, price)
        } else {
          this.OrderCodeB = id;
          this.$refs.orderDetails.payShow();
        }
      },
//     重新购买
      repurchase(id, price) {
        if (!price) {
          $.toast('无法在重新购买');
          return false
        } else {
          this.itemPrice = price;
          this.OrderCode = id;
          this.$refs.OrderPayment.payShow();
        }
      },
//      删除订单
      DeleteOrder(id) {
        api.UserDeleteOrder({
          orderId: id
        }).then(
          res => {
            $.toast('删除成功');
            this.GetMyOrder(5)
          },

          err => {
            $.toast(err);
          })
      },

//      重新购买，或者取消购买  完成后查看订单
      changTypeA() {
        this.activeStatus = 2;
        this.isActive = 2;
        this.GetMyOrder(2)
      },
//      无限滚动
      fetchData() {
        if (this.items.length === 0) {
          return;
        }
        this.loading = true;
        api.GetMyOrderList({
          orderStatus: this.isActive,
          maxResultCount: 10,
          skipCount: this.skipCount,
        }).then(
          res => {
            for (let i = 0; i < res.data.result.items.length; i++) {
              this.items.push(res.data.result.items[i]);
            }
            if (this.skipCount > this.totalCount) {
              this.$refs.scrollShow.style.display = 'none';
              return false
            }
          },
          err => {
            $.toast(err)
          }
        );
//        用于判断总数 小于总数后不进行刷新

        this.skipCount += 10;
        this.loading = false
      },
      //账号交易
//      账号点击
      AccountTransaction() {
        this.skipCount = 10;
        this.activeStatus = 1;
        this.AccountStatus = '待支付';
        this.isActive = 0;
        this.GetAccountTransactionList(this.AccountStatus)
      },
//      获取数据封装  账号交易的
      GetAccountTransactionList(id) {
        api.GetMyPurchaseAccountTransactions({
          status: id,
          maxResultCount: 10,
          skipCount: 0
        }).then(
          res => {
            this.$refs.scrollAccountNumber.scrollTop = 0;
            this.$refs.scrollShowa.style.display = 'inline-block';
            this.itemz = res.data.result.items;
            if (this.itemz.length < 10) {
              this.$refs.scrollShowa.style.display = 'none';
            } else {
              this.$refs.scrollShowa.style.display = 'inline-block';
            }
            this.totalCount = res.data.result.totalCount;
            if (this.itemz.length <= 0) {
              this.numberZeroS = true;
            } else {
              this.numberZeroS = false;
            }
          },
          err => {
            $.toast(err);
          }
        )
      },
      //      账号交易取消订单
      cancelOrderJy(id) {
        api.UpdatePurchaseAccountTransaction(
          {
            isCancel: true,
            id: id
          }
        ).then(
          res => {
            this.AccountStatus = '待支付';
            this.GetAccountTransactionList(this.AccountStatus);
            $.toast('取消成功');
          },
          err => {
            $.toast(err);
          }
        )
      },
//
//     默认改变状态。。
//      ContactCustomerServiceJy(id){
//
//        api.UpdatePurchaseAccountTransactionContent(
//          {
//            status: "已完成",
//            id: id
//          }
//        ).then(
//          res => {
//            this.AccountStatus = '已完成';
//            this.GetAccountTransactionList(this.AccountStatus)
//            $.toast('取消成功');
//          },
//          err => {
//            $.toast(err);
//          }
//        )
//      },

//      账号继续购买
      ContinueToPayJy(id) {
        this.$router.push({name: 'PaymentOrder', params: {PaymentOrderId: id, State: 1}})
      },
//      查看账号密码
      ViewTheAccount(a, b, c) {
        this.modelhide = true
        this.accountNumber = a
        this.accountPassWord = b
        this.accountTheLock = c
      },
//      关闭账号和密码
      modelHideBtn() {
        this.modelhide = false
      },
//      账号交易详情
      AccountTransactionDetails(id, status, tID) {
        if (status === 0) {
          this.$router.push({name: 'PaymentOrder', params: {PaymentOrderId: tID, State: 1}})
        } else {
          this.$router.push({name: 'orderDetails', params: {PaymentOrderId: id, State: status}})
        }
      },
      scrollAccountNumber() {
        if (this.itemz.length === 0) {
          return;
        }
        this.loading = true;
        api.GetMyPurchaseAccountTransactions({
          status: this.AccountStatus,
          maxResultCount: 10,
          skipCount: this.skipCount,
        }).then(
          res => {
            for (let j = 0; j < res.data.result.items.length; j++) {
              this.itemz.push(res.data.result.items[j]);
            }
            if (this.skipCount > this.totalCount) {
              this.$refs.scrollShowa.style.display = 'none';
              return false
            }
          },
          err => {
            $.toast(err)
          }
        );
//        用于判断总数 小于总数后不进行刷新

        this.skipCount += 10;
        this.loading = false
      },


//     删除订单
      DeletePurchaseOrder(id) {
        api.DeleteMyPurchaseAccountTransactiondetails({
          isDelete: true,
          id: id
        }).then(
          res => {
            this.AccountStatus = '已取消';
            this.GetAccountTransactionList(this.AccountStatus)
            $.toast('取消成功');
          },
          err => {
            $.toast(err)
//          }
          }
        )
      },
    },


  }
</script>
