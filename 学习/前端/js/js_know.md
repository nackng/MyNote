##js弹出修改对话框
```
var specCost = prompt("特供价", "");
if(specCost){
    alert("特供价为:"+specCost);
}  
```
##js判断小数点后有几位
```
var check = setprice * comb.shareRatio / 10000 * comb.combSkuNum;
console.log(check);
var len = check.toString().split(".")[1].length;
```
##js 截取小数点后几位
```
第一种，利用math.round 
 var original=28.453
var result=Math.round(original*100)/100;  //returns 28.45
var result=Math.round(original*10)/10;  //returns 28.5

第二种，js1.5以上可以利用toFixed(x) ，可指定数字截取小数点后 x位
var result=original.toFixed(2); //returns 28.45
var result=original.toFixed(1); //returns 28.5
```
##js 、ajax返回值为数组
```
function checkHasCode(code){
    var ruleId = $("#ruleId").val();
    var res = new Array();
    $.ajax({
        url:basePath + "/cr/getOneByCode.do",
        type : "post",
        async: false,
        data:{"query":code,"ruleId":ruleId},
        dataType : "json",
        success : function(data) {
            if(data.skuId!=null){
                res.push(data.skuId);
                res.push(data.spuId);
            }else{
                res=[];
            }
        }
    });
    return res;//返回值在这里
}  
```
##js中删除指定元素
```
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return - 1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
var emp = ['abs', 'dsf', 'sdf', 'fd'] 
emp.remove('fd');
alert(emp)
```
##js中splice()的强大(插入、删除或替换数组的元素)
```
var lang = ["php", "java", "javascript"];
//删除 
var removed = lang.splice(1, 1);//从下标为1开始删除1个(js数组下标从0开始)
alert(lang); //php,javascript 
alert(removed); //java ,返回删除的项 
//插入 
var insert = lang.splice(0, 0, "asp"); //从第0个位置开始插入 
alert(insert); //返回空数组 
alert(lang); //asp,php,javascript 
//替换 
var replace = lang.splice(1, 1, "c#", "ruby"); //删除一项，插入两项 
alert(lang); //asp,c#,ruby,javascript 
alert(replace); //php,返回删除的项
```
##js找到第一个td
```
var ff = $(this).parent().parent();//this当前操作的对象，ff当前行对象
var td1 = ff.find("td:first").find("input").val();//第一种方式
var td1 = ff.find("td").eq(0).find("input").val();//第二种方式
 
```
##获取最大数与最小数
```
function findMaxAndMinNumber() {
    var numbers = [5, 458, 120, -215, 228, 400, 122205, -85411];
    var maxInNumbers = Math.max.apply(Math, numbers);
    var minInNumbers = Math.min.apply(Math, numbers);
}
```

##js判断对象是否为空
```
function isNull(data){ 
    return (data == "" || data == undefined || data == null) ? "暂无" : data; 
}  
```
##js判断undefined类型
```
if (typeof(reValue) == "undefined") {
    alert("undefined");
}
typeof返回的是字符串，有六种可能："number"、"string"、"boolean"、"object"、"function"、"undefined"
```

##js处理空格
```
function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function ltrim(str){ //删除左边的空格
    return str.replace(/(^\s*)/g,"");
}
function rtrim(str){ //删除右边的空格
    return str.replace(/(\s*$)/g,"");
}  
```
##js eval处理空格
```
/*
eval()函数，它可以把括号里面的内容当做js脚本计算，也可以计算数学运算，也可以对字符串计算。
它不是简单的字符串连接函数，可以把它当做js中的js脚本。
eval()括号里的内容可以理解为嵌在js中的js代码。
*/
//eval("alert('"+f+"')");//计算js脚本，和alert(f)效果一样。
eval(" var gg='haha'");
alert(eval("gg"));//eval里的就是嵌入的js代码，等价于var gg='haha',alert(gg);
//alert(eval('3+4'));//计算数学运算，结果7
//alert(eval('3'+'4'));//计算字符串，结果34
alert("start"+trim(' abc def ')+"end");
//jquery中的trim函数，过滤掉首位空格。
function trim(t){
return (t||"").replace(/^\s+|\s+$/g, "");
}

来源： http://www.jquerycn.cn/a_8478
```
##js数组插入到特定下标
```
$('.barname').bind('input propertychange', function() {
    Array.prototype.insert = function (index, item) {//自定义insert方法
          this.splice(index, 0, item);
    };
    var ff = $(this).parent().parent();
    var td2 = ff.find("td").eq(1).find("input").val()
    console.log(td2)
    var index = $("#indexMod").val();
    $("#indexMod").val(index);
    var trSeq = $(this).parent().parent().prevAll().length + 1;
    var onum = $("#oldnum").val();
    var onumn = $("#oldnum").val();
    var smm = goodsList[trSeq-1];
    smm.name = td2;
    goodsList.splice(trSeq-1,1);
    goodsList.insert(trSeq-1,smm);//插入到某个下标位置
});  
```
##js修改数组中某个对象的属性
```
$('.barname').bind('input propertychange', function() {  
    var ff = $(this).parent().parent();
    var td2 = ff.find("td").eq(1).find("input").val()
    console.log(td2)
    var index = $("#indexMod").val();
    index--;
    $("#indexMod").val(index);
    var trSeq = $(this).parent().parent().prevAll().length + 1;
    var onum = $("#oldnum").val();
    var onumn = $("#oldnum").val();
    var smm = goodsList[trSeq-1];//获取数组中的某个对象
    smm.name = td2;//改变这个对象的name属性
    goodsList.splice(trSeq-1,1);//移除某个对象
    goodsList.push(smm);//添加某个对象
});  
```
##jquery去重
```
jQuery.unique()
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>jQuery.unique demo</title>
  <style>
  div {
    color: blue;
  }
  </style>
  <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>
 
<div>There are 6 divs in this document.</div>
<div></div>
<div class="dup"></div>
<div class="dup"></div>
<div class="dup"></div>
<div></div>
 
<script>
// unique() must take a native array
var divs = $( "div" ).get();
 
// Add 3 elements of class dup too (they are divs)
divs = divs.concat( $( ".dup" ).get() );
$( "div:eq(1)" ).text( "Pre-unique there are " + divs.length + " elements." );
 
divs = jQuery.unique( divs );
$( "div:eq(2)" ).text( "Post-unique there are " + divs.length + " elements." )
  .css( "color", "red" );
</script>
 
</body>
</html>
来源： http://api.jquery.com/jQuery.unique/
There are 6 divs in this document.
Pre-unique there are 9 elements.
Post-unique there are 6 elements.
```
##js关于去重
```
方式一：
<script>
var arr1=["a","b","c"];
var arr2=["a","f","g","c"];
var arr3=[];
for(var s in arr1){
for(var x in arr2){
if(arr1[s]==arr2[x]){
arr3.push(arr1[s]);
}
}
}
alert("相同的元素有："+arr3)
</script>

方式二：
<script type="text/javascript">
var a=['a','b','c','d','e'];
var b=['a','b','f','g','h'];
var arr1 = intersection(a,b);
alert(arr1);
var arr2 = chaji(a,b);
alert(arr2);
var arr3 = inANotInB(a,b);
alert(arr3);
//a,b中重复的部分
function intersection(a,b){
 var obj = new Object();
 for(var i =0,len = a.length;i<len;i++){
obj[a[i]] = a[i];
 }
 for(var i =0,len = b.length;i<len;i++){
obj[b[i]] = b[i];
 }
 var arr = new Array();
 var i = 0; 
 for(var per in obj){
arr[i++] = obj[per];
 }
 return arr;
}
//a与b不重复的部分
function chaji(a,b){
  var obj = new Object();
 for(var i =0,len = a.length;i<len;i++){
obj[a[i]] = 1;
 }
 for(var i =0,len = b.length;i<len;i++){
obj[b[i]] = obj[b[i]]?2:1;
 }
 var arr = new Array();
 var i = 0; 
 for(var per in obj){
if(obj[per] == 1){
 arr[i++] = per;
}
 }
 return arr;
}
 
//b与a不重复的部分
function inANotInB(a,b){
var obj = new Object();
for(var i =0,len = a.length;i<len;i++){
obj[a[i]] = 1;
}
for(var i =0,len = b.length;i<len;i++){
if(obj.hasOwnProperty(b[i])){
obj[b[i]] = undefined;
}
}
var arr = new Array();
var i = 0; 
for(var per in obj){
if(obj[per]){
arr[i++] = per;
}
}
return arr;
}
</script>
```
##js验证输入正整数，并且两位小数
```
function isPositiveNum(s){//是否为正整数
  var re = /^[0-9]*[1-9][0-9]*$/ ;
  return re.test(s)
}

var specCost = prompt("特供价", price);
if(!isPositiveNum(specCost*100)&&(specCost!=null&&specCost!=""))
{
  alert("特供价请输入正整数或两位小数");
  return;
}
```
##保留小数
```
var price = tr.children('td').eq(3).text();
var disPrice = (price * val * 0.1).toFixed(2);  //两位小数
var price = tr.children('td').eq(3).text();
var disPrice = (price * val * 0.1).toFixed(4);  //四位小数
```
##js将 string 转换成为 number
```
JS 中将 number 转换为 string 我们比较熟悉，直接用toString() 的方法就可以了；那么将 string 转换成为 number 都有些什么方法呢？如下便简单的列举了一些，以便记录，说不定什么时候就用到了~~
我们可以使用parseInt ，或者unary plus 或者parseFloat with floor 或者Math.round这些方式，请看如下具体的代码：
1)：parseInt 
        var x = parseInt("10");  // 10
 但是这种只带一个参数的方式会存在诟病。比如我们想将字符串 "010" 转化为数字 10，直接用这个方法将会返回8. 
        var x = parseInt("010"); // 8
 因此这里提供另外一个方法，带有两个参数：第一个是目标转换字符串，第二个用来指定将字符串转化为几进制的数字，并且radix的范围是(2~36) 
parseInt(string, radix)
 例如：
        var x = parseInt("1000", 10);  // 1000
 
2)：unary plus (一元操作符"+")，这种方式非常的巧妙
        var x = +"1000"; // 1000

       var x = +"1000.12"; // 1000.12
 
3)：parseFloat 方法可以将对应的字符串转化为浮点类型的数字
        var x = parseFloat("1000.01") // 1000.01
 
4)：Math.floor 的方式可以对字符和数字进行向下取整
        var x = Math.floor("1000.01"); // 1000var x = Math.floor(1000.01); // 1000var x = Math.floor(1000.91); // 1000
 
5)：Math.round 的方式可以对字符和数字进行四舍五入取整
        var x = Math.round("1000"); //1000 equivalent to round("1000",0)var x = Math.round("1000.56"); // 1001var x = Math.round("1000.23"); // 1000

来源： http://www.cnblogs.com/mingmingruyuedlut/archive/2013/05/19/3082173.html
```
##js实现查找数组中最大值方法汇总
```
//方法一（使用递归函数）：
var arr = [9,8,55,66,49,68,109,55,33,6,2,1];
var max = arr[0];

function findMax( i ){
  if( i == arr.length ) return max;
  if( max < arr[i] ) max = arr[i];
  findMax(i+1);
}
  
findMax(1);
alert(max);
 
//方法二（使用for循环遍历）：
 
var arr = [9,8,55,66,49,68,109,55,33,6,2,1];  
var max = arr[0];
for(var i = 1; i < arr.length; i++){
  if( max < arr[i] ){
    max = arr[i];
  }
}
 
alert(max);
 
//方法三（使用apply将数组传入max方法中直接返回）：
 
Math.max.apply(null,[9,8,55,66,49,68,109,55,33,6,2,1])

//备注：除此之外，还有很多数组排序方式，都可以在排序后，根据新数组索引值获取 最大/最小 值。
 
var a=[1,2,3,5];
alert(Math.max.apply(null, a));//最大值
alert(Math.min.apply(null, a));//最小值
 

//多维数组可以这么修改：
 
var a=[1,2,3,[5,6],[1,4,8]];
var ta=a.join(",").split(",");//转化为一维数组
alert(Math.max.apply(null,ta));//最大值
alert(Math.min.apply(null,ta));//最小值
```
##js中比较两个数的大小
```
方法一：
var issuedNum = +$("#issuedNum").val();
var takeMaxNum = +$("#takeMaxNum").val();
if(takeMaxNum>issuedNum){
        layer.msg('最多领取数量不可大于总发行数量...', { time: 1500 });
        return false;
}  
方法二：
var issuedNum = parseInt($("#issuedNum").val());
var takeMaxNum = parseInt($("#takeMaxNum").val());
if(takeMaxNum>issuedNum){
        layer.msg('最多领取数量不可大于总发行数量...', { time: 1500 });
        return false;
} 

对于小数的情况，可用parseFloat方法：
var specCost=parseFloat($("input[name='specCost']").val());  
```
##js中两个数相减
```
var temp = $("#oldGoodsList").val();
var strlen0 = temp.length;
var strlen1 = eval(strlen0+"-"+5);//eval的作用
var temp0 = temp.substring(9,strlen1);  
```
##js数组依据下标删除元素
 
```
1、创建数组
var array = new Array();
var array = new Array(size);//指定数组的长度
var array = new Array(item1,item2……itemN);//创建数组并赋值

2、取值、赋值
var item = array[index];//获取指定元素的值
array[index] = value;//为指定元素赋值

3、添加新元素
array.push(item1,item2……itemN);//将一个或多个元素加入数组，返回新数组的长度
array.unshift(item1,item2……itemN);//将一个或多个元素加入到数组的开始位置，原有元素位置自动后移，返回  新数组的长度
array.splice(start,delCount,item1,item2……itemN);//从start的位置开始向后删除delCount个元素，然后从start的位置开始插入一个或多个新元素

4、删除元素
array.pop();//删除最后一个元素，并返回该元素
array.shift();//删除第一个元素，数组元素位置自动前移，返回被删除的元素
array.splice(start,delCount);//从start的位置开始向后删除delCount个元素

5、数组的合并、截取
array.slice(start,end);//以数组的形式返回数组的一部分，注意不包括 end 对应的元素，如果省略 end 将复制 start 之后的所有元素
array.concat(array1,array2);//将多个数组拼接成一个数组

6、数组的排序
array.reverse();//数组反转
array.sort();//数组排序，返回数组地址

7、数组转字符串
array.join(separator);//将数组原因用separator连接起来

列了这么都就是没有发现删除数组元素的方法！于是查了一些资料找到了解决方法。
删除数组元素需要扩展Array原型prototype.

Array.prototype.del=function(index){
        if(isNaN(index)||index>=this.length){
            return false;
        }
        for(var i=0,n=0;i
            if(this[i]!=this[index]){
                this[n++]=this[i];
            }
        }
        this.length-=1;
    };

来源： http://blog.sina.com.cn/s/blog_60e74b5d01017og5.html
```

###js参数
```
<div class="per" onclick="javascript:toAdmin();">
    <a>我的创纪云</a>
</div>
<a href="javascript:toAdmin('toAlipay');" class="btn">查看进度</a>
function toAdmin(args) {
var url = "${base}" + "/admin.do";
if(args){//如果参数不传，args为undefined,则不进入到if中，否则url=url?showProgress='toAlipay'
url = url + "?showProgress="+args;
}
location.href = url;
}

```
###js获取年月日
```
var now = new Date();
    var applyDate = now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
    alert(applyDate); //2016-04-11  
```
###js验证页面日期及ajax请求后刷新页面
```
function OkPost(){
    $('.ok').click(function(){
        var orderId = $('#orderId').val();
        var poststartDttm = $('#poststartDttm').val()
        if(!poststartDttm){
            alert("发货日期不能为空!");
            return false;
        }
        var now = new Date(new Date().toLocaleDateString()).getTime();
        var dtime = new Date(new Date(poststartDttm).toLocaleDateString()).getTime();
        if(dtime < now){
            alert("发货日期低于当前时间，不能发货!");
            return false;
        }
        var data = {orderId:orderId,poststartDttm:poststartDttm};
        ajaxPost("${base}/supplier/ajax/makeDelivery.do",data,
            function(data){
                if(data.resultCode == 0){
                    window.location.href=window.location.href;//刷新页面
                    alert("订单发货成功!");
                }else {
                    alert("执行失败:"+data.resultMessage);
                }
            },true);
    });
}  
```
###js实现取消，跳转到指定页面
```
方式一：返回到上一页：<a id="cancel_btn" class="btn btn-primary" href="#" onclick="javascript:history.go(-1);">取消</a>  
方式二：重定向到单元首页：<a id="cancel_btn" class="btn btn-primary" href="#" >取消</a>
$(function(){ 
    $("#cancel_btn").on("click",function(){
        window.location.href="${base}/supplier/toPmanager.do";
    });
}); 
```
###js定时刷新页面及跳转页面
```
javascript:history.go(-1);--返回上一页
history.go(-2); --返回2个页面
history.back();
window.history.forward(); --返回下一页
window.history.go(n); --返回第几页,也可以使用访问过的URL
 
eg:
<a href="javascript:history.go(-1);">向上一页</a>
response.Write("<script language=javascript>")
response.Write("if(!confirm('完成任务?')){history.back();}")
response.Write("</script>")
response.Write("<script language=javascript>history.go(-1);</script>")
<a href="javascript:history.go(-1);">向上一页</a>
 
页面跳转:onclick="window.location.href='list.aspx'"
--小技巧(js引用js):
<script type=text/javascript>
<!--
if (typeof SWFObject == "undefined") {
document.write('<scr' + 'ipt type="text/javascript" src="/scripts/swfobject-1.5.js"></scr' + 'ipt>');
}
//-->
</script>
 
--自动刷新页面的方法:
1.页面自动刷新：把如下代码加入<head>区域中
<meta http-equiv="refresh" content="20"> --每隔20秒刷新一次页面.
2.页面自动跳转：把如下代码加入<head>区域中
<meta http-equiv="refresh" content="20;url=http://www.javaeye.com"> --隔20秒后跳转到http://www.javaeye.com/页面
3.页面自动刷新js版
<script language="JavaScript">
function myrefresh() {
window.location.reload();
}
setTimeout('myrefresh()',1000); //指定1秒刷新一次
</script>
 
--ASP.NET如何输出刷新父窗口脚本语句
1. this.response.write("<script>opener.location.reload();</script>");
2. this.response.write("<script>opener.window.location.href = opener.window.location.href;</script>");
3. Response.Write("<script language=javascript>opener.window.navigate(''你要刷新的页.asp'');</script>")
 
--js刷新框架的脚本语句
//如何刷新包含该框架的页面用
<script language=JavaScript>
parent.location.reload();
</script>
 
//子窗口刷新父窗口
<script language=JavaScript>
self.opener.location.reload();
</script>
(　或　<a href="javascript:opener.location.reload()">刷新</a> )
 
//如何刷新另一个框架的页面用
<script language=JavaScript>
parent.另一FrameID.location.reload();
</script>
 
如果想关闭窗口时刷新或者想开窗时刷新的话，在<body>中调用以下语句即可。
 
<body onload="opener.location.reload()"> 开窗时刷新
<body onUnload="opener.location.reload()"> 关闭时刷新
 
<script language="javascript">
window.opener.document.location.reload()
</script>
```
###得到上传文件的真实路径
```
< script type="text/javascript" src="../js/jquery-1.8.3.js">< /script>
< script type="text/javascript ">
    $(document).ready(function() { 
    //按钮点击发送 
    $("#loadbutton").click(function(){ 
// get path 
var filepath = load(); 
alert(filepath); 
// 传值 
/*$.post(
    'http://localhost:8080/POITest/servlet/process.do',
    { name : "test" },
    function(data){ 
       alert(data); 
    });
*/ 
$.ajax({ 
       type: "post",
            url: "http://localhost:8080/POITest/servlet/process.do", 
            data: "filepath="+ filepath, 
            success: function() { 
                alert("数据处理成功!"); 
            } 
        }); 
}); 
}); 

function load() {
    alert("begin");
    var filepath = getPath(document.getElementById("selectfile1"));
    var selectfile1 = $("#selectfile1").val();
    //alert(filepath); 
    // alert("end3");
    return filepath;
}
function getPath(obj) {
    if (obj) {
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select();
            return document.selection.createRange().text;
        } else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
            if (obj.files) {
                return obj.files.item(0).getAsDataURL();
            }
            return obj.value;
        }
        return obj.value;
    }
}
< /script>
    选择文件：
    < input type="file" name="myexcel" id="selectfile1" />
    < br />
    < input type="button" value="执行" id="loadbutton" />
    < br />
```
###js验证
```
输入正整数：^-?[0-9]\d*$
```
###定义对象、数组，并转换为json
```
var areaList = new Array(); 
for(var i = 1; i <= 3; i ++){ 
     var obj = new Object(); 
     obj.area = "area"+i; 
     obj.first = "first"+i; 
     obj.firstFeight = "firstFeight"+i; 
     obj.continued = "continued"+i; 
     areaList[i-1] = obj; 
} 
alert("areaList:"+areaList); 
res = JSON.stringify(areaList); 
alert("res"+res);
```