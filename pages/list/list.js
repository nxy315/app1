// pages/list/list.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    filter: ['额度不限', '期限不限'],
    filterIndex: -1,
    quotaIndex: 1,
    quotaData: [{ title: '额度不限', id: 1 }, { title: '1~5千', id: 2 }, { title: '5千~1万', id: 3 }, { title: '1~5万', id: 4 }, { title: '5万以上', id: 5 }],
    fileData: [],
    termData: [{ title: '期限不限', id: 1 }, { title: '30天以下', id: 2 }, { title: '1~6个月', id: 3 }, { title: '6~12个月', id: 4 }, { title: '一年以上', id: 5 }],
    fileIndex: 0,
    termIndex: 1,
    listData: [],
    total: 0,
    start: 1,
    money_cate: 1,
    material_cate: null,
    date_cate: 1
  },

  /* 获取列表数据 */
  getList: function(type) {
    wx.showNavigationBarLoading()
    this.setData({
      loading: true
    })
    var _this = this;
    wx.request({
      method: 'post',
      url: app.globalData.dataUrl + '/thirdApi/index/SuperMarket',
      data: {
        start: this.data.start,
        length: 6,
        money_cate: this.data.money_cate,
        material_cate: this.data.material_cate,
        date_cate: this.data.date_cate,
      },
      // dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        if(type == 1) {
          _this.setData({
            listData: res.data.data.list,
            total: res.data.data.total,
            loading: false
          })
        } else if(type == 2) {
          _this.setData({
            listData: _this.data.listData.concat(res.data.data.list),
            total: res.data.data.total,
            loading: false
          })
        }     
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

    app.globalData.list_id1 = index;
    this.setData({
      quotaIndex: index,
      filter: this.data.filter,
      filterIndex: -1,
      start: 1,
      money_cate: index
    })
    this.getList(1);
  },

  /* 选择资料 */
  chooseFile: function(e) {
    var index = e.currentTarget.dataset.index;
    var title = e.currentTarget.dataset.title;
    app.globalData.list_id2 = index;
    this.data.filter.splice(1, 1, title)
    this.setData({
      fileIndex: index,
      filter: this.data.filter,
      filterIndex: -1,
      start: 1,
      material_cate: index
    })
    this.getList(1);
  },

  /* 选择期限 */
  chooseTerm: function(e) {
    var index = e.currentTarget.dataset.index;
    var title = e.currentTarget.dataset.title;
    app.globalData.list_id3 = index;
    this.data.filter.splice(2, 1, title)
    this.setData({
      termIndex: index,
      filter: this.data.filter,
      filterIndex: -1,
      start: 1,
      date_cate: index
    })
    this.getList(1);
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
    var _this = this;
    
    if (app.globalData.list_id2 == null) {
      wx.request({
        method: 'post',
        url: app.globalData.dataUrl + '/thirdApi/index/SpecialList', //仅为示例，并非真实的接口地址
        data: {},
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          if (res.data.status == "success") {
            app.globalData.id2_list = res.data.data;
            app.globalData.list_id2 = res.data.data[0].id;

            var filter = _this.data.filter
            filter.splice(1, 0, res.data.data[0].cate_name)
            _this.setData({
              fileIndex: res.data.data[0].id,
              filter: filter,
              fileData: res.data.data,
              money_cate: app.globalData.list_id1,
              material_cate: res.data.data[0].id,
              date_cate: app.globalData.list_id3,
            })
            _this.getList(1);
          }
        }
      })
    } else {
      var filter = _this.data.filter
      if (this.data.filter.length >= 2) {
        filter.splice(1, 1, app.globalData.id2_list[0].cate_name)
      } else {
        filter.splice(1, 0, app.globalData.id2_list[0].cate_name)
      }
      
      filter.splice(0, 1, this.data.quotaData[app.globalData.list_id1 - 1].title)
      _this.setData({
        filter: filter,
        fileData: app.globalData.id2_list,
        money_cate: app.globalData.list_id1,
        material_cate: app.globalData.id2_list[0].id,
        date_cate: app.globalData.list_id3,
      })
      _this.getList(1);
    }
    /* 进入页面判断是否带信息 */
    // var _this = this;
    // if(!app.globalData.list_id2) {
    //   wx.request({
    //     method: 'post',
    //     url: app.globalData.dataUrl + '/thirdApi/index/SpecialList', //仅为示例，并非真实的接口地址
    //     data: {},
    //     dataType: 'json',
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded' // 默认值
    //     },
    //     success: function (res) {
    //       if (res.data.status == 'success') {
    //         app.globalData.id2_list = res.data.data
    //         app.globalData.list_id2 = res.data.data[0].id;
    //         _this.setData({
    //           quotaIndex: app.globalData.list_id1-1
    //         })
    //       }
    //     }
    //   })
    // }
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
    this.setData({
      start: 1,
    })
    this.getList(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.start*6 <= this.data.total) {
      this.setData({
        start: this.data.start + 1
      })
      this.getList(2);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})