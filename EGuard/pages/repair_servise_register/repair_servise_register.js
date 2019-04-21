Page({
  data: {},
  onLoad() {
    dd.scan({
      type: 'qr',
      success: (res) => {
        dd.alert({ title: res.code });
      },
    });
  },
  toScanPage() {
    // alert('aaa');
    dd.navigateTo({ url: '../dingtalk_scan/dingtalk_scan' })
  },
});
