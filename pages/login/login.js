// pages/login/login.js
var app = getApp();
const phoneReg = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|16[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$|19[0-9]{9}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    codeErr: true
  },

  getCode: function() {
    wx.request({
      method: 'post',
      url: app.globalData.dataUrl + '/thirdApi/index/SendSms',
      data: {
        phone: _this.data.phone
      },
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if(res.data.status == 'success') {
          
        }
      }
    })
  },

  inputPhone: function (e) {
    var value = e.detail.value;
    this.setData({
      phone: value
    })
    // console.log(value);
    if (phoneReg.test(value)) {
      this.setData({
        codeErr: false
      })
    } else {
      this.setData({
        codeErr: true
      })
    }
  },

  inputCode: function(e) {
    var value = e.detail.value;
    this.setData({
      code: value
    })
  },

  login: function() {
    var _this = this;
    wx.request({
      method: 'post',
      url: app.globalData.dataUrl + '/thirdApi/index/login',
      data: {
        loan_phone: _this.data.phone,
        code: _this.data.code
      },
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.status == 'success') {
          //登录成功
          localStorage.setItem('token', res.data.data.token);
        } else {
          //没有登录成功
          
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '绑定手机号'
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