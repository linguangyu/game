<template>
  <div class="DaysearchCard">
    <div class="DaysearchCard_all">
      <div class="all_title">
        <div class="all_title_left">搜素历史</div>
        <div class="all_title_right" @click="DeleteStored">删除记录</div>
        <!---->
      </div>
      <div class="all_searchList" ref="GetList">
        <div class="list_ones" v-for="item in LocalData" @click='LocalDataClick(item)'>{{item}}</div>
      </div>
      <div class="all_popularSearches">热门搜素</div>
      <div class="popularSearches_List">
        <div class="list_ones" v-for="item in popularSearches" @click="popularSearchesClick(item.name)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script charset="UTF-8">
  import * as api from '../../api/dayByDay.js'
  export default{
    props: {
      LocalData: {

      }
    },
    data () {
      return {
        //热门搜素清单{
        popularSearches: [
          {
            name: '3级耐力宝石'
          },
          {
            name: '宝图碎片上(宠物技能)'
          },
          {
            name: '宝图碎片上(符文)'
          },
          {
            name: '苍蝇'
          },
          {
            name: '橙糖果'
          },
          {
            name: '德古拉男爵'
          },

          {
            name: '恶魔女仆'
          },
          {
            name: '鬼女'
          },
        ],
      }
    },
    mounted(){
      this.GetTheList();

    },
    methods: {
      GetTheList(){
        let aa = this.$refs.GetList
        let bb = $(aa).children('div');
        for (let i = 0; i < bb.length; i++) {
          if (bb[i].innerHTML === '') {
            bb[i].style.display = 'none';
          }
        }
      },
      DeleteStored(){
        this.$emit('add');
      },
      LocalDataClick(item){
        this.$emit('LocalDataClickAdd', item);
      },
      popularSearchesClick(item){
        this.$emit('popularSearchesClickAdd', item);
      }
    },

  }
</script>
<style lang="scss" scoped>
  @import "DaysearchCard";
</style>
