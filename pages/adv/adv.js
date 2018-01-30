// pages/adv/adv.js
const phoneReg = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|16[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$|19[0-9]{9}$/;
var app = getApp();
var tcity = require("../../utils/citys.js");

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
    code: '',


    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false
  },

  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },



  getName: function (e) {
    var value = e.detail.value;
    this.setData({
      name: value
    })
  },
  // getCity: function (e) {
  //   var value = e.detail.value;
  //   this.setData({
  //     city: value
  //   })
  // },
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
          city: _this.data.province + _this.data.city + _this.data.county,
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
    console.log("onLoad");
    var that = this;

    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');
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