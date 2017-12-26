function wxToast(a){
    function _toast(){
    	var _page = getCurrentPages()
    	this.page = _page[_page.length-1];
    	this.timer = null
    	if(a == undefined) a = {}
    	this.init(a);
    };
    _toast.prototype = {
    	init : function(a){
    		this.page.hideToastFn = ()=>{
    			if(a.tapClose){
		    		this.hide(a,1);
		    		a.hide && a.hide();
		    	};
    		};

    		if(!a){
    			a =  this.page.data.wxToastConfig;
    			this.hide(a,1);
    			return
    		}
    		a.title  = a.title ? a.title : '正在加载'
			a.block = true;
			this.page.setData({
	    		wxToastConfig : a
	    	});
	    	a.show && a.show();
	    	setTimeout(()=>{
				var Animation = wx.createAnimation();
				Animation.opacity(1).step({
		            duration : 500,
		            timingFunction : 'ease'
		        });
				a.animate = Animation.export() 
		    	this.page.setData({
		    		wxToastConfig : a
		    	});
	    	},40);
			this.timer = setTimeout(() =>{
				this.hide(a);
			},a.duration ? a.duration+500 : 2500)
    	},
    	hide : function(a,b){
    		if(!a.block) return
    		var Animation = wx.createAnimation();
			Animation.opacity(0).step({
	            duration : 500,
	            timingFunction : 'ease'
	        });
	        a.animate = Animation.export() 
	    	this.page.setData({
	    		wxToastConfig : a
	    	});
	    	setTimeout(()=>{
	    		a.block = false
				this.page.setData({
		    		wxToastConfig : a
		    	});
	    		if(!b) a.hide && a.hide();
	    	},500);
	    	clearTimeout(this.timer)
    	}
    }
    return new _toast();
}
module.exports = wxToast

// app.wxToast({
//   title: '验证码错误', //标题，不写默认正在加载
//   img: '../../images/cc.png', //icon路径，不写不显示
//   imgClass: 'images', //icon添加class类名
//   contentClass: 'content', //内容添加class类名
//   duration: 3000, //延时关闭，默认2000
//   tapClose: false, //点击关闭，默认false
//   show: function () { //显示函数
//     console.log('显示啦')
//   },
//   hide: function () { //关闭函数
//     console.log('消失啦')
//   }
// });
// app.wxToast(false); //如果需要隐藏，参数设置为false即可。
// setTimeout(function () {
//   app.wxToast(false);
// }, 3000)