<template>
  <div class="goldAvatar">
    <div class="goldAvatar_header clearfix">
      <img src="./imgaes/jiantou.png" alt="" v-show="true" @click="JumpStateC">
      <p>炉石代练</p>
    </div>
    <div class="goldAvatar_center">
      <div class="center_top"></div>
      <div class="center_header">{{itemsTitle}}</div>
      <div class="center_all">
        <div class="center_all_t">
          <div class="all_t_Option clearfix" v-for="item in items">
            <div class="Option_left">
              <input type="radio" :id="item.id" name="haha" @click="sendId(item.id,item.productPrice)"/>
              <p></p>
              <label :for="item.id">{{item.productTitle}}</label>
            </div>
            <div class="Option_right">
              {{ (item.productPrice ? '￥' + item.productPrice + '.00' : '咨询客服') | CalculateNumber }}
            </div>
          </div>
        </div>
      </div>
      <div class="price">
        <p>总价<span>￥{{itemPrice | CgPrice}}</span></p>
      </div>
      <div class="placeOrder" @click="PlaceOrder">
        下单
      </div>
    </div>
    <setAsideInformation ref="information" :ProductnNumber="itemsId" :ProductnPrice="itemPrice"
                         @Pay="payKb"></setAsideInformation>
    <OrderPayment ref="OrderPayment" :payOrderCode="OrderCode" :ProductnPrice="itemPrice"
                  @success="zSuccess"></OrderPayment>
    <paymentSuccessful ref="paymentSuccessful" @acheckOrder="bcheckOrder"
                       :payOrderCodeA="OrderCodeA"></paymentSuccessful>
    <orderDetails ref="orderDetails" :payOrderCodeB="OrderCodeB"></orderDetails>
    <Whether ref="Whether"></Whether>
  </div>
</template>
<script charset="UTF-8">
  import * as api from '../../api/booster'
  import setAsideInformation from './setAsideInformation.vue'
  import OrderPayment from './OrderPayment.vue'
  import paymentSuccessful from './paymentSuccessful.vue'
  import orderDetails from './orderDetails.vue'
  import Whether from '../../components/Whether/Whether.vue'
  import * as checkJs from '../../assets/js/pubFunc'

  export default {
    components: {
      setAsideInformation,
      OrderPayment,
      paymentSuccessful,
      orderDetails,
      Whether
    },
    filters: {
      CalculateNumber(value) {
        if (value !== Number) {
          return value
        }
      },
      CgPrice(val) {
        let aa
        if (!val) {
          aa = '--.--'
          return aa
        } else {
          aa = val
          aa = aa + '.00'
          return aa
        }
      },
    },
    data() {
      return {
        items: [],
        itemsTitle: '',
        itemPrice: '',
        itemsId: '',
        //订单编码
        OrderCode: '',
        //订单编码给支付成功使用
        OrderCodeA: '',
        OrderCodeB: '',
      }
    },
    mounted() {
      this.getBoosterListz();
    },
    methods: {
      //      跳转状态
      JumpStateC() {
//        if (this.JumpStatez === 1) {
//          this.$router.push({path: '/market'})
//        } else if (this.JumpStatez === 2) {
//          this.$router.push({path: '/market/game'})
//        } else if (this.JumpStatez === 3) {
//          this.$router.push({path: '/routerview/viewing'})
//        } else {
        this.$router.go(-1);

//        }
      },
      sendId(val, prs) {
        this.itemsId = val;
        this.itemPrice = prs;
      },
      PlaceOrder() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          if (!this.itemsId) {
            $.toast('请选择您需要购买的商品');
          } else {
            this.$refs.information.PopupLayer()
          }
        }
      },
      //获取列表清单数据
      getBoosterListz() {
        api.GetProductByPackage({
            packageId: 2
          }
        ).then(
          res => {
            this.items = res.data.result.products["未分组"]
            this.itemsTitle = res.data.result.packageName
          },
          err => {
            $.toast(err);
          }
        )
      },
      payKb(val) {
        this.OrderCode = val;
        this.$refs.OrderPayment.payShow();
      },
      //弹出支付详情页
      zSuccess(val) {
        this.OrderCodeA = val
        this.$refs.paymentSuccessful.SuccessShow();

      },
      //弹出订单详情
      bcheckOrder(val) {
        this.OrderCodeB = val
        this.$refs.orderDetails.payShow();

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import 'goldAvatar1';
</style>
