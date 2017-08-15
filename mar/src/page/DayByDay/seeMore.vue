<template>
  <div class="seeMore" ref="seeMore" v-show="seeMoreFlag">
    <div class="seeMore_header">
      <div class="header_top clearfix">
        <div class="topreturn" @click="showFlagSh">
          <img src="./imgaes/jiantou.png" alt="" v-show="true">
        </div>
        <p>{{sendNmaeToMoreS}}</p>
      </div>
    </div>
    <div class="seeMore_time">
      <div class="seeMore_time_title">
        <div class="seeMore_time_title_left">
          <p class="time_title_left_text">从</p>
          <div class="time_title_left_vie">
            <input class="form_input" id="starInput" name="starInput"
                   placeholder="起始时间" onfocus="this.placeholder=''"
                   onblur="if (this.placeholder === '') {this.placeholder='起始时间'}" v-model="StartTime">
            <div class=""></div>
          </div>
        </div>
        <div class="seeMore_time_title_center">
          <img src="./imgaes/ydaoxianH.png" alt="">
        </div>
        <div class="seeMore_time_title_right">
          <p class="time_title_right_text">至</p>
          <div class="time_title_right_vie">
            <input class="form_input" id="endInput" name="endInput"
                   placeholder="结束日期" onfocus="this.placeholder=''"
                   onblur="if (this.placeholder === '') {this.placeholder='结束日期'}" v-model="stopTime"
            >
            <div class=""></div>
          </div>
        </div>
      </div>
      <div class="charts2">
        <div id="myChart2"></div>
      </div>
      <div class="seeMore_tiem_new">*.表格中数据是最新{{latestS}}</div>
    </div>
    <div class="seeMore_list" style="padding-bottom: 2.6rem;overflow:auto;-webkit-overflow-scrolling: touch;">
      <div class="seeMore_list_price" v-for="item in items">
        <p class="list_price_left">{{item.latestHours | setDateHours}}</p>
        <div class="list_price_center">
          <p class="price_center_top">价格</p>
          <p class="price_center_button">{{item.latestPrice}}</p>
        </div>
        <div class="list_price_right">
          <p class="price_right_left">{{item.latestGains }}%</p>
          <p class="price_right_right"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script charset="UTF-8">
  import'./js/lCalendar'
  import'./js/mobiscroll.custom-2.5.0.min'
  import jquery from 'jquery'
  import * as fun from '../../assets/js/pubFunc.js'
  import * as api from '../../api/dayByDay'
  import MugenScroll from 'vue-mugen-scroll'

  export default{
    props: {
      SendSeeMoreId: '',
      sendNmaeToMoreS: ''
    },
    filters: {
      setDateHours (value) {
        let aa = value;
        let bb = aa.substring(11, 13);
        let cc = aa.substring(5, 10);
        cc = cc.replace(/\b(0+)/, "");
        value = cc + '/' + bb+'时'
        return value
      },

    },
    data () {
      return {
        seeMoreFlag: false,
        earliestS: '',
        latestS: '',
        itemPrice: [],
        itemDate: [],
        itemChart: [],
        items: [],
        //下面2个是input判断的数据
        StartTime: '',
        stopTime: '',
        //接收新默认渲染时间
        earliestZ: '',
        latestZ: '',
        //s


      }
    },
    watch: {
      SendSeeMoreId: function () {
        this.SeeformTimeitem()
        this.getIdList();
      },
      StartTime: function () {
        console.log(this.StartTime)
        this.getIdList();
      },
      stopTime: function () {
        console.log(this.stopTime)
        this.getIdList();
      }

    },
    mounted () {
      this.seeMoreDate();
      this.mobiscrollDate();


    },

    methods: {
//      setTimeStart(){
//          console.log(this.StartTime)
//      },
//      setTimeStop(){
//        console.log(this.stopTime)
//      },
      //获取id的列表
      getIdList(){
        if (!this.StartTime) {
          var earliestSDate = new Date();
          earliestSDate = earliestSDate.getTime() - 1000 * 60 * 60 * 9;
          this.earliestZ = fun.formatDate(new Date(earliestSDate), "yyyy-MM-dd-hh");
          console.log(this.earliestZ);
        } else {
          this.earliestZ = this.StartTime;
        }
        if (!this.stopTime) {
          var latestSDate = new Date();
          this.latestZ = fun.formatDate(new Date(latestSDate), "yyyy-MM-dd-hh");
          console.log(this.latestZ)
        } else {
          this.latestZ = this.stopTime
        }
        api.PriceChangeNameHoursShow({
          nameid: this.SendSeeMoreId,
          earliest: this.earliestZ,
          latest: this.latestZ,
        }).then(
          res => {
            this.items = res.data.result;
            console.log(this.item)
          },
          err => {
            $.toast(err);
          }
        )
      },

      // 渲染表格的。
      SeeformTimeitem(){
        var earliestSDate = new Date();
        earliestSDate = earliestSDate.getTime() - 1000 * 60 * 60 * 9;
        this.earliestS = fun.formatDate(new Date(earliestSDate), "yyyy-MM-dd-hh");
        console.log(this.earliestS);
        var latestSDate = new Date();
        this.latestS = fun.formatDate(new Date(latestSDate), "yyyy-MM-dd-hh");
        console.log(this.latestS)
        api.PriceChangeNameHoursShow({
          nameid: this.SendSeeMoreId,
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
            this.seeMoreEcharts();
          },
          err => {
            $.toast(err);
          }
        )
      },
      //页面的显示
      seeMoreshow() {
        this.seeMoreFlag = true;
      },
      //页面的隐藏
      showFlagSh(){
        this.seeMoreFlag = false
        this.$emit('setLineChartShow');
        this.StartTime = ''
        this.stopTime = ''
      },
      //开始日期选择
      seeMoreDate(){
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
          var calendar = new lCalendar();
          calendar.init({
            'trigger': '#starInput',
            'type': 'date'
          });
        }
        else {
          jquery("#starInput").mobiscroll().date();

          var currYear = 1991;

          //初始化日期控件
          var opt = {
            preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
            theme: 'android-ics light', //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
            display: 'modal', //显示方式 ，可选：modal\inline\bubble\top\bottom
            mode: 'scroller', //日期选择模式，可选：scroller\clickpick\mixed
            lang: 'zh',
            dateFormat: 'yyyy-mm-dd', // 日期格式
            setText: '确定', //确认按钮名称
            cancelText: '取消',//取消按钮名籍我
            dateOrder: 'yyyymmdd', //面板中日期排列格式
            dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
            showNow: false,
            nowText: "今",
            startYear: currYear, //开始年份
            endYear: currYear + 100 //结束年份
            //endYear:2099 //结束年份
          };
          jquery("#starInput").mobiscroll(opt);

        }
      },
      //结束日期选择
      mobiscrollDate(){
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
          var calendar = new lCalendar();
          calendar.init({
            'trigger': '#endInput',
            'type': 'date'
          });
        }
        else {
          jquery("#endInput").mobiscroll().date();

          var currYear = 1991;

          //初始化日期控件
          var opt = {
            preset: 'date', //日期，可选：date\datetime\time\tree_list\image_text\select
            theme: 'android-ics light', //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
            display: 'modal', //显示方式 ，可选：modal\inline\bubble\top\bottom
            mode: 'scroller', //日期选择模式，可选：scroller\clickpick\mixed
            lang: 'zh',
            dateFormat: 'yyyy-mm-dd', // 日期格式
            setText: '确定', //确认按钮名称
            cancelText: '取消',//取消按钮名籍我
            dateOrder: 'yyyymmdd', //面板中日期排列格式
            dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
            showNow: false,
            nowText: "今",
            startYear: currYear, //开始年份
            endYear: currYear + 100 //结束年份
            //endYear:2099 //结束年份
          };
          jquery("#endInput").mobiscroll(opt);

        }
      },
      //详情里面的表格
      seeMoreEcharts(){
        let echarts = require('echarts/lib/echarts')// 引入基本模板，如果在项目中对体积要求比较苛刻，也可以只按需引入需要的模块(可以按需引入的模块列表见见本博客底部)
        // 例如：引入柱状图
        //require('echarts/lib/chart/bar');
        let chartBox2 = document.getElementsByClassName('charts2')[0]
        let myChart2 = document.getElementById('myChart2')

        function resizeCharts() {//为调整图标尺寸的方法
          myChart2.style.width = chartBox2.style.width + 'px'
          myChart2.style.height = chartBox2.style.height + 'px'
        }

        let mainChart2 = echarts.init(myChart2)// 基于准备好的dom，初始化echarts实例

        var option = null;
        // 指定图表的配置项和数据
        option = {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: this.itemDate,
            axisTick: {
              show: false
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#ffa800',
              }
            },

          },

          yAxis: {
            boundaryGap: true,
            splitLine: {show: false},
            axisLine: {
              lineStyle: {
                color: '#444444',
              }
            },
          },
          grid: {
            x: 0,
            y: 10,
            x2: 0,
            y2: 30
          },
          series: {
            type: 'line',
            data: this.itemPrice,
            itemStyle: {
              normal: {
                color: '#ffa800',
              }
            },
            lineStyle: {
              normal: {
                width: 1,
                shadowColor: 'rgba(0,0,0,0.8)',
                shadowBlur: 10,
                shadowOffsetY: 10
              }
            },
          }
        };
        // 使用刚指定的配置项和数据显示图表。
        mainChart2.setOption(option)
      },


    }

  }
</script>
<style lang="scss" scoped>
  @import 'seeMore';
  @import './CSS/lCalendar.css';
  @import './CSS/mobiscroll.custom-2.5.0.min.css';
</style>
