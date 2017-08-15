<template>
  <div class='extractrecords'>
    <!--头部-->
    <header class="bar bar-nav">
      <a @click=' $router.go(-1)' v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></a>
      <a class="icon pull-right"><img style='width:1.2rem;margin-right:.2rem;' src="../../assets/img/wenhaoa.png"
                                      alt=""></a>
      <h1 v-if='!titlehidden' class="title" style='border-bottom:2px solid #2d2d2d;'>友谊赛账单</h1>
      <h1 v-if='titlehidden' class="title"
          style='border-bottom:2px solid #2d2d2d;height:2.5rem;line-height:1rem;padding:.3rem 0px;'>{{time}}<br><span
          style='font-size:.6rem;color:#A9A9A9;'>剩余时间</span></h1>
    </header>
    <div class='extractrecords-box' @scroll='scrollHidden($event)' ref="scrollContainer">
      <div class='recentfriend'>
        <div class='timeorfriend '>
          <span class='timer' v-if='!titlehidden'>{{time}}</span> <br><span
          style='font-size:.7rem;color:#A9A9A9;'>剩余时间</span>
          <div class='friendnumber clearfix'>
            <dl>
              <dt>{{frozenFriendlyMatchs}}</dt>
              <dd>已用</dd>
            </dl>
            <dl>
              <dt>{{availableFriendlyMatchs}}</dt>
              <dd>可用</dd>
            </dl>
          </div>
          <div class='recentfive'>
            <ul class='clearfix'>
              <li v-for='item in yijieshuan' :class='item.class'>
                <dl>
                  <dt><img :src="item.img" alt=""></dt>
                  <dd>{{item.tradeBeginTime !== '无' ? item.tradeBeginTime.slice(6) : '无'}}</dd>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class='extractrecords-friend '>
        <ul>
          <li v-for='item in items'>
            <div>
              <p style='color:#fff;margin-bottom:.5rem;'>创建时间：{{item.creationTime}} <a class='checkorder'
                                                                                       @click='allCheckOrder(item.id)'
                                                                                       v-if='item.statusName=="完成单(待验收)"||item.statusName=="取消单(待验收)"'>待验收</a>
              </p>
              <p>订单号：{{item.id}}<span>状态：{{item.statusName}}</span></p>
              <p>TAG：{{item.userTag}}<span>服务器：{{item.gameServer}}</span></p>
              <p class='clearfix' style='padding-bottom:0px;'>
                <span v-if='item.cancelTime' style="float:left;">取消时间：{{item.cancelTime}}</span>
                <span v-if="item.tradeEndTime">完成时间：{{item.tradeEndTime}} </span>
                <span>完成次数：{{item.totalAmount - item.needAmount}}/{{item.totalAmount}}</span>
              </p>
            </div>
            <span class='accordion  icon ' :class="[ active==item.id? 'icon-up' : 'icon-down' ]" @click=' accorDionBtn(item.id,item.totalAmount-item.needAmount,item.statusName)'></span>

            <ul class='accordion-content' >
              <li v-for='deposit in depositOrders' v-if="active===item.id">
                {{deposit.completionTime}}  &nbsp;&nbsp;TAG: {{deposit.userTag}}
                <span @click='checkOrder(deposit.id,item.id,$event)'><img src="../../assets/img/sandian.png" alt=""></span>

                <div class='rightfade' style='display:none'>
                  <span @click='nopassBtn($event,deposit.id)'>
                    <img src="../../assets/img/tiqujilvcuo.png" alt="">
                  </span>
                  <span @click='passBtn($event,deposit.id)'>
                    <img src="../../assets/img/tiquyuanquan.png">
                  </span>
                </div>
              </li>
            </ul>

          </li>
        </ul>
      </div>
      <!-- add the component right after your list -->
      <mugen-scroll :handler="fetchData" :should-handle="!loading" scroll-container="scrollContainer">
        <div class="infinite-scroll-preloader">
          <div class="preloader"></div>
        </div>
      </mugen-scroll>
    </div>

  </div>
</template>

<style lang="scss" scoped>
  @import '../../assets/css/market.scss';

  .preloader:after {
    width: 0;
    height: 0;
  }
</style>

<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import * as api from '../../api/order.js'
  import {GetCurrentLoginInformationsApi} from '../../api/account';
  import {GetUserFriendMatchLogsApi} from '../../api/transaction.js'
  import MugenScroll from 'vue-mugen-scroll'

  export default {
    computed: {},
    mounted() {
      this.againstComfig();
      this.geruserMoney();
      this.offtheStocks();
    },
    beforeUpdate() {

    },
    updated() {

    },
    data() {
      return {
        items: [],
        availableFriendlyMatchs: '',
        frozenFriendlyMatchs: '',
        yijieshuan: [],
        itemsId: [],
        depositOrders: [],
        active:1,
        time: '',
        titlehidden: false,
        loading: false,
        skipCount: 5,
        orderId:'',
        parameter: {
          pass: [],
          notPass: [],
          id: ''
        },
      }
    },
    components: {
      MugenScroll
    },
    methods: {
      fetchData() {//底部无限滚动方法
        this.loading = true
        let PendingOrders = {
          server: '国服',
          maxResultCount: 10,
          skipCount: this.skipCount
        }

        api.GetOrdersApi(PendingOrders).then(
          res => {
            for (let i = 0; i < res.data.result.items.length; i++) {
              res.data.result.items[i].creationTime = checkJs.formatDate(new Date(res.data.result.items[i].creationTime), "yyyy-MM-dd hh:mm")
              res.data.result.items[i].tradeBeginTime = checkJs.formatDate(new Date(res.data.result.items[i].tradeBeginTime), "yyyy-MM-dd hh:mm")
              res.data.result.items[i].tradeEndTime = checkJs.formatDate(new Date(res.data.result.items[i].tradeEndTime), "yyyy-MM-dd hh:mm")
              res.data.result.items[i].cancelTime = checkJs.formatDate(new Date(res.data.result.items[i].cancelTime), "yyyy-MM-dd hh:mm")
              res.data.result.items[i].checkTime = checkJs.formatDate(new Date(res.data.result.items[i].checkTime), "yyyy-MM-dd hh:mm")
              this.items.push(res.data.result.items[i]);
            }
            console.log(this.items)
          },
          err => {
            $.toast(err)
          }
        )
        this.skipCount += 10;
        this.loading = false
      },
      againstComfig() { //获取到所有订单的列表
        let PendingOrders = {
          server: '国服',
          maxResultCount: 5,
          skipCount: 0
        }
        api.GetOrdersApi(PendingOrders).then(
          res => {

            for (let i = 0; i < res.data.result.items.length; i++) {
              res.data.result.items[i].creationTime = checkJs.formatDate(new Date(res.data.result.items[i].creationTime), "yyyy-MM-dd hh:mm")
              res.data.result.items[i].tradeBeginTime = checkJs.formatDate(new Date(res.data.result.items[i].tradeBeginTime), "yyyy-MM-dd hh:mm")
              res.data.result.items[i].cancelTime = checkJs.formatDate(new Date(res.data.result.items[i].cancelTime), "yyyy-MM-dd hh:mm")
              res.data.result.items[i].checkTime = checkJs.formatDate(new Date(res.data.result.items[i].checkTime), "yyyy-MM-dd hh:mm")
              this.items = res.data.result.items;
            }
            if (this.items.length == 0) {
              this.$store.state.global.blankPage = true
            }
          },
          err => {
            $.toast(err)
          }
        )
      },
      scrollHidden(e) { //把剩余时间移动到header
        if ($(e.target)[0].scrollTop > 200) {
          this.titlehidden = true;
        } else {
          this.titlehidden = false;
        }
      },
      offtheStocks() { //只获取到完成的订单用于上面的提示···
        let PendingOrders = {
          status: '已完成',
          server: '国服',
          maxResultCount: 10,
          skipCount: 0
        }
        let self = this
        api.GetOrdersApi(PendingOrders).then(
          res => {
            if (res.data.result.items.length == 0) {
              this.time = '00:00:00';
              return;
            }

            for (let i = 0; i < res.data.result.items.length; i++) {
              res.data.result.items[i].tradeBeginTime = checkJs.formatDate(new Date(res.data.result.items[i].tradeBeginTime), "yyyy-MM-dd hh:mm")
            }
            // 倒计时~~~~~~~
            let timer = setInterval(function () {
              let h = parseInt((Math.round(new Date(checkJs.formatDate(new Date(new Date(self.yijieshuan[0].tradeBeginTime).getTime() + 86400000), "yyyy-MM-dd hh:mm")) - new Date()) / 1000 % (3600 * 24)) / 3600) < 10 ? '0' + parseInt((Math.round(new Date(checkJs.formatDate(new Date(new Date(self.yijieshuan[0].tradeBeginTime).getTime() + 86400000), "yyyy-MM-dd hh:mm")) - new Date()) / 1000 % (3600 * 24)) / 3600) : parseInt((Math.round(new Date(checkJs.formatDate(new Date(new Date(self.yijieshuan[0].tradeBeginTime).getTime() + 86400000), "yyyy-MM-dd hh:mm")) - new Date()) / 1000 % (3600 * 24)) / 3600)
              let m = parseInt((Math.round(new Date(checkJs.formatDate(new Date(new Date(self.yijieshuan[0].tradeBeginTime).getTime() + 86400000), "yyyy-MM-dd hh:mm")) - new Date()) / 1000 % 3600) / 60) < 10 ? '0' + parseInt((Math.round(new Date(checkJs.formatDate(new Date(new Date(self.yijieshuan[0].tradeBeginTime).getTime() + 86400000), "yyyy-MM-dd hh:mm")) - new Date()) / 1000 % 3600) / 60) : parseInt((Math.round(new Date(checkJs.formatDate(new Date(new Date(self.yijieshuan[0].tradeBeginTime).getTime() + 86400000), "yyyy-MM-dd hh:mm")) - new Date()) / 1000 % 3600) / 60)
              let s;
              if (parseInt(Math.round(new Date(checkJs.formatDate(new Date(new Date(self.yijieshuan[0].tradeBeginTime).getTime() + 86400000), "yyyy-MM-dd hh:mm")) - new Date()) / 1000 % 60) >= 0 && parseInt(Math.round(new Date(checkJs.formatDate(new Date(new Date(self.yijieshuan[0].tradeBeginTime).getTime() + 86400000), "yyyy-MM-dd hh:mm")) - new Date()) / 1000 % 60) < 10) {
                s = '0' + parseInt(Math.round(new Date(checkJs.formatDate(new Date(new Date(self.yijieshuan[0].tradeBeginTime).getTime() + 86400000), "yyyy-MM-dd hh:mm")) - new Date()) / 1000 % 60)
              } else if (parseInt(Math.round(new Date(checkJs.formatDate(new Date(new Date(self.yijieshuan[0].tradeBeginTime).getTime() + 86400000), "yyyy-MM-dd hh:mm")) - new Date()) / 1000 % 60) >= 10) {
                s = parseInt(Math.round(new Date(checkJs.formatDate(new Date(new Date(self.yijieshuan[0].tradeBeginTime).getTime() + 86400000), "yyyy-MM-dd hh:mm")) - new Date()) / 1000 % 60)
              } else if (parseInt(Math.round(new Date(checkJs.formatDate(new Date(new Date(self.yijieshuan[0].tradeBeginTime).getTime() + 86400000), "yyyy-MM-dd hh:mm")) - new Date()) / 1000 % 60) < 0 || !self.yijieshuan[0].tradeBeginTime) {
                self.time = '00:00:00'
                clearInterval(timer)
                return;
              }
              self.time = h + "：" + m + "：" + s
            }, 1000);
            this.yijieshuan = res.data.result.items.splice(0, 5);
            let len = 5 - this.yijieshuan.length;
            for (let i = 0; i < this.yijieshuan.length; i++) {
              this.yijieshuan[i].img = require('../../assets/img/duihao.png');
              this.yijieshuan[i].class = 'you';
              if (this.yijieshuan.length < 5) {
                this.yijieshuan[this.yijieshuan.length - 1].class = 'jb'
              }
            }
            for (let j = 0; j < len; j++) {
              this.yijieshuan.push({img: require('../../assets/img/tiqucuohao.png'), tradeBeginTime: '无'})
            }
          },
          err => {
            $.toast(err)
          }
        )

      },
      geruserMoney() {//获取到友谊赛和冻结友谊赛
        GetCurrentLoginInformationsApi().then(
          res => {
            this.availableFriendlyMatchs = res.data.result.userAsset.availableFriendlyMatchs;
            this.frozenFriendlyMatchs = res.data.result.userAsset.frozenFriendlyMatchs;
          },
          err => {
            $.toast(err);
          }
        )
      },
      //获取订单的详情
      accorDionBtn(id, num, status) {
          api.GetFriendMatchOrderApi({id: id}).then(
            res => {
              this.active = (this.active === id) ? 0 : id;

              this.orderId=res.data.result.id;
              for (let i = 0; i < res.data.result.depositOrders.length; i++) {
                res.data.result.depositOrders[i].completionTime = checkJs.formatDate(new Date(res.data.result.depositOrders[i].completionTime), "yyyy-MM-dd hh:mm");
                res.data.result.depositOrders[i].creationTime = checkJs.formatDate(new Date(res.data.result.depositOrders[i].creationTime), 'yyyy-MM-dd hh:mm');
              }
              this.depositOrders=res.data.result.depositOrders;
            },
            err => {
              $.toast(err)
            }
          )

      },
      checkOrder(childId, id, e) {//验收通过
        $(e.currentTarget).next().css('display', 'block')


      },
      nopassBtn(e, depositId) {//子订单不通过
        for (let i = 0; i < this.parameter.notPass.length; i++) {
          if (depositId == this.parameter.notPass[i].id) {
            this.parameter.notPass.splice(i, 1)
          }
        }
        for (let i = 0; i < this.parameter.pass.length; i++) {
          if (depositId == this.parameter.pass[i].id) {
            this.parameter.pass.splice(i, 1)
          }
        }
        $(e.currentTarget).parent().css('display', 'none').prev().children('img').attr('src', require('../../assets/img/honcuo.png'))
        this.parameter.notPass.push({remark: '不通过', id: depositId})
      },
      passBtn(e, depositId) {//子订单通过
        for (let i = 0; i < this.parameter.notPass.length; i++) {
          if (depositId == this.parameter.notPass[i].id) {
            this.parameter.notPass.splice(i, 1)
          }
        }
        for (let i = 0; i < this.parameter.pass.length; i++) {
          if (depositId == this.parameter.pass[i].id) {
            this.parameter.pass.splice(i, 1)
          }
        }
        $(e.currentTarget).parent().css('display', 'none').prev().children('img').attr('src', require('../../assets/img/huansequan.png'))
        this.parameter.pass.push({remark: '通过', id: depositId})
      },
      allCheckOrder(id) {
        this.parameter.id = id
        if (this.parameter.notPass.length == 0 && this.parameter.pass.length == 0) {
          $.toast('请先确认子订单是否通过')
          return;
        }
        if (this.depositOrders.length == this.parameter.notPass.length + this.parameter.pass.length) {
          api.CheckOrdersApi(this.parameter).then(
            res => {
              if (res.data.success) {
                $.toast('验收完成')
                this.$router.go(0);
              }
            }, err => {
              $.toast(err.response.data.error.message)
            }
          )
        }

      },
    },

  }
</script>
