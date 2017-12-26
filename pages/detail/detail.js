// pages/detail/detail.js
var wxCharts = require('../../utils/wxcharts.js');
var timer = null;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: '',
    rate: '',
    date: 30,
    day: '',
    userInfo: {},
    detailData: {},
    id: '',
    canvasSrc: '',
    green: '',
    red: '',
    gray: '',
    monthIndex: 0,
    monthArray: []
  },

  bindMonthPickerChange: function(e) {
    var _this = this;
    
    this.setData({
      monthIndex: e.detail.value
    })
    var green = parseInt(this.data.money);
    var red = parseInt(green * _this.data.rate/100 * _this.data.monthArray[_this.data.monthIndex] * _this.data.date);
    var gray = parseInt(green + red)
    this.setData({
      green: green,
      red: red,
      gray: gray,
      day: parseInt(_this.data.monthArray[_this.data.monthIndex] * _this.data.date)
    })
    this.drawCircle(green, red, gray)
  },

  blurMoney: function(e) {
    var value = e.detail.value
    if (value < this.data.start) {
      this.setData({
        money: this.data.start
      })
    } else if (value > this.data.end) {
      this.setData({
        money: this.data.end
      })
    } else {
      this.setData({
        money: value
      })
    }

    var green = parseInt(this.data.money);
    var red = parseInt((this.data.rate / 100 * value * this.data.day).toFixed());
    var gray = parseInt(green + red);
    this.setData({
      green: green,
      red: red,
      gray: gray
    })
    //先判断是不是在额度范围之内，如果小于范围取最小值，如果大于范围取最大值
    this.drawCircle(green, red, gray)
  },

  drawCircle: function(green, red, gray) {
    let windowWidth = 320;
    try {
      let res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      // do something when get system info failed
    }

    new wxCharts({
      canvasId: 'myCanvas',
      type: 'ring',
      title: {
        name: gray,
        color: '#999999',
        fontSize: 10
      },
      subtitle: {
        name: '总还款',
        color: '#999999',
        fontSize: 10
      },
      series: [{
        name: '1',
        data: green,
        color: '#32ccaa',
        stroke: false
      }, {
        name: '2',
        data: red,
        color: '#ff856d',
        stroke: false
      }],
      disablePieStroke: true,
      width: windowWidth / 2,
      height: windowWidth / 2,
      left: 0,
      top: 0,
      legend: false,
      dataLabel: false,
      extra: {
        ringWidth: windowWidth / 24,
        pie: {
          offsetAngle: -90,
        }
      }
    })
  },

  getKF: function() {
    var _this = this;
    
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            method: 'get',
            url: app.globalData.dataUrl + '/thirdApi/Message/SendMessage',
            data: {
              code: res.code,
              type: 1,
              id: _this.data.id
            },
            dataType: 'json',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  // getSrc: function() {
  //   var _this = this;
  //   wx.canvasToTempFilePath({
  //     x: 0,
  //     y: 0,
  //     width: 1000,
  //     height: 800,
  //     destWidth: 1000,
  //     destHeight: 800,
  //     fileType: 'png',
  //     canvasId: 'myCanvas',
  //     success: function (res) {
  //       console.log(res.tempFilePath)
  //       _this.setData({
  //         canvasSrc: res.tempFilePath
  //       })
  //     }
  //   })
  // },

  getData: function(id) {
    var _this = this;

    wx.request({
      method: 'post',
      url: app.globalData.dataUrl + '/thirdApi/index/LoanDetail', //仅为示例，并非真实的接口地址
      data: {
        id: id
      },
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if(res.data.status == 'success') {
          // _this.setData({
          //   green: res.data.data.start_money,
          //   red: '',
          //   gray: ''
          // })

          var arr = [];
          for (var index in res.data.data.select_arr) {
            arr.push(index/30)
          }
          var green = parseFloat(res.data.data.start_money)
          var red = parseFloat((res.data.data.rate / 100 * res.data.data.start_money * arr[0]).toFixed())
          var gray = parseFloat(red) + parseFloat(green)
          _this.setData({
            start: res.data.data.start_money,
            end: res.data.data.end_money,
            money: green,
            day: arr[0],
            rate: res.data.data.rate,
            detailData: res.data.data,
            monthArray: arr,
            green: green,
            red: red,
            gray: gray
          })
          _this.drawCircle(green, red, gray);
          
        }
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id: id
    })
    this.getData(id)
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