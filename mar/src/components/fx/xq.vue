<template>
  <div class="xq" style="padding-bottom: 2.6rem;overflow:auto;-webkit-overflow-scrolling: touch;">
    <div class="xqbg">
      <div class="xq_text">
        <!--<div class="xq_touxiang">-->
          <!--<img src="" alt="">-->
        <!--</div>-->
        <div class="xq_neirong">
          <p>您的好友：</p>
          <p>向您推荐一款炉石传说友谊赛PY神器
            k5电竞，智能陪打，安全高效</p>
        </div>
      </div>
      <img src="./images/1.png" alt="">
    </div>
    <div class="xq_top">
      <div class="xq_fanhui" @click="$router.push({path:'/'})">
        <img src="./images/5.png" alt="">
      </div>
      <div class="xq_denglu" @click="$router.push({path:'/login/'})">
        <img src="./images/6.png" alt="">
      </div>
    </div>

  </div>
</template>
<script>
  import {GetCurrentLoginInformationsApi} from '../../api/account';

  export default {

    computed: {},
    created() {

    },
    mounted() {
      this.gethahaha()
    },
    data() {
      return {
        WhetherS: false,
        userdata: {
          profilePictureId: '',
          nickName: '',
          phoneNumber: '',
          id: '',
        },
      }
    },
    methods: {
//      gethahaha() {
//        GetCurrentLoginInformationsApi().then(
//          res => {
//            this.userdata.profilePictureId = res.data.result.user.profilePictureId;
//            this.userdata.nickName = res.data.result.user.nickName;
//            this.userdata.phoneNumber = res.data.result.user.phoneNumber;
//            this.availableCoins = res.data.result.userAsset.availableCoins
//            this.userdata.profilePictureId = res.data.result.user.profilePictureId ? 'https://api.k5game.com/Profile/GetProfilePictureById?id=' + this.userdata.profilePictureId : 'https://api.k5game.com/Profile/GetProfilePictureById';
//          },
//          err => {
//            $.toast(err);
//          }
//        );
//      }
    },
  }
</script>
<style lang="scss" scoped>
  @import 'xq';
</style>
