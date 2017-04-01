[TOC]
##js获取当前时间戳
```
JavaScript 获取当前时间戳：
第一种方法：
var timestamp = Date.parse(new Date());
结果：1280977330000
第二种方法：
var timestamp = (new Date()).valueOf();
结果：1280977330748
第三种方法：
var timestamp=new Date().getTime()；
结果：1280977330748
第一种：获取的时间戳是把毫秒改成000显示，
第二种和第三种是获取了当前毫秒的时间戳。
```
##js获取当前时间 格式"yyyy-MM-dd"
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
获取当前的日期时间 格式"yyyy-MM-dd HH:MM:SS"
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}
##js把时间戳转换为普通日期格式
方式一：
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
}
console.log(getLocalTime(1293072805));//2010/12/23 上午10:5

方式二：
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17)
}
console.log(getLocalTime(1293072805));//2010/12/23 上午10:5

function formatDate(now) {
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return "20" + year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
var d = new Date(1230999938);
console.log(formatDate(d));//2070-1-15 13:56:39

方式三：
function add0(m) {
        return m < 10 ? '0' + m : m
    };

function getDate(timestamp) {
    //timestamp是整数，否则要parseInt转换
    var time = new Date(timestamp);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
};
console.log(getDate(1490102694)); //1970-01-18 13:55:02
console.log(getDate(1490102694000)); //2017-03-21 21:24:54
