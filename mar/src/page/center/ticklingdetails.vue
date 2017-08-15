<template>
 <div class="marginTop tickling colorfff ">
    <header class="bar bar-nav">
      <router-link  v-if='this.$store.state.global.judge' :to="{  path: '/center/tickling'}" class="icon icon-left pull-left"></router-link>
      <router-link :to="{name:'feedback'}" class="icon  pull-right">反馈</router-link>
      <h1 class="title">反馈详情</h1>
    </header>

    <div class='ticklingdetails-title'>
      <p>问题: {{feedback.content}}
      </p>
      <p>
      玩家id：{{feedback.nickName}} <span>时间：{{feedback.creationTime}}</span>
      </p>
    </div>
    <div class='ticklingdetails-img' >
    <p>问题截图：</p>
    <img v-for='img in feedback.screenshots' :src="'https://api.k5game.com/Upload/Downloads/'+img.url" alt="">
    </div>
    <!--
   <div class='ticklingdetails-center' v-for='item in feedback.replies'>
    答：{{item.content}}
    <p>玩家id：{{item.nickName}} <span>回复时间：{{item.creationTime}}</span></p>
   </div> 
   -->  
 </div>
</template>
<style lang="scss" scoped>
@import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
import * as checkJs from '../../assets/js/pubFunc'
import { GetFeedbackApi } from '../../api/issue.js'
export default{
     computed:{

      },
    mounted () {
      this.getFeedbackdetail()
    },
    data () {
      return {
          ticklingId:'',
          feedback:{
            content:'',
            creationTime:'',
            nickName:'',
            replies:'',
            screenshots:'',
          }
        }
      },
    components: {

    },
    methods: {
      getFeedbackdetail(){
        this.ticklingId=this.$route.params.ticklingId;
        GetFeedbackApi({id:`${this.ticklingId}`}).then(
          res=>{
            this.feedback.content=res.data.result.content;
            this.feedback.nickName=res.data.result.nickName;
            this.feedback.replies=res.data.result.replies;
            this.feedback.screenshots=res.data.result.screenshots;
            this.feedback.creationTime=checkJs.creationTime(res.data.result.creationTime);

            this.feedback.replies.push({content:'内容',creationTime:'时间',nickName:'昵称'})
            
          },
          err=>{  
            $.toast(err)
          }
        )
      }
    }
  }
</script>
