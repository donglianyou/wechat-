// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost/api/edit.php',
      data:{
        id:options.id,
      },
      method:"GET",
      header:{
        "content-type": 'application/x-www-form-urlencoded'
      },
      success:function(res){
        that.setData({
          user:res.data
        })
      }
    })
  },
  xiugai:function(e){
    var datas =e.detail.value;
    datas.id = this.data.user.id;
    wx.request({
      url: 'http://localhost/api/save.php',
      data:datas,
      method:'POST',
      header:{
        "content-type": 'application/x-www-form-urlencoded'
      },
      success:function(res){
        if(res.data==1){
          wx.navigateTo({
            url: '../index/index',
          })
        }
      }
    })
  }
})