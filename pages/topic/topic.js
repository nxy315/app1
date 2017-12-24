// pages/topic/topic.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    specialData: []
  },
  getTopic: function(id) {
    var _this = this;
    wx.request({
      method: 'post',
      url: app.globalData.dataUrl + '/thirdApi/index/LoanSpecialAllList', //仅为示例，并非真实的接口地址
      data: {
        cate_id: id
      },
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          detailData: res.data.data
        })
      }
    })
  },

  //跳转详情页
  toDetail: function (e) {
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: "../detail/detail?id=" + id
    })
  },

  //跳转专题
  toTopic: function (e) {
    var topic_id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../topic/topic?id=' + topic_id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    var _this = this;
    this.getTopic(id);

    wx.request({
      method: 'post',
      url: app.globalData.dataUrl + '/thirdApi/index/index', //仅为示例，并非真实的接口地址
      data: {},
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // 'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          specialData: res.data.data.special_list
        })
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