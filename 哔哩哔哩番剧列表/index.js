// var xhr = new XMLHttpRequest();
// xhr.open("get", "./data.json");
// xhr.send();
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4) {
//     if (xhr.status === 200) {
//       var res = JSON.parse(xhr.responseText);
//       console.log(res);
//     }
//   }
// };
function promiseGet(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var res = JSON.parse(xhr.responseText);
          resolve(res);
        } else {
          reject();
        }
      }
    };
  });
}
var el = document.querySelector(".time")
var cardContent = el.querySelector(".content-line")
var items = el.querySelectorAll(".item")

/**
 * 
 * @param {*} data 数组
 */
function render(data) {
  var tempalte = ''
  data.forEach(item => {
    tempalte += `
    <div class="card">
      <a class="pic" href="#">
        <img src="${item.square_cover}"/>
      </a>
      <div class="desc">
        <a class="title" href="#">${item.title}</a>
        <a class="update" href="#">${item.pub_index}</a>
      </div>
    </div>
    `
    cardContent.innerHTML = tempalte
  });
}
function init() {
  promiseGet("./data.json").then(function (res) {
    var res = res.result
    var latest = res.latest
    // console.log(timeline);
    render(latest)
  });
}
var ln = 0  //上一个索引
items.forEach((item, index) => {
  item.onclick = function () {
    if (index === 0) {
      promiseGet("./data.json").then(function (res) {
        var res = res.result
        var latest = res.latest
        render(latest)
      });
    } else {
      promiseGet("./data.json").then(function (res) {
        var res = res.result
        var timeline = res.timeline[index - 1].episodes
        render(timeline)
      });
    }
    items[ln].classList.remove("on")
    this.classList.add("on")
    ln = index
  }
})

init()