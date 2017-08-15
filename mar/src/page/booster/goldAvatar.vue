<template>
  <div class="goldAvatar">
      <div class="goldAvatar_header clearfix">
        <img src="./imgaes/jiantou.png" alt="" v-show="true" @click="$router.push({name: 'booster'});">
        <p>炉石代练</p>
      </div>
    <div class="goldAvatar_center">
      <div class="center_top"></div>
      <div class="center_header">金币+金色头像套餐</div>
    </div>
  </div>
</template>
<script charset="UTF-8">
  export default{
    data () {
      return {

      }
    },

  }
</script>
<style lang="scss" scoped>
  @import 'goldAvatar';
</style>
