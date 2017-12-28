// pages/qrcode/qrcode.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ''
  },

  getImage: function() {
    var _this = this;
    wx.canvasToTempFilePath({
      destWidth: 380,
      destHeight: 700,
      canvasId: 'myCanvas',
      success: function (res) {
        _this.setData({
          url: res.tempFilePath
        })

        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.writePhotosAlbum']) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath
              })
            } else {

            }
          }
        })
      }
    })
  },
  loadImg: function(e) {
    console.log(e)
    const ctx = wx.createCanvasContext('myCanvas')

    ctx.drawImage("https://www.necol.cn/static/images/xcx/p_share.jpeg", 0, 0, 380, 700)
    ctx.drawImage("https://www.necol.cn/static/images/xcx/qrcode.png", 165, 325, 150, 150)
    ctx.setFontSize(30)
    ctx.fillStyle = "#b1b1b1";
    ctx.fillText(app.globalData.userInfo.nickName + '的公共钱包', 18, 80)
    ctx.save();
    ctx.arc(250, 400, 30, 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(app.globalData.userInfo.avatarUrl, 210, 370, 60, 60)
    ctx.restore()
    ctx.draw()
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
  
  }
})