/**
 * 判断字符串是否为空
 * @param  val
 */
export const isNullOrEmpty = (val) => {
  if(val === '' ||
	val === 0 ||
	val === null ||
	typeof(val) === 'undefined') {
	  return true;
  } else {
    if (typeof(val) === 'object' && (Object.keys(val).length === 0)) {
      return true;
    }
	  return false;
  }
}



export const oneDay = () => {
  return 1000*60*60*24;
}

export const orderTimeout = () => {
  return 1000*60*20;
}


/**
 * 判断是否为合法手机号码
 * @param  val
 */
export const isPhone = (val) => {
	var mobileCheck=/^1[2|3|4|5|6|7|8|9]\d{9}$/;
	return mobileCheck.test(val)
}
//去左右空格;
export const trim = (s) => {
  return s.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * JS-MD5加密用户密码
 * @param  pwd
 */
export const encryptedPassword =(pwd) => {
  let md5 = require('js-md5');
  let pwdkey = md5(pwd);
  return pwdkey;
}
/**
 * 判断是否为微信openid
 * @param  val
 */
export const isOpenid = (val) => {
	console.log(val)
	if (isNullOrEmpty(val)) {
		console.log('null')
		return false;
	}
	if (typeof(val) == 'string' && val.length == 28) {
		return true;
	}
	return false;
}

/**
 * 判断是否为微信浏览器
 * @param  val
 */
export const isWeixinBrowser =() => {
  return /micromessenger/.test(navigator.userAgent.toLowerCase())
}


/************************* Cookie 相关 ***********************/
/**
 * 设置cookie
 * @param {string} [key] [键]
 * @param {string} [val] [值]
 */
export const setCookie =(key, val) => {
  let codeVal = escape(val);
  document.cookie = key + '=' + codeVal + ';path=/;';
}

/**
 * 设置cookie
 * @param {string} [key] [键]
 */
export const getCookie =(key) => {
  if (document.cookie.length>0){　　//先查询cookie是否为空，为空就return ""
	let start=document.cookie.indexOf(key + "=");　
　　if (start!=-1){ //存在
　　　start=start + key.length+1;
　　　let end=document.cookie.indexOf(";",start)
　　　if (end==-1) {
		end=document.cookie.length
	  }
　　　return unescape(document.cookie.substring(start,end))
　　}
　}
　return ""
}

/**
 * 从cookie中获取token，如果cookie不存在，则重新生成
 */
export const birthday2Age =(birthday) => {
  let year=birthday.getFullYear();
  let month=birthday.getMonth();
  let day=birthday.getDay();
  let today=new Date();
  let age=today.getFullYear()-year;
  if(today.getMonth()<month || (today.getMonth()==month && today.getDate()<day)){age--;}
  return age;
}

export const formatDate = (date,fmt) => { //author: meizz
  if (isNullOrEmpty(fmt)) {
    fmt = 'yyyy-MM-dd';
  }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 从cookie中获取token，如果cookie不存在，则重新生成
 */
export const getTokenFromCookie =(newToken) => {
  let md5 = require('js-md5');
  let key = md5('token');

  if (!isNullOrEmpty(newToken)) {
    setCookie(key,newToken);
    return newToken;
  }

  console.log('newToken:')
  console.log(newToken)


  let val = getCookie(key);
  console.log('val:[' + val + ']');
  if (isNullOrEmpty(val) || val == 'null') {
      console.log('jinlaile:[' + val + ']');
   var myDate=new Date();
   console.log('myDate:[' + myDate + ']');
   let _noncestr = myDate.toUTCString() + ' ' + (Math.random() * 100000000);
   console.log('_noncestr:[' + _noncestr + ']');
   let _val = md5(_noncestr);
   console.log('_val:[' + _val + ']');
   setCookie(key,_val);
   val = _val;
  }
  console.log('token:[' + val + ']');
  return val;
}


export const routerGo =(state) => {
  if (isNullOrEmpty(state) || state.indexOf('_register')) {
    router.go({name:'service'});
    return;
  }
  let _state = state.replace(/_/g, "/");
  router.go({path:_state});
}
// 删除cookie
 export const clearCookie=(name)=>{
    setCookie(name, "");
}
/**
 * 跳转到微信授权页面
 */
export const getAuthBaseUrl =(state) => {
  let token = getTokenFromCookie(null);
  console.log(state)

  let _state = state.replace(/\//g, "_");

  let url = '';
  if (!isWeixinBrowser() &&
  	process.env.NODE_ENV.isWxDebug == true
  	) {

		url = "https://localhost:8080/?#!/route/oridrwMMEkkyqHUFEc8hbPk0KwPc/randomtokenstrstr/" + _state + "/3306";
  } else {
  	url = process.env.NODE_ENV.apiUrl +
	process.env.NODE_ENV.verSion + 'weixin/oauth/base/' +
	_state + '/' + token;
  }
	return url;
}


/**
 * 微信预览图片
 */
export const initWxConfig =() =>{
  wxConfig.title = '';
  wxConfig.img='';
  wxConfig.desc='';
  wxConfig.link='';
  wxConfig.timeLineTitle='';
  wxConfig.status=true


  //朋友圈
  wx.onMenuShareTimeline({
    title: wxConfig.timeLineTitle? wxConfig.timeLineTitle : wxConfig.title, // 分享标题
    link: wxConfig.link, // 分享链接
    imgUrl: wxConfig.img, // 分享图标
    success: function () {
      // alert('share'); // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
  });

  wx.onMenuShareAppMessage({
    title: wxConfig.title, // 分享标题
    desc: wxConfig.desc, // 分享描述
    link: wxConfig.link, // 分享链接
    imgUrl: wxConfig.img, // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
       // 用户确认分享后执行的回调函数
    },
    cancel: function () {
        // 用户取消分享后执行的回调函数
    }
  });
}


/**
 * 微信预览图片
 */
export const wxPreview =(url, urls) =>{
  urls=urls.split(",");
  wx.previewImage({
    current: url, // 当前显示的图片链接
    urls:urls // 需要预览的图片链接列表
   });
}

/**
 * 去主页
 */
export const gohome =(url, urls) =>{
  router.go({name:'service'})
}


/**
 * 获取图片地址
 */
export const getImgUrl =(url) =>{
  console.log(url)

  if (isNullOrEmpty(url)) {
    return ''
  }
  if (url.indexOf('http') != -1) {
    return url
  } else {
    if (url.indexOf('/') === 0 ) {
      return process.env.NODE_ENV.imgUrl + url
    } else if (url.indexOf('static') === 0 ) {
      return url
    } else {
      return process.env.NODE_ENV.imgUrl + '/' + url
    }
  }
}

/**
 * 时间判断
 */
export const creationTime=(time)=>{
            let newDate=new Date().getTime();
            let interval=newDate-new Date(time).getTime();
            let days=Math.floor(interval/(24*3600*1000)) //相差天数
            let hours=Math.floor(interval%(24*3600*1000)/(3600*1000)) //小时
            let minutes=Math.floor((interval%(24*3600*1000)%(3600*1000))/(60*1000))
            if(days==0&&hours==0){
              return time=minutes+'分钟之前';
            }else if(days==0&&hours!=0){
              return time=hours+'小时之前';
            }else{
              return time=days+'天之前';
            }

}
// 判断是安卓系统还是ios系统

export const judgeandroidorios=()=>{
  if(navigator.userAgent.toLowerCase().indexOf('k5game') > -1){
    return false;
  }else{
    return true;
  }
}

export const IsWebIos=()=>{
  if(navigator.userAgent.toLowerCase().indexOf('applewebkit') > -1){
    return true;
  }else{
    return false;
  }
}


