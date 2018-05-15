// pages/jisuan/jisuan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id0:0,
    id1:1,
    id2:2,
    id3:3,
    id4:4,
    id5:5,
    id6:6,
    id7:7,
    id8:8,
    id9:9,
    ida:'+',
    idb:'-',
    idc:'*',
    idd:'/',
    clear:'clear',
    del:'del',
    zf:'一',
    dian:'.',
    deng:'=',
    screenData:0,
    isFuHao:false,
    arr:[],
    his:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  his:function(){
    wx.navigateTo({
      url: '../history/history',
    })
  },
  // 点击按钮函数
  clickBtn:function(e){
    // 接收用户输入的值
    var code = e.currentTarget.id;
    // 判断是否为退格键
    if(code == this.data.del){
      //对数据进行截取
      data = this.data.screenData;
      //判断最后一个字符是什么
      var lastWord = data[data.length - 1];
      if (lastWord == this.data.ida || lastWord == this.data.idb || lastWord == this.data.idc || lastWord == this.data.idd){
        this.setData({"isFuHao":false});
      }
      // 截取最后一个
      try{
        str = data.substring(0, data.length - 1);
        this.setData({ "screenData": str });
        this.data.arr.pop();
      }catch(e){
        console.log("错误原因："+e);
      }
    //判断清屏键
    }else if(code == this.data.clear){
      //数据清零
      this.setData({ "screenData": 0});
      //是符号
      this.setData({"isFuHao":false});
      this.data.arr=[];
    //判断正负号
    }else if(code == this.data.zf){
      var data = this.data.screenData;
      //获取第一个字母
      var firstWord = data[0];
      //判断如果是字符时返回true 否则为false
      if(isNaN(firstWord)){
        try {
          var str = data.substring(1, data.length);
          this.data.arr.shift();
        } catch (e) {
          console.log("错误原因：0没有正负之分" );
        }
      }else{
        var str = "一" + data;
        this.data.arr.unshift("一");
      }
      this.setData({"screenData":str});
    //判断等于号
    }else if(code == this.data.deng){
      //eval();
      var data = this.data.screenData;
      // arr = [1,2,3,4,"+",5,6,7];
      // newArr = [1234,"+",567];
      var newArr = [];
      var num = "";
      var arr = this.data.arr;
      for(var i in arr){
        if(isNaN(arr[i]) == false || arr[i] == this.data.dian){
          num+=arr[i];
        }else{
          newArr.push(num);
          newArr.push(arr[i]);
          num = "";
        }
      }
      newArr.push(num);
      
      var result=Number(newArr[0]);
      for(var i=1;i<=newArr.length;i++){
        if(newArr[i] == this.data.ida){
          result+=Number(newArr[i+1]);
        } else if (newArr[i] == this.data.idb){
          result -= Number(newArr[i + 1]);
        } else if (newArr[i] == this.data.idc) {
          result *= Number(newArr[i + 1]);
        } else if (newArr[i] == this.data.idd) {
          result /= Number(newArr[i + 1]);
        }
      }

      this.data.his.push(this.data.screenData + "=" + result);
      wx.setStorageSync('his', this.data.his);
      this.setData({ "screenData": result });
      this.data.arr=[];
      this.data.arr.push(result);

      
      console.log(newArr);
      console.log(result);
    }else{
      // 获取数据
      var data = this.data.screenData;

      //判断是不是符号
      if (code == this.data.ida || code == this.data.idb || code == this.data.idc || code == this.data.idd) {
        if (this.data.isFuHao == true) {
          return "";
        }
      }

      var str = null;
      // 判断是否为0
      if (data == 0) {
        str = code;
      } else {
        str = data + code;
      }

      //当不是符号键时将符号键设置问false
      this.setData({ "isFuHao": false });

      //判断是不是符号
      if (code == this.data.ida || code == this.data.idb || code == this.data.idc || code == this.data.idd) {
        this.setData({ "isFuHao": true });
      }

      //设置数据
      this.data.arr.push(code);
      this.setData({ screenData: str });
    }
    console.log(this.data.arr);
    console.log(this.data.his);
  }
})