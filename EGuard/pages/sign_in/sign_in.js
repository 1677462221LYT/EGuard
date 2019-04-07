Page({
  data: {
    unsign_num:4,
    systemInfo:111
  },
  onLoad() {
    
   },
  onReady() {
    
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  userinfo() {
    // alert('aaa');
    dd.navigateTo({ url: '../user_info/user_info' })
  },
});
