<template>
  <div class="DayByDay">
    <div class="DayByDay_header">
      <div class="header_top">
        <div class="top_left">
          <!--@click="RotateBack($event)"-->
          <img src="./imgaes/jiantou.png" alt="" @click="toShow">
        </div>
        <div class="top_center">
          <input type="text" class="form_input" @change="CardnameaChenge" @click="toHistoryShows"
                 v-model="sshuoCardNameons" placeholder="请输入你需要查找的卡牌名称" onfocus="this.placeholder=''"
                 onblur="if (this.placeholder === '') {this.placeholder='请输入你需要查找的卡牌名称'}">
          <img src="./imgaes/sousuoh.png" alt="">
        </div>
        <div class="top_right" @click="toDayList">
          <img src="./imgaes/aixin.png" alt="">
          <div class="top_collection" v-show="dayRedbg"><p>{{dayTotalCountSC}}<span v-show="dayAixinjiahao">+</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="DayByDay_all" style="padding-bottom: 2.6rem;overflow:auto;-webkit-overflow-scrolling: touch;"
         ref="scrollContainer">
      <div class="D_all_list" v-for="(item,index) in items">
        <div class="D_all_list_title">
          <div class="D_all_list_title_left clearfix">
            <div class="D_all_list_title_left_name" @click="dayCollection(index,item)">
              <div class="loveGray" :class="{loveGrayShow: item.isCollection}"></div>
              <p>{{item.polyliPropsName }}</p>
            </div>
            <div class="D_all_list_title_left_price">
              <p>现价:{{item.latestPrice}}</p>
              <p>{{item.latestHours | newtel }}</p>
            </div>
          </div>
          <div class="D_all_list_title_right" @click="lineChartShow=index,passTheDataToTheForm(item.polyliPropsID)">
            <div></div>
            <img src="./imgaes/zhexian.png" alt="">
            <p>涨跌幅:{{
              ((item.latestPrice - item.beforePrice) / item.latestPrice).toFixed(2)
              }}%</p>
          </div>
        </div>
        <lineChart v-if="index==lineChartShow" :itemsPrice="itemPrice" :itemsDate="itemDate"></lineChart>
        <div class="D_all_list_more" v-if="index==lineChartShow"
             @click="seeMormClick(item.polyliPropsID,index,item.polyliPropsName)">查看更多<span
          class="icon icon-right"></span><span class="icon icon-right"></span></div>
      </div>
      <mugen-scroll :handler="fetchData" :should-handle="!loading" scroll-container="scrollContainer">
        <div class="infinite-scroll-preloader">
          <div class="preloader" ref="scrollShow"></div>
        </div>
      </mugen-scroll>
    </div>
    <seeMore ref="seeMore" :SendSeeMoreId="seeMoreID" :sendNmaeToMoreS='sendNmaeToMore'
             @setLineChartShow="setLineChartShowC"></seeMore>
    <DaysearchCard v-show="DaysearchCardShow" :LocalData="searchHistoryName" @add="DeleteStoredData"
                   @LocalDataClickAdd="AcceptLocalDataClick" @popularSearchesClickAdd="HotSearchClick"></DaysearchCard>
    <div class="cardInquiries_Nothing" v-show="NotFound">
      <p>没有找到如何东西，请您重新设置条件或者输入您需要查询的卡.</p>
    </div>
    <Whether ref="Whether"></Whether>
  </div>
</template>
<script charset="UTF-8">
  import lineChart from './lineChart.vue';
  import seeMore from './seeMore.vue'
  import DaysearchCard from './DaysearchCard.vue'
  import * as fun from '../../assets/js/pubFunc.js'
  import * as api from '../../api/dayByDay'
  import MugenScroll from 'vue-mugen-scroll'
  import Whether from '../../components/Whether/Whether.vue'
  import * as checkJs from '../../assets/js/pubFunc'


  export default {
    computed: {
      // a computed getter
//      reversedMessage: function () {
//        var aa = ( item.latestPrice - item.twelveHoursAgoPrice) / item.latestPrice;
//        aa = aa.toFixed(2)
//        return aa
//      }
    },
    filters: {
      newtel(value) {
        let aa = value;
        let bb = aa.substring(11, 13);
        let cc = aa.substring(5, 10);
        cc = cc.replace(/\b(0+)/, "");
        value = cc + '/' + bb + '时'
        return value
      },
    },
    components: {
      lineChart,
      seeMore,
      DaysearchCard,
      MugenScroll,
      Whether
    },
    data() {
      return {
        seeMoreShow: false,
        DaysearchCardShow: false,
        //接受道具清单的数组
        items: [],
        //总共道具清单的总数
        totalCount: '',
        //用于判断表格的显示和隐藏
        lineChartShow: 0,
        //用于接受ID。 然后传给数据。用于渲染首页的表格数据
        nameIdS: '',
        //用于最开始的时间
        earliestS: '',
        //用于最后的时间
        latestS: '',
        //用于接受12个小时的图表数据的列表清单
        itemChart: [],
        //用于接受列表清单的价格
        itemPrice: [],
        //用于接收列表清单的日期
        itemDate: [],
        //用于底部滚动刷新需要跳过的值
        skipCount: 20,
        //底部滚动默认行为
        loading: false,
        //用于显示收藏卡片数字的背景
        dayRedbg: false,
        //用于显示收藏的卡片超过99+张的+号
        dayAixinjiahao: false,
        //用于接收收藏卡片的总数
        dayTotalCountSC: '',
        //用于显示没有收到内容显示的东西
        NotFound: false,
        //用于接收搜索输入框的值
        sshuoCardName: '',
        //用于input的值的关联
        sshuoCardNameons: '',
        //用于传送给子组件的localStorage
        searchHistoryName: {},
        //用于传送一个ID给查看更多
        seeMoreID: '',
        //用于当返回的的时候选中对的图表/给查看更多
        getIndexNumber: '',
        //传一个名字给查看更多
        sendNmaeToMore: '',
        //用于判断首页的涨幅度
        IncreaseRate: '',
        //获取涨幅度的最后一位数字
        lastNumber: '',
      }
    },
    mounted() {
      this.getFirstId();
      this.HomePageDisplay();
      this.formTime();
      this.TotalNumberOfCards();
      this.StoredInLocalData();
      this.ReadStoredData();
    },
    methods: {
      //获取天天打波利的道具清单
      HomePageDisplay() {
        api.HomePageDisplay({maxResultCount: 20, skipCount: 0}).then(
          res => {
            console.log(res)
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
          },
          err => {
            $.toast(err);
          }
        )
      },
      //表格时间的编写
      formTime() {
        var earliestSDate = new Date();
        earliestSDate = earliestSDate.getTime() - 1000 * 60 * 60 * 9;
        this.earliestS = fun.formatDate(new Date(earliestSDate), "yyyy-MM-dd-hh");
        //        console.log(this.earliestS);
        var latestSDate = new Date();
        this.latestS = fun.formatDate(new Date(latestSDate), "yyyy-MM-dd-hh");
        console.log(this.latestS)
      },
      // 用于初始页面的时候获取一个id
      getFirstId() {
        api.HomePageDisplay({maxResultCount: 1, skipCount: 0}).then(
          res => {
            this.nameIdS = res.data.result.items[0].polyliPropsID
            this.formTimeitem();
          },
          err => {
            $.toast(err);
          }
        )
      },
      //传送一组数据给表格子组件
      formTimeitem() {
        api.PriceChangeNameHoursShow({
          nameid: this.nameIdS,
          earliest: this.earliestS,
          latest: this.latestS,
        }).then(
          res => {
            this.itemPrice = [];
            this.itemDate = [];
            this.itemChart = res.data.result;
            for (var i = 0; i < this.itemChart.length; i++) {
              let aa = this.itemChart[i].latestHours.substring(5, 10);
              let bb = this.itemChart[i].latestHours.substring(11, 13);
              aa = aa.replace(/\b(0+)/, "");
              let cc = bb;
              if (this.itemPrice.length < 10) {
                this.itemPrice.push(this.itemChart[i].latestPrice);
                this.itemDate.push(cc)
              } else {
                return
              }
            }
            this.itemDate.reverse();
            this.itemPrice.reverse();
            for (var i = 0; i < 10; i++) {
              if (this.itemPrice.length >= 10) {
                break;
              } else {
                this.itemPrice.push(' ');
                this.itemDate.push(' ');
              }
            }
            this.itemDate.reverse();
            this.itemPrice.reverse();
          },
          err => {
            $.toast(err);
          }
        )
      },
      //点击 传入ID / 根据ID 在传入一组数据给表格传数据。
      passTheDataToTheForm(value) {
        this.nameIdS = value;
        //然后接口找数据
        api.PriceChangeNameHoursShow({
          nameid: this.nameIdS,
          earliest: this.earliestS,
          latest: this.latestS,
        }).then(
          res => {
            this.itemPrice = [];
            this.itemDate = [];
            this.itemChart = res.data.result;
            for (var i = 0; i < this.itemChart.length; i++) {
              let aa = this.itemChart[i].latestHours.substring(5, 10);
              let bb = this.itemChart[i].latestHours.substring(11, 13);
              aa = aa.replace(/\b(0+)/, "");
              let cc = bb;
              if (this.itemPrice.length < 10) {
                this.itemPrice.push(this.itemChart[i].latestPrice);
                this.itemDate.push(cc)
              } else {
                return
              }
            }
            this.itemDate.reverse();
            this.itemPrice.reverse();
            for (var i = 0; i < 10; i++) {
              if (this.itemPrice.length >= 10) {
                break;
              } else {
                this.itemPrice.push(' ');
                this.itemDate.push(' ');
              }
            }
            this.itemDate.reverse();
            this.itemPrice.reverse();
          },
          err => {
            $.toast(err);
          }
        )
      },
      //底部无限滚动
      //底部滚动
      fetchData() {
        if (this.items.length === 0) {
          return
        }
        this.loading = true;
        api.HomePageDisplay({
          maxResultCount: 20,
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

        this.skipCount += 20;
        this.loading = false
      },
      //收藏或取消收藏
      dayCollection(index, item) {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          if (!item.isCollection) {
            api.PollyUserCollectionTAdd({
              pid: item.polyliPropsID
            }).then(
              res => {
                item.isCollection = !item.isCollection
                this.TotalNumberOfCards();
              }, err => {
                $.toast(err)
              }
            )
          } else {
            api.PollyUserCollectionTDelete({
              pid: item.polyliPropsID
            }).then(
              res => {
                item.isCollection = !item.isCollection
                this.TotalNumberOfCards();
              }, err => {
                $.toast(err)
              }
            )
          }

        }
      },
      //用于接收卡片收藏的总数量
      TotalNumberOfCards() {
        if (!checkJs.getCookie('token')) {
          return
        } else {
          api.CollectionShow({
            maxResultCount: 10,
            skipCount: 0,
          }).then(
            res => {
              this.dayTotalCountSC = res.data.result.totalCount;
              if (this.totalCountSC > 99) {
                this.totalCountSC = '99';
                this.dayAixinjiahao = true
              } else {
                this.totalCountSC = res.data.result.totalCount;
                this.dayAixinjiahao = false
              }
              if (this.totalCountSC === 0) {
                this.dayRedbg = false;
              } else {
                this.dayRedbg = true;
              }

            }, err => {
              $.toast(err)
            }
          )
        }
      },
      //详情的显示和隐藏
      seeMormClick(value, index, name) {
        this.$refs.seeMore.seeMoreshow();
        this.seeMoreShow = false;
        this.seeMoreID = value;
        this.getIndexNumber = index;
        this.lineChartShow = null
        this.sendNmaeToMore = name
        console.log(this.seeMoreID)
      },
      //打开收藏详情
      toDayList() {
        if (!checkJs.getCookie('token')) {
          this.$refs.Whether.Wshow()
        } else {
          this.$router.push({path: '/tools/DayByDay/DayList/'})
        }

      },
      //搜素页面显示
      toHistoryShows() {
        this.DaysearchCardShow = true
      },
      //箭头的倒退页面的显示
      toShow() {
        if (this.DaysearchCardShow) {
          this.DaysearchCardShow = false
        } else {
          this.$router.push({path: '/tools/'});
        }
        this.$store.state.global.footerhide = false;
      },

      //input onchange
      CardnameaChenge() {
        if (this.sshuoCardNameons === "") {
          window.location.reload();
        }
        let zz = this.sshuoCardNameons;
        this.sshuoCardName = zz;

        api.PriceChangeNameFuzzy({
          dname: this.sshuoCardNameons
        }).then(
          res => {
            this.StoredInLocalData();
            this.ReadStoredData();
            this.items = res.data.result;
            this.lineChartShow = 0;
            this.DaysearchCardShow = false
            this.$refs.scrollShow.style.display = 'none';
            if (this.items.length === 0) {
              this.NotFound = true;
              return
            } else {
              this.NotFound = false;
            }
            this.nameIdS = res.data.result[0].polyliPropsID;
            this.formTimeitem();
          }, err => {
            $.toast(err)
          }
        )
      },
      //搜素后的字符 存到 localStorage
      StoredInLocalData() {
        let keyword = this.sshuoCardName
        keyword = keyword.trim();
        if (keyword === '') {
          return
        }
        let {historyItems} = localStorage;
        if (historyItems === undefined) {
          localStorage.historyItems = keyword;
        } else {
          const onlyItem = historyItems.split('|').filter(e => e !== keyword);
          if (onlyItem.length > 0) historyItems = keyword + '|' + onlyItem.join('|');
          localStorage.historyItems = historyItems;
        }
      },
      //用于把localStorage值存到一个值，然后传回到子组件里面。
      ReadStoredData() {
        if (!localStorage.getItem("historyItems")) {
          return
        }
        let aa = localStorage.getItem("historyItems");
        aa = aa.replace(/\s+/g, "");
        this.searchHistoryName = aa.split('|');
        this.searchHistoryName = this.searchHistoryName.slice(0, 10);
      },
      //删除本地localStorage数据
      DeleteStoredData() {
        localStorage.removeItem('historyItems');
        this.searchHistoryName = {};
        this.sshuoCardNameons = '';
        this.CardnameaChenge();

      },
      //用于搜素历史点击
      AcceptLocalDataClick(item) {
        this.sshuoCardNameons = item;
        this.CardnameaChenge();
      },
      //用于热门搜素点击
      HotSearchClick(item) {
        this.sshuoCardNameons = item;
        this.CardnameaChenge();
      },
      //查看更多倒退回来的时候。 设置LineChartShow的值
      setLineChartShowC() {
        this.lineChartShow = this.getIndexNumber;
      }

    },
  }
</script>
<style lang="scss" scoped>
  @import "./DayByDay.scss";
</style>
