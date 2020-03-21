var wrapDiv = document.getElementsByClassName("wrap")[0]; //获取父元素
var imgsDiv = document.getElementsByClassName("imgs")[0]; //获取img容器
var imgsDivLength = imgsDiv.children.length; //获取img的长度
var imgWidth = imgsDiv.children[0].offsetWidth; //获取每张图片的宽度
// var imgWidth = imgsDiv.children[0].clientWidth;
var indexs = document.getElementsByClassName("index"); //获取index数组
var activeIndex = document.getElementsByClassName("index active")[0]; //获取点击的active元素
var curIndex = 0; //当前的index值
var timer = null;
// 开始自动轮播
function startMove() {
  timer = setInterval(function() {
    autoMove();
  }, 3000);
}
startMove();
// 停止轮播
function stopMove() {
  clearInterval(timer);
}
// 运动
function autoMove() {
  curIndex++;
  // console.log(curIndex);
  imgsDiv.style.left = -imgWidth * curIndex + "px";
  changeIndex();
}

// 改变index的显示

function changeIndex() {
  // 当前显示图片index的值
  var OcurIndex = curIndex % (imgsDivLength - 1);
  indexs[OcurIndex].classList.add("active");
  activeIndex.classList.remove("active");
  activeIndex = indexs[OcurIndex];
}
// 过渡判断
function imgsDivTranistion() {
  // 过渡完毕后会触发该事件
  imgsDiv.addEventListener(
    "transitionend",
    function() {
      if (curIndex == 5) {
        // 如果当前显示的是最后一张图片
        imgsDiv.style.left = 0; //立刻让轮播图停止
        imgsDiv.style.transition = "none"; //清楚过渡效果
        curIndex = 0; //当前索引重置为0;
        // console.log(imgsDiv.style.left);
      }

      // 如果当前位置为0，设置过渡样式
      if (imgsDiv.offsetLeft === 0) {
        imgsDiv.style.transition = "left .2s";
      }
    },
    false
  );
}
imgsDivTranistion();
// 点击事件
function buttomNav() {
  var indexsLength = indexs.length;
  for (var i = 0; i < indexsLength; i++) {
    (function(i) {
      var index = indexs[i];
      index.onclick = function() {
        var isActive = index.classList.contains("active");
        if (isActive) {
          return;
        }
        // clearInterval(timer);
        curIndex = i;
        changeIndex();
        imgsDiv.style.left = -i * imgWidth + "px";
      };
    })(i);
  }
}
buttomNav();
