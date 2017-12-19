// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  //跳转详情
  toDetail: function(e) {
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: "../detail/detail?id=" + id
    })
  },

  //跳转列表
  toList: function(e) {
    var id = e.currentTarget.dataset.id;

    if (id != "4") {
      app.globalData.listParams = id;
      wx.switchTab({
        url: '../list/list',
      })
    } else {
      wx.switchTab({
        url: '../info/info',
      })
    }
  },

  //跳转专题
  toTopic: function(e) {
    var topic_id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../topic/topic?id=' + topic_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://money.wavov.cn/thirdApi/index/index', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
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