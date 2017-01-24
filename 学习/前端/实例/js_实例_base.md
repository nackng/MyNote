[TOC]
##刚刚 1分钟前 2分钟前
```
1.test.html
<!DOCTYPE html>
<html>
<head>
    <title>SmartTime</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<div class="smartTime" smartTime="1485227471"></div>
<div class="smartTime" smartTime="1485227481"></div>
<div class="smartTime" smartTime="1485227491"></div>
<script src="jquery.min.js"></script>
<script src="smartTime.js"></script>
<script type="text/javascript">
    $(function(){
        var timestamp0 = Date.parse(new Date());
        var timestamp1 = (new Date()).valueOf();
        var timestamp2 = new Date().getTime();
        console.log(timestamp0+","+timestamp1+","+timestamp2);
        $(".smartTime").smartTime({
            to: "yyyy-MM-dd",
            attr: "smartTime"
        });
    });
</script>
</body>
</html>


2.smartTime.js
$.fn.smartTime = function(options){
    var defaults = {
        to: "yyyy-MM-dd",
        attr: "smartTime"
    };
    var opts = $.extend(defaults, options);
    return this.each(function () {
        var $this = $(this);
        var now = new Date().getTime();
        var old = $this.attr(opts.attr);
        if (!old||old<1000){
            return;
        }
        var t = now - old*1000;
        var newTimeStr = "";
        if (t<1000*60*2){
            newTimeStr = "刚刚";
        } else if (t < 1000*60*60){
            newTimeStr = parseInt(t/(1000*60))+"分钟前";
        } else if (t < 1000*60*60*24){
            newTimeStr = parseInt(t/(1000*60*60))+"小时前";
        } else if (t < 1000*60*60*24*30){
            newTimeStr = parseInt(t/(1000*60*60*24))+"天前";
        } else {
            newTimeStr = new Date(old*1000).format(opts.to);
        }
        $this.html(newTimeStr);
    });
}
Date.prototype.format = function(fmt) {
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
```