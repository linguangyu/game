<template>
  <div class="collectionList">
    <div class="collectionList_header">
      <div class="header_top clearfix">
        收藏列表
        <img src="./imgaes/jiantou.png" alt="" @click="ClickCollectionList">
        <p>全部收藏（<span>{{totalCount}}</span>）</p>
      </div>
    </div>
    <div class="collectionList_all" style="padding-bottom: 2.6rem;overflow:auto;-webkit-overflow-scrolling: touch;"
         ref="collectionList">
      <div class="cardInquiries_list" v-for="item in items" @click="DetailsShow(item.id)">
        <div class="list_left">
          <img :src="'https://m.k5game.com/image/'+item.cardId+'.png'" alt="">
        </div>
        <div class="list_right">
          <div class="right_top">
            <p class="top_name">{{item.name}}</p>
          </div>
          <div class="right-bottom">
            <p class="bottom_fei">费用 : <span>{{item.cost}}</span></p>
            <p class="bootom_js">{{item.class}}-{{item.cardType}}</p>
            <p class="bootom_xy">稀有度 : {{item.rarity}}</p>
          </div>
        </div>
        <div class="list_shoucang" @click.stop="cancelDel(item)">
          <img src="./imgaes/shoucaixin.png" alt="">
          取消
        </div>
        <div class="list_shoucang_series">
          所属卡组:{{item.cardSet}}
        </div>
      </div>
      <mugen-scroll :handler="fetchDataList" :should-handle="!loading" scroll-container="collectionList">
        <div class="infinite-scroll-preloader">
          <div class="preloader" ref="collectionListShow"></div>
        </div>
      </mugen-scroll>
    </div>

  </div>

</template>
<script charset="UTF-8">
  import * as api from '../../api/singleCard.js'
  import MugenScroll from 'vue-mugen-scroll'
  import singleCardDetails from './singleCardDetails.vue';

  export default {
    components: {
      MugenScroll,
      singleCardDetails
    },
    data() {
      return {
        loading: false,
        skipCount: 10,
        items: [],
        totalCount: '',
//        点击后传一个清单给卡片详情.接收
        CardedDetails: {}
      }
    },
    mounted() {
      this.fetchDataList();
      this.GetThecollectionList();
      this.loadIsValid();
    },
    methods: {
      loadIsValid() {
        if (this.items.length === 0) {
          this.$refs.collectionListShow.style.display = 'none';
        }
      },
      GetThecollectionList() {
        api.GetCollectHearthstoneCard({maxResultCount: 10, skipCount: 0}).then(
          res => {
            this.items = res.data.result.items;
            this.totalCount = res.data.result.totalCount;
            if (this.items.length === 0) {
              this.$refs.collectionListShow.style.display = 'none';
            } else {
              this.$refs.collectionListShow.style.display = 'inline-block';

            }
          },
          err => {
            $.toast(err);
          }
        )
      },
      //底部刷新
      fetchDataList() {
        if (this.items.length === 0) {
          return
        }
        this.loading = true;
        api.GetCollectHearthstoneCard({
          maxResultCount: 10,
          skipCount: this.skipCount,
        }).then(
          res => {
            for (let i = 0; i < res.data.result.items.length; i++) {
              this.items.push(res.data.result.items[i]);
            }
            if (this.skipCount > this.totalCount) {
              this.$refs.collectionListShow.style.display = 'none';
              return
            }
          },
          err => {
            $.toast(err)
          }
        );
//        用于判断总数 小于总数后不进行刷新
        this.skipCount += 10;
        this.loading = false
      },
      ClickCollectionList() {
        this.$router.push({name: 'cardInquiries'})
      },
      //点击后传一个清单给卡片详情
      DetailsShow(id) {
        this.$router.push({name: 'singleCardDetails', params: {carId: id + '.html'}})
      },
      cancelDel(item) {
        api.DeleteCollectHearthstoneCard({
          cardId: item.cardId
        }).then(
          res => {
            this.GetThecollectionList();
          },
          err => {
            $.toast(err);
          }
        )
      }

    }
  }
</script>
<style lang="scss" scoped>
  @import 'collectionList';
</style>
