datas = [
  { src: "../imgs/01.jpg" },
  { src: "../imgs/02.jpg" },
  { src: "../imgs/03.jpg" },
  { src: "../imgs/04.jpg" },
  { src: "../imgs/05.jpg" }
];
function render() {
  var wrapDiv = document.getElementsByClassName("wrap")[0],
    imgsDiv = document.getElementsByClassName("imgs")[0],
    dotsUl = document.getElementsByClassName("dots")[0],
    leftDiv = document.getElementsByClassName("left")[0],
    rightDiv = document.getElementsByClassName("right")[0];
  var imgWidth = 500, //图片的宽度，等于整个容器的宽度
    // imgWidth = wrapDiv.clientWidth,
    len = datas.length, //数据的长度
    index = 0,
    moveTimer = null, //过渡定时器
    autoTimer = null; //自动轮播
  imgsDiv.style.width = len + 2 + "00%"; //imgDiv容器的宽度
  // 创建并添加img
  function create() {
    function createA(num) {
      var a = document.createElement("a"),
        img = document.createElement("img");
      a.href = "#";
      img.src = datas[num].src;
      imgsDiv.appendChild(a);
      a.appendChild(img);
    }
    // console.log(datas[0].src);
    // 第五张图片
    createA(len - 1);
    // 第1-5张图片
    for (var i = 0; i < len; i++) {
      var li = document.createElement("li");
      createA(i);
      dotsUl.appendChild(li);
    }
    // 第一张图片
    createA(0);
  }
  create();
  // 设置初始状态
  function init() {
    imgsDiv.style.marginLeft = getMarginLeft() + "px";
    dotsUl.children[0].className = "active";
  }
  init();
  // 根据index,获取当前的 imgsDiv 的 maginLeft
  function getMarginLeft() {
    return -(index + 1) * imgWidth;
  }
  // 根据index切换状态，切换圆点状态
  function dots() {
    var dot = document.getElementsByClassName("active")[0];
    // var dot = document.querySelector(".dots li.active");
    if (dot) {
      dot.className = "";
    }
    dotsUl.children[index].className = "active";
  }
  // 根据index，切换图片和圆点
  function img() {
    dots();
    if (moveTimer) {
      clearInterval(moveTimer);
    }
    // 切换图片，设置imgsDiv的marginLeft
    var targetMarginLeft = getMarginLeft(); //最终的marginLeft
    // 有过渡的切换
    var marginLeft = parseInt(getComputedStyle(imgsDiv).marginLeft); //当前的marginLeft
    var minMarginLeft = -len * imgWidth; //marginLeft的临界值
    var step = 10;
    moveTimer = setInterval(function() {
      marginLeft -= step;
      if (marginLeft < minMarginLeft) {
        marginLeft += len * imgWidth;
      }
      if (Math.abs(marginLeft - targetMarginLeft) <= step) {
        marginLeft = targetMarginLeft;
        clearInterval(moveTimer); //已经运动到了，就停止
      }
      imgsDiv.style.marginLeft = marginLeft + "px";
    }, 10);
  }

  // 自动轮播
  function startAuto() {
    autoTimer = setInterval(function() {
      index++;
      if (index > len - 1) {
        index = 0;
      }
      img();
    }, 2000);
  }
  startAuto();
  // 停止轮播
  function stopAuto() {
    clearInterval(autoTimer);
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
  // 点击事件
  dotsUl.addEventListener(
    "click",
    function(e) {
      if (e.target.tagName === "UL") {
        return;
      }
      for (var i = 0; i < len; i++) {
        if (dotsUl.children[i] == e.target) {
          index = i;
          img();
        }
      }
    },
    false
  );
  rightDiv.addEventListener(
    "click",
    function() {
      index++;
      if (index > len - 1) {
        index = 0;
      }
      img();
    },
    false
  );
  leftDiv.addEventListener(
    "click",
    function() {
      index--;
      if (index < 0) {
        index = len - 1;
      }
      img();
    },
    false
  );
}
render();
