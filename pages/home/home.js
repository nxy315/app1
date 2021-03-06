// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    specialData: [],
    hotData: [],
    newData: []
  },

  //跳转广告
  toAdv: function() {
    wx.switchTab({
      url: '../adv/adv',
    })
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

    if (!app.globalData.list_id2) {
      wx.request({
        method: 'post',
        url: app.globalData.dataUrl + '/thirdApi/index/SpecialList', //仅为示例，并非真实的接口地址
        data: {},
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          if(res.data.status == 'success') {
            app.globalData.id2_list = res.data.data
            if (id != "6") {
              app.globalData.list_id1 = id;
              app.globalData.list_id2 = res.data.data[0].id;              
              wx.switchTab({
                url: '../list/list',
              })
            } else {
              wx.switchTab({
                url: '../info/info',
              })
            }
          }
        }
      })
    } else {
      if (id != "6") {
        app.globalData.list_id1 = id;
        app.globalData.list_id2 = app.globalData.id2_list[0].id;
        wx.switchTab({
          url: '../list/list',
        })
      } else {
        wx.switchTab({
          url: '../info/info',
        })
      }
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
    if(options.id) {
      wx.setStorageSync('from_id', options.id)
    }
    var _this = this;
    wx.request({
      method: 'post',
      url: app.globalData.dataUrl + '/thirdApi/index/index',
      data: {},
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        _this.setData({
          loading: false,
          specialData: res.data.data.special_list,
          hotData: res.data.data.hot_list,
          newData: res.data.data.new_list
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