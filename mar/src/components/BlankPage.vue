<template>
  <div v-show="show"  class='blankPage'>
    <img src="../assets/img/konbaigif.gif" alt="">
    <p>空空如也~~~</p>
  </div>
</template>

<script>
  export default {
     props: ['show']
  }
</script>

<style lang="scss">
  .blankPage{
    position:absolute;
    top:49%;
    left:0;
    right:0px;
    z-index:1000;
    text-align:center;
  }
  .blankPage p{
    font-size:14px;
    color:#fff;
  }
  .blankPage img{
    width:80px;
    height:80px;
  }
</style>
