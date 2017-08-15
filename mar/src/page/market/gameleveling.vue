<template>
    <div class='gameleveling accountdeal marginTop'>
      <!--头部-->
      <header class="bar bar-nav">
      <router-link :to='{path:"/routerview"}' v-if='this.$store.state.global.judge'  class="icon icon-left pull-left"></router-link>
      <h1 class="title">炉石传说代练市场</h1>
      </header>

     <div class='transations-header'>
        <div class="buttons-tab">
          <a href="#tab1" class="tab-link active  button">我要接单</a>
          <a href="#tab2" class="tab-link  button">需要代练</a>
        </div>
     </div>


      <div class="tabs">
          <div id="tab1" class="tab active">
            <div class="content-block">
          <!--筛选--> 
              <ul class='clearfix transations-filtrate'>
                <li>
                 <select >
                      <option value="" selected>全部游戏</option>
                      <option value="">炉石传说</option>
                  </select>
                </li>
                <li>
                  <select >
                      <option value="" selected>全部时间</option>
                      <option value="">一周内</option>
                      <option value="">3天内</option>
                    </select>
                </li>
                <li>
                  <select >
                    <option value="" selected>全部交易</option>
                    <option value="">已接单</option>
                    <option value="">未接单</option>
                  </select>
                </li>
                <li>
                <select >
                  <option value="" selected>价格排序</option>
                  <option value="">从高到低</option>
                  <option value="">从低到高</option>
                </select>
                </li>
              </ul>
              <!--筛选end--> 
              <div class='table-header'> <p>代练详情</p><p>代练方式</p>价格</div>

               <div class='table-content'>
                <ul>
                  <router-link :to="{name:'accountdetails'}" tag='li'  v-for='index in 5' key='index'>
                    <div>
                      <img src="../../assets/img/gstar.png" alt="">
                      <strong>￥15555</strong>
                      <strong style='color:#55585F;'>优质代练</strong>
                      <span>[炉石传说]完了好久的好不玩了间</span>
                    </div>
                    <p><span>ios</span>操作时间：2017-04-03 14：49:14</p>
                  </router-link>
                </ul>
              </div>

            </div>
          </div>
          <div id="tab2" class="tab ">
            <div class="content-block">
               <h1>代练需求</h1>
                <textarea placeholder='请输入您的代练需求标签（小于50）'></textarea>
                <h1>代练内容</h1>
                <textarea placeholder='请具体表述您的代练需求（小于200）'></textarea>
                <h1>上传图片</h1>
                <p class='imgupload clearfix'>
                  <label ><input type="file" @change='onFileChange($event)'></label>
                    <span class='clearfix' v-for='(img,index) in images' >
                    <i @click='removeimg(index)'>x</i>
                      <img :src="img" >
                    </span>
                  </p>
                  <div class='timeOrmonery'>
                    <p>结束时间：<input type="text"id='picker'  placeholder='请输入代练时间'></p>
                    <p>价格：<input type="text" placeholder='请输入代练的金额'></p> 
                 </div>
                <router-link :to="{name:'needwhereas'}" tag='div'class='comfigbtn'><a href="">提交</a></router-link>
            </div>
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
        $("#picker").datetimePicker({
            value: ['2017', '4', '04', '9', '34']
          });
        },
    data () {
      return {
          images:[]
      }
    },
    components: {

    },
    methods: {
    onFileChange(e){
       if(this.images.length>=3){
         $.toast('最多上传3张图片')
         return;
       }
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files)
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
    },
    },
  }
</script>
