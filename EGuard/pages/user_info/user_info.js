Page({
  data: {
    userImg: "https://static.dingtalk.com/media/lADPDgQ9qQaa6s3NBInNAv8_767_1161.jpg",
    sexIcon: "/images/female.png"
  },
  onLoad(query) {
    let union_id = query.union_id;
    console.log(union_id);
  },
});
