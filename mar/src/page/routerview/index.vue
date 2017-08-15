<template>
  <div>
    <router-view></router-view>
    <nav class="bar bar-tab" id='bar' v-if="this.$store.state.global.footerhide">
      <router-link class="tab-item external" @click.native='gotoRouter(1)' :to="{ path: '/market/'}" >
        <span class="icon iconfont" style='border-right:0px;'>&#xe604;</span>
        <span class="tab-label">市场</span>
      </router-link >
           <router-link class="tab-item external"   @click.native='gotoRouter(4)' :to="{ path: '/tools/'}">
           <span class="icon iconfont" style='border-right:0px;'> &#xe61b;</span>
           <span class="tab-label">工具</span>
         </router-link>
      <router-link class="tab-item external" @click.native='gotoRouter(2)' :to="{ path: '/viewing/'}">
        <span class="icon iconfont" style='border-right:0px;'>&#xe600;</span>
        <span class="tab-label">视角</span>
      </router-link>
      <router-link class="tab-item external" @click.native='gotoRouter(3)' :to="{ path: '/center/'}">
        <span class="icon iconfont" style='border-right:0px;'>&#xe65c;</span>
        <span class="tab-label">中心</span>
      </router-link>
    </nav>
  </div>
</template>
<style lang="scss" scoped>
  .bar-tab {
    height: 2.66666rem;
    background: #363636;
    bottom: 0;
    color: #fff;
  }

  .bar-tab .tab-item .icon {
    font-size: 1.5rem;
  }

  .bar-tab .tab-item {
    color: #fff;
    border-bottom: 2px solid #363636;
    box-sizing: border-box;
    -moz-box-sizing: border-box; /* Firefox */
    -webkit-box-sizing: border-box; /* Safari */
  }

  .bar-tab .tab-item.active, .bar-tab .tab-item:active {
    color: #ffb800;
    background: -webkit-linear-gradient(#363636, #2d2d2d); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#363636, #2d2d2d); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#363636, #2d2d2d); /* Firefox 3.6 - 15 */
    background: linear-gradient(#363636, #2d2d2d);
    border-bottom: 2px solid #ffb800;
  }

  .bar-tab .tab-item .icon {
    top: .3rem;
  }

  .bar-tab:before {
    background: none;
  }

  @font-face {
    font-family: 'iconfont';
    src: url('../../assets/iconfont/iconfont.eot');
    src: url('../../assets/iconfont/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../assets/iconfont/iconfont.woff') format('woff'),
    url('../../assets/iconfont/iconfont.ttf') format('truetype'),
    url('../../assets/iconfont/iconfont.svg#iconfont') format('svg');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 25px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
<script charset="UTF-8">
  export default{
    computed: {},
    mounted () {

    },
    data () {
      return {}
    },
    components: {},
    methods: {
      gotoRouter(num){
        if (num == 1) {
          dplus.track("gotoRouterMarket", {name: "市场"});//u-Dplus 事件管理
          this.$store.state.global.blankPage = false
        } else if (num == 2) {
          dplus.track("gotoRouterViewing", {name: "视角"});//u-Dplus 事件管理
          this.$store.state.global.blankPage = false
        } else if (num == 3) {
          dplus.track("gotoRouterCenter", {name: "中心"});//u-Dplus 事件管理
          this.$store.state.global.blankPage = false
        }else if (num == 4) {
          dplus.track("gotoRouterCenter", {name: "工具"});//u-Dplus 事件管理
          this.$store.state.global.footerhide=false;
          console.log(this.$store.state.global.footerhide);
          this.$store.state.global.blankPage = false
        }
      }
    }
  }
</script>
