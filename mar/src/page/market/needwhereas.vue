<template>
    <div class='needwhereas marginTop'>
      <!--头部-->
      <header class="bar bar-nav">
      <a  @click='$router.go(-1)'  v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></a>
      <h1 class="title">需求代练</h1>
      </header>
      <h2>代练方式</h2>
        <ul>
          <li><strong>押金代练</strong> <input type="text" placeholder='请输入押金'><span>$850</span><i @click='explainshow($event)' title='0'>什么是押金代练</i></li>
          <li><strong>优质代练</strong><span>$960</span><i title='1' @click='explainshow($event)'>什么是优质代练</i></li>
          <li><strong>私人代练</strong><input type="text" placeholder='请输入6位密码'><i title='2' @click='explainshow($event)'>什么是私人代练</i></li>
        </ul>
      <h2>账号信息</h2>
        <ul class='whereasdetails'>
          <li>账号（必填）<input type="text"></li>
          <li>密码（必填）<input type="text"></li>
          <li>所在区（必填）<input type="text"></li>
          <li>所在服（必填）<input type="text"></li>
          <li>角色名称（必填）<input type="text"></li>
          <li>联系方式（必填）<input type="text"></li>
        </ul>
        <div class='neeswhereas-btn' >
          合计：$960<router-link :to="{name:'suborder'}">提交</router-link>
        </div>
        <div class='neeswhereas-explain' v-if='modelhide' @click='explainhide()'>
          <div>
          <p>{{explain[number].title}}</p>{{explain[number].content}}
          </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../assets/css/market.scss';
</style>

<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  export default{
    computed:{

    },
    mounted () {

        },
    data () {
      return {
        explain:[
          {title:'押金代练',content:'押金代代练是指代练支付规定押金之后才能接单的代练订单，押金金额由玩家自行设定，代练成功之后。押金将返还到代练钱包中，；代练失败，押金将赔偿给发单玩家，押金代练的成交价格为订单价格（即玩家发单时设定的价格）'},
          {title:'优质代练',content:'押金代代练是指代练支付规定押金之后才能接单的代练订单，押金金额由玩家自行设定，代练成功之后。押金将返还到代练钱包中，；代练失败，押金将赔偿给发单玩家，押金代练的成交价格为订单价格（即玩家发单时设定的价格）'},
          {title:'私人代练',content:'押金代代练是指代练支付规定押金之后才能接单的代练订单，押金金额由玩家自行设定，代练成功之后。押金将返还到代练钱包中，；代练失败，押金将赔偿给发单玩家，押金代练的成交价格为订单价格（即玩家发单时设定的价格）'}
        ],
        number:'',
        modelhide:false
      }
    },
    components: {

    },
    methods: {
    explainshow(e){
      this.modelhide=true;
      this.number=e.target.title-0;
    },
    explainhide(){
      this.modelhide=false
    }
    },
  }
</script>
