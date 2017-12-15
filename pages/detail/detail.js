// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  rander: function () {
    if (tmpAngle >= endAngle) {
      return;
    } else if (tmpAngle + xAngle > endAngle) {
      tmpAngle = endAngle;
    } else {
      tmpAngle += xAngle;
    }
    ctx.clearRect(0, 0, mW, mH);

    //画圈
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = '#1c86d1';
    ctx.arc(r, r, cR, startAngle, tmpAngle);
    ctx.stroke();
    ctx.closePath();
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
    var c = document.getElementById('myCanvas');
    var ctx = c.getContext('2d');

    var mW = c.width = 300;
    var mH = c.height = 300;
    var lineWidth = 5;
    var r = mW / 2; //中间位置
    var cR = r - 4 * lineWidth; //圆半径
    var startAngle = -(1 / 2 * Math.PI); //开始角度
    var endAngle = startAngle + 2 * Math.PI; //结束角度
    var xAngle = 1 * (Math.PI / 180); //偏移角度量
    var fontSize = 35; //字号大小
    var tmpAngle = startAngle; //临时角度变量

    //渲染函数
    
    this.rander();
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
  
  }
})