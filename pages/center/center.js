// pages/center/center.js
const app = getApp()
var Crypto = require('../../utils/cryptojs/cryptojs').Crypto;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login: false,
    username: '',
    all_money: '',
    invite_people: '',
    money: '',
    al_account: '',
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  toQrcode: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (app.userInfoReadyCallback) {
                app.userInfoReadyCallback(res)
              }
              wx.navigateTo({
                url: '../qrcode/qrcode',
              })
            }
          })
        } else {
          app.globalData.userInfo = null;
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: res => {
                  this.globalData.userInfo = res.userInfo

                  if (app.userInfoReadyCallback) {
                    app.userInfoReadyCallback(res)
                  }
                  wx.navigateTo({
                    url: '../qrcode/qrcode',
                  })
                }
              })
            }
          })
        }
      }
    })
  },

  getMoney: function() {
    if (!this.data.al_account) {
      wx.navigateTo({
        url: '../bindAcount/bindAcount',
      })
    } else {
      wx.navigateTo({
        url: '../money/money',
      })
    }
  },

  getKF: function () {
    var _this = this;

    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            method: 'get',
            url: app.globalData.dataUrl + '/thirdApi/Message/SendMessage',
            data: {
              code: res.code,
              type: 2
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

  loginPage: function() {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  logout: function() {
    var _this = this;
    wx.showModal({
      title: '退出',
      content: '确定退出么？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userId');
          _this.setData({
            login: false
          })
        }
      }
    })
  },

  openSettion: function() {
    // wx.openSetting({
    //   success: function(data) {}
    // })
  },
  getSetting: function() {
    wx.openSetting({})
  },
  showAction: function() {
    wx.makePhoneCall({
      phoneNumber: '4001865001'
    })   
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人中心'
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
    var _this = this;
    var token = wx.getStorageSync('token');
    if (token) {
      var time = Date.parse(new Date()) / 1000;
      var key = Crypto.MD5(token + time) || '';
      wx.request({
        method: 'post',
        url: app.globalData.dataUrl + '/thirdApi/Usercenter/UserInfo',
        data: {
          token: token,
          key: key,
          time: time
        },
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.status == 'success') {
            wx.setStorage({
              key: 'userId',
              data: res.data.data.user_id
            })
            _this.setData({
              login: true,
              al_account: res.data.data.ali_no,
              username: res.data.data.username,
              all_money: res.data.data.all_money,
              invite_people: res.data.data.invite_people,
              money: res.data.data.money,
            })
          } else {

          }
        }
      })
    }

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              // if (this.userInfoReadyCallback) {
              //   this.userInfoReadyCallback(res)
              // }
            }
          })
        } else {
          app.globalData.userInfo = null;
          this.setData({
            userInfo: null,
            hasUserInfo: false
          })
        }
      }
    })
    // if (app.globalData.userInfo) {
    //   console.log(1);
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // }  else {
    //   console.log(3);
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   // wx.getUserInfo({
    //     // success: res => {
    //       app.globalData.userInfo = null
    //       this.setData({
    //         userInfo: null,
    //         hasUserInfo: false
    //       })
    //     // }
    //   // })
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