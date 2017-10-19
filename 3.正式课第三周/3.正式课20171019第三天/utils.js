var utils = (function () {
    // 获取样式
    function getCss(curEle,attr) {
        if(typeof curEle ==="undefined" || typeof attr === "undefined"){
            throw new Error("您的参数不符合要求")
        }
        var val="";
        if("getComputedStyle" in window){
            val = getComputedStyle(curEle)[attr];
        }else{
            if(attr==="opacity"){
                val = curEle.currentStyle["filter"];
                var reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                return reg.test(val) ? reg.exec(val)[1]/100 : null;
            }else{
                val = curEle.currentStyle[attr];
            }
        }
        var newReg = /^-?\d+(\.\d+)?(px|em|rem)$/;
        return  newReg.test(val) ? parseFloat(val) :val;
    }
    // 2.设置单个样式
    function setCss(curEle,attr,val) {
        if(attr==="float"){
            curEle.style[attr] = val;
            curEle.style["styleFloat"] = val;
            return;
        }
        if(attr==="opacity"){
            curEle.style[attr] = val;
            curEle.style["filter"] = "alpha(opacity="+val*100+")";
            return;
        }
        var reg = /^(width|height((margin|padding)?(top|left|right|bottom)?)?)$/;
        if(reg.test(attr)){
            if(!isNaN(val)){
                val = val+"px";
            }
        }
        curEle.style[attr] = val;
    }
    // 设置一组样式
    function setGroupCss(curEle,options) {
        if(typeof options ==="object"){
            for(var key in options){
                setCss(curEle,key,options[key])
            }
        }
    }
    // 是基于以上三个方法的功能；利用了以上三个方法参数个数的不同，然后参数的数据类型不一致，进行了合并；
    function css() {
        var len = arguments.length,
            curEle = arguments[0],
            attr =null,
            val = null,
            options = null;
        if(len ===3){
            attr = arguments[1];
            val = arguments[2];
            setCss(curEle,attr,val);
            return;
        }
        if(len===2 && typeof arguments[1]==="object"){
            options = arguments[1];
            setGroupCss(curEle,options)
            return;
        }
        attr = arguments[1];
        return getCss(curEle,attr);
    }
    return {css:css};
})();
//
// 获取样式
// css(oBox,"width")
// css(oBox,{width:100,height:200})
// css(oBox,"width",100)