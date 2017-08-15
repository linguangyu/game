<template>
  <div class="CustomerService_wrapper"  @click.self="getIn">
    <div class="CustomerService">
      <p class="CustomerService_title">客服信息</p>
      <p class="CustomerService_name">客服：敏敏</p>
      <div class="CustomerService_information">
        <p class="CustomerService_information_qq">微信 :</p>
        <input type="text" class="form_input" v-model="reversedMessage" readonly  id="text">
      </div>
      <p class="CustomerService_sure" @click="copyToClipBoard">复制内容</p>
    </div>
  </div>
</template>
<script>

  export default {
    components: {
    },
    computed: {
    },
    created() {
    },
    mounted() {
    },
    data() {
      return {

        reversedMessage:'Rasy003',
      }
    },
    methods: {
      copyToClipBoard() {
        let d = document.getElementById("text");
        d.select();
        document.execCommand("Copy");
        $.toast("复制成功！");
        this.$store.state.global.CustomerService = false
        return false
      },
      getIn(){
        this.$store.state.global.CustomerService = false
      }

    },
  }
</script>
<style lang="scss" scoped>
  @import 'CustomerService';
</style>
