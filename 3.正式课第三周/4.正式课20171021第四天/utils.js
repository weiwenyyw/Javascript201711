var utils = (function () {
    function toListArray(likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry)
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i]
            }
        }
        return ary;
    };
    function toJSON(str) {

        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    };
    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var p = curEle.offsetParent;
        while (p) {
            // 排除IE8浏览器
            if (!/MSIE 8\.0/.test(navigator.userAgent)) {
                l += p.clientLeft;
                t += p.clientTop;
            }
            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }
        return {left: l, top: t}
    };
    function win(attr,value) {
        if(typeof value==="undefined"){
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    };
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
        // var newReg = /^-?\d+(\.\d+)?(px|em|rem)$/;
        return  parseFloat(val);
    };
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
    };
    function setGroupCss(curEle,options) {
        if(typeof options ==="object"){
            for(var key in options){
                setCss(curEle,key,options[key])
            }
        }
    };
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
    return {
        toListArray:toListArray,
        toJSON : toJSON,
        offset: offset,
        win:win,
        getCss : getCss,
        setCss:setCss,
        setGroupCss : setGroupCss,
        css:css
    }
})();
