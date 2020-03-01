var imgs = [
    { imgUrl: "img/banner1.jpg", link: "http://www.duyiedu.com" }, //每一项要记录：1. 图片的路径，2. 图片的超链接地址
    { imgUrl: "img/banner2.jpg", link: "http://www.duyiedu.com" },
    { imgUrl: "img/banner3.jpg", link: "http://www.duyiedu.com" }
];

var divWrap = document.getElementsByClassName('wrap')[0];
var divImgs = document.getElementsByClassName('imgs')[0];
var divDot = document.getElementsByClassName('dot')[0];
var imgsLength = imgs.length;
var index = 0;
var timer = null;

// 初始化
function init(){
    // 设置图片容器宽度
    divImgs.style.width = imgsLength +"00%";
    for(var i = 0; i< imgsLength; i++) {
        var obj = imgs[i];
        // 生成并插入包含img元素的a元素
        var a = document.createElement("a");
        divImgs.appendChild(a);
        var img = document.createElement("img");
        a.appendChild(img);
        img.src = obj.imgUrl
        // 生成并插入包含span元素
        var span = document.createElement("span");
        divDot.appendChild(span);
    }
    // 设置状态
    setStatus();
    //自动切换
    start();

}
//根据index的值求换状态 
function setStatus() {
    divImgs.style.marginLeft = -index * 100 +"%";
    //找到dot下的span.selected，如果有，先清除类名
    var span  = document.querySelector(".dot span.selected");
    if(span){
        span.className ="";
    }
    divDot.children[index].className = "selected";
}
// 自动切换
function start(){
    if(timer){
        return;
    }
    timer = setInterval(function () {
        // index++;
        // if(index == imgsLength){
        //     index=0;
        // }
        index = (index + 1) %imgsLength; 
        setStatus();
    } , 3000);
}
// 停止切换
function stop() {
    clearInterval(timer);
    timer = null;
}
//处理事件
divDot.onclick =function (e) {
    if(e.target.tagName !== 'SPAN'){
        return;
    }
    // 如何获取点击的是第几个span
    for(var i = 0; i< divDot.children.length; i++){
        var span = divDot.children[i];
        if(span == e.target){
            index = i;
            setStatus();
            return;
        }
    }
}
divWrap.onmouseenter = function () {
    stop();
}
divWrap.onmouseleave = function () {
    start();
}
init();


