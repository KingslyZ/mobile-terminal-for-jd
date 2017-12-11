# mobile-terminal-for-jd
移动端模拟京东网站
## 头部
#### 搜索框
    整个父盒子宽度100%，使用padding设置子盒子
    这样在缩放的时候，子盒子大小等比改变
    固定定位，绝对定位的盒子，即使不需要移动位置，也要设置left：0；top：0；这样才会在原位置
#### 轮播图
    注意：轮播效果要在头部效果之前，否则头部获取到的banner.offsetHeight = 1248（8张图的高度）
    移动端：位置的移动使用：transform下面的translateX来设置
    移动的动画使用CSS属性 transition来实现
    获取屏幕的宽度：document.body.clientWidth
    移动的距离是  index * document.body.clientWidth

    同时改变圆点的样式
#### 导航栏
    都转换为block，然后设置text-align：center
    文字也是有block 这样才能每个独占一行
#### 头部半透明效果
    页面被卷去的高度/banner的高度*已知的透明度
    计算出现在的透明度
    页面被卷去的高度：document.body.scrollTop;
    banner的高度：banner.offsetHeight
#### 倒计时效果
    设置定时器，每次time都减去1
    当time<=0时要清除定时器

    时间转换：
    时  Math.floor(time%86400/3600)
    分  Math.floor(time%86400%3600/60)
    秒  Math.floor(time%60)

    百位取十位
    Math.floor(hour/10)
    百位取个位
    hour%10
 ## 分类页面
 #### 分类页面的回弹效果
    确定手指下滑的正常距离0
    手指上滑的距离为容器的高度-列表的高（负值）
        因为：translateY向上为负值

    确定手指下滑和上滑的最大距离
    下滑：100
    上滑：正常距离 - 100（负值）

    开始滑动 记录开始的Y值
    滑动中记录移动的Y值
    滑动结束回弹效果
```js
      ul.addeventListener("touchstart",function(e){
        startY = e.touches[0].clientY;
      }
      )

      ul.addeventListener("touchmove",function(e){
        moveY = e.touches[0].clientY;
        disY = moveY - startY;
        //书写滑动时，ul位置的改变
        判读 符合条件才能移动
        if(disY + curDisY < maxDown){//下滑
          ul.style.transition="translateY("+（curDisY+disY）+"px)";
        }
        if(disY + curDisY > maxUp){//上滑
          ul.style.transition="translateY("+(disY+curDisY)+"px)";
        }

      }
      )
      ul.addeventListener("touchend",function(e){
        //回弹
        if(disY + curDisY >maxDown){
          ul.style.transition="translateY("+normalDown+"px)";
          disY= 0;
          curDisY = normalDown;
        }
        if(disY + curDisY <maxUp){
          ul.style.transition="translateY("+normalUp+"px)";
          //归零
          disY= 0;
          curDisY = normalUp;
        }
      })
```
#### 点击效果
```js
    tap(ul.function(e){
      //改变点击的a标签的样式
      //移动ul位置，限定条件是该元素所在高度小于最大上滑高度
      for(var i=0;i<liArr.length;i++){
        liArr[i].children[0].className="";
        liArr[i].children[0].index = i;
      }
      e.target.className = “active”；	
      //移动ul	
      //限定条件
      if（(-e.target.index*height) > mormalUp）{
        ul.style.transform = 		"translate("+(-e.target.index*height)+"px)";
      }
    })


  liArr[i].children[0]:找到a标签
```
### 移动端点击事件的封装
 ```js
  轻敲事件的条件：
	① 时间不超过150ms
	② 不触发touchmove事件

  function tap(dom,callback){
  if(dom && typeof dom == "object")
      var startTime= 0；
      var flag = false;
      dom.addEventListener("touchstart",function(){
      startTime = Date.now();
    })
    dom.addEventListener("touchmove",function(){
      //触动移动事件，修改flag值
      flag = true;
    })
    dom.addEventListener("touchend",function(e){
      endTime = Date.now();
      time = Date.now() - startTime;
      if(!flag && time<150){
        callback && callback(e);
      }
    })
  }
 ```


