<template>
  <div>
    <transition name="move">
      <div class="lineChart">
        <div class="charts">
          <div id="myChart"></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script charset="UTF-8">
  import echarts from 'echarts'
  import * as fun from '../../assets/js/pubFunc.js'
  export default{
    props: {
      itemsPrice: {
        type: Array
      },
      itemsDate: {
        type: Array
      }
    },
    data () {
      return {
        showFlag: true,
        Minutes: 12,
        ChartitemsPrice:''
      }
    },
    watch:{
      itemsPrice:function () {
          this.showChart();
      }
    },
    mounted () {
      this.showChart();
    },
    methods: {
      show(){
        this.showFlag = true;
      },
      showTrue(){
        this.showFlag = false;
      },
      showChart(){
        var myDate = new Date();
        let echarts = require('echarts/lib/echarts')// 引入基本模板，如果在项目中对体积要求比较苛刻，也可以只按需引入需要的模块(可以按需引入的模块列表见见本博客底部)
        // 例如：引入柱状图
        //require('echarts/lib/chart/bar');
        let chartBox = document.getElementsByClassName('charts')[0]
        let myChart = document.getElementById('myChart')

        function resizeCharts() {//为调整图标尺寸的方法
          myChart.style.width = chartBox.style.width + 'px'
          myChart.style.height = chartBox.style.height + 'px'
        }

        let mainChart = echarts.init(myChart)// 基于准备好的dom，初始化echarts实例


        var timeData = [];
        for (var i = 0; i< 12; i++) {
          var timesData = new Date().getTime();
          timesData = timesData - 1000 * 60 * 60 * i;
          var stimeData = fun.formatDate(new Date(timesData), "hh");
          timeData.push(stimeData)
        }
        timeData.reverse();

//      function fetchData(cb) {
//        // 通过 setTimeout 模拟异步加载
//        setTimeout(function () {
//          cb({
//            categories:timeData,
//            data: this.itemsPrice,
//          });
//        }, 1000);
//      }
//
//      console.log(this.itemsPrice)
        var option = null;
        // 指定图表的配置项和数据
        option = {
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: this.itemsDate,
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
            boundaryGap: false,
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
            data:this.itemsPrice,
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
//      fetchData(function (data) {
//        myChart.setOption({
//          xAxis: {
//            data: data.categories
//          },
//          series: [{
//            // 根据名字对应到相应的系列
//            name: '销量',
//            data: data.data
//          }]
//        });
//      });
        // 使用刚指定的配置项和数据显示图表。

        mainChart.setOption(option)

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "lineChart";
</style>
