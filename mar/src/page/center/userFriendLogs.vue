<template>
  <div class="userFriendLogs colorfff marginTop">
    <header class="bar bar-nav">
      <a v-if='this.$store.state.global.judge' @click='$router.go(-1)' class="icon icon-left pull-left"></a>
      <h1 v-show="hidden" class="title">友谊赛详情</h1>
      <h1 v-show='!hidden' class="title" style='color:#A2A2A2;'>剩余友谊赛 <span style='color:#ffb800;font-size:1.5rem;'>{{availableFriendlyMatchs}}</span>
        场</h1>
    </header>
    <div class='userFriendLogs-box' @scroll='scrollhidden()' ref="scrollContainer">
      <div class='userFriendLogs-header'>
        <p>{{availableFriendlyMatchs}} <span>剩余友谊赛</span></p>
      </div>
      <div class='userFriendLogs-content'>
        <ul>
          <li class='clearfix' v-for='item in items'>
            <dl>
              <dt>{{item.title}}</dt>
              <dd>{{item.creationTime}}</dd>
            </dl>
            <span>{{item.amount}}场</span>
          </li>
          <mugen-scroll :handler="fetchData" :should-handle="!loading" scroll-container="scrollContainer">
            <div class="infinite-scroll-preloader">
              <div class="preloader" ref="scrollShowa"></div>
            </div>
          </mugen-scroll>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import {GetCurrentLoginInformationsApi} from '../../api/account.js'
  import {GetUserFriendMatchLogsApi} from '../../api/transaction.js'
  import MugenScroll from 'vue-mugen-scroll'

  export default {
    computed: {},
    mounted() {
      this.gerusermoney();
      this.getUserFriendMatchLogs();
      this.$refs.scrollShowa.style.display = 'none';
    },
    data() {
      return {
        items: [],
        loading: false,
        skipCount: 10,
        frozenFriendlyMatchs: '',
        availableFriendlyMatchs: '',
        hidden: true
      }
    },
    components: {
      MugenScroll
    },
    methods: {
      scrollhidden() {
        if ($('.userFriendLogs-box')[0].scrollTop < 200) {
          this.hidden = true;
          return;
        } else {
          this.hidden = false;
          return;
        }
      },
      fetchData() {//底部无限滚动方法
        this.loading = true
        let PendingOrders = {
          maxResultCount: 10,
          skipCount: this.skipCount
        }
        GetUserFriendMatchLogsApi(PendingOrders).then(
          res => {
            for (let i = 0; i < res.data.result.items.length; i++) {
              res.data.result.items[i].creationTime = checkJs.formatDate(new Date(res.data.result.items[i].creationTime), "yyyy-MM-dd hh:mm")
              switch (res.data.result.items[i].source) {
                case 1:
                  res.data.result.items[i].title = '提取' + res.data.result.items[i].amount + '场友谊赛';
                  res.data.result.items[i].amount = res.data.result.items[i].amount;
                  break;
                case 2:
                  res.data.result.items[i].title = '取消-' + res.data.result.items[i].remark.slice(res.data.result.items[i].remark.indexOf('，') + 1)
                  res.data.result.items[i].amount = '+' + res.data.result.items[i].amount;
                  break;
                case 3:
                  res.data.result.items[i].title = '存入订单-' + res.data.result.items[i].amount + '场友谊赛';
                  res.data.result.items[i].amount = '-' + res.data.result.items[i].amount;
                  break;
                case 4:
                  res.data.result.items[i].title = '存入订单未完成-' + res.data.result.items[i].remark.slice(res.data.result.items[i].remark.indexOf('，') + 1)
                  res.data.result.items[i].amount = '+' + res.data.result.items[i].amount;
                  break;
                case 5:
                  res.data.result.items[i].title = '出售-' + res.data.result.items[i].amount + '场友谊赛';
                  res.data.result.items[i].amount = res.data.result.items[i].amount;
                  break;
                case 6:
                  res.data.result.items[i].title = '购买-' + res.data.result.items[i].amount + '场友谊赛';
                  res.data.result.items[i].amount = '+' + res.data.result.items[i].amount;
                  break;
                case 7:
                  res.data.result.items[i].title = '取消出售-' + res.data.result.items[i].remark.slice(res.data.result.items[i].remark.indexOf('，') + 1)
                  res.data.result.items[i].amount = '+' + res.data.result.items[i].amount;
                  break;
              }
              this.items.push(res.data.result.items[i])

            }
          }, err => {
            $.toast(err)
          }
        )
        this.skipCount += 10;
        this.loading = false
      },
      gerusermoney() {
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
      getUserFriendMatchLogs() {
        GetUserFriendMatchLogsApi({maxResultCount: 10, skipCount: 0}).then(
          res => {
            for (let i = 0; i < res.data.result.items.length; i++) {
              res.data.result.items[i].creationTime = checkJs.formatDate(new Date(res.data.result.items[i].creationTime), 'yyyy-MM-dd ');
              switch (res.data.result.items[i].source) {
                case 1:
                  res.data.result.items[i].title = '提取' + res.data.result.items[i].amount + '场友谊赛';
                  res.data.result.items[i].amount = res.data.result.items[i].amount;
                  break;
                case 2:
                  res.data.result.items[i].title = '取消-' + res.data.result.items[i].remark.slice(res.data.result.items[i].remark.indexOf('，') + 1)
                  res.data.result.items[i].amount = '+' + res.data.result.items[i].amount;
                  break;
                case 3:
                  res.data.result.items[i].title = '存入订单-' + res.data.result.items[i].amount + '场友谊赛';
                  res.data.result.items[i].amount = '-' + res.data.result.items[i].amount;
                  break;
                case 4:
                  res.data.result.items[i].title = '存入订单未完成-' + res.data.result.items[i].remark.slice(res.data.result.items[i].remark.indexOf('，') + 1)
                  res.data.result.items[i].amount = '+' + res.data.result.items[i].amount;
                  break;
                case 5:
                  res.data.result.items[i].title = '出售' + res.data.result.items[i].amount + '场友谊赛';
                  res.data.result.items[i].amount = res.data.result.items[i].amount;
                  break;
                case 6:
                  res.data.result.items[i].title = '购买-' + res.data.result.items[i].amount + '场友谊赛';
                  res.data.result.items[i].amount = '+' + res.data.result.items[i].amount;
                  break;
                case 7:
                  res.data.result.items[i].title = '取消出售-' + res.data.result.items[i].remark.slice(res.data.result.items[i].remark.indexOf('，') + 1)
                  res.data.result.items[i].amount = '+' + res.data.result.items[i].amount;
                  break;
              }

            }
            this.items = res.data.result.items;
            if (this.items.length == 0) {
              this.$store.state.global.blankPage = true
            }
          }, err => {
            $.toast(err)
          }
        )

      },
    }
  }
</script>
