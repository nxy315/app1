// pages/list/list.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filter: ['额度不限', '资料不限', '期限不限'],
    filterIndex: -1,
    quotaIndex: 0,
    quotaData: [{ title: '额度不限', id: 1 }, { title: '1~5千', id: 2 }, { title: '5千~1万', id: 3 }, { title: '1~5万', id: 4 }, { title: '5万以上', id: 5 }],
    fileData: [{ title: '资料不限', id: 1 }, { title: '我有身份证', id: 2 }, { title: '我有信用卡', id: 3 }, { title: '我有网购账号', id: 4 }, { title: '我有支付宝账号', id: 5 }, { title: '我有认证手机号', id: 6 }],
    termData: [{ title: '期限不限', id: 1 }, { title: '1~6个月', id: 2 }, { title: '6~12个月', id: 3 }, { title: '12个月以上', id: 4 }],
    fileIndex: 0,
    termIndex: 0,
    listData: [],
    total: 0,
    start: 1,
    length: 6,
    money_cate: 2,
    material_cate: 1,
    date_cate: 1
  },

  /* 获取列表数据 */
  getList: function() {
    wx.showNavigationBarLoading()
    
    var _this = this;
    wx.request({
      method: 'post',
      url: app.globalData.dataUrl + '/thirdApi/index/SuperMarket', //仅为示例，并非真实的接口地址
      data: {
        start: this.data.start,
        length: this.data.length,
        // money_cate: this.data.money_cate,
        // material_cate: this.data.material_cate,
        // date_cate: this.data.date_cate,
      },
      // dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();        
        _this.setData({
          listData: _this.data.listData.concat(res.data.data.list),
          total: res.data.data.total
        })
      }
    })
  },

  /* 筛选点击事件 */
  tapFilter: function(e) {
    var index = e.currentTarget.dataset.index;
    if(this.data.filterIndex == index) {
      this.setData({
        filterIndex: -1
      })
    } else {
      this.setData({
        filterIndex: index
      })
    }
  },

  /* 选择额度 */
  chooseQuota: function (e) {
    var index = e.currentTarget.dataset.index;
    var title = e.currentTarget.dataset.title;
    this.data.filter.splice(0, 1, title)

    app.globalData.listParams = index;
    this.setData({
      quotaIndex: index,
      filter: this.data.filter,
      filterIndex: -1
    })
  },

  /* 选择资料 */
  chooseFile: function(e) {
    var index = e.currentTarget.dataset.index;
    var title = e.currentTarget.dataset.title;
    this.data.filter.splice(1, 1, title)
    this.setData({
      fileIndex: index,
      filter: this.data.filter,
      filterIndex: -1
    })
  },

  /* 选择期限 */
  chooseTerm: function(e) {
    var index = e.currentTarget.dataset.index;
    var title = e.currentTarget.dataset.title;
    this.data.filter.splice(2, 1, title)
    this.setData({
      termIndex: index,
      filter: this.data.filter,
      filterIndex: -1
    })
  },

  /* 隐藏蒙版 */
  maskHide: function() {
    this.setData({
      filterIndex: -1
    })
  },

  //跳转详情页
  toDetail: function(e) {
    var id = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: "../detail/detail?id=" + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '贷款超市'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    /* 进入页面判断是否带信息 */
    var id = app.globalData.listParams, defaultData;
    console.log(id);
    if(id != this.data.id) {
      defaultData = [this.data.quotaData[id - 1].title, '资料不限', '期限不限']
      console.log(defaultData)

      this.setData({
        filter: defaultData,
        quotaIndex: id,
        fileIndex: 0,
        termIndex: 0
      })
      this.getList();
    }  
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
    // console.log(1);
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.start*this.data.length <= this.data.total) {
      this.setData({
        start: this.data.start + 1
      })
      this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})