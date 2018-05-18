var app = getApp();
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
  onLoad: function () {
    var that = this;
    // api接口获取用户名和密码
    /**
     * [
        {
          id: "1",
          username: "张三",
          password: "admin"
          },
          {
          id: "5",
          username: "王五",
          password: "12984"
          },
          {
          id: "6",
          username: "donglianyou",
          password: "admin"
          }
        ]
     * 
     */
    wx.request({
      url: 'http://localhost/api',
      data:{},
      method:'GET',
      dataType:'json',
      success:function(res){
        // 设置数据
        that.setData({
          user:res.data
        })
      }
    })
  },
  // 删除数据
  deleteData:function(e){
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: 'http://localhost/api/delete.php',
      data: {
        id:id
      },
      method:"POST",
      header: {
        "content-type":'application/x-www-form-urlencoded'
      },
      success: function(res){
        // 判断数据是否删除成功
        if(res.data==1){
          // 页面跳转
          wx.navigateTo({
            url: '../index/index',
          })
        }
      }
    })
  },
  // 修改数据
  editData:function(e){
    var id = e.currentTarget.dataset.id;
    // 跳转修改页面
    wx.navigateTo({
      url: '../edit/edit?id='+id,
      success:function(res){
        
      }
    })
  }
})