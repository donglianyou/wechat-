//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    images:[]
  },
  // 选择图片
  changeImage:function(e){
    var that = this;
    wx.chooseImage({
      // 设置上次个数
      count:4,
      // 选择图片成功，获取上传的图片
      success: function(res) {
        console.log(res.tempFilePaths);
        // 设置数据
        that.setData({
          images:res.tempFilePaths
        })
      },
    })
  },
  // 删除图片
  delImage:function(res){
    // 要删除的图片编号
    var codes = res.currentTarget.dataset.code;
    // 删除数组中的数据
    var images = this.data.images;
    var newImage = [];
    for(var i=0;i<images.length;i++){
      if(i!==codes){
        newImage[newImage.length] = images[i];
      }
    }
    this.setData({
      images:newImage
    })
    console.log(images);
  },
  // 预览图片
  looks:function(res){
    // 预览图片的编号
    var codes = res.currentTarget.dataset.code;
    // 预览图片
    wx.previewImage({
      current: this.data.images[codes],
      urls: this.data.images,
    })
  },
  // 文件上传
  shangchuan:function(){
    // 获取要上传的文件
    var that = this;
    var fileArr = this.data.images;
    if(fileArr){
      wx.uploadFile({
        url: 'http://localhost/api/upload.php',
        filePath: fileArr[0],
        name: 'file',
        header: {},  //HTTP 请求 Header, header 中不能设置 Referer
        formData: {},  //HTTP 请求中其他额外的 form data
        success: function (res) {
          fileArr.shift();
          that.setData({
            images: fileArr
          })
          that.shangchuan();
        }
      }) 
    }   
  },
  onLoad: function () {
    
  }
})
