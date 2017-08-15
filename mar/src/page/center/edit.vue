<template>
  <div class="edit colorfff marginTop">
    <header class="bar bar-nav">
      <router-link v-if='this.$store.state.global.judge' :to="{ path: '/center'}" class="icon icon-left pull-left"></router-link>
      <h1 class="title">个人资料</h1>
    </header>

    <div class='edit-list'>
      <div class="list-block">
        <ul>
          <li class="item-content item-link">
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner">
              <div class="item-title">个人头像</div>
              <div class="item-after">
                <label><input type="file"  @change='onFileChange($event)'></label>
                <img :src="img" alt="">
              </div>
            </div>
          </li>
          <li class="item-content item-link">
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner"  @click.self='gotohiddenbox($event)'>
              <div class="item-title">昵称</div>
              <div class="item-after" >{{userdata.nickName}}  <span class="icon icon-right"></span></div>
            </div>
          </li>
          <li class="item-content item-link">
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner"  @click.self='gotohiddenbox($event)'>
              <div class="item-title">名字</div>
              <div class="item-after" >{{userdata.name}}  <span class="icon icon-right"></span></div>
            </div>
          </li>
          <li class="item-content item-link">
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner">
              <div class="item-title">电话</div>
              <div class="item-after">{{phoneNumber}}   <span class="icon icon-right"></span></div>
            </div>
          </li>
          <li class="item-content item-link" style='margin-top:15px;'>
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner">
              <div class="item-title">新消息提醒</div>
              <div class="checkbox">
                <input type="checkbox"/>
                <label></label>
              </div>
            </div>
          </li>
          <router-link @click.native='gotoResetPassword()' :to="{name:'reset-password'}" tag='li'class="item-content item-link">
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner">
              <div class="item-title">修改密码</div>
            </div>
          </router-link>
          <li class="item-content item-link" style='margin-top:15px;'>
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner"  @click='shareBtn()'>
              <div class="item-title">分享</div>
            </div>
          </li>
          <li class="item-content item-link">
            <div class="item-media"><i class="icon icon-f7"></i></div>
            <div class="item-inner">
              <div class="item-title">给K5竞技评分</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <button v-if='this.$store.state.global.judge'  class='edit-confirm' @click='quitbtn()'>退出登入</button>
    <!--修改的隐藏框-->
    <div class='xiugai-box' v-if='hidden' @click.self='hiddenBtn()'>
      <div class='hidden-box' >
        <h1>修改{{judgename}}</h1>
        <p><input type="text" placeholder='请输入要修改的内容' v-model='userconten'></p>
        <div @click='editConfirm($event)'>保存</div>
      </div>
    </div>
    <!--分享使用的model-->
    <div class='share-model-box' v-show='sharehidden' @click='shareModelBox()'>
      <div class='share-model'  >
        <div id = "qrcodeid"></div>
        <p>分享二维码 获得k币</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '../../assets/css/center.scss';
</style>
<script charset="UTF-8">
  import * as checkJs from '../../assets/js/pubFunc'
  import { GetCurrentUserProfileForEditApi } from '../../api/account';//*** userLogin ***获取当前用户信息用于编辑
  import { UpdateCurrentUserProfile } from '../../api/account';//*** UpdateCurrentUserProfile ***更新用户当前信息
  import { UpdateProfilePictureApi } from '../../api/account';//*** UpdateProfilePictureApi ***更新用户当前头像
  import { GetCurrentLoginInformationsApi } from '../../api/account.js';
//  import * as qrcode from '../../../static/jquery.qrcode.min.js'
  import QRCode  from 'qrcodejs2'
  export default{
    computed:{

    },
    mounted () {
      this.getUserInfo()

    },
    data () {
      return {
        userdata:{
          nickName:'',
          name:'',
          surname:''
        },
        phoneNumber :'',
        userId:'',
        file:'',
        logo:{
          fileName:'',
          width: 250,
          height: 250,
        },
        img:'',
        hidden:false,
        userconten:'',
        judgename:'',
        sharehref:'',
        sharehidden:false
      }
    },
    components: {
    },
    methods: {
      gotoResetPassword(){
        dplus.track('修改密码',{name:'修改密码按钮'})//Dplus 修改密码
      },
      shareBtn(){//分享按钮
        this.sharehidden=true;
        this.sharehref='https://www.k5game.com?id='+this.userId;
        let canvas=document.getElementsByTagName("canvas");
        if(!canvas.length){
          new QRCode( 'qrcodeid', {
            width:200,
            height:200,
            correctLevel  :QRCode.CorrectLevel.H,//纠错等级
            colorDark : '#000000',
            colorLight : '#ffffff',
            text:this.sharehref
          });
        }




      },
      shareModelBox(){
        this.sharehidden=false;
      },
      hiddenBtn(){
        this.hidden=false;
      },
      gotohiddenbox(e){
        this.hidden=true;
        this.judgename=$(e.target).children('.item-title').text();
      },
      getUserInfo(){
        let self=this;
        //  获取用户编辑的信息
        GetCurrentUserProfileForEditApi().then(
          res=>{
            this.userdata.nickName=res.data.result.nickName;
            this.phoneNumber=res.data.result.phoneNumber;
            this.userdata.name=res.data.result.name;
            this.userdata.surname=res.data.result.surname;
          },
          err=>{
            $.toast(err);
          }
        );
        GetCurrentLoginInformationsApi().then(
          res=>{
            this.userId=res.data.result.user.id;
            this.img=res.data.result.user.profilePictureId?'https://api.k5game.com/Profile/GetProfilePictureById?id='+res.data.result.user.profilePictureId:'https://api.k5game.com/Profile/GetProfilePictureById';
            console.log(res.data.result)
          },
          err=>{
            $.toast(err);
          }
        );

      },
      editConfirm(e){
        if($(e.target).prev().prev().text()=='修改昵称'){
          this.userdata.nickName=this.userconten;

        }else{
          this.userdata.name=this.userconten;
        }
        var self=this;
        UpdateCurrentUserProfile(this.userdata).then(
          res=>{
            if (res.data.success) {
              let self=this
              dplus.track('用户名修改',{name:'用户名修改按钮'})//Dplus 个人头像上传
              setTimeout(function(){
                self.getUserInfo()
              },2000)
            } else {
              $.toast('修改失败~')
            }
          },
          err=>{
            $.toast(err)
          }
        );
        this.hidden=false;
      },
      onFileChange(e){
        console.log(e.target.files[0])
        this.file=e.target.files[0];
        console.log(this.file);
        if(e.target.files[0].size/1024>=100){
          $.toast('上传图片不可以大于1M')
          return;
        }
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.createImage(files)
        let formData=new FormData();
        formData.append('logo',this.file)
        console.log(formData)
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
            self.logo.fileName=data.result.fileName;
            self.logo.width=data.result.width;
            self.logo.height=data.result.height;
            UpdateProfilePictureApi(self.logo).then(
              res=>{
                if(res.data.success){
                  dplus.track('个人头像',{name:'个人头像上传'})//Dplus 个人头像上传
                  $.toast('修改成功')
                }
              },err=>{
                $.toast(err.response.data.error.message)
              }
            )
          },
          error: function(xhr, type){
          }
        })

      },
      createImage (file) {
        var self = this
        var reader = null
        reader = new window.FileReader()
        reader.readAsDataURL(file[0])
        reader.onload = function (e) {
          self.img=e.target.result;
        }
      },
      quitbtn(){
        localStorage.removeItem('p');
        localStorage.removeItem('user');
        checkJs.clearCookie('token');
        dplus.track('退出登入',{name:'退出登入按钮'})//Dplus 退出登入按钮
        this.$router.push({path: '/login/'})
      }
    }
  }
</script>
