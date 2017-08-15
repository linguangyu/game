<template>
  <div class="center colorfff marginTop">
    <header class="bar bar-nav">
      <p class="icon icon-settings pull-left" @click="SetCenter"></p>
      <h1 class="title">我的
      </h1>
      <img src="../../assets/img/xiaoldang.png" alt="" @click="MessageCenterC" @click.native='gotoNegotiate()'>
    </header>
    <div class='center-box'>
      <div class='center-logo'>
        <div class="center-logo_top" v-if="this.denglu">
          <router-link @click.native='gotoEdit()' :to="{name:'edit'}"><img src="../../assets/img/bianji1.png" alt="">
          </router-link>
          <p><img :src="userdata.profilePictureId" alt=""></p>
          <span class='nickName'>{{userdata.nickName}}</span><br>
          <span style='color:#B2B2B2;font-size:12px;'>{{userdata.phoneNumber}}</span>
        </div>
        <div class="center-logo_show" v-if="!this.denglu" @click="pleaseSign">
          请登录
        </div>
        <div class='center-jilu clearfix'>
          <dl @click="KbiC" @click.native='gotoKbi()'>
            <dt>{{availableCoins ? availableCoins : 0}}<span>KB</span></dt>
            <dd>K币</dd>
          </dl>
          <!--</router-link>-->
          <!--:to="{name:'userFriendLogs'}"-->
          <dl @click="youyisC" @click.native='gotoUserFriendLogs()'>
            <dt>{{availableFriendlyMatchs ? availableFriendlyMatchs : 0}}<span>场</span></dt>
            <dd>友谊赛</dd>
          </dl>
          <dl @click=' grantedbtn()'>
            <dt><span>暂无权限</span></dt>
            <dd>积分</dd>
          </dl>
        </div>
      </div>
      <div class="center-order">
        <!--<router-link :to="{name:'OrderLists'}" tag="p">-->
        <p @click="ViewOrders"> 我的订单 <span class="icon icon-right"></span><span>查看全部订单</span></p>
        <!--</router-link>-->

        <ul class="clearfix">
          <li>
            <dl @click="JumpState0">
              <span class="Dots" v-if="totalvalue1">{{totalvalue1 | CalculateNumber}}</span>
              <dt><img src="../../assets/img/daifukuan.png" alt=""></dt>
              <dd>待付款</dd>
            </dl>
          </li>
          <li>
            <dl @click="JumpState1">
              <span class="Dots" v-if="totalvalue2">{{totalvalue2 | CalculateNumber}}</span>
              <dt><img src="../../assets/img/daifahuo.png" alt=""></dt>
              <dd>待发货 </dd>
            </dl>
          </li>
          <li>
            <dl @click="JumpState5">
              <span class="Dots" v-if="totalvalue5">{{totalvalue5 | CalculateNumber}}</span>
              <dt><img src="../../assets/img/yiquxiao.png" alt=""></dt>
              <dd>已发货</dd>
            </dl>
          </li>
          <li>
            <dl @click="JumpState3">
              <span class="Dots" v-if="totalvalue3">{{totalvalue3 | CalculateNumber}}</span>
              <dt><img src="../../assets/img/yiwangchen.png" alt=""></dt>
              <dd>已完成</dd>
            </dl>
          </li>
          <li>
            <dl @click="JumpState4">
              <span class="Dots" v-if="totalvalue4">{{totalvalue4 | CalculateNumber}}</span>
              <dt><img src="../../assets/img/yiquxiao.png" alt=""></dt>
              <dd>已取消</dd>
            </dl>
          </li>

        </ul>
      </div>
      <!--列表 -->
      <div class='center-list'>
        <div class="list-block">
          <ul>
            <li style='height:10px;background:#2d2d2d;'></li>
            <li @click="fenxianglianjie" class="item-content item-link">
              <div class="item-media"><img src="../../assets/img/wodefabu.png" alt=""></div>
              <div class="item-inner">
                <div class="item-title">分享（赢奖励）</div>
                <div class="item-after"></div>
              </div>
            </li>
            <!--</router-link>-->
            <li style='height:10px;background:#2d2d2d;'></li>
            <li @click="getGranted()" class="item-content item-link">
              <div class="item-media"><img src="../../assets/img/wodefabu.png" alt=""></div>
              <div class="item-inner">
                <div class="item-title">我的发布</div>
                <div class="item-after"></div>
              </div>
            </li>
            <li style='height:10px;background:#2d2d2d;'></li>
            <router-link @click.native='gotoIssue()' :to="{path:'/FAQ/'}" tag='li' class="item-content item-link">
              <div class="item-media"><img src="../../assets/img/changjwentizhonx.png" alt=""></div>
              <div class="item-inner">
                <div class="item-title">常见问题</div>
                <div class="item-after"></div>
              </div>
            </router-link>
            <router-link @click.native='gotoFeedback()' :to="{name:'feedback'}" tag='li' class="item-content item-link">
              <div class="item-media"><img src="../../assets/img/yijinfankuizhonx.png" alt=""></div>
              <div class="item-inner">
                <div class="item-title">意见反馈</div>
                <div class="item-after"></div>
              </div>
            </router-link>
            <router-link @click.native='gotoAsme()' :to="{name:'asme'}" tag='li' class="item-content item-link">
              <div class="item-media"><img src="../../assets/img/guangyuwomwnzhonx.png" alt=""></div>
              <div class="item-inner">
                <div class="item-title">关于我们</div>
                <div class="item-after"></div>
              </div>
            </router-link>
            <router-link @click.native='gotoAndroidAndIos()' :to="{name:'androidAndIos'}" tag='li'
                         class="item-content item-link">
              <div class="item-media"><img src="../../assets/img/zhonxinxiazai1.png" alt=""></div>
              <div class="item-inner">
                <div class="item-title">下载APP</div>
                <div class="item-after"></div>
              </div>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
    <Whether ref="Whether"></Whether>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
  import {GetCurrentLoginInformationsApi} from '../../api/account';
  import {GetProfilePictureOutputApi} from '../../api/account';
  import {HasPermissionApi} from '../../api/account.js'
  import {GetMyOrderList} from '../../api/orderList'
  import {GetMyPurchaseAccountTransactions} from '../../api/orderList'
  import * as checkJs from '../../assets/js/pubFunc'
  import Whether from '../../components/Whether/Whether.vue'

  export default {
    filters: {
      CalculateNumber(value) {
        if (value >= 100) {
          value = 99 + '+'
          return value
        } else {
          return value
        }
      },
    },
    computed: {},
    data() {
      return {
        userdata: {
          profilePictureId: '',
          nickName: '',
          phoneNumber: '',
          id: '',
        },
        availableCoins: '',
        availableFriendlyMatchs: '',
//         用于接收代练列表的数量

        booster0: '',
        booster1: '',
        booster3: '',
        booster4: '',
        booster5: '',

//      用于接收账号列表的数量

        accountNumber1: '',
        accountNumber2: '',
        accountNumber3: '',
        accountNumber4: '',
        accountNumber5: '',


//        用于计算总的值
        totalvalue1: '',
        totalvalue2: '',
        totalvalue3: '',
        totalvalue4: '',
        totalvalue5: '',


//       在没有登录的时候显示登录

        denglu: 'true'
      }
    },
    components: {
      Whether
    },
    mounted() {
      this.getUserInfo();
      this.gerusermoney();


      this.boostera();
      this.boosterb();
      this.boosterc();
      this.boosterd();
      this.boostere();
      this.AccountTransactiona();
      this.AccountTransactionb();
      this.AccountTransactionc();
      this.AccountTransactiond();
      this.AccountTransactione();

    },
    beforeUpdate() {
      this.jisuan();
    },
    methods: {
      pleaseSign() {
        this.$router.push({path: '/login/'});
      },
      jisuan() {
        this.totalvalue1 = this.booster0 + this.accountNumber1;
        this.totalvalue2 = this.booster1 + this.accountNumber2;
        this.totalvalue3 = this.booster3 + this.accountNumber3;
        this.totalvalue4 = this.booster4 + this.accountNumber4;
        this.totalvalue5 = this.booster5 + this.accountNumber5;
      },
      //Dplus 事件分析开始
      gotoKbi() {
        dplus.track('K币记录', {name: 'K币记录按钮'})//Dplus K币记录按钮
      },
      gotoUserFriendLogs() {
        dplus.track('友谊赛记录', {name: '友谊赛记录按钮'})//Dplus 友谊赛记录按钮
      },
      gotoExtractrecords() {
        dplus.track('提取友谊赛记录', {name: '提取友谊赛记录按钮'})//Dplus 提取友谊赛记录按钮
      },
      gotoSalefirend() {
        dplus.track('出售友谊赛记录', {name: '出售友谊赛记录按钮'})//Dplus 出售友谊赛记录按钮
      },
      gotoIssue() {
        dplus.track('常见问题', {name: '常见问题按钮'})//Dplus 常见问题按钮
      },
      gotoFeedback() {
        dplus.track('意见反馈', {name: '意见反馈按钮'})//Dplus 意见反馈按钮
      },
      gotoAsme() {
        dplus.track('关于我们', {name: '关于我们按钮'})//Dplus 关于我们按钮
      },
      gotoAndroidAndIos() {
        dplus.track('下载App', {name: '下载APP按钮'})//Dplus 关于我们按钮
      },
      gotoEdit() {
        dplus.track('个人信息编辑', {name: '个人信息的编辑按钮'})//Dplus 关于我们按钮
      },
      gotoNegotiate() {
        dplus.track('协商', {name: '进入协商按钮'})//Dplus 进入协商按钮
      },
      //Dplus 事件分析结束
      getUserInfo() {
        if (!checkJs.getCookie('token')) {
          this.denglu = false
          return
        } else {
          GetCurrentLoginInformationsApi().then(
            res => {
              this.userdata.profilePictureId = res.data.result.user.profilePictureId;
              this.userdata.nickName = res.data.result.user.nickName;
              this.userdata.phoneNumber = res.data.result.user.phoneNumber;
              this.availableCoins = res.data.result.userAsset.availableCoins
              this.userdata.profilePictureId = res.data.result.user.profilePictureId ? 'https://api.k5game.com/Profile/GetProfilePictureById?id=' + this.userdata.profilePictureId : 'https://api.k5game.com/Profile/GetProfilePictureById';
            },
            err => {
              $.toast(err);
            }
          );
        }
      },
      gerusermoney() {
        if (!checkJs.getCookie('token')) {
          this.denglu = false
          return
        } else {
          GetCurrentLoginInformationsApi().then(
            res => {
              this.availableCoins = res.data.result.userAsset.availableCoins;
              this.availableFriendlyMatchs = res.data.result.userAsset.availableFriendlyMatchs;
            },
            err => {
              $.toast(err);
            }
          )
        }
      },
      grantedbtn() {
        if (true) {
          $.toast('账号无权限');
          return;
        } else {
          this.$router.push({name: 'Intherecord'});
        }
      },
      getGranted() {//发布
        $.toast('账号无权限');
//        HasPermissionApi({id: 'Pages.AccountTransaction.Add'}).then(
//          res => {
//            if (!res.data.result) {
//              $.toast('暂无权限');
//              return;
//            }
//          }, err => {
//            $.toast(err)
//          }
//        )
      },

      // 获取代练的待付款的的数量
      boostera() {
        this.GetMyOrderF(0, this.booster0)
      },
// 获取代练的待发货的的数量
      boosterb() {
        this.GetMyOrderF(2, this.booster1)
      },
// 获取代练的已完成的的数量
      boosterc() {
        this.GetMyOrderF(6, this.booster3)
      },
// 获取代练的已取消的的数量
      boosterd() {
        this.GetMyOrderF(5, this.booster4)
      },
      // 获取代练的已发货的的数量
      boostere() {
        this.GetMyOrderF(4, this.booster5)
      },

//  获取各种状态的数量  代练的
      GetMyOrderF(id) {
        if (!checkJs.getCookie('token')) {
          this.denglu = false
          return
        } else {
          GetMyOrderList({
            orderStatus: id,
            maxResultCount: 10,
            skipCount: 0
          }).then(
            res => {
              this.denglu = true
              if (id === 0) {
                this.booster0 = res.data.result.totalCount
              } else if (id === 2) {
                this.booster1 = res.data.result.totalCount
              } else if (id === 6) {
                this.booster3 = res.data.result.totalCount
              } else if (id === 4) {
                this.booster5 = res.data.result.totalCount
              } else {
                this.booster4 = res.data.result.totalCount
              }
            },
            err => {
              $.toast(err);
            }
          )
        }
      },

      // 获取账号的待付款的的数量
      AccountTransactiona() {
        this.GetAccountTransactionListF('待支付')
      },
// 获取账号的待发货的的数量
      AccountTransactionb() {
        this.GetAccountTransactionListF('待发货')
      },
// 获取账号的已完成的的数量
      AccountTransactionc() {
        this.GetAccountTransactionListF('已完成')
      },
// 获取账号的已取消的的数量
      AccountTransactiond() {
        this.GetAccountTransactionListF('已取消')
      },
      // 获取账号的已发货的的数量
      AccountTransactione() {
        this.GetAccountTransactionListF('已发货')
      },
//获取各种状态的数量   账号交易
      GetAccountTransactionListF(id) {
        if (!checkJs.getCookie('token')) {
          this.denglu = false
          return
        } else {
          GetMyPurchaseAccountTransactions({
            status: id,
            maxResultCount: 10,
            skipCount: 0
          }).then(
            res => {
              this.denglu = true
              if (id === '待支付') {
                this.accountNumber1 = res.data.result.totalCount
              } else if (id === '待发货') {
                this.accountNumber2 = res.data.result.totalCount
              } else if (id === '已完成') {
                this.accountNumber3 = res.data.result.totalCount
              } else if (id === '已发货') {
                this.accountNumber5 = res.data.result.totalCount
              } else {
                this.accountNumber4 = res.data.result.totalCount
              }
            },
            err => {
              $.toast(err);
            }
          )
        }

      },
//     点击跳转页面
      JumpState0() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({name: 'OrderLists', query: {activeIndex: 0, ModifyTheState: 1, JumpName: '待支付'}})
        }

      },
      JumpState1() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({name: 'OrderLists', query: {activeIndex: 2, ModifyTheState: 1, JumpName: '待发货'}})
        }

      },
      JumpState3() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({name: 'OrderLists', query: {activeIndex: 6, ModifyTheState: 1, JumpName: '已完成'}})
        }

      },
      JumpState4() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({name: 'OrderLists', query: {activeIndex: 5, ModifyTheState: 1, JumpName: '已取消'}})
        }

      },
      JumpState5() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({name: 'OrderLists', query: {activeIndex: 4, ModifyTheState: 1, JumpName: '已发货'}})
        }

      },
//      消息点击
      MessageCenterC() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({name: 'negotiate'})
        }
      },
//      设置中心
      SetCenter() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({name: 'edit'})
        }
      },
//      kb
      KbiC() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({name: 'kbi'})
        }
      },
//      友谊赛
      youyisC() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({name: 'myFriendMatch'})
        }
      },
//      查看订单
      ViewOrders() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({name: 'OrderLists'})
        }
      },
      fenxianglianjie() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({path: '/SharePage/'})
        }
      }
    }
  }
</script>
