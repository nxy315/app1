// pages/center/center.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  openSettion: function() {
    // wx.openSetting({
    //   success: function(data) {}
    // })
  },
  getSetting: function() {
    wx.openSetting({})
  },
  showAction: function() {
    wx.makePhoneCall({
      phoneNumber: '13938012302'
    })   
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人中心'
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
    console.log(app.globalData.userInfo)

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
              //   this.userInfoReadyCallback(res)
              // }
            }
          })
        } else {
          app.globalData.userInfo = null;
          this.setData({
            userInfo: null,
            hasUserInfo: false
          })
        }
      }
    })
    // if (app.globalData.userInfo) {
    //   console.log(1);
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // }  else {
    //   console.log(3);
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   // wx.getUserInfo({
    //     // success: res => {
    //       app.globalData.userInfo = null
    //       this.setData({
    //         userInfo: null,
    //         hasUserInfo: false
    //       })
    //     // }
    //   // })
    // }
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