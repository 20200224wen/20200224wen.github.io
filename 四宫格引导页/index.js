let oItems = document.querySelector(".items") //容器
let oItem = document.querySelectorAll(".item")
let oClose = document.querySelector(".close")
let oMain = document.querySelector(".main")

/**
 * 展示
 * @param {*} curIndex 展示第几个
 */
function showItem(curIndex) {
  oItem.forEach((item, index) => {
    if (curIndex === index) {
      item.classList.add("active")
      item.style.flex = "100%"
    } else {
      item.style.flex = "0"
      item.classList.remove("active")
    }
    oClose.style.display = "block"
    oMain.style.display = "block"
  })
}
// 关闭
function closeAll() {
  oItem.forEach((item) => {
    item.style.flex = "25%"
    item.classList.remove("active")
    oClose.style.display = "none"
    oMain.style.display = "none"
  })
}

// 事件
oItem.forEach((item, index) => {
  item.onclick = function () {
    showItem(index)
  }
})
oClose.onclick = function () {
  closeAll()
}
// 滚动事件
window.onscroll = function () {

  // 视口高度
  let vh = document.documentElement.clientHeight
  // 滚动的高度
  let sh = document.documentElement.scrollTop
  // items容器的高度
  let h = vh - sh
  if (h < 80) {
    h = 80
  }
  oItems.style.height = h + "px"

}