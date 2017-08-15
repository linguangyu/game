<template>
 <div class="tool colorfff">
   <div class="frame">
     <div class="edges">
     <div  class="vertical t">
       <p>波 <br><span>天天打波利</span></p>
     </div>
       <div  class="vertical b iconfont">
         <router-link :to="{path:'/market/'}" tag="p">&#xe604; <br><span>返回首页</span></router-link>
       </div>
     <div class="across l iconfont">
       <p>&#xe634;<br><span>炉石传说<br>单卡查询</span></p>
     </div>
     <div class="across r iconfont">
       <p>&#xe634;<br><span>？？？？</span></p>
     </div>
       <router-link :to="{path: '/tools/DayByDay/'}" tag="div" class="model-top"></router-link>
       <router-link :to="{path: '/tools/HSCards/'}" tag="div" class="model-left"></router-link>
       <router-link :to="{path:'/market/'}" tag="div" class="model-bottom"></router-link>
     </div>
     <div class="elements">
           <div class="square square1 small "></div>
           <div class="square square2 big "></div>
           <div class="square square3 "></div>
           <div class="square square4 small "></div>
           <div class="square square5 "></div>
           <div class="square square6 big "></div>
           <div class="square square7 "></div>
           <div class="square square8 small "></div>
           <div class="circle circle1 small "></div>
           <div class="circle circle2 "></div>
           <div class="circle circle3 small "></div>
           <div class="circle circle4 big "></div>
           <div class="circle circle5 "></div>
           <div class="circle circle6 small "></div>
           <div class="circle circle7 "></div>
           <div class="circle circle8 small "></div>
     </div>
   </div>
 </div>
</template>
<style lang="scss">
  @import '../../assets/css/tool.scss';

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

    }
  }
</script>
