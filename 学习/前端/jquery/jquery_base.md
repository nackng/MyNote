## 按钮的灰色与恢复
```
1.按钮的id为regbtn
==》 控制按钮为禁用：
$("# regbtn ").attr({"disabled":"disabled"});
==》控制按钮为可用
$("# regbtn ").removeAttr("disabled");
```
##判断null、undefined与NaN的方法
```
1.判断undefined: 
if (typeof(tmp) == "undefined")

说明：typeof 返回的是字符串，有六种可能："number"、"string"、"boolean"、"object"、"function"、"undefined" 

2.判断null: 
var tmp = null; 

if (!tmp && typeof(tmp)!="undefined" && tmp!=0){ 
     alert("null"); 
}
3.判断NaN: 
var tmp = 0/0; 

if(isNaN(tmp)){ 
     alert("NaN"); 
}
说明：如果把 NaN 与任何值（包括其自身）相比得到的结果均是 false，所以要判断某个值是否是 NaN，不能使用 == 或 === 运算符。 

提示：isNaN() 函数通常用于检测 parseFloat() 和 parseInt() 的结果，以判断它们表示的是否是合法的数字。当然也可以用 isNaN() 函数来检测算数错误，比如用 0 作除数的情况。 


4.判断undefined和null: 
var tmp = undefined; 

if (tmp== undefined)  { 
     alert("null or undefined"); 
}
var tmp = undefined; 
if (tmp== null)  { 
     alert("null or undefined"); 
}
说明：null==undefined 


5.判断undefined、null与NaN: 【推荐】

var tmp = null; 

if (!tmp)  { 
        alert("null or undefined or NaN"); 
}
提示：一般不那么区分就使用这个足够。 

```
##去除空格
```
1.写成类的方法格式如下：（str.trim();）
　　<script language="javascript">
　　 String.prototype.trim=function(){
　　    return this.replace(/(^\s*)|(\s*$)/g, "");
　　 }
　　 String.prototype.ltrim=function(){
　　    return this.replace(/(^\s*)/g,"");
　　 }
　　 String.prototype.rtrim=function(){
　　    return this.replace(/(\s*$)/g,"");
　　 }
　　</script>
2.写成函数可以这样：(trim(str))
　　<script type="text/javascript">
　　 function trim(str){ //删除左右两端的空格
　　     return str.replace(/(^\s*)|(\s*$)/g, "");
　　 }
　　 function ltrim(str){ //删除左边的空格
　　     return str.replace(/(^\s*)/g,"");
　　 }
　　 function rtrim(str){ //删除右边的空格
　　     return str.replace(/(\s*$)/g,"");
　　 }
　　</script>
```