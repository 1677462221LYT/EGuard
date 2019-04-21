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
    // user_icon:'/images/user_icon.jpg',
    user_icon:'',
    mgn_id:'',
    mgn_name:'',
    dormitory_name:'',

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
    // dd.ui.pullToRefresh.disable();
    dd.getAuthCode({
            success:(res)=>{
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
                        app.userId = res.data.userid;
                        app.union_id = res.data.union_id;
                        let userName = res.data.name;
                        let user_icon = res.data.avatar;
                        app.dormitory_id = res.data.department_id;
                        app.dormitory_name = res.data.dormi_name;
                        this.setData({
                            mgn_id : app.userId,
                            mgn_name : userName,
                            user_icon : user_icon,
                            dormitory_name : app.dormitory_name
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
    dd.navigateTo({ url: '../sign_in/sign_in?department_id='+app.dormitory_id+'&department_name='+app.dormitory_name});
  },
});