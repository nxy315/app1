// pages/info/info.js
const phoneReg = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|16[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$|19[0-9]{9}$/;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    genderIndex: 0,
    typeIndex: 0,
    purposeIndex: 0,
    genderArray: ['请选择','男','女'],
    typeArray: ['请选择','信用贷款','房产贷款','汽车贷款','其他贷款'],
    purposeArray: ['请选择', '创业', '购房', '购车', '经营', '装修', '结婚', '旅游', '短期周转', '其他'],
    money: '',
    phone: '',
    correctPhone: false,
    code: '',
    sending: false,
    second: 90,
    timer: null
  },

  /* 选择性别 */
  /* ----------------------------------- */
  bindGenderPickerChange: function (e) { 
    this.setData({
      genderIndex: e.detail.value
    })
  },

  /* 选择贷款类型 */
  /* ----------------------------------- */
  bindTypePickerChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },

  /* 选择用途 */
  /* ----------------------------------- */
  bindPurposePickerChange: function(e) {
    this.setData({
      purposeIndex: e.detail.value
    })
  },

  /* 输入姓名并验证姓名是否复合规则 （2-4个汉字 */
  /* ----------------------------------- */
  getName: function (e) {
    var value = e.detail.value;
    this.setData({
      name: value
    })
  },

  /* 输入姓名并验证姓名是否复合规则 （2-4个汉字 */
  /* ----------------------------------- */
  getMoney: function (e) {
    var value = e.detail.value;
    this.setData({
      money: value
    })
  },

  /* 输入验证码 */
  /* ----------------------------------- */
  inputCode: function(e) {
    var value = e.detail.value;
    this.setData({
      code: value
    })
  },

  /* 输入手机号并实时验证手机是否正确 */
  /* ----------------------------------- */
  getPhone: function (e) {
    var value = e.detail.value;
    this.setData({
      phone: value
    })
    if (phoneReg.test(value)) {
      this.setData({
        correctPhone: true
      })
    } else {
      this.setData({
        correctPhone: false
      })
    }
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
      fail: function(err) {
        _this.clearTimer();
        app.wxToast({
          title: err,
          duration: 1000
        })
      }
    })
  },

  /* 提交表单 */
  /* ----------------------------------- */
  submitForm: function() {
    if(!this.data.name) {
      //请输入中文名称(2-4个汉字)
      app.wxToast({
        title: '请输入中文名称(2-4个汉字)',
        duration: 1000
      })
    } else if (this.data.genderIndex === 0) {
      //请选择您的性别
      app.wxToast({
        title: '请选择您的性别',
        duration: 1000
      })
    } else if (this.data.typeIndex === 0) {
      //请选择您的贷款类型
      app.wxToast({
        title: '请选择您的贷款类型',
        duration: 1000
      })
    } else if (!this.data.money) {
      //请输入小鱼999.99(万元)的数字且小数点后最多两位
      app.wxToast({
        title: '请输入小于999.99(万元)的数字且小数点后最多两位',
        duration: 1000
      })
    } else if (this.data.purposeIndex === 0) {
      //请选择您的贷款用途
      app.wxToast({
        title: '请选择您的贷款用途',
        duration: 1000
      })
    } else if (!this.data.correctPhone) {
      //请输入正确格式的手机号
      app.wxToast({
        title: '请输入正确格式的手机号',
        duration: 1000
      })
    } else if(!this.data.code) {
      //请输入短信验证码
      app.wxToast({
        title: '请输入短信验证码',
        duration: 1000
      })
    } else {
      wx.request({
        method: 'post',
        url: app.globalData.dataUrl + '/thirdApi/index/AddSureLoan',
        data: {
          real_name: this.data.name,
          sex: this.data.genderIndex,
          loan_type: this.data.typeIndex,
          loan_money: this.data.money,
          loan_purpose: this.data.purposeIndex,
          loan_phone: this.data.phone,
          code: this.data.code
        },
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if(res.data.status == 'success') {
            app.wxToast({
              title: '信息提交成功',
              duration: 1000
            })
            setTimeout(function() {
              wx.switchTab({
                url: '../home/home',
              })
            }, 2000)
          } else {
            app.wxToast({
              title: err,
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
    wx.setNavigationBarTitle({
      title: '借到钱'
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