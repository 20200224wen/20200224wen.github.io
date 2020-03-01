var data = [
  {
    title: "庆余年: 张若昀陈道明领衔群像传奇",
    img: "../imgs/1.jpg",
    bg: "rgb(114, 16, 3)"
  },
  {
    title: "边境线之冷焰: 边防警察异域追击",
    img: "../imgs/2.jpg",
    bg: "rgb(2, 10, 23)"
  },
  {
    title: "幸福三重奏: 郎朗吉娜甜蜜逛电玩城",
    img: "../imgs/3.jpg",
    bg: "rgb(65, 103, 104)"
  },
  {
    title: "心动的offer: 学霸上法庭激烈辩论",
    img: "../imgs/4.jpg",
    bg: "rgb(142, 176, 204)"
  },
  {
    title: "美食告白记: 赖美云曝年底参加艺考",
    img: "../imgs/5.jpg",
    bg: "rgb(175, 157, 133)"
  },
  {
    title: "我们的歌: 肖战张韶涵首度同台",
    img: "../imgs/6.jpg",
    bg: "rgb(29, 36, 178)"
  },
  {
    title: "精英律师: 靳东率律师军团守护正义",
    img: "../imgs/7.jpg",
    bg: "rgb(9, 84, 79)"
  },
  {
    title: "中华兵王: 特警硬核激战大毒枭",
    img: "../imgs/8.jpg",
    bg: "rgb(59,68,47)"
  },
  {
    title: "VIP7周年硬核福利: 刷片赢双人游",
    img: "../imgs/9.jpg",
    bg: "rgb(12, 136, 108)"
  }
];

function render() {
  var divSidebar = document.getElementsByClassName("sidebar")[0];
  var divImgs = document.getElementsByClassName("imgs")[0];
  var activeImg, activeNav;
  var imgList = [];
  var navList = [];
  var timer = null;

  for (var i = 0; i < data.length; i++) {
    (function() {
      var items = data[i];
      // 生成侧边栏导航并插入
      var nav = document.createElement("a");
      divSidebar.appendChild(nav);
      nav.setAttribute("class", "nav");
      nav.setAttribute("title", items.title);
      var contents = items.title.split(":");
      nav.innerHTML = contents[0] + "<span>" + contents[1] + "</span>";
      // 生成图片并插入
      var img = document.createElement("a");
      divImgs.appendChild(img);
      img.setAttribute("class", "img");
      img.style.backgroundImage = "url(" + items.img + ")";
      img.style.backgroundColor = items.bg;
      img.style.display = "none";

      // 初始状态
      if (i == 0) {
        nav.setAttribute("class", "active");
        img.style.display = "block";
        activeNav = nav;
        activeImg = img;
      }
      // 鼠标移入移出事件
      nav.onmouseenter = function() {
        stop();
        activeNav.setAttribute("class", "nav");
        activeImg.style.display = "none";
        nav.setAttribute("class", "active");
        img.style.display = "block";
        activeNav = nav;
        activeImg = img;
      };
      nav.onmouseleave = function() {
        start();
      };
      imgList.push(img);
      navList.push(nav);
    })();
  }
  // 自动播放
  function start() {
    timer = setInterval(function() {
      // 图片索引和导航索引一样
      var index = navList.indexOf(activeNav);
      activeNav.setAttribute("class", "nav");
      activeImg.style.display = "none";
      var nav = navList[(index + 1) % data.length];
      var img = imgList[(index + 1) % data.length];
      nav.setAttribute("class", "active");
      img.style.display = "block";
      activeNav = nav;
      activeImg = img;
    }, 2000);
  }
  // 停止播放
  function stop() {
    clearInterval(timer);
    timer = null;
  }
  start();
}
render();
