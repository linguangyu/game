<template>
  <div class="Whether" v-show="WhetherS" ref="Whether">
    <div class="Whether_div">
      <p class="Whether_div_title">权限提示</p>
      <p class="Whether_div_text">此操作需要登录,是否立即登录</p>
      <div class="Whether_div_wrapper">
        <div class="Whether_div_sure_cancel" @click="Whide">取消</div>
        <div class="Whether_div_determine" @click="Wdetermine">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {},
    created() {
    },
    mounted() {

    },
    data() {
      return {
        WhetherS: false
      }
    },
    methods: {
      Wshow() {
        this.WhetherS = true
      },
      Whide() {
        this.WhetherS = false
      },
      Wdetermine() {
        this.$router.push({path: '/login/'})
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import './Whether';
</style>
