// pages/login/login.js
var app = getApp();
const phoneReg = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|16[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$|19[0-9]{9}$/;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    phone: '',
    code: '',
    codeErr: false,
    sending: false,
    second: 90,
    timer: null
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
  getCode: function() {
    var _this = this;
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
    console.log(1);
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
  },

  inputPhone: function (e) {
    var value = e.detail.value;
    this.setData({
      phone: value
    })
    // console.log(value);
    if (phoneReg.test(value)) {
      this.setData({
        codeErr: true
      })
    } else {
      this.setData({
        codeErr: false
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

    if (!this.data.phone) {
      app.wxToast({
        title: '请输入正确格式的手机号',
        duration: 1000
      })
    } else if(!this.data.code) {
      app.wxToast({
        title: '验证码不能为空',
        duration: 1000
      })
    } else {
      var channel_id = this.data.id ? '2' : '1'; 
      var invite_id = this.data.id
      wx.request({
        method: 'post',
        url: app.globalData.dataUrl + '/thirdApi/index/login?channel_id=' + channel_id + '&invite_id=' + invite_id,
        data: {
          loan_phone: _this.data.phone,
          code: _this.data.code,
        },
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.status == 'success') {
            if(!invite_id) {
              wx.removeStorageSync('from_id')
            }
            //登录成功
            app.wxToast({
              title: '登录成功',
              duration: 1000
            })

            wx.setStorage({
              key: 'token',
              data: res.data.data.token
            })

            setTimeout(function () {
              wx.switchTab({
                url: '../home/home',
              })
            }, 1000) 
          } else {
            //没有登录成功
            app.wxToast({
              title: res.data.msg,
              duration: 1000
            })
          }
        },
        fail: function(err) {
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
    var fromId = wx.getStorageSync('from_id');
    if (fromId) {
      this.setData({
        id: fromId
      })
    }
    
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