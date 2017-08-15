<template>
    <div class='neimg marginTops'>
      <!--头部-->
      <header class="bar bar-nav">
        <a  @click='$router.go(-1)'  v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></a>
         <h1 class="title">协商上传</h1>
      </header>

      <div class='neimg-contet'>
          <p>协商内容</p>
          <textarea v-model='neimgparams.content'>123</textarea>
      </div>

      <div class='neimg-screenshots clearfix'>
       <p>上传过程中的图片(最多上传三张图)</p>
         <label> <input type="file" @change='onFileChange($event)'> </label>
         <span v-for='(img,index) in images'>
           <i @click='removeimg(index)'>x</i>
           <img  :src="img" alt="">
         </span>
      </div>

      <div class='neimg-needArbitrate'>
        <p>申请客服介入: <input type="checkbox" v-model='neimgparams.needArbitrate' value='1'></p>
      </div>

      <div class='neimg-btn'>
        <a @click='comfigbtn()'>确认</a>
      </div>

    </div>
</template>

<style lang="scss" scoped>
    @import '../../assets/css/market.scss';
</style>

<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import { ConsultProblemApi  } from '../../api/order.js'
  export default{
    computed:{
    },
    mounted () {
        },
    data () {
      return {
        neimgparams:{
          content:'',
          depositOrderId:'',
          screenshots:[],
          needArbitrate:0,
        },
        images:[],
        file:[],
        img:[],

      }
    },
    components: {

    },
    methods: {
      comfigbtn(){
        for(let i=0;i<this.img.length;i++){
          if(this.img[i].type==0){
            this.img[i].type='游戏开始'
          }else if (this.img[i].type==1) {
            this.img[i].type='游戏中'
          }else{
            this.img[i].type='游戏结束'
          }
      }
        this.neimgparams.depositOrderId=this.$route.params.neimgId;
          this.neimgparams.screenshots=this.img;
         ConsultProblemApi(this.neimgparams).then(
          res=>{
           if(res.data.success){
             $.toast('上传成功')
             this.$store.dispatch('tabvalue','存入友谊赛')
             this.$router.back()
           }
          },err=>{
             $.toast('上传失败')
          }
        )
        
      },
      
      onFileChange(e){
        if(this.img.length==3){
            $.toast('最多上传3张图片')
            return;
          }
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.createImage(files)
        let formData=new FormData()
        formData.append('img',e.target.files[0]) 
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
                self.img.push({type:self.img.length,url:data.result.fileName})
            },
            error: function(xhr, type){
                console.log('Ajax error!')
            }
          })
     },
     createImage (file) {
      var self = this
      var reader = null
      var leng = file.length
      for (var i = 0; i < leng; i++) {
        reader = new window.FileReader()
        reader.readAsDataURL(file[i])
        reader.onload = function (e) {
          self.images.push(e.target.result)
        }
      }
     },
    removeimg(index){
       this.images.splice(index,1)
       this.img.splice(index,1)
     },
    },
  }
</script>
