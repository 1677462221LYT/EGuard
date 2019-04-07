App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    // console.info('App onLaunch');
    console.log('App Launch', options);
    console.log('getSystemInfoSync', dd.getSystemInfoSync());
    console.log('SDKVersion', dd.SDKVersion);
    this.globalData.corpId = options.query.corpId;
  },
  // onShow(options) {
  //   // 从后台被 scheme 重新打开
  //   // options.query == {number:1}
  // },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  globalData: {
    corpId:'ding0c7dafc2288ffe4a35c2f4657eb6378f'
  }
});
