// pages/info/info.js
const phoneReg = /^13[0-9]{9}$|14[0-9]{9}$|15[0-9]{9}$|16[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$|19[0-9]{9}$/;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderIndex: 0,
    typeIndex: 0,
    purposeIndex: 0,
    correctPhone: false,
    genderArray: ['请选择','男','女'],
    typeArray: ['请选择','信用贷款','房产贷款','汽车贷款','其他贷款'],
    purposeArray: ['请选择', '创业', '购房', '购车', '经营', '装修', '结婚', '旅游', '购物', '短期周转', '其他'],
  },

  bindGenderPickerChange: function (e) { 
    this.setData({
      genderIndex: e.detail.value
    })
  },
  bindTypePickerChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  bindPurposePickerChange: function(e) {
    this.setData({
      purposeIndex: e.detail.value
    })
  },

  getPhone: function(e) {
    var value = e.detail.value;
    // console.log(value);
    if (phoneReg.test(value)) {
      this.setData({
        correctPhone: true
      })
    } else {
      this.setData({
        correctPhone: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '借到钱'
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