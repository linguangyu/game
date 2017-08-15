<template>
  <div class="JumpingPage">
    <div class="JumpingPage_top">
      <router-link class="JumpingPage_header clearfix" tag="div" :to="{path:'/market/'}">
        <img src="./imgaes/jiantou.png" alt="" v-show="true">
        <p >账号交易</p>
      </router-link>
      <div class="top_center">
        <input type="text" class="form_input"
               placeholder="请输入你需要查找的游戏名称" onfocus="this.placeholder=''"
               onblur="if (this.placeholder === '') {this.placeholder='请输入你需要查找的游戏名称'}">
        <img src="./imgaes/sousuoh.png" alt="">
        <div>共{{totalCount}}个</div>
      </div>
    </div>
    <div class="JumpingPage_center" style="padding-bottom: 2.6rem;overflow:auto;-webkit-overflow-scrolling: touch;">
      <p class="JumpingPage_center_center_name" @click="JumpGame(item.id,index)" v-for="(item,index) in items">
        {{item.name}}</p>
    </div>
  </div>
</template>
<script charset="UTF-8">
  import * as api from '../../api/booster'
  import * as apiz from '../../api/classification'

  export default {
    components: {},
    filters: {},
    data() {
      return {
        items: [],
        totalCount: '',
      }
    },
    mounted() {
      this.GetListCategories()
    },
    methods: {
      //      获取分类列表
      GetListCategories() {
        apiz.GetGameName({
          sorting: "sortindex",
          maxResultCount: 30,
          skipCount: 0
        }).then(
          res => {
            this.items = res.data.result;
            this.totalCount = res.data.result.length
          },
          err => {
          }
        )
      },
      JumpGame(id) {
        this.$router.push({name: 'accountNumber2', params: {gameID: id}})
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import 'JumpingPage';
</style>
