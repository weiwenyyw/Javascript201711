// 获取数据
// 前端跟后台一般通过ajax 来交互；
// 1.创建ajax对象
var data;
var xhr = new XMLHttpRequest();
//2.打开相应的文件路径
xhr.open("get","json/product.json",false);
// 3.监听
xhr.onreadystatechange = function () {
    if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
       data= utils.toJSON(xhr.responseText);
    }
}
// 4.发送请求
xhr.send(null);
// 2.数据绑定
// console.log(data)
var oUl = document.getElementById("list");
var str = "";
for(var i=0;i<data.length;i++){
    var cur = data[i];
    // 给每一个li新增自定义的属性；
    str += "<li data-time='"+cur.time+"' data-hot='"+cur.hot+"' data-price='"+cur.price+"'>"
    str +="<img src='"+cur.img+"'/>"
    str +="<span>"+cur.title+"</span>"
    str+="<span>"+cur.time+"</span>"
    str+="<span>"+cur.hot+"</span>"
    str+="<span>￥"+cur.price+"</span>"
    str+="</li>"
};
oUl.innerHTML += str;



// 3.绑定点击事件
var menu = document.getElementById("menu");
var likeA = menu.getElementsByTagName("a");

for(var i=0;i<likeA.length;i++){
    likeA[i].index = i;
    likeA[i].flag = -1;
    likeA[i].onclick = function () {
        // this --->a 标签
        this.flag = this.flag*-1;
        sortList.call(this);
    }
}
// 获取所有的li;
var oUl = document.getElementById("list");
var oLis = oUl.getElementsByTagName("li");
console.log(oLis[0].innerHTML)
// 类数组转数组；
var ary =utils.toListArray(oLis);
function sortList() {
    // this --> a标签
    var that = this;
    var dataAry = ["data-time","data-hot","data-price"];
    ary.sort(function (a,b) {
        // debugger
        // a,b代表每一个li;
        //getAttribute : 获取元素对象的属性名对应的属性值
        // 如果属性名不存在，那么获取的结果就是null;
        var  cur = a.getAttribute(dataAry[that.index]);

        var  nex = b.getAttribute(dataAry[that.index]);
        // 把时间数字之间的横杠去掉；
        //Cannot read property 'replace' of null : 不能读取null的replace属性；

        //debugger : 让js代码停到这一行；F10是执行下一行  F8 :跳到下一个断点；
        console.log(cur);
        cur = cur.replace(/-/g,"");
        nex = nex.replace(/-/g,"");

        return (cur-nex)*that.flag;
    })
    // 创建文档碎片，只引发一次回流；
    var frg = document.createDocumentFragment();
    for(var i=0;i<ary.length;i++){
        frg.appendChild(ary[i]);
    }
    oUl.appendChild(frg);
    frg = null;
}


//1.先写utils，公共方法；类数组转数组  转JSON对象的方法；
// 2.通过ajax 四步获取json文件数据；
// 3.数据绑定
// 4.给a标签绑定点击事件
// 5.排序 获取所有的li,类数组转数组；进行排序；
// var obj = {name:"zhufeng"}
//
// var str = obj.name+""



