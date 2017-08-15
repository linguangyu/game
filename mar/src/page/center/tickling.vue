<template>
 <div class="tickling colorfff ">
    <header class="bar bar-nav">
      <router-link  v-if='this.$store.state.global.judge' :to="{ path: '/routerview/center'}" class="icon icon-left pull-left"></router-link>
      <router-link :to="{name:'feedback'}" class="icon  pull-right">反馈</router-link>
      <h1 class="title">意见反馈</h1>
    </header>
   <div class='tickling-list'>
   <ul>
      <router-link :to="{name:'ticklingdetails',params:{ticklingId:item.id}}" tag='li' v-for='item in items' :key='item.id'>
          <h1>问题: {{item.content}}</h1>
          <p>玩家ID:{{item.nickName}} <span>{{item.creationTime}}</span> <span>{{item.status}}</span></p>
      </router-link>
   </ul>
  </div>

 </div>
</template>
<style lang="scss" scoped>
@import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
import * as checkJs from '../../assets/js/pubFunc'
import { GetFeedbackListApi } from '../../api/issue.js'
export default{
     
    mounted () {
      this.getFeedbackList();
    },
    data () {
      return {
        maxResultCount:10,
        skipCount:0,
        items:''
        }
      },
      computed:{
        
      },
    components: {
     
    },
    methods: {
     getFeedbackList(){
       let feedlist={
         maxResultCount:this.maxResultCount,
         skipCount:this.skipCount
       }
       GetFeedbackListApi(feedlist).then(
         res=>{
           this.items=res.data.result.items
           for(let i=0;i<this.items.length;i++){
           this.items[i].creationTime=checkJs.creationTime(this.items[i].creationTime);

            if( res.data.result.items[i].status==0){
              res.data.result.items[i].status='处理中'
            }else if(res.data.result.items[i].status==1){
              res.data.result.items[i].status='已处理'
            }else{
              res.data.result.items[i].status='已关闭'
            }
           }
           
         },
         err=>{
           $.toast(err)
         }
       )
     }
    }
  }
</script>
