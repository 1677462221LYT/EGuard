let app = getApp();

//内网穿透工具介绍:
// https://open-doc.dingtalk.com/microapp/debug/ucof2g
//替换成开发者后台设置的安全域名
let domain = "http://localhost:3000";  //http://localhost:3000默认    192.168.43.250本机
let url = domain + '/login';

Page({
  data:{
    scaleToFill:"scaleToFill",

    // 轮播图
    logo_white: '/images/EGuard_white.png',
    swiper_bg_images:[
     {url:'/images/bg_001.jpg'} ,{url:'/images/bg_002.jpg'},{url:'/images/bg_003.jpg'}
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,

    // 管理员卡片
    user_icon:'/images/user_icon.jpg',
    mgn_id:'1550360033',
    mgn_name:'李园庭',
    dormitory_name:'中十',

    // 查寝签到按钮
    sign_in_btn:'/images/sign_in_green.png',
  },

  
  imageError: function (e) {
    console.log('image3 发生错误', e.detail.errMsg)
  },
  imageLoad: function (e) {
    console.log('image 加载成功', e);
  },


  onLoad(query) {
    // 页面加载
    // dd.showLoading();
    // console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    dd.getAuthCode({
            success:(res)=>{
                // dd.alert({content: 'AuthCode:'+res.authCode});
                console.log('authcode:'+res.authCode);
                // 向后台发送authcode请求进行身份验证
                dd.httpRequest({
                    url: url,
                    method: 'POST',
                    data: {
                        authCode: res.authCode
                    },
                    dataType: 'json',
                    success: (res) => {
                        console.log('success----',res);
                        let userId = res.data[0].userid;
                        let userName = res.data[0].name;
                        this.setData({
                            mgn_id : userId,
                            mgn_name : userName,
                        })
                    },
                    fail: (res) => {
                        console.log("httpRequestFail---",res)
                    },
                    complete: (res) => {
                        dd.hideLoading();
                    }
                    
                });
            },
            fail: (err)=>{
                // dd.alert({content: "step3"});
                dd.alert({content:"获取authcode失败"})
                dd.alert({content: JSON.stringify(err)})
                console.log('获取authcode失败');
            }
    });
  },
  onReady() {
    // 页面加载完成
    
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'EGuard',
      desc: 'Eye of The Guard',
      path: 'pages/component/index',
    };
  },

  navigateTo() {
    // alert('aaa');
    dd.navigateTo({ url: '../sign_in/sign_in' })
  },
});