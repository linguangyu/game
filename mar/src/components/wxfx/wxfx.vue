<template>
  <div class="wxfx">
    <div id="soshid"></div>
  </div>
</template>
<style lang="scss" scoped>
  @import 'wxfx';
</style>
<script charset="UTF-8">
  import sosha from 'sosh'
  import soshm from 'soshm'
  export default {
    computed: {},
    mounted() {
      sosha('#soshid', {
        // 分享的链接，默认使用location.href
        url: window.location.href,
        // 分享的标题，默认使用document.title
        title: 'text',
        // 分享的摘要，默认使用<meta name="description" content="">content的值
        digest: '',
        // 分享的图片，默认获取本页面第一个img元素的src
        pic: '',
        // 选择要显示的分享站点，顺序同sites数组顺序，
        // 支持设置的站点有weixin,yixin,weibo,qzone,tqq,douban,renren,tieba
        sites: ['weixin,', 'weibo', 'yixin', 'qzone', 'weixin']
      })
    },
    created() {
    },
    filters: {},
    data() {
      return {}
    },
    components: {

    },
    methods: {}
  }
</script>
