<template>
 <div class="specific colorfff marginTop">
    <header class="bar bar-nav">
     <a class="icon icon-left pull-left"  v-if='this.$store.state.global.judge' @click='$router.go(-1)'></a>
      <h1 class="title">{{title}}</h1>
    </header>
    <div  class='specific-text'>
     <h1 id='gotop'>{{title}}</h1>
     <div   class='henxiang'></div>
     <h2 >{{header}}</h2>
     <p v-for='(item,index) in content'>
     <span>{{index+1}}</span><strong class='clearfix'>{{item.text}}</strong>
      <img :src="item.img" alt="">
     </p>
     <p class='instructions'>{{instructions=='1'?'':instructions}}
     <a v-if='instructions' href="#gotop">顶部</a>
     </p>
    </div>


 </div>
</template>
<style lang="scss" scoped>
@import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
import * as checkJs from '../../assets/js/pubFunc'
import { GetFaqApi } from '../../api/issue.js'
import specific from '../../assets/json/specific.js'
export default{
     computed:{

      },
    mounted () {
      this.getfaqdetails()
    },
    data () {
      return {
        specificId:'',
        title:'',
        content:'',
        header:'',
        creationTime:'',
         instructions:'',
        }
      },
    components: {

    },
    methods: {
        getfaqdetails(){
          // let newDate=new Date();
          this.specificId=this.$route.params.specificId
          // GetFaqApi({"id":`${this.specificId}`}).then(
          //   res=>{
          //     this.title=res.data.result.title;
          //     this.content=res.data.result.content;
          //     this.creationTime=res.data.result.creationTime;
          //     this.image=res.data.result.image;
          //     let interval=newDate-new Date(this.creationTime).getTime();
          //    let days=Math.floor(interval/(24*3600*1000)) //相差天数
          //    let hours=Math.floor(interval%(24*3600*1000)/(3600*1000)) //小时
          //    let minutes=Math.floor((interval%(24*3600*1000)%(3600*1000))/(60*1000))
          //   if(days==0&&hours==0){
          //      this.creationTime=minutes+'分钟之前';
          //   }else if(days==0&&hours!=0){
          //      this.creationTime=hours+'小时之前';
          //   }else{
          //     this.creationTime=days+'天之前';
          //   }
          //   },
          //   err=>{
          //     $.toast(err)
          //   }
          // )
          for(let i=0;i<specific.length;i++){
            if(specific[i].id==this.specificId){
              this.title=specific[i].title;
              this.content=specific[i].content;
              this.creationTime=checkJs.creationTime(specific[i].creationTime);
              this.instructions=specific[i].instructions;
              this.header=specific[i].header;
            }
          }
        }
    }
  }
</script>
