<template>
  <div class="DayList">
    <div class="DayList_header">
      <div class="header_top clearfix">
        收藏列表
        <img src="./imgaes/jiantou.png" alt="" @click="toDayIndex">
        <p>全部收藏（<span>{{dayTotalCountSC}}</span>）</p>
      </div>
      <!--<mugen-scroll :handler="fetchDataList" :should-handle="!loading" scroll-container="collectionList">-->
      <!--<div class="infinite-scroll-preloader">-->
      <!--<div class="preloader" ref="collectionListShow"></div>-->
      <!--</div>-->
      <!--</mugen-scroll>-->
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
              ((item.latestPrice - item.twelveHoursAgoPrice) / item.latestPrice).toFixed(2)
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

  </div>

</template>
<script charset="UTF-8">
  import lineChart from './lineChart.vue';
  import seeMore from './seeMore.vue'
  import DaysearchCard from './DaysearchCard.vue'
  import * as fun from '../../assets/js/pubFunc.js'
  import * as api from '../../api/dayByDay'
  import MugenScroll from 'vue-mugen-scroll'
  export default{
    filters: {
      newtel (value) {
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
      MugenScroll
    },
    data () {
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
        nameIdS: "",
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
        //用于传送一个ID给查看更多
        seeMoreID: '',
        //用于当返回的的时候选中对的图表/给查看更多
        getIndexNumber: '',
        //传一个名字给查看更多
        sendNmaeToMore: '',
      }
    },
    mounted () {
      this.formTime();
      this.getFirstId();
      this.TotalNumberOfCards();
    },
    methods: {
      //表格时间的编写
      formTime(){
        var earliestSDate = new Date();
        earliestSDate = earliestSDate.getTime() - 1000 * 60 * 60 * 9;
        this.earliestS = fun.formatDate(new Date(earliestSDate), "yyyy-MM-dd-hh");
        console.log(this.earliestS);
        var latestSDate = new Date();
        this.latestS = fun.formatDate(new Date(latestSDate), "yyyy-MM-dd-hh");
        console.log(this.latestS)
      },
      // 用于初始页面的时候获取一个id
      getFirstId(){
        api.CollectionShow({maxResultCount: 1, skipCount: 0}).then(
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
      formTimeitem(){
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
      passTheDataToTheForm(value){
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


      //返回到天天使搜素页面

      toDayIndex(){
        this.$router.push({ path: '/tools/DayByDay/'});
      },
      //底部无限滚动
      //底部滚动
      fetchData(){
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
            console.log(res)
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
      dayCollection(index, item){
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
      },
      //用于接收卡片收藏的总数量
      TotalNumberOfCards(){
        api.CollectionShow({
          maxResultCount: 20,
          skipCount: 0,
        }).then(
          res => {
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            this.dayTotalCountSC = res.data.result.totalCount;
            if (this.totalCount <= 10) {
              this.$refs.scrollShow.style.display = 'none';
            } else {
              this.$refs.scrollShow.style.display = 'inline-block';
            }
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
            this.nameIdS = res.data.result.items[0].polyliPropsID
            this.formTimeitem();


          }, err => {
            $.toast(err)
          }
        )
      },
      //详情的显示和隐藏
      seeMormClick(value, index, name){
        console.log(value)
        this.$refs.seeMore.seeMoreshow();
        this.seeMoreShow = false;
        this.seeMoreID = value;
        this.getIndexNumber = index;
        this.lineChartShow = null
        this.sendNmaeToMore = name
        console.log(this.seeMoreID)
      },

      //查看更多倒退回来的时候。 设置LineChartShow的值
      setLineChartShowC(){
        this.lineChartShow = this.getIndexNumber;
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import 'DayList';
</style>
