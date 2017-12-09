/*
* @Author: Administrator
* @Date:   2017-11-06 19:37:37
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-07 20:23:54
*/
window.onload=function(){
	setBanner();
	fixedHeader();
	timeDown();
}

//头部颜色改变
function fixedHeader(){
	//获取元素;
		var header = document.querySelector(".header");
		var banner = document.querySelector(".banner");
		//和获取版心高度
		var iHeight = banner.offsetHeight;

		// alert(iHeight)
		//滚动事件
		window.onscroll=function(){
			// alert(iHeight);//1248px
			//获取被卷曲的高度
			var scrollTop = document.body.scrollTop;
			// console.log(scrollTop);
			//计算比例
			var opacity = scrollTop/iHeight*0.85;
			if(opacity >0.85){
				opacity =0.85;
			}
			//设置颜色
			header.style.background="rgba(201, 21, 35,"+opacity+")";
		}
}

//轮播图
function setBanner(){
	//获取元素
	var banner = document.querySelector(".banner");
	var bannerUl = banner.querySelector("ul");
	//获取li
	var bannerLi = bannerUl.querySelectorAll("li");
	//获取屏幕的宽度
	var iWidth = document.body.clientWidth;
	//获取圆点
	var points = document.querySelectorAll(".dotte span");

	var startX = 0;
	var moveX = 0;
	var disX = 0;
	var index = 0;
	var timer = null;
	// alert(iWidth);
	//设置ul的宽度
	bannerUl.style.width = bannerLi.length * iWidth +"px";
	//设置li的宽度
	for(var i=0;i<bannerLi.length;i++){
		bannerLi[i].style.width = iWidth+"px";
	}

	//触摸事件
	banner.addEventListener("touchstart", function(event){
		//记录位置
		startX = event.touches[0].clientX;
		//停止定时器
		clearInterval(timer);
		
	})
	banner.addEventListener("touchmove", function(event){
		//记录位置
		moveX = event.touches[0].clientX;
		disX = Math.abs(moveX - startX);
		
	})
	banner.addEventListener("touchend", function(event){
		if(disX > 30){
			//记录位置
			if(moveX - startX > 0){
				//左滑动 上一张
				index -- ;
				if(index <=0){
					index=0;
				}
				bannerUl.style.transform="translateX("+(-index * iWidth)+"px)";
			}else{
				index ++;
				if(index > bannerLi.length-1){
					index = bannerLi.length-1
				}
				//右滑动 下一张
				bannerUl.style.transform="translateX("+(-index * iWidth)+"px)";
				
			}

			//设置圆点样式
			setPoints(points,index);
			disX = 0;
		}	
		setInterval(autoplay());
		
	})
	setInterval(autoplay());
	//定时器实现
		function autoplay(){
			timer = setInterval(function(){
				index ++ ;
				if(index > bannerLi.length-1){
					index = 0;
				}
				bannerUl.style.transform="translateX("+(-index * iWidth)+"px)";
				setPoints(points,index);
			}, 1000)
		}	
		

	//改变对应圆点样式
	function setPoints(points,index){
		for(var i=0;i<points.length;i++){
			points[i].classList.remove("active");
		}
		points[index].classList.add("active");
	}

}


//倒计时
function timeDown(){
	var time = 1000;
	//获取元素
	var count = document.querySelector(".count");
	var spans = count.querySelectorAll("span");
	//定时器
	var timer = setInterval(function(){
		time --;
		if(time <=0){
			time = 0;
			clearInterval(timer);
		}
		//时间转换
		var hour = toDouble(Math.floor(time%86400/3600));
		var minute = toDouble(Math.floor(time%86400%3600/60));
		var seconds = toDouble(Math.floor(time%60));
		// console.log(seconds);
		spans[0].innerHTML = Math.floor(hour/10);
		spans[1].innerHTML = hour%10;

		spans[3].innerHTML = Math.floor(minute/10);
		spans[4].innerHTML = minute%10

		spans[6].innerHTML = Math.floor(seconds/10);
		spans[7].innerHTML = seconds%10
	},1000);

	//时间转换
	function toDouble(num){
		return num > 10? ""+num : "0"+num;
	}
}
