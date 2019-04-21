let app = getApp();

let domain = "http://localhost:3000";  //http://localhost:3000默认    192.168.43.250本机
let url = domain + '/sign_in';

Page({
  data: {
    cur_page: 1,
  },
  onLoad(query) {
    let date = new Date();
    let formatdate = date.getFullYear()+'年'+(date.getMonth()+1)+'月'+date.getDate()+'日  '+date.getHours()+':'+date.getMinutes();
    // 向后台发送GET请求
    dd.httpRequest({
      url: url+'?department_id='+query.department_id,
      method: 'GET',
      success: (res) => {
        console.log('success----',res);
        let total = res.data[1].total;
        let max_num = res.data[1].max_num;
        let totalpage = res.data[1].page;
        // 对数据进行分页展示(切割重组)
        let pages_data = [];
        for(let cur_page=1; cur_page<=totalpage; cur_page++){
          let cur_datalist = [];
          if(cur_page==totalpage){
            cur_datalist = res.data[0].slice((cur_page-1)*max_num);
          }
          else{
            cur_datalist = res.data[0].slice((cur_page-1)*max_num,cur_page*max_num);
          }
          let num = 0
          for(let i of cur_datalist){
            i.num = num;
            num++;
          }
          pages_data.push(cur_datalist);
        }
        this.setData({
          dormi_name: query.department_name,
          formatdate: formatdate,
          unsign_num: total,
          totalpage: totalpage,
          pages_data: pages_data,
          result: pages_data[0],
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
  onReady() {
    
  },
  bindTextAreaBlur: function(e) {
    // console.log(e.detail.value)
  },
  toPreviewPage(){
    let next_page = this.data.cur_page - 1;
    if(next_page >= 1){
      this.setData({
        cur_page: next_page,
        result: this.data.pages_data[next_page-1]
      });
    }
  },
  toNextPage(){
    let next_page = this.data.cur_page + 1;
    if(next_page <= this.data.totalpage){
      this.setData({
        cur_page: next_page,
        result: this.data.pages_data[next_page-1]
      });
    }
  },
  toFirstPage(){
    this.setData({
      cur_page: 1,
      result: this.data.pages_data[0]
    });
  },
  toLastPage(){
    this.setData({
      cur_page: this.data.totalpage,
      result: this.data.pages_data[this.data.totalpage-1]
    });
  },
  toSomePage(){
    console.log('page_num:'+page_num);
  },
  userinfo(e) {
    let item_num = e.currentTarget.dataset.num;
    let union_id = this.data.pages_data[this.data.cur_page-1][item_num].union_id;
    dd.navigateTo({ url: '../user_info/user_info?union_id='+union_id });
    // dd.navigateTo({ url: '../user_info/user_info'});
  },
});
