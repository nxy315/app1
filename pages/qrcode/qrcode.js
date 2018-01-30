// pages/qrcode/qrcode.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    urls: [],
  },
  previewImg: function() {
    var _this = this;
    wx.previewImage({
      urls: _this.data.urls
    })
  },

  getImage: function() {
    var _this = this;
    wx.canvasToTempFilePath({
      destWidth: 405,
      destHeight: 640,
      canvasId: 'myCanvas',
      quality: 1,
      success: function (res) {
        _this.setData({
          url: res.tempFilePath,
          urls: [res.tempFilePath]
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '分享到朋友圈'
    })
    var _this = this;
    wx.getImageInfo({
      src: app.globalData.userInfo.avatarUrl,
      success: function(res) {

        const ctx = wx.createCanvasContext('myCanvas')

        ctx.drawImage("../../images/p_share.jpeg", 0, 0, 380, 700)
        ctx.drawImage("../../images/qrcode.png", 165, 325, 150, 150)
        ctx.setFontSize(26)
        ctx.fillStyle = "#b1b1b1";
        ctx.fillText(app.globalData.userInfo.nickName + '的公共钱包', 18, 80)
        ctx.save();
        ctx.arc(240, 400, 30, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(res.path, 210, 370, 60, 60)
        ctx.restore()
        ctx.draw()
      }
    })
    
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