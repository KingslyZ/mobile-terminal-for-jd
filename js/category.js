/*
* @Author: Administrator
* @Date:   2017-11-07 16:45:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-07 19:59:23
*/
window.onload=function(){
	leftWrip();
	rightSwep();
}
function leftWrip(){
	var left = document.querySelector(".left");
	var ul = document.querySelector(".list");
	var li = ul.querySelectorAll("li");
	var iHeight = li[0].offsetHeight;
	// console.log(left);
	// console.log(ul);
	var startY = 0;
	var moveY = 0;
	var disY = 0;
	var curDisY = 0;
	//获取去ul向下移动的正常那范围
	var normalDown = 0;
	//获取向上移动的正常范围
	var normalUp = left.offsetHeight - ul.offsetHeight;
	// alert(normalUp)
	//获取ul向下一移动的最大范围
	var maxDown = 100;
	//获取ul向上移动的最大范围
	var maxUp = left.offsetHeight - ul.offsetHeight-100;
	// alert(normalUp);//-27
	ul.addEventListener("touchstart", function(e){
		startY = e.touches[0].clientY;
	})
	ul.addEventListener("touchmove", function(e){
		moveY = e.touches[0].clientY;
		disY = moveY - startY;
		if(disY+curDisY < maxDown && disY+curDisY > maxUp){
			//取消结束时的过渡早场的影响
			ul.style.transition="none";
			ul.style.transform="translateY("+(curDisY+disY)+"px)";
		}
	})

	ul.addEventListener("touchend", function(e){
		curDisY = curDisY + disY;
		//鼠标移动结束弹回去
		//ul向下移动
		if(disY+curDisY > maxDown){	
			ul.style.transition="all 0.4s";
			ul.style.transform="translateY("+0+"px)";
			//更新curdisy
			curDisY = normalDown;
		}
		//ul向上移动
		if(disY+curDisY < maxUp){
			ul.style.transition="all 0.4s";
			ul.style.transform="translateY("+normalUp+"px)";//-530  到-427回弹效果
			curDisY = normalUp;
		}
	})

	tap(ul,function(e){
		for(var i=0;i<li.length;i++){
			li[i].children[0].className="";
			li[i].children[0].index = i;
		}
		e.target.className="active";
		ul.style.transition="all 0.4s";
		ul.style.transform="translateY("+(-e.target.index*iHeight)+"px)";
		//还有记录位置
		curDisY = -e.target.index*iHeight;
	})
}

//封装轻敲事件
//事件的两个元素  DOM对象 和 回调函数
//轻敲的条件  时间<150ms  不出动touchmove事件
function tap(dom,callback){
	var flag = false;
	var startTime = 0;
	var endTime = 0;
	//判断时间 ，进入记录时间，结束时再次记录时间，比较两者的差
	dom.addEventListener("touchstart",function(){
		startTime = Date.now();
	})
	dom.addEventListener("touchmove",function(){
		//触动移动事件，修改flag值
		flag = true;
	})
	dom.addEventListener("touchend",function(e){
		endTime = Date.now();
		time = endTime - startTime;
		if(!flag && time<150){
			callback && callback(e);
		}
	})
}


//
function rightSwep(){
	var right = document.querySelector(".right");
	itcast.iScroll({
		swipeDom:right,
		swipeType:"y",
		swipeDistance:100
	})
}