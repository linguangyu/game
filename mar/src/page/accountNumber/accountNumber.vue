<template>
  <div class="accountNumber">
    <div class="accountNumber_header clearfix">
      <!--头部搜索框-->
      <div class="header_top">
        <router-link :to="{ path: '/market/AccountTarde/'}" tag="div" class="top_left">
          <img src="./imgaes/jiantou.png" alt="" v-show="true">
        </router-link>
        <div class="top_zhongjian">
          <input @change="searchAccountName()" @click="accountName=true;" class="form_input" type="text"
                 v-model="accountNameText" placeholder="请输入关键字" onfocus="this.placeholder=''"
                 onblur="if (this.placeholder === '') {this.placeholder='请输入关键字'}">
          <img src="./imgaes/sousuoh.png" alt="">
        </div>
        <div class="top_right">
          <!--<img src="./imgaes/fenleibai.png" alt="">-->
        </div>
        <div class="top_right_huang" v-show="false">
          <img src="./imgaes/fenleihuang.png" alt="">
        </div>
      </div>
      <!--筛选和价格优先选项-->
      <div class="header_bottom">
        <div class="bottom_left" @click="modelBtnTrue()" :class="{active:model}">{{pricesolt}}
          <span class="icon icon-caret"></span>
        </div>
        <!--<div class="bottom_center">销量优先</div>-->
        <div class="bottom_right" @click="conditionTrue()">
          <span>筛选</span>
          <img src="./imgaes/sxuan.png" alt="">
        </div>
      </div>
    </div>
    <!--内容区域-->
    <div class="accountNumber_list" ref="scrollContainer">

      <div class="list" v-for="(item,index) in items" :key="index" @click="JumpProductPage(index,item.id)">
        <div class="list_left"><img v-if="item.screenshots[0]" :src="item.screenshots[0].url" alt="">
          <img v-if="!item.screenshots[0]" src="../../assets/img/tpwzx.png" alt=""></div>
        <div class="list_right">
          <div class="list_right_title">
            <img src="./imgaes/tu.png" alt="">
            <p>{{item.accountName}}</p>
          </div>
          <div class="list_right_details">
            <p>商品类型 :<span>{{item.accountType}}</span></p>
            <p>客户端类型 :<span>{{item.client}}</span></p>
            <p>游戏区服 :<span>{{item.gameArea}}</span></p>
          </div>
          <div class="list_right_stock">
            <p class="stock_prick"><span>{{item.accountPrice}}KB</span></p>
            <!--<p class="stock_number">库存 :<span>651</span></p>-->
          </div>
          <div class="list_right_more" v-show="false">
            <img src="./imgaes/gengduo.png" alt="">
          </div>
          <div class="list_right_more_show" v-show="false">
            <img src="./imgaes/gengduoh.png" alt="">
          </div>
          <!--商铺名称-->
          <div class="list_right_show" v-show="false">
            <p class="show_title">店铺名称</p>
            <div class="show_zong">
              <div class="show_zong_left">
                <p>身份证 :<span> 已绑定</span></p>
                <p>手机号 :<span> 为半丁</span></p>
                <p>邮　箱 :<span> 哈哈哈</span></p>
              </div>
              <div class="show_zong_right">
                <p>销  量 :<span> 165件</span></p>
                <p>浏  览 :<span> 6516件</span></p>
              </div>
            </div>
            <p class="show_genxin">更新时间 :<span>今天</span></p>
          </div>
          <!--商铺名称-->
        </div>
      </div>
      <!--底部无限滚动-->
      <mugen-scroll :handler="fetchData" :should-handle="!loading" scroll-container="scrollContainer">
        <div class="infinite-scroll-preloader">
          <div class="preloader"></div>
        </div>
      </mugen-scroll>
    </div>
    <!--筛选模态框 价格-->
    <div class="header_bottom_model" v-if="model" @click=" modelBtnFalse()">
      <div class="header_bottom_content">
        <p @click.self="getPrice($event)" :class="[pricesolt=='价格由低到高'? 'priceLowToHigh':'' ]">价格由低到高 <img
          v-if="pricesolt=='价格由低到高'" src="../accountNumber/imgaes/duihao.png" alt=""></p>
        <div></div>
        <p @click.self="getPrice($event)" :class="[pricesolt=='价格由高到低'? 'priceHighToLow':'' ]">价格由高到低 <img
          v-if="pricesolt=='价格由高到低'" src="../accountNumber/imgaes/duihao.png" alt=""></p>
      </div>
    </div>
    <!--筛选模态框-->
    <!--筛选条件模态框-->
    <!--筛选蒙版-->
    <div class="FilterTheMask" v-show="FilterTheMask"></div>
    <div class="header_bottom_condition" v-if="condition">
      <h1 @click="conditionFalse()"><img src='../accountNumber/imgaes/saixuanhuanse.png'><span>筛选</span></h1>
      <ul>
        <li>
          <!--<a :class="[allActiveNumOne==1?'active':'']" @click="allActive(1)">全部</a>-->
          <p>账号类型 </p>
          <div>
            <span :class="[accountTypeNum==1?'active':'']" @click="accountType(1,$event)">成品号</span>
            <span :class="[accountTypeNum==2?'active':'']" @click="accountType(2,$event)">金币号</span>
            <span :class="[accountTypeNum==3?'active':'']" @click="accountType(3,$event)">卡组号 </span>
          </div>
        </li>
        <li>
          <!--<a :class="[allActiveNumTwo==2?'active':'']"  @click="allActive(2)">全部</a>-->
          <p>价格区间 </p>
          <div>
            <input type="text" placeholder="最低价" v-model="minAccountPrice" @change="changePrice(1)">
            <i></i>
            <input type="text" placeholder="最高价" v-model="maxAccountPrice" @change="changePrice(2)">
          </div>
          <ul class="clearfix">
            <li @click="accountPrice(index,$event)" v-for="(price,index) in accountPriceNum">{{price}}</li>
          </ul>
        </li>
        <li>
          <!-- <a :class="[allActiveNumThree==3?'active':'']"  @click="allActive(3)">全部</a>-->
          <p>绑定手机</p>
          <div>
            <span :class="[phoenValidationNum==1?'active':'']" @click="phoenValidation(1,$event)">未绑定身份证商品</span>
            <span :class="[phoenValidationNum==2?'active':'']" @click="phoenValidation(2,$event)">已绑定身份证商品 </span>
          </div>
        </li>
        <li>
          <!--<a :class="[allActiveNumFour==4?'active':'']"  @click="allActive(4)">全部</a>-->
          <p>绑定邮箱 </p>
          <div>
            <span :class="[emailVaildationNum==1?'active':'']" @click="emailVaildation(1,$event)">未绑定邮箱商品</span>
            <span :class="[emailVaildationNum==2?'active':'']" @click="emailVaildation(2,$event)">已绑定邮箱商品 </span>
          </div>
        </li>
      </ul>
      <button class="selectBtn" @click="FilterTheMaskC()">确定</button>
    </div>

  </div>
</template>
<script charset="UTF-8">
  import * as api from '../../api/accountNumber.js';
  import MugenScroll from 'vue-mugen-scroll';

  export default {
    data() {
      return {
        model: false,
        pricesolt: '价格由低到高',
        condition: false,
        items: [],
        accountparams: {
          gameId: this.$route.params.gameID,
          accountType: '',
          maxResultCount: 10,
          skipCount: 0
        },
        accountNameText: '',
        accountName: false,
        accountTypeNum: 0,
        accountPriceNum: ['0-50', '50-100', '100-500', '500-1000'],
        aAccountPrice: 0,
        phoenValidationNum: 0,
        emailVaildationNum: 0,
        loading: false,
        skipCount: 10,
        totalCount: 0,
        //筛选蒙版
        FilterTheMask: false,
        minAccountPrice: 0,
        maxAccountPrice: 0

      }
    },
    components: {MugenScroll},
    mounted() {
      this.getSaleAccountTransaction({
        gameId: this.$route.params.gameID,
        sorting: 'CreationTime desc',
        maxResultCount: 10,
        skipCount: 0
      }); //1
    },

    methods: {
      modelBtnTrue() {
        this.model = true;
      },
      modelBtnFalse() {
        this.model = false
      },
//      筛选价格高低
      getPrice(e) {
        this.pricesolt = e.target.innerText;
        if (e.target.innerText == '价格由低到高') {
          this.getSaleAccountTransaction({ gameId: this.$route.params.gameID,sorting: 'accountPrice', maxResultCount: 10, skipCount: 0});
          this.skipCount = 10;
        } else if (e.target.innerText == '价格由高到低') {
          this.getSaleAccountTransaction({ gameId: this.$route.params.gameID,sorting: "accountPrice desc", maxResultCount: 10, skipCount: 0});
          this.skipCount = 10;
        }
      },//1
//      筛选
      FilterTheMaskC() {
        this.condition = false;
        this.FilterTheMask = false;
        console.log(this.accountparams)
        this.getSaleAccountTransaction(this.accountparams)
      },
      conditionTrue() {
        this.condition = true;
        this.FilterTheMask = true;
      },
      conditionFalse() {
        this.condition = false;
        this.FilterTheMask = false;
      },
//      无限滚动
      fetchData() {
        if (this.items.length === 0) {
          return;
        }
        this.loading = true;
        if (this.skipCount > this.totalCount) {
          return;
        }
        api.GetSaleAccountTransactionsApi({
          gameId: this.$route.params.gameID,
          sorting: 'accountPrice',
          maxResultCount: 10,
          skipCount: this.skipCount
        }).then(
          res => {
            for (let i = 0; i < res.data.result.items.length; i++) {
              for (let j = 0; j < res.data.result.items[i].screenshots.length; j++) {
                res.data.result.items[i].screenshots[j].url = 'https://api.k5game.com/Upload/Downloads/' + res.data.result.items[i].screenshots[j].url;
              }
              this.items.push(res.data.result.items[i]);
            }
          }
        )
        this.skipCount += 10;
        this.loading = false;
      },//1
//      onchenge
      searchAccountName() {
        this.getSaleAccountTransaction({ gameId: this.$route.params.gameID,accountName: this.accountNameText, maxResultCount: 10, skipCount: 0});
      },//1
      getSaleAccountTransaction(obj) {
        api.GetSaleAccountTransactionsApi(obj).then(
          res => {
            console.log(res)
            for (let i = 0; i < res.data.result.items.length; i++) {
              for (let j = 0; j < res.data.result.items[i].screenshots.length; j++) {
                res.data.result.items[i].screenshots[j].url = 'https://api.k5game.com/Upload/Downloads/' + res.data.result.items[i].screenshots[j].url;
              }
            }
            this.items = res.data.result.items;
            if (this.items.length === 0) {
              this.$store.state.global.blankPage = true
            }
            this.totalCount = res.data.result.totalCount;
          }, err => {
            $.toast(err)
          }
        )
      },
////      类型
      accountType(n, e) {
        if (this.accountTypeNum == n) {
          this.accountTypeNum = 0;
          this.accountparams.accountType = '';
          return;
        } else {
          this.accountTypeNum = n;
          this.accountparams.accountType = e.target.innerText;
        }
      },
//        价格
      accountPrice(index) {
        this.aAccountPrice = index;
        this.accountparams.minAccountPrice = this.accountPriceNum[this.aAccountPrice].slice(0, this.accountPriceNum[this.aAccountPrice].indexOf('-')) - 0;
        this.accountparams.maxAccountPrice = this.accountPriceNum[this.aAccountPrice].slice(this.accountPriceNum[this.aAccountPrice].indexOf('-') + 1) - 0;
        this.minAccountPrice = this.accountparams.minAccountPrice;
        this.maxAccountPrice = this.accountparams.maxAccountPrice;
      },
////      手机验证
      phoenValidation(n, e) {

        if (this.phoenValidationNum == n) {
          this.phoenValidationNum = 0;
          this.accountparams.phoenValidation = false;
          return;
        } else {
          this.phoenValidationNum = n;
          if (e.target.innerText == '未绑定身份证商品') {
            this.accountparams.phoenValidation = false;
            return;
          } else {
            this.accountparams.phoenValidation = true;
            return;
          }
        }
      },
////      邮箱验证
      emailVaildation(n, e) {
        if (this.emailVaildationNum == n) {
          this.emailVaildationNum = 0;
          this.accountparams.emailVaildation = false;
          return;
        } else {
          this.emailVaildationNum = n;
          if (e.target.innerText == '未绑定邮箱商品') {
            this.accountparams.emailVaildation = false;
            return;
          } else {
            this.accountparams.emailVaildation = true;
            return;
          }
        }
      },
      changePrice(n) {
        if (n == 1) {
          this.accountparams.minAccountPrice = this.minAccountPrice - 0;
        } else if (n == 2) {
          this.accountparams.maxAccountPrice = this.maxAccountPrice - 0;
        }
      },



//     点击跳转页面
      JumpProductPage(index,id){
        this.$router.push({name:'accoutNumberDateils',params:{gameID:this.$route.params.gameID,accoutNumberDateilsId:id+'.html'}})
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import 'accountNumber';
</style>
