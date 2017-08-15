<template>
  <div class="issue  colorfff marginTop">
    <header class="bar bar-nav">
      <router-link v-if='this.$store.state.global.judge' :to="{  path: '/center'}"
                   class="icon icon-left pull-left"></router-link>
      <h1 class="title">常见问题</h1>
    </header>
    <ul class='clearfix'>
      <li v-for='(item,index) in issuearr' @click="JumpPage(item.id)">
        <p :class=" 'clearfix__bg_' + index " class="clearfix__bg">
          <span class="clearfix__bg--list"></span>
          <span class="clearfix__bg--text">{{item.showTheLocationName}}</span>
          <span class="clearfix__bg--list"></span>
        </p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import {CategoryAndQueryLocationShow} from '../../api/issue.js'

  export default {
    computed: {},
    mounted() {
      this.createFaq()
    },
    data() {
      return {
        issuearr: [],
      }
    },
    components: {},
    methods: {
      createFaq() {
        CategoryAndQueryLocationShow({
          categoryId: 3
        }).then(
          res => {
            this.issuearr = res.data.result
          }, err => {
            $.toast(err)
          }
        );
      },
      JumpPage(id) {
        this.$router.push({name: 'issuelist', params: {GName: 2, id: id}})
      }
    }

  }
</script>

