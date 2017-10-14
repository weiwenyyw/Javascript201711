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
// 数据绑定
// console.log(data[0])
var oUl = document.getElementById("list");
var str = "";
for(var i=0;i<data.length;i++){
    var cur = data[i];
    str += "<li>"
    str +="<img src='"+cur.img+"'/>"
    str +="<span>"+cur.title+"</span>"
    str+="<span>"+cur.time+"</span>"
    str+="<span>"+cur.hot+"</span>"
    str+="<span>￥"+cur.price+"</span>"
    str+="</li>"
};
oUl.innerHTML = str;






