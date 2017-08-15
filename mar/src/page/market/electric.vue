<template>
    <div class='electric'>
      <!--头部-->
      <header class="bar bar-nav">
       <a  @click='$router.go(-1)'  v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></a>
      <h1 class="title">电竞使用说明</h1>
      </header>
      <!--列表-->
      <div class='deal-list'>
       <h1>K5电竞友谊赛使用说明</h1>
      <ul style='padding:0 .5rem;'>
        <li class='waili'>
          <h2>1、什么是友谊赛？</h2>
          <ul>
             <li>这个任务完成后双方各自获得80金。</li>
             <li>只有获得任务的玩家主动向其他玩家发起挑战才能触发任务，反之无效，举个例子：没有任务的B玩家向有任务的A玩家发起挑战不会触发，同时也不能完成A的任务。</li>
          </ul>
        </li>
        <li>
          <h2>2、友谊赛的对战流程是怎样？</h2>
           <ul>
             <li>先提取比赛，添加TAG，开始对战。然后进入游戏停留在（主菜单界面），等待好友邀请友谊赛，每场友谊赛都是有提示的，游戏开始之后我们会配合挨打，低于15滴血投降，对战完毕得80金。</li>
          </ul>
        </li>
        <li>
          <h2>3、友谊赛对战时要注意哪些事项？</h2>
           <ul>
             <li>每一个账号一天最多打5场，之后要过24小时才能再次参与友谊赛，否则领取不到金币哦。如果完成第一场无法领取到金币，到页面取消订单。(如果当天超过5场，则取消订单)。</li>
          </ul>
        </li>
        <li>
          <h2>4、打完5场需要多长时间呢？</h2>
           <ul>
             <li>大概需要15-20分钟左右，一个小号对战完成之后，2分钟之内加好友是正常的。</li>
          </ul>
        </li>
         <li>
          <h2>5、打完会自动删好友吗？</h2>
           <ul>
             <li>打完自动删除好友。</li>
          </ul>
        </li>
         <li>
          <h2>6、Tag输错怎么办？输错tag在哪里修改？</h2>
           <ul>
             <li>可以在输入tag的地方点击“X”删除，然后重新加tag。</li>
          </ul>
        </li>
         <li>
          <h2>7、tag是什么？</h2>
           <ul>
             <li>tag就是你的战网昵称#数字哦。</li>
          </ul>
        </li>
        <li>
          <h2>8、tag可以用邮箱吗？/邮箱可以打吗？</h2>
           <ul>
             <li>抱歉亲，我们邮箱暂时不支持对战。需要战网昵称#数字。</li>
          </ul>
        </li>
        <li>
          <h2>9、加上tag之后为什么还没有加好友？</h2>
           <ul>
             <li>亲 检查下昵称#数字是否正确，“#”也要小写哦。好友位是否满了（200个）。</li>
          </ul>
        </li>
        <li>
          <h2>10、加了好友为什么不对战？</h2>
           <ul>
             <li>亲 要有标准卡牌才能对战哦。</li>
          </ul>
        </li>
      </ul>
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

      }
    },
    components: {

    },
    methods: {

    },
  }
</script>
