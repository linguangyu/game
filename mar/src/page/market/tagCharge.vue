<style>
.tagCharge .title{
    box-shadow: none;
    border-bottom: 1px solid #fff;
  }
  .addTagButton{
    color: #fff;
    font-size: 17px;
    position: relative;
    top: 7px;
    z-index: 20;
  }
  .tagChargeBlock {
    margin: 2.2rem 0;
    font-size: .85rem;
  }
  .tagChargeBlock ul li{
    padding:0.5rem;
    border-bottom:1px solid #fff;
  }
  .tagChargeBlock ul li div{
    text-align: center;
    overflow: hidden;
    color: #fff;
  }
</style>
<template>
  <div class='tagCharge'>
    <!--header-->
    <header class="bar bar-nav">
      <a  @click='$router.go(-1)'  v-if='this.$store.state.global.judge' class="icon icon-left pull-left"></a>
      <span class="pull-right addTagButton" @click="addNewTag">添加</span>
      <h1 class="title">TAG管理</h1>
    </header>
    <div class="tagChargeBlock">
      <ul>
        <li>
          <div class="df row">
            <div class="col-25">排序</div>
            <div class="col-25">游戏名称</div>
            <div class="col-25">角色昵称</div>
            <div class="col-25">操作</div>
          </div>
        </li>
        <li style="padding:10px 0" v-for="item in tagList">
          <div class="df row">
            <div class="col-25">{{item.id}}</div>
            <div class="col-25">炉石传说</div>
            <div class="col-25">{{item.userTag}}</div>
            <div class="col-25" @click="deleteTag(item.id)">删除</div>
          </div>
        </li>
        <div v-if="tagList.length == 0">暂时没有TAG</div>
      </ul>
    </div>
    </div>
  </template>

  <style lang="scss" scoped>
    @import '../../assets/css/market.scss';
  </style>

  <script charset="UTF-8">
    import * as api from '../../api/order'
    import * as checkJs from '../../assets/js/pubFunc'
    export default{
      computed:{

      },
      data () {
        return {
          tagList:[],
        }
      },
      components: {

      },
      methods: {
        deleteTag(value){
          let self = this;
          $.confirm('确定删除吗?',
            function () {
              api.DeleteTagApi({id:`${value}`}).then(
                res=>{
                  self.getUserTag()
                },
                err=>{
                  $.toast(err);
                }
              )
            },
          );
        },
        addNewTag(){
            let self = this;
            $.prompt('请填写TAG名字', '填入您游戏的id',
              function (value) {
                if (checkJs.isNullOrEmpty(value)) {
                  $.toast('TAG不能为空！')
                  return;
                }
                if(!(new RegExp(/\S+#[1-9][0-9]*/).test(value))){
                   $.toast('TAG格式错误!')
                  return;
                }
                api.CreateTagApi({userTag:`${value}`}).then(
                  res=>{
                    $.toast('创建成功！');
                    self.getUserTag()
                  },
                  err=>{
                    $.toast(err);
                  }
                )
              },
            );
        },
        getUserTag(){
          api.GetUserTagsApi().then(
            res=>{
              this.tagList = res.data.result.items
            },
            err=>{
              $.toast(err);
            }
          )
        }
      },
      mounted () {
        this.getUserTag()
      },
    }
  </script>
