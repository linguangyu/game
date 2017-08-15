import * as checkJs from '../../assets/js/pubFunc'

const state = {
  ajax_loading: false,
  userinfo: '',
  token: checkJs.getCookie('token') || {},
  tabvalue: '提取友谊赛',
  status: '已取消',
  judge: checkJs.judgeandroidorios(),
  recharge: checkJs.IsWebIos(),
  blankPage: false,
  CustomerService: false,
  footerhide: true,

}

export default state
