// pages/detail/detail.js
var wxCharts = require('../../utils/wxcharts.js');
var timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  draw: function() {
    // const ctx = wx.createCanvasContext('myCanvas')
    // var i = -0.5;
    // var count = 0.01;
   
    // timer = setInterval(function () {
      // if (i <= 1) {
        // ctx.beginPath()
        // ctx.arc(85, 65, 50, 1.4 * Math.PI, 1.5 * Math.PI)
        // ctx.setLineWidth(12)
        // ctx.setStrokeStyle('#ff856d')
        // ctx.stroke()
        // ctx.beginPath()
        // ctx.arc(85, 65, 50, 0, 1.4*Math.PI)                                                                                                                                                                                                                                                                        
        // ctx.setLineWidth(13)
        // ctx.setStrokeStyle('#32ccaa')
        // ctx.stroke()
        
        // ctx.draw()

        // ctx.beginPath()
        // ctx.arc(85, 65, 50, -0.5* Math.PI, 0)
        // ctx.setLineWidth(12)
        // ctx.setStrokeStyle('yellow')
        // ctx.stroke()
        // ctx.draw()
      // }
      // count = count * 1.05
      // i += count
    // }, 20)
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.draw();
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