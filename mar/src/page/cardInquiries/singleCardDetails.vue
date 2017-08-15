<template>
  <div class="singleCardDetails"  >
    <div class="singleCardDetails_header">
      <div class="header_top clearfix">
        <div class="topreturn" @click="$router.go(-1)">
          <img src="./imgaes/jiantou.png" alt="" v-show="true">
        </div>
        <p>单卡详情</p>
      </div>
      <div class="header_bottom clearfix">
        <div class="bottom_left">
          <div class="left_text">
            <p class="text_1">职业:{{items.class}}</p>
          </div>
        </div>
        <div class="bottom_right">
          <p>费用 :<span :class="'hahah'+items.cost" class="hahah"></span></p>
          <p>所属卡组:{{items.cardSet}}</p>
        </div>
      </div>
    </div>
    <div class="singleCardDetails_bg">
      <img :src="'https://m.k5game.com/image/'+items.cardId+'.png'" alt="" class="dabg">
      <img src="./imgaes/xuangg.png" alt="" class="xuangguang">
    </div>
    <div class="singleCardDetails_footer">
      <div class="footer_top">
        <div class="top_header clearfix">
          <div class="top_header_left">
            <p>{{items.name}}</p>
          </div>
          <div class="top_header_right">
            <p>稀有度 : <span>{{items.rarity}}</span></p>
            <p>卡牌类型 : <span>{{items.cardType}}</span></p>
          </div>
          <div class="top_header_bian"></div>
        </div>
        <div class="top_center" v-html="items.cardTextInHand">

        </div>
      </div>
      <div class="footer_bottom">
        <div class="bottom_left">
          <p>普通{{items.tagPremiumNormalBuy}}/金色{{items.tagPremiumGoldenBuy}}</p>
          <p>打造</p>
        </div>
        <div class="bottom_right">
          <p>普通{{items.tagPremiumNormalSell}}/金色{{items.tagPremiumGoldenSell}}</p>
          <p>分解</p>
        </div>
      </div>
    </div>
    QQQ
  </div>
</template>
<script charset="UTF-8">
  import * as api from '../../api/singleCard.js'

  export default {
    props: {
    },
    created() {
      let aa = this.$route.params.carId; //23
      if (aa.indexOf('.')!==-1) {
        let bb = aa.indexOf('.');
        this.htmla = aa.substring(0, bb)
      } else {
        this.htmla = aa
      }
    },
    data() {
      return {
        items:[],
        htmla:''
      }


    },
    mounted() {
      this.getCardDetails()
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      showFlagSh() {
        this.showFlag = false
      },
//     获取单卡的详情
      getCardDetails() {
        api.CheckHearthstoneCarddetails({
          id: this.htmla
        }).then(
          res => {
            this.items=res.data.result
          },
          err => {

          }
        )
      }

    }

  }
</script>
<style lang="scss" scoped>
  @import 'singleCardDetails';
</style>
