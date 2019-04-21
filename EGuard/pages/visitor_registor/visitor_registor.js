let app = getApp();

let domain = "http://localhost:3000";  //http://localhost:3000默认    192.168.43.250本机
let url = domain + '/visitor';

Page({
  data: {
    registerImg:'/images/register.png',
    // 表单项
    v_name: '',
    v_tel: '',
    v_idcard: '',
    v_note: ''
  },
  onLoad() {
    // app.userId
    // app.dormitory_name
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let submit = e.detail.value;
    
    submit.admin_unionid = app.union_id;
    submit.department_id = app.dormitory_id;
    console.log(submit);
    // 向后台POST表单信息
    dd.httpRequest({
      url: url,
      method: 'POST',
      data: submit,
      dataType: 'json',
      success: (res) => {
        console.log('success----',res);
        dd.alert({content:res.data});
        // 提交成功后表单清空
        this.setData({
          v_name: '',
          v_tel: '',
          v_idcard: '',
          v_note: ''
        });
      },
      fail: (res) => {
        console.log("httpRequestFail---",res)
      },
      complete: (res) => {
        dd.hideLoading();
      }
    });
  },
  formReset: function() {
    console.log('form发生了reset事件');
    this.setData({
      v_name: '',
      v_tel: '',
      v_idcard: '',
      v_note: ''
    });
  }
});
