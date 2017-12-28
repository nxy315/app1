// pages/bindAcount/bindAcount.js
var app = getApp();
var Crypto = require('../../utils/cryptojs/cryptojs').Crypto;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    money: '',
  },

  inputMoney: function (e) {
    var value = e.detail.value;
    this.setData({
      money: value
    })
  },

  getMoney: function () {

    var _this = this;

    console.log(!isNaN(this.data.money));
    if (isNaN(this.data.money)) {
      app.wxToast({
        title: '请输入正确金额',
        duration: 1000
      })
    } else if (this.data.money < 30) {
      app.wxToast({
        title: '最低提现金额为30元',
        duration: 1000
      })
    } else {
      var token = wx.getStorageSync('token')
      var time = Date.parse(new Date()) / 1000;
      var key = Crypto.MD5(token + time);

      wx.request({
        method: 'post',
        url: app.globalData.dataUrl + '/thirdApi/Usercenter/UserWithdrawals',
        data: {
          token: token,
          key: key,
          time: time,
          money: _this.data.money
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
              title: '申请已提交，1-3个工作日到账',
              duration: 1000
            })

            setTimeout(function () {
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
      title: '提现'
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