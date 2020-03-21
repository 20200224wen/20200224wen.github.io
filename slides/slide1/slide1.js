datas = [
  { src: "../imgs/01.jpg" },
  { src: "../imgs/02.jpg" },
  { src: "../imgs/03.jpg" },
  { src: "../imgs/04.jpg" },
  { src: "../imgs/05.jpg" }
];

function render() {
  var wrapDiv = document.getElementsByClassName("wrap")[0];
  var len = datas.length;
  var index = 0;
  var timer = null;
  // 创造节点并插入
  var imgsDiv = document.createElement("div"),
    ul = document.createElement("ul"),
    leftBtn = document.createElement("div"),
    rightBtn = document.createElement("div");
  imgsDiv.setAttribute("class", "imgs");
  ul.setAttribute("class", "dots");
  leftBtn.setAttribute("class", "btn left");
  rightBtn.setAttribute("class", "btn right");
  leftBtn.innerText = "<";
  rightBtn.innerText = ">";
  wrapDiv.appendChild(imgsDiv);
  wrapDiv.appendChild(ul);
  wrapDiv.appendChild(leftBtn);
  wrapDiv.appendChild(rightBtn);
  for (var i = 0; i < len; i++) {
    var data = datas[i];
    var a = document.createElement("a"),
      img = document.createElement("img"),
      li = document.createElement("li");
    a.href = "#";
    img.src = data.src;
    imgsDiv.appendChild(a);
    a.appendChild(img);
    ul.appendChild(li);
    // 初始化
    if (i == 0) {
      a.style.display = "block";
      li.className = "active";
    }
  }
  // 切换
  function status() {
    ul.children[index].className = "";
    imgsDiv.children[index].style.display = "none";
    index++;
    if (index == 5) {
      index = 0;
    }
    ul.children[index].className = "active";
    imgsDiv.children[index].style.display = "block";
  }
  // 开始轮播
  function startAuto() {
    timer = setInterval(function() {
      status();
    }, 1000);
  }
  startAuto();
  // 停止轮播
  function stopAuto() {
    clearInterval(timer);
  }
  //移入移出事件
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
  ul.addEventListener(
    "click",
    function(e) {
      if (e.target.tagName == "UL") {
        return;
      }
      for (var i = 0; i < len; i++) {
        var li = ul.children[i];
        if (li == e.target) {
          ul.children[index].className = "";
          imgsDiv.children[index].style.display = "none";
          index = i;
          ul.children[index].className = "active";
          imgsDiv.children[index].style.display = "block";
        }
      }
    },
    false
  );
  leftBtn.addEventListener(
    "click",
    function() {
      ul.children[index].className = "";
      imgsDiv.children[index].style.display = "none";
      index--;
      if (index == -1) {
        index = 4;
      }
      ul.children[index].className = "active";
      imgsDiv.children[index].style.display = "block";
      console.log(index);
    },
    false
  );
  rightBtn.addEventListener(
    "click",
    function() {
      status();
    },
    false
  );
}
render();
