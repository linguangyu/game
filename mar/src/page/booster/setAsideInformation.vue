<template>
  <div class="setAsideInformation" v-show="boxHidden" ref="information" @click.self="hideLayer" @touchmove.prevent>
    <div class="setAsideInformation_all">
      <div class="setAsideInformation_top" v-show="sFirest">
        <p class="setAsideInformation_title">输入手机号/微信号</p>
        <div class="inputAll_one">
          <input type="text" class="form_input" v-model="cellphoneNumber">
        </div>
        <p class="Annotations">注:留下联系方式 , 方便客服联系您 , 进行售后服务</p>
        <p class="information">联系客服</p>
        <div class="setAsideInformation_information">
          <img src="./imgaes/kefutouxian.png" alt="">
          <p>客服QQ:<span>{{message}}</span></p>
          <p class="setAsideInformation_information_fz"
             v-clipboard:copy="message"
             v-clipboard:success="onCopy"
             v-clipboard:error="onError">复制</p>
        </div>
      </div>
      <div class="setAsideInformation_show" v-show="sSecond">
        <div class="setAsideInformation_show_title">
          <p class="sst_title">是否预留游戏账号密码:</p>
          <div class="sst_danxuan">
            <div class="Option_left" @click="zshowInput">
              <input type="radio" id="radio1" name="haha" ref="OptionLeft" checked/>
              <p></p>
              <label for="radio1">是</label>
            </div>
            <div class="Option_right" @click="hideInput">
              <input type="radio" id="radio2" name="haha" ref="OptionRight"/>
              <p></p>
              <label for="radio2">否</label>
            </div>
          </div>
        </div>
        <div class="setAsideInformation_show_content" v-show="sInput">
          <div class="inputAll_one">
            <input type="text" class="form_input" v-model="gameAccount"
                   placeholder="请输入炉石传说游戏账号" onfocus="this.placeholder=''"
                   onblur="if (this.placeholder === '') {this.placeholder='请输入炉石传说游戏账号'}">
          </div>
          <div class="inputAll_one">
            <input type="text" class="form_input" v-model="gamePassword"
                   placeholder="请输入炉石传说游戏密码" onfocus="this.placeholder=''"
                   onblur="if (this.placeholder === '') {this.placeholder='请输入炉石传说游戏密码'}">
          </div>
          <div class="inputAll_one">
            <input type="text" class="form_input" v-model="SecurityLockPassword"
                   placeholder="请输入炉石传说游戏账号" onfocus="this.placeholder=''"
                   onblur="if (this.placeholder === '') {this.placeholder='请输入密保安全资料'}">
          </div>
        </div>
      </div>
      <div class="setAsideInformation_under">
        <div class="setAsideInformation_under_Dots">
          <span class="under_Dots" :class="{'under_Dots_L':statejudgment}"></span>
          <span class="under_Dots" :class="{'under_Dots_L':!statejudgment}"></span>
        </div>
        <div class="setAsideInformation_under_button" @click="nextStep" ref="underButton">
          下一步
        </div>
      </div>
    </div>
  </div>
</template>
<script charset="UTF-8">
  import * as api from '../../api/booster'


  export default {
    props: {
      ProductnNumber: {},
      ProductnPrice: {}
    },
    filters: {},
    data() {
      return {
        boxHidden: false,
        gameAccount: '',
        gamePassword: '',
        SecurityLockPassword: '',
        cellphoneNumber: '',
        message: 400865800,

//        输入手机号码
        sFirest: true,
//        是否预留信息
        sSecond: false,
//        预留信息的显示和隐藏
        sInput: true,
        //用于状态判断
        statejudgment: true,

      }
    },
    mounted() {
      this.getPersonalUser();
    },
    methods: {

      onCopy: function (e) {
        $.toast('复制成功');
      },
      onError: function (e) {
        $.toast('复制没有成功，请点击拷贝');
      },


      PopupLayer() {
        this.boxHidden = true
      },
//      退出
      hideLayer() {
        window.location.reload();
      },

      //下一步/确认
      nextStep() {
        if (this.statejudgment) {
          if (this.cellphoneNumber) {
            this.statejudgment = false;
            this.sFirest = false;
            this.sSecond = true;
            this.$refs.underButton.innerHTML = '确认'
            this.$refs.OptionLeft.checked = true
          } else {
            $.toast('请输入您的联系方式');
          }
        } else {
            this.sureToBuy()
        }


      },
      //      点击是的 显示input
      zshowInput() {
        this.sInput = true;
        this.$refs.OptionLeft.checked = true
      },

//      点击否的时候 隐藏input
      hideInput() {
        this.sInput = false
        this.$refs.OptionRight.checked = true
      },

//    传送用户填写的信息给后台生成订单
      sureToBuy() {
        if (this.$refs.OptionLeft.checked === true) {
          if (!this.gameAccount || !this.gamePassword || !this.SecurityLockPassword) {
            $.toast("请填写完整的信息，或者选择不预留信息");
            return false
          } else {
            api.UserDownOrder({
              productId: this.ProductnNumber,
              accountNum: this.gameAccount,
              accountPwd: this.gamePassword,
              safetyLock: this.SecurityLockPassword,
              phoneNum: this.cellphoneNumber
            }).then(
              res => {
                this.boxHidden = false;
                if (!this.ProductnPrice) {
                  $.toast('请稍等，客服会马上联系您');
                  setTimeout(function () {
                    window.location.reload();
                  }, 2000)
                } else {
                  this.$emit('Pay', res.data.result)
                }

              },
              err => {
                $.toast(err);
              }
            )
          }
        } else {
          api.UserDownOrder({
            productId: this.ProductnNumber,
            accountNum: this.gameAccount,
            accountPwd: this.gamePassword,
            safetyLock: this.SecurityLockPassword,
            phoneNum: this.cellphoneNumber
          }).then(
            res => {
              this.boxHidden = false;
              if (!this.ProductnPrice) {
                $.toast('请稍等，客服会马上联系您');
                setTimeout(function () {
                  window.location.reload();
                }, 2000)
              } else {
                this.$emit('Pay', res.data.result)
              }

            },
            err => {
              $.toast(err);
            }
          )

        }

      },
      //获取手机号码
      getPersonalUser() {
        api.GetCurrentLoginInformationsApi().then(
          res => {
            this.cellphoneNumber = res.data.result.user.phoneNumber
          },
          err => {
            $.toast(err);
          }
        )
      },


    }
  }
</script>
<style lang="scss" scoped>
  @import 'setAsideInformation';
</style>
