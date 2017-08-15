<template>
  <div class="issuelist colorfff marginTop">
    <header class="bar bar-nav">
      <a @click="ClearTheStorage" v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></a>
      <h1 class="title">{{jszname}}</h1>
    </header>
    <div class='issuelist-content'>
      <ul v-if="items.length>1">
        <li v-for="item in items" @click="JumpPageWt(item.id)">
          <div><img :src="'https://api.k5game.com/Temp/Downloads/'+ item.picture" alt=""></div>
          <p>{{item.title}}</p>
        </li>
      </ul>
      <img v-if="items.length===1" :src="'https://api.k5game.com/Temp/Downloads/'+ items[0].picture" alt="">
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import * as api from '../../api/news'

  export default {
    computed: {},
    mounted() {
      this.getFaqList();
    },
    data() {
      return {
        items: [],
        jszname: '',
      }
    },
    components: {},
    methods: {
      getFaqList() {
        api.ArticleLhTitleListShow({
          showTheLocationid: this.$route.params.id,
          belongsToGameid: 2,
        }).then(
          res => {
            this.items = res.data.result.items
          },
          err => {
          }
        )
      },
      JumpPageWt(id) {
        this.$router.push({
          name: 'news',
          params: {newsId: id + '.html', ProductID: this.$route.params.id}
        })
      },
      ClearTheStorage() {
        this.$router.go(-1)
      }
    }
  }
</script>
