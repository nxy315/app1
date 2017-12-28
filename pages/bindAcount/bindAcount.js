// pages/bindAcount/bindAcount.js
var app = getApp();
var Crypto = require('../../utils/cryptojs/cryptojs').Crypto;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    account: '',
    sending: false,
    second: 90,
    timer: null
  },

  inputPhone: function (e) {
    var value = e.detail.value;
    this.setData({
      account: value
    })
  },

  bindAccount: function () {

    var _this = this;

    if (!this.data.account) {
      app.wxToast({
        title: '账号不能为空',
        duration: 1000
      })
    } else {
      var token = wx.getStorageSync('token')
      var time = Date.parse(new Date()) / 1000;
      var key = Crypto.MD5(token + time);

      wx.request({
        method: 'post',
        url: app.globalData.dataUrl + '/thirdApi/Usercenter/SaveAliAccount',
        data: {
          token: token,
          key: key,
          time: time,
          account_name: _this.data.account
        },
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.status == 'success') {
            _this.setData({
              account: ''
            })
            //绑定成功
            app.wxToast({
              title: '绑定成功',
              duration: 1000
            })
            
            setTimeout(function() {
              wx.switchTab({
                url: '../center/center',
              })
            }, 1000)
          } else {
            app.wxToast({
              title: res.data.msg,
              duration: 1000
            })
          }
        },
        fail: function (err) {
          app.wxToast({
            title: err,
            duration: 1000
          })
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        id: options.id
      })
    }

    wx.setNavigationBarTitle({
      title: '绑定提现账号'
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