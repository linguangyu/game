<template>
 <div class="feedback  marginTop colorfff">
    <header class="bar bar-nav">
    <a v-if='this.$store.state.global.judge' @click='$router.go(-1)' class="icon icon-left pull-left"></a>
      <h1 class="title">意见反馈</h1>
    </header>
    <div class='feedback-box'>
      <!--问题和意见-->
      <textarea placeholder='请填写您的宝贵建议...' v-model='createFeedback.content' ></textarea>
      <p style='padding:6px 0;text-align:right;color:#acacac;font-size:.6rem;'>{{createFeedback.content.length}}/150字</p>

      <!--上传图片-->
        <p class='imgupload clearfix'>
            <label ><input type="file"  @change='onFileChange($event)'></label>
            <span class='clearfix' v-for='(img,index) in  imgs' >
            <i @click='removeimg(index)'>x</i>
              <img :src="img.url" >
            </span>
        </p>
        <h1 class='feedback-title'>提供问题截图（最多三张）</h1>
      <!--qq/邮箱-->
      <p class='lumaqq'><input type="text" placeholder='请输入您的联系方式 QQ/微信（选填）' v-model='createFeedback.contact'></p>
      <!--应用评价-->
      <div class='evaluate clearfix'>应用评价：
        <ul>
          <li v-for='index in 5' @click='evaluatebtn($event)'><img :src="star" alt=""></li>
        </ul>
       </div>
    </div>
    <a class='submitbtn' @click='submitsend()'>提交</a>
 </div>
</template>
<style lang="scss" scoped>
@import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
import * as checkJs from '../../assets/js/pubFunc'
import { CreateFeedbackApi } from '../../api/issue.js'
export default{
     computed:{

      },
    mounted () {
    },
    data () {
      return {
          star:require('../../assets/img/star.png'),
          gstar:require('../../assets/img/gstar.png'),
          selected:'',
          createFeedback:{
            content:'',
            contact:'',
            score:'',
            screenshots:[]
          },
          imgs:[]
        }
      },
    components: {

    },
    methods: {

      submitsend(){
        self=this;
         CreateFeedbackApi(this.createFeedback).then(
                  res=>{
                    if(res.data.success){
                      $.toast('反馈成功');
                      setTimeout(function(){
                      self.$router.push({path:'/routerview/center'})
                      },2000)
                    }
                  },err=>{
                    $.toast(err)
                  }
                )

      },
      onFileChange(e){

        if(this.createFeedback.screenshots.length>=3){
          $.toast('最多上传3张图片')
          return;
        }
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files);
          let formData=new FormData();

          formData.append('img',e.target.files[0]);
            self=this;
            $.ajax({
              type: 'POST',
              url: 'https://api.k5game.com/File/UploadPicture',
              data:formData,
              cache: false,
              context: $('body'),
              processData: false,  // 关键点
              contentType: false,  // 关键点
              success: function(data){
                self.createFeedback.screenshots.push({url:data.result.fileName});
              },
              error: function(xhr, type){
                  console.log('Ajax error!');
              }
            })
      },
      createImage (file) {
          console.log(file)
        var self = this;
        var reader = null;
        var leng = file.length;
        for (let i = 0; i < leng; i++) {
          reader = new window.FileReader();
          console.log(reader)
          reader.readAsDataURL(file[i]);
          reader.onload = function (e) {

            self.imgs.push({url:e.target.result})
          }
        }
      },

      removeimg(index){
        this.img.splice(index,1)
      },


      evaluatebtn(e){
        $(e.target).parent().children()[0].src=this.gstar;
        $(e.target).parent()[0].src=this.gstar;
        let li=$(e.target).parent().prevAll();
        let nextli=$(e.target).parent().nextAll();
        let nextlen=nextli.length;
        let len=li.length;


        for(var i=0;i<len;i++){
          $(li[i]).children()[0].src=this.gstar;
        }
        for(var i=0;i<nextlen;i++){
          $(nextli[i]).children()[0].src=this.star;
        }
          this.createFeedback.score=$(e.target).parent().index()
          this.createFeedback.score++
      },
      selectedchange(){
      this.createFeedback.content=this.createFeedback.content+this.selected;
      }
    }
  }
</script>
