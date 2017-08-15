<template>
  <div class="whole">

    <div class="content">
      <div class="buttons-tab">
        <a href="#tab1" class="tab-link active button">登入</a>
        <a href="#tab2" class="tab-link button">注册</a>
      </div>
      <div class="content-block">
        <div class="tabs">
          <!--登入-->
          <div id="tab1" class="tab active">
            <div class="content-block">
              <div class="login-form">
                <p><img class='head-logo' src="../../assets/img/loginimg.png" alt=""></p>
                <div class="user-name common-div">
                  <i class="iconfont">&#xe601;</i><input @focus='inputfocus($event)' type="text" name="username"
                                                         value="" placeholder="请输入您的手机号" v-model="mobile"/>
                </div>
                <div class="user-pasw common-div">
                  <i class="iconfont">&#xe7c6;</i><input @focus='inputfocus($event)' type="password" name="password"
                                                         value="" placeholder="请输入您的密码" v-model="password"/>
                </div>
                <span class='forget-btn'><router-link :to="{name: 'reset-password'}"
                                                      style='color:#fff;font-size:.8rem;'>忘记密码？</router-link></span>
                <div class="login-btn common-div" @click="gotoLogin">登录</div>
              </div>
              <div class='qqorweix' style="display: none">
                <h1><img src="../../assets/img/zhijiedengr.png" alt=""></h1>
                <div class='qqorweix-box clearfix'>
                  <dl>
                    <dt class='iconfont'> &#xe603;</dt>
                    <dd>微信</dd>
                  </dl>
                  <dl>
                    <dt class='iconfont'>&#xe607;</dt>
                    <dd>腾讯QQ</dd>
                  </dl>
                </div>
              </div>
              <div style="text-align: center; color:white; font-size: 16px;" @click="registration">跳过注册，进行试用</div>
            </div>
          </div>
          <!--登入-->
          <!--注册-->

          <div id="tab2" class="tab">
            <div class="content-block">
              <div class="whole marginTop">
                <div class="login-form">
                  <div class="user-name common-div">
                    <i class="iconfont">&#xe601;</i><input @focus='inputfocus($event)' type="text" name="username"
                                                           value="" placeholder="请输入您的手机号码" v-model="mobile"/>
                  </div>
                  <div class='user-code common-div'>
                    <span class="get-code" @click="getCode">获取验证码</span>
                  </div>
                  <div class="user-pasw common-div">
                    <i class="iconfont">&#xe608;</i><input @focus='inputfocus($event)' type="text" name="code" value=""
                                                           placeholder="请输入您的验证码" v-model="code"/>
                  </div>
                  <div class="user-pasw common-div">
                    <i class="iconfont">&#xe7c6;</i><input @focus='inputfocus($event)' type="password" name="password"
                                                           value="" placeholder="请输入您的密码" v-model="password"/>
                  </div>
                  <div class="forgets clearfix" @click='checkboxBtn()'>
                    <div class="piaochecked " :class='{on_check:active}'>
                      <input name="need_inv" type="checkbox" style="height:20px;width:20px;" class="radioclass input"
                             value="1">
                    </div>
                    已阅读并同意《K5game用户使用协议》
                  </div>
                  <div class="login-btn common-div" @click="gotoRegister">注册</div>
                </div>
              </div>
            </div>
          </div>
          <div class='forgets-model' v-if='hidden'>
            <header class="bar bar-nav">
              <a class="icon icon-left pull-left" @click='hiddenBtn()'></a>
            </header>
            <h1 style='text-align:center;'>K5电竞平台服务协议</h1>
            <p>本协议是您与K5电竞平台（网址：www.k5game.com）所有者（以下简称为K5电竞）之间就K5电竞平台服务等相关事宜所订立的契约。
              您在申请注册流程中点击同意本协议之前，应当认真阅读本协议。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与K5电竞达成一致，成为K5电竞平台“用户”。阅读本协议的过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。</p>
            <h1>一、用户资格</h1>
            <p>
              您确认，在您开始注册程序使用K5电竞平台服务前，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力。若您不具备前述与您行为相适应的民事行为能力，则您及您的监护人应依照法律规定承担因此而导致的一切后果。</p>
            <h1>二、账户说明</h1>
            <p> 当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，您可获得K5电竞平台账户并成为K5电竞平台用户。
              K5电竞平台只允许每位用户使用一个账户。若有证据证明或K5电竞有理由相信您存在不当注册或不当使用多个账户的情形，K5电竞可采取冻结或关闭账户、取消订单、拒绝提供服务等措施，若给K5电竞及相关方造成损失的，您还应承担赔偿责任。
              您应自行诚信向K5电竞平台提供注册资料（包括您的姓名及电子邮件地址、联系电话、联系地址等），您确认您所提供的注册资料真实、准确、完整、合法有效，用户注册资料如有变动的，应及时更新其注册资料。如果您提供的注册资料不合法、不真实、不准确、不详尽的，您需承担因此引起的相应责任及后果，并且K5电竞保留终止用户使用K5电竞平台各项服务的权利，若由此造成的一切损失均由您自行承担。
              仅当有法律明文规定、司法裁定或经K5电竞同意，并符合K5电竞平台规则规定的用户账户转让流程的情况下，您可进行账户的转让。您的账户一经转让，该账户项下权利义务一并转移。除此外，您的账户不得以任何方式转让，否则K5电竞有权对您的账号进行冻结或关闭账号，由此产生的一切责任均由您自行承担。
              为使您更好地使用K5电竞平台的各项服务，保障您的账户安全，K5电竞平台可要求您按照平台规定完成实名认证。</p>
            <h1>三、账户安全规范</h1>
            <p>您的账户为您自行设置并由您保管，K5电竞任何时候均不会主动要求您提供您的账户密码。因此，建议您务必保管好您的账户，并确保您在每个上网时段结束时退出登录并以正确步骤离开K5电竞平台。
              账户因您主动泄露或因您遭受他人攻击、诈骗等行为导致的损失及后果，K5电竞平台并不承担责任，您应通过司法、行政等救济途径向侵权行为人追偿。
              除K5电竞平台存在过错外，您应对您账户项下的所有行为结果（包括但不限于在线签署各类协议、发布信息、购买商品及服务及披露信息等）负责。
              若发现任何未经授权使用您账户登录K5电竞平台或其他可能导致您账户遭窃、遗失的情况，建议您立即通知K5电竞平台要求暂停相关服务，并向公安机关报案。您理解K5电竞对您的任何请求采取行动均需要合理时间，且K5电竞应您请求而采取的行动可能无法避免或阻止侵害后果的形成或扩大，除K5电竞存在法定过错外，K5电竞不承担任何责任。</p>
            <h1> 四、商品及/或服务的购买与评价</h1>
            <p>
              当您在K5电竞平台购买商品及/或服务时，请您务必仔细确认所购商品的品名、价格、数量、型号、规格或服务的时间、内容、限制性要求等重要事项，并在下单时核实您的联系地址、电话、收货人等信息。如您填写的收货人非您本人，则该收货人的行为和意思表示产生的法律后果均由您承担。
              您的购买行为应当基于真实的消费需求，不得存在对商品及/或服务实施恶意购买、恶意维权等扰乱K5电竞平台正常交易秩序的行为。基于维护K5电竞平台交易秩序及交易安全的需要，若K5电竞发现上述情形时可主动执行关闭相关交易订单等操作。
              您有权在K5电竞平台提供的评价系统中对与您达成交易的其他用户商品及/或服务进行评价。您的评价内容应当客观真实，不应包含任何污言秽语、色情低俗、广告信息及法律法规与本协议列明的其他禁止性信息；您不应以不正当方式帮助他人提升信用或利用评价权利对其他用户实施威胁、敲诈勒索。若发现您的评价存在上述情况，K5电竞可对您的评价信息进行删除或屏蔽。</p>
            <h1>五、交易争议处理</h1>
            <p>您在K5电竞平台交易过程中与其他用户发生争议的，您或其他用户中任何一方均有权选择以下途径解决：
            <ul>
              <li>（一）与争议相对方自主协商；</li>
              <li>（二）请求消费者协会或者其他依法成立的调解组织调解；</li>
              <li>（三）向有关行政部门投诉；</li>
              <li>（四）根据与争议相对方达成的仲裁协议（如有）提请仲裁机构仲裁； </li>
              <li>（五）向人民法院提起诉讼。</li>
            </ul>
            </p>
            <h1>六、责任限制</h1>
            <p> K5电竞依照法律规定履行基础保障义务，但对于下述原因导致的合同履行障碍、履行瑕疵、履行延后或履行内容变更等情形，K5电竞并不承担相应的违约责任：
            <ul>
              <li>（一）因自然灾害、罢工、暴乱、战争、政府行为、司法行政命令等不可抗力因素；</li>
              <li>（二）因电力供应故障、通讯网络故障等公共服务因素或第三人因素；</li>
              <li>（三）在K5电竞平台已尽善意管理的情况下，因常规或紧急的设备与系统维护、设备与系统故障、网络信息与数据安全等因素。</li>
            </ul>
            K5电竞仅向您提供K5电竞平台服务，您了解K5电竞平台上的信息系用户自行发布，且可能存在风险和瑕疵。
            鉴于K5电竞平台具备存在海量信息及信息网络环境下信息与实物相分离的特点，K5电竞平台无法逐一审查商品及/或服务的信息，无法逐一审查交易所涉及的商品及/或服务的质量、安全以及合法性、真实性、准确性，对此您应谨慎判断。</p>
            <h1>七、用户信息的保护</h1>
            <p>
              K5电竞非常重视用户个人信息（即能够独立或与其他信息结合后识别用户身份的信息）的保护，在您使用K5电竞平台提供的服务时，涉及用户真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，K5电竞将予以严格保密，除非得到用户的授权或法律另有规定，K5电竞不会向外界披露用户隐私信息。</p>
            <h1>八、用户信息的合理使用</h1>
            <p>您同意K5电竞平台拥有通过邮件、短信、电话等形式，向您发送告知信息的权利。
              您了解并同意，K5电竞平台有权应国家司法、行政等主管部门的要求，向其提供您在本平台填写的注册信息和交易记录等必要信息。
              您同意本K5电竞平台有权使用用户的注册信息、用户名、密码等信息，登陆进入用户的注册账户，进行证据保全，包括但不限于公证、见证等。
              您声明并保证，您对您所发布的信息拥有相应、合法的权利。否则，K5电竞平台可对您发布的信息依法或依本协议进行删除或屏蔽。
            </p>
            <h1>九、禁止性信息</h1>
            <p>您应当确保您所发布的信息不包含以下内容，否则K5电竞平台有权对该信息进行删除：
            <ul>
              <li>（一）违反国家法律法规禁止性规定的；</li>
              <li>（二）政治宣传、封建迷信、淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</li>
              <li>（三）欺诈、虚假、不准确或存在误导性的；</li>
              <li>（四）侵犯他人知识产权或涉及第三方商业秘密及其他专有权利的；</li>
              <li>（五）侮辱、诽谤、恐吓、涉及他人隐私等侵害他人合法权益的；</li>
              <li>（六）存在可能破坏、篡改、删除、影响淘宝平台任何系统正常运行或    未经授权秘密获取K5电竞平台及其他用户的数据、个人资料的病毒、木马、爬虫等恶意软件、程序代码的；</li>
              <li>（七）其他违背社会公共利益或公共道德或依据相关K5电竞平台协议、规则的规定不适合在K5电竞平台上发布的。</li>
            </ul>
            </p>
            <h1>十、协议更新及用户关注义务</h1>
            <p>
              根据国家法律法规变化及网站运营需要，K5电竞有权对本协议条款不时地进行修改，修改后的协议一旦公布在K5电竞平台上即生效，并代替原来的协议，您可随时登录查阅最新协议。若您不同意更新后的协议，可以且应立即停止接受K5电竞平台依据本协议提供的服务；若您继续使用K5电竞平台提供的服务的，即视为同意更新后的协议。
              若本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。</p>
            <h1>十一、法律适用与管辖</h1>
            <p>本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。因本协议产生之争议，均应依照中华人民共和国法律予以处理，并由被告住所地人民法院管辖。</p>
            <h1>十二、免责条款</h1>
            <p>K5电竞平台仅提供信息对接，发生一切纠纷问题皆与本平台无关，请通过法律途径维护各自权益。</p>
          </div>
          <!--注册-->
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import './../../assets/css/personal.scss';
  @import './../../assets/css/iconfont.css';
</style>
<script charset="UTF-8">
  import * as api from '../../api/account'
  import * as checkJs from '../../assets/js/pubFunc'

  export default {
    computed: {
      mdpassword: function () {
        return checkJs.encryptedPassword(this.password)
      }
    },
    mounted() {
      console.log(this.$router);
    },
    data() {
      return {
        p: '',
        mobile: '',
        password: '',
        code: '',
        hint: {
          show: false,
          info: '正在加载中...'
        },
        isGetCode: false,
        getCoding: false,
        active: false,
        hidden: false
      }
    },
    components: {},
    methods: {
//      跳过注册
      registration() {
        this.$router.push({path: '/market/'})
      },
      checkboxBtn(e) {
        if (!this.active) {
          this.active = true;
          this.hidden = true
        } else {
          this.active = false;
        }
      },
      hiddenBtn() {
        this.hidden = false;
      },
      inputfocus(e) {
        $(e.target).parent().addClass('divfoucs').siblings().removeClass('divfoucs')
      },
      gotoLogin() {


        let self = this;
        if (!checkJs.isPhone(this.mobile)) {
          $.toast('请填写手机号');
          return;
        }
        if (checkJs.isNullOrEmpty(this.password)) {
          $.toast('请填写密码！');
          return;
        }
        let params = {
          tenancyName: '',
          usernameOrEmailAddress: this.mobile,
          password: this.mdpassword
        }
        api.userLoginApi(params).then(
          res => {
            api.GetCurrentLoginInformationsApi().then(
              res => {
                localStorage.setItem('user', res.data.result.user.id)
              },
              err => {
                $.toast(err);
              }
            );
            if (res.data.success == true) {
              const token = res.data.result;
              self.$store.dispatch('update_token', {
                token: res.data.result
              }).then(() => {
                checkJs.setCookie('token', token);
                dplus.track('登入', {name: '登入按钮'})//Dplus 修改密码
                if (!sessionStorage.getItem('router')) {
                  self.$router.push({path: '/market/'})
                  return;
                }
                self.$router.push({path: sessionStorage.getItem('router')})
              });
            } else {
              $.toast(res.data.error.details)
            }
          },
          err => {
            $.toast(err.response.data.error.details);
          }
        )
      },
      getCode() {
        if (!checkJs.isPhone(this.mobile)) {
          $.toast('请输入正确的手机号码!');
          return;
        }
        let self = this, stop;
        if (!self.getCoding) {
          self.getCoding = true;
          var gcode = document.querySelector('.get-code');
          var duringTime = 0, surplusTime = 60000;
          gcode.innerHTML = '(' + 60 + ")秒后重发";
          stop = setInterval(function () {
            surplusTime -= 1000;
            if (surplusTime >= 0) {
              gcode.innerHTML = '(' + surplusTime / 1000 + ")秒后重发"
            } else {
              clearInterval(stop)
              self.getCoding = false;
              gcode.innerHTML = "获取验证码"
            }
          }, 1000)
        } else {
          return;
        }
        self.hint.show = true;
        api.getRegisterCodeApi(`{"phoneNumber":"${self.mobile}"}`).then(
          res => {
            self.hint.show = false;
            if (res.data.success) {
              self.isGetCode = true;
              $.toast('验证码获取成功！')
            } else {
              $.toast('手机号已被注册')
            }
          },
          err => {
            $.toast(err.response.data.error.message);
            clearInterval(stop)
            self.getCoding = false;
            gcode.innerHTML = "获取验证码"
            self.hint.show = false;
          }
        )
      },
      gotoRegister() {
        if (localStorage.getItem('p')) {
          this.p = localStorage.getItem('p')
          console.log(this.p)
        }
        if (this.active) {
          $.toast('请先阅读K5用户使用手册')
          return;
        }
        if (!checkJs.isPhone(this.mobile)) {
          $.toast('请输入正确的手机号码！')
          return;
        }
        if (!this.isGetCode) {
          $.toast('请先获取验证码')
          return;
        }
        if (checkJs.isNullOrEmpty(this.code)) {
          $.toast('请填写验证码')
          return;
        }
        this.hint.show = true;


        let params = {
          phoneNumber: this.mobile,
          password: this.mdpassword,
          confirmationCode: this.code,
          inviteUserId: this.p
        }
        if (document.referrer && document.referrer.indexOf('id') > 0) {
          params.inviteUserId = document.referrer.slice(document.referrer.indexOf('=') + 1)
        }
        api.quickRegisterApi(params).then(
          res => {
            let self = this;
            this.hint.show = false;
            if (res.data.result.canLogin == true) {
              $.toast('恭喜你注册成功!')
              dplus.track('注册', {name: '注册按钮'})//Dplus 修改密码
              setTimeout(function () {
                self.gotoLogin();
              }, 2000)
            } else {
              $.toast('注册失败~')
            }
          },
          err => {
            this.hint.show = false;
          }
        )
      }
    }
  }
</script>
