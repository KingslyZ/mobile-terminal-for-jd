/*
* @Author: Administrator
* @Date:   2017-11-09 15:11:33
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-09 19:26:26
*/
window.onload=function(){
	//获取元素
	var mask =document.querySelector(".mask");
	var deleteBoxs = document.querySelectorAll(".delete");
	var text = document.querySelector(".text");
	var cancel = document.querySelector(".cancel");
	var box = null;
	for(var i=0;i<deleteBoxs.length;i++){
		deleteBoxs[i].onclick=function(){
			box = this.children[0];
			this.children[0].style.transform = "all 2s";
			this.children[0].style.transform="rotate(-45deg) translateY(-5px)";
			//mask显示
			mask.style.zIndex=100;
			mask.style.opacity = 1;
			// text.classList.add("active");
			text.classList.add("flipInY");
		}
	}
	cancel.onclick=function(){
		mask.style.zIndex=-1;
		mask.style.opacity = 0;
		text.classList.remove("active");
		box.style.transform = "all 2s";
		box.style.transform="rotate(0deg)";
	}
}