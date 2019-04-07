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
});
