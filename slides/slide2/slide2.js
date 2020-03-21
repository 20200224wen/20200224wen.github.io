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
  var imgWidth = wrapDiv.clientWidth,
    len = datas.length,
    index = 0,
    timer = null;
  imgsDiv.style.width = imgWidth * len + "px";
  // 创建元素并添加
  function create() {
    for (var i = 0; i < len; i++) {
      data = datas[i];
      var a = document.createElement("a"),
        img = document.createElement("img"),
        li = document.createElement("li");
      img.src = data.src;
      a.href = "#";
      imgsDiv.appendChild(a);
      a.appendChild(img);
      dotsUl.appendChild(li);
    }
  }
  create();
  // 状态
  function init() {
    imgsDiv.style.marginLeft = -index + "00%";
    dotsUl.children[index].className = "active";
  }
  init();
  //
  function auto() {
    dotsUl.children[index].className = "";
    index++;
    if (index > len - 1) {
      index = 0;
    }
    init();
  }
  // 自动轮播
  function startAuto() {
    timer = setInterval(function() {
      auto();
    }, 2000);
  }
  // 停止轮播
  function stopAuto() {
    clearInterval(timer);
  }
  startAuto();
  //移入移出事件
  wrapDiv.onmouseenter = function() {
    stopAuto();
  };
  wrapDiv.onmouseleave = function() {
    startAuto();
  };
  // 底部导航点击事件
  dotsUl.onclick = function(e) {
    if (e.target.tagName === "UL") {
      return;
    }
    dotsUl.children[index].className = "";
    for (var i = 0; i < len; i++) {
      if (dotsUl.children[i] == e.target) {
        index = i;
        init();
      }
    }
  };
  // 左右导航点击事件
  rightDiv.onclick = function() {
    auto();
  };
  leftDiv.onclick = function() {
    dotsUl.children[index].className = "";
    index--;
    if (index < 0) {
      index = 4;
    }
    init();
  };
}
render();
