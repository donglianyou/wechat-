// pages/down/down.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost/api/down.php',
      data:{},
      method:"GET",
      success:function(res){
        that.setData({
          imgs:res.data
        })
      }
    })
  },
  // 下载
  xiazai:function(res){
    var urls = res.currentTarget.dataset.src;
    wx.downloadFile({
      url:urls,
      success:function(res){
        if(res.statusCode ===200){
          wx.playVoice({
            filePath: res.tempFilePath,
          })
        }
      }
    })
    wx.saveImageToPhotosAlbum({
      success:function(res) {
        console.log(res);
      }
    })
  }
})