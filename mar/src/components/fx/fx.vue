<template>
  <div class="fx">
    <div class="fx_header clearfix">
      <img src="./images/jiantou.png" alt="" v-show="true" @click="$router.go(-1)">
      <p>分享详情介绍</p>
    </div>
    <div class="bg"></div>
    <!--<div class="name">{{reversedMessage}}</div>-->
    <input type="text" class="form_input" v-model="reversedMessage" readonly @click="copyToClipBoard" id="text">
    <div class="button1" @click="copyToClipBoard"><img src="./images/4.png" alt=""></div>
    <div class="fx_Tail">
      <p>起始时间：2017-08-15 12:00</p>
      <p>截至时间：2017-08-22 12:00</p>
      <p>活动周期：7天</p>
      <p>主办方：k5电竞</p>
    </div>
    <Whether ref="Whether"></Whether>
  </div>
</template>
<script>
  import MugenScroll from 'vue-mugen-scroll'
  import {GetCurrentLoginInformationsApi} from '../../api/account';
  import Whether from '../../components/Whether/Whether.vue';
  import * as checkJs from '../../assets/js/pubFunc'
  export default {
    components: {
      MugenScroll,
      Whether
    },
    computed: {
      reversedMessage: function () {
        return 'https://m.k5game.com/share.html?p=' + localStorage.getItem('p')
      },
    },
    created() {
    },
    mounted() {

    },
    data() {
      return {
        userdata: {
          profilePictureId: '',
          nickName: '',
          phoneNumber: '',
          id: '',
        },
      }
    },
    methods: {
      copyToClipBoard() {
        if(checkJs.getCookie('token') && localStorage.getItem('p')){
          let d = document.getElementById("text");
          d.select();
          document.execCommand("Copy");
          $.toast("复制成功！");
          return false
        }else{
          this.$refs.Whether.Wshow();
          $.toast('请登录后，在进行复制');
        }

      },
      gethahaha() {
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
      },
      onCopy: function (e) {
        $.toast('复制成功');
      },
      onError: function (e) {
        copyToClipBoard();
        $.toast('复制没有成功，请点击上面链接复制');
      },

    },
  }
</script>
<style lang="scss" scoped>
  @import 'fx';
</style>
