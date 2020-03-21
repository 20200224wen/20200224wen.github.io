var wrapDiv = document.getElementsByClassName("wrap")[0],
  imgsDiv = document.getElementsByClassName("imgs")[0],
  liList = document.getElementsByTagName("li"),
  activeLi = document.getElementsByClassName("active")[0],
  dotsDiv = document.getElementsByClassName("dots")[0],
  leftBtn = document.getElementsByClassName("left")[0],
  rightBtn = document.getElementsByClassName("right")[0];
var width = wrapDiv.clientWidth; //容器的宽度
var len = dotsDiv.children.length, //轮播图图片的个数
  index = 0,
  timer = null;
imgsDiv.style.width = (len + 1) * width + "px";
// 运动
function auto() {
  index++;
  imgsDiv.style.left = -index * width + "px";
  changeIndex();
}
function changeIndex() {
  var curIndex = index % len;
  liList[curIndex].classList.add("active");
  activeLi.classList.remove("active");
  activeLi = liList[curIndex];
  transition();
}
// 处理过渡
function transition() {
  imgsDiv.addEventListener(
    "transitionend",
    function() {
      // 向右
      if (index === len) {
        imgsDiv.style.left = 0 + "px";
        imgsDiv.style.transition = "none";
        index = 0;
      }
      if (imgsDiv.offsetLeft == 0) {
        imgsDiv.style.transition = "left .5s";
      }
    },
    false
  );
}
// 自动轮播
function startAuto() {
  timer = setInterval(function() {
    auto();
  }, 2000);
}
startAuto();
// 停止轮播
function stopAuto() {
  clearInterval(timer);
}
// 移入移出事件
wrapDiv.addEventListener(
  "mouseenter",
  function() {
    stopAuto();
  },
  false
);
wrapDiv.addEventListener(
  "mouseleave",
  function() {
    startAuto();
  },
  false
);

// 底部导航点击事件
dotsDiv.addEventListener(
  "click",
  function(e) {
    if (e.target.tagName === "UL") {
      return;
    }
    for (var i = 0; i < len; i++) {
      if (liList[i] === e.target) {
        index = i;
        changeIndex();
        imgsDiv.style.left = -i * width + "px";
      }
    }
  },
  false
);
//左右导航点击事件
rightBtn.addEventListener(
  "click",
  function() {
    index++;
    changeIndex();
    imgsDiv.style.left = -index * width + "px";
  },
  false
);
leftBtn.addEventListener(
  "click",
  function() {
    index--;
    if (index == -1) {
      imgsDiv.style.left = -2000 + "px";
      imgsDiv.style.transition = "none";
      index = 4;
    }
    if (imgsDiv.offsetLeft == -2000) {
      imgsDiv.style.transition = "left .5s";
    }

    changeIndex();
    imgsDiv.style.left = -index * width + "px";
  },
  false
);
