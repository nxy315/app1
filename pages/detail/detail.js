// pages/detail/detail.js
var wxCharts = require('../../utils/wxcharts.js');
var timer = null;
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    id: ''
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
        _this.setData({
          detailData: res.data.data
        })
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
        name: '500元',
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
        data: 1000,
        color: '#32ccaa',
        stroke: false
      }, {
        name: '2',
        data: 50,
        color: '#ff856d',
        stroke: false
      }],
      disablePieStroke: true,
      width: windowWidth/2,
      height: windowWidth / 2,
      left: 0,
      top: 0,
      legend: false,
      dataLabel: false,
      extra: {
        ringWidth: windowWidth/24,
        pie: {
          offsetAngle: -90,
        }
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