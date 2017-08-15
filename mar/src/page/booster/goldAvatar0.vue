<template>
  <div class="goldAvatar">
    <div class="goldAvatar_header clearfix">
      <img src="./imgaes/jiantou.png" alt="" v-show="true" @click="JumpStateC">
      <p>炉石代练</p>
    </div>
    <div v-if="this.htmla!=='5'" class="goldAvatar_center">
      <div class="center_top"></div>
      <div class="center_header">{{itemsTitle}}</div>
      <div class="center_all">
        <div class="center_all_t" v-for="(itemz,key,index) in items">
          <div class="all_t_title" v-if="key!=='未分组'">{{key}}</div>
          <div class="all_t_list" v-for="item in itemz">
            <div class="all_t_Option clearfix">
              <div class="Option_left">
                <input type="radio" :id="item.id" name="haha" @click="sendId(item.id,item.productPrice)"/>
                <p></p>
                <label :for="item.id">{{item.productTitle}}</label>
                <div class="remarks" v-if="item.productAbstract">{{item.productAbstract}}</div>
              </div>
              <div class="Option_right">
                {{ (item.productPrice ? '￥' + item.productPrice + '.00' : '咨询客服') | CalculateNumber }}
              </div>
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
    <div v-else="this.htmla==='5'" class="goldAvatar_center5">
      <div class="center_top"></div>
      <div class="center_header">{{itemsTitle}}</div>
      <div class="center_all">
        <div class="center_all_nameList">
          <div v-for="(name,index) in  itemsNames" @click="titleShow=index,sendname(name)">
            <div class="nameList">
              <p>{{name}}</p>
              <div class="nameList_line" v-if="index==titleShow "></div>
            </div>
          </div>
        </div>
        <div class="center_all_t">
          <div class="all_t_Option clearfix" v-for="item in items" ref="Unchecked">
            <div class="Option_left">
              <input type="radio" :id="item.id" name="haha" @click="sendId(item.id,item.productPrice)"/>
              <p></p>
              <label :for="item.id">{{item.productTitle}}</label>

            </div>
            <div class="Option_right">
              {{ (item.productPrice ? '￥' + item.productPrice + '.00/个' : '咨询客服') | CalculateNumber }}
            </div>
          </div>
        </div>
        <div class="center_text">
          <p>{{itemTextDescription[0]}}</p>
          <p>{{itemTextDescription[1]}}</p>
          <p>{{itemTextDescription[2]}}</p>
          <p>{{itemTextDescription[3]}}</p>
          <p>{{itemTextDescription[4]}}</p>
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
    created() {
//      this.JumpStatez = this.$route.params.JumpState;

      let aa = this.$route.params.DailianId; //23.html
      if (aa.indexOf('.') !== -1) {
        let bb = aa.indexOf('.');
        this.htmla = aa.substring(0, bb)
      } else {
        this.htmla = aa
      }
    },
    data() {
      return {
        items: [],
        itemsTitle: '',
        itemsId: '',
        itemPrice: '',
        //订单编码
        OrderCode: '',
        //订单编码给支付成功使用
        OrderCodeA: '',
        OrderCodeB: '',
//        判断跳转状态
//        JumpStatez: '',
        htmla: '',

//        代练5的格式
        itemsNames: '',
        itemsName: '',
        //获取文字说明
        itemTextDescription: '',
        AdventureType: '黑石山',
        titleShow: ''
      }
    },
    mounted() {
      this.getBoosterListz();

      this.getBoosterListz5(this.AdventureType);

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
        sessionStorage.removeItem('bindex')
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
        if (this.htmla === '5') {
          return false
        } else {
          api.GetProductByPackage({
              packageId: this.htmla
            }
          ).then(
            res => {
              console.log(res)
              sessionStorage.setItem('bindex', this.$route.params.Package)
              this.itemsTitle = res.data.result.packageName
              this.items = res.data.result.products
              console.dir(this.items)
            },
            err => {
              $.toast(err);
            }
          )
        }
      },
      UncheckedM() {
        let cc = this.$refs.Unchecked;
        let bb = $(cc).children('div');
        for (let i = 0; i < bb.length; i++) {
          let dd = $(bb).children('input');
          for (let j = 0; j < dd.length; j++) {
            dd[j].checked = false;
          }
        }
      },
      //获取列表清单数据
      sendname(val) {
        this.UncheckedM();
        this.itemPrice = '';
        this.items = '';
        this.AdventureType = val;
        this.getBoosterListz5(this.AdventureType);
      },
      getBoosterListz5() {
        if (this.htmla !== '5') {
          return false
        } else {
          api.GetProductByPackage({
              packageId: this.htmla
            }
          ).then(
            res => {
              console.log(res)
              this.itemsNames = []
              this.itemsTitle = res.data.result.packageName
              this.itemsName = res.data.result.products
              for (let key in  this.itemsName) {
                this.itemsNames.push(key);
              }
              this.items = res.data.result.products[this.AdventureType];
              //获取文字说明
              this.itemTextDescription = res.data.result.packageAbstract.split("/");
            },
            err => {
              $.toast(err);
            }
          )
        }

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
  @import 'goldAvatar0';
</style>
