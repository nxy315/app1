// pages/adv/adv.js
const phoneReg = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|16[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$|19[0-9]{9}$/;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer: null,
    sending: false,
    second: 90,
    name: '',
    city: '',
    phone: '',
    code: ''
  },

  getName: function (e) {
    var value = e.detail.value;
    this.setData({
      name: value
    })
  },
  getCity: function (e) {
    var value = e.detail.value;
    this.setData({
      city: value
    })
  },
  getPhone: function (e) {
    var value = e.detail.value;
    this.setData({
      phone: value
    })
  },
  inputCode: function (e) {
    var value = e.detail.value;
    this.setData({
      code: value
    })
  },
  /* 清除定时器 */
  clearTimer: function () {
    var _this = this;
    _this.setData({
      sending: false,
      second: 90
    })
    clearInterval(_this.data.timer)
  },

  /* 获取验证码 */
  getCode: function () {
    var _this = this;
    
    if (!this.data.phone || !phoneReg.test(_this.data.phone)) {
      app.wxToast({
        title: '请输入正确的联系方式',
        duration: 1000
      })
    } else {
      var sd = 90;
      this.setData({
        sending: true
      })
      this.data.timer = setInterval(function () {
        sd--;
        if (sd <= 0) {
          _this.setData({
            sending: false,
            second: 90
          })
          clearInterval(_this.data.timer)
        } else {
          _this.setData({
            second: sd
          })
        }
      }, 1000)

      wx.request({
        method: 'post',
        url: app.globalData.dataUrl + '/thirdApi/index/SendSms',
        data: {
          phone: this.data.phone
        },
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.status == 'success') {

          } else {
            _this.clearTimer();
            app.wxToast({
              title: res.data.msg,
              duration: 1000
            })
          }
        },
        fail: function (err) {
          _this.clearTimer();
          app.wxToast({
            title: err,
            duration: 1000
          })
        }
      })
    } 
  },

  submit: function() {
    var _this = this;

    if(!this.data.name) {
      app.wxToast({
        title: '请输入姓名',
        duration: 1000
      })
    } else if (!this.data.city) {
      app.wxToast({
        title: '请输入城市',
        duration: 1000
      })
    } else if (!this.data.phone || !phoneReg.test(_this.data.phone)) {
      app.wxToast({
        title: '请输入正确的联系方式',
        duration: 1000
      })
    } else if (!this.data.code)  {
      app.wxToast({
        title: '请输入验证码',
        duration: 1000
      })
    } else {
      wx.request({
        method: 'post',
        url: app.globalData.dataUrl + '/thirdApi/Index/CarLoanReg',
        data: {
          real_name: _this.data.name,
          city: _this.data.city,
          code: _this.data.code,
          loan_phone: _this.data.phone
        },
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.status == 'success') {
            _this.setData({
              name: '',
              city: '',
              phone: '',
              code: ''
            })
            app.wxToast({
              title: '提交成功',
              duration: 1000
            })

            setTimeout(function() {
              wx.switchTab({
                url: '../home/home',
              })
            }, 1000)
          } else {
            _this.clearTimer();
            app.wxToast({
              title: res.data.msg,
              duration: 1000
            })
          }
        },
        fail: function (err) {
          _this.clearTimer();
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