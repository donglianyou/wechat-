// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 数据提交
  tijiao:function(e){
    var datas = e.detail.value;
    // 发送请求
    wx.request({
      url: 'http://localhost/api/insert.php',
      data:{
        name:datas.name,
        pass:datas.pass
      },
      method:"POST",
      header:{
        "content-type": 'application/x-www-form-urlencoded'
      },
      success:function(res){
        if(res.data==1){
          wx.navigateTo({
            url: '../index/index'
          })
        }
      }
    })
  }
})