## 定义 css:
```
<head>
    <style type="text/css">
    abbr
    {
        font-size: 12px;
    }
    .text10pxwhite
    {
        font-size: 10px;
        color: #FFFFFF;
    }
    </style>
</head>
``` ##  html table td隐藏边框
```

<tr>
<td width="102" style="border-right-style:none">隐藏右边框</td>
<td width="119" style="border-left-style:none">隐藏左边框</td>
</tr>
<tr>
<td style="border-top-style:none">隐藏上边框</td>
<td style="border-bottom-style:none">隐藏下边框</td>
</tr>
```
##jquery 动态设置css 及 style
```
if (promotion[ "globalSite" ] == 0){
     $( "#skuRange_form" ).css({ "margin-top" : "-85px" });
} else {
     $( "#skuRange_form" ).css({ "margin-top" : "-45px" }); }  





一、CSS 
1、css(name) 
访问第一个匹配元素的样式属性。 
返回值 String 
参数 
name (String) : 要访问的属性名称 
示例： 
$("p").css("color"); //取得第一个段落的color样式属性的值 
2、css(properties) 
把一个“名/值对”对象设置为所有匹配元素的样式属性。这是一种在所有匹配的元素上设置大量样式属性的最佳方式。 
返回值 jQuery 
参数 
properties (Map) : 要设置为样式属性的名/值对 
示例：
//1 将所有段落的字体颜色设为红色并且背景为蓝色 
$("p").css({ color: "#ff0011", background: "blue" });


//2 如果属性名包含 "-"的话，必须使用引号 
$("p").css({ "margin-left": "10px", "background-color": "blue" }); 
3、css(name,value) 
在所有匹配的元素中，设置一个样式属性的值。数字将自动转化为像素值 
返回值 jQuery 
参数
name (value) : 属性名 
value (String, Number) : 属性值 
示例： 
$("p").css("color","red"); //将所有段落字体设为红色 
二、位置 
1、offset() 
获取匹配元素在当前视窗口的相对偏移。返回的对象包含两个整形属性：top 和 left。 
注意：此方法只对可见元素有效。 
返回值 Object{top,left} 
示例：
/* 
//获取第二段的偏移 
文档片段：<p>Hello</p><p>2nd Paragraph</p> 
*/ 
var p = $("p:last"); 
var offset = p.offset(); 
p.html("left: " + offset.left + ", top: " + offset.top); 
2、position() 
获取匹配元素相对父元素的偏移。 
返回的对象包含两个整形属性：top 和 left。为精确计算结果，请在补白、边框和填充属性上使用像素单位。此方法只对可见元素有效。 
返回值 Object{top,left} 
示例：
/* 
//获取第一段的偏移 
文档片段：<p>Hello</p><p>2nd Paragraph</p> 
*/ 
var p = $("p:first"); 
var position = p.position(); 
$("p:last").html("left: " + position.left + ", top: " + position.top); 
3、scrollTop() 
获取匹配元素相对滚动条顶部的偏移。 
注意：此方法对可见和隐藏元素均有效。 
返回值 Integer 
示例：
/* 
//获取第一段相对滚动条顶部的偏移  
文档片段：<p>Hello</p><p>2nd Paragraph</p> 
*/ 
var p = $("p:first"); 
$("p:last").text("scrollTop:" + p.scrollTop()); 
4、scrollTop(val) 
传递参数值时，设置滚动条顶部偏移为该值。此方法对可见和隐藏元素均有效。 
返回值 jQuery 
示例： 
$("div.demo").scrollTop(300); 
5、scrollLeft() 
获取匹配元素相对滚动条左侧的偏移。此方法对可见和隐藏元素均有效。 
返回值 Integer 
示例：
/* 
//获取第一段相对滚动条左侧的偏移    
文档片段：<p>Hello</p><p>2nd Paragraph</p> 
*/
var p = $("p:first"); 
$("p:last").text("scrollLeft:" + p.scrollLeft()); 
6、scrollLeft(val) 
传递参数值时，设置滚动条左侧偏移为该值。此方法对可见和隐藏元素均有效。 
返回值 jQuery 
示例： 
$("div.demo").scrollLeft(300); 
三、尺寸 
1、height() 
取得第一个匹配元素当前计算的高度值（px）。在 jQuery 1.2 以后可以用来获取 window 和 document 的高 
返回值 Integer 
示例：
/* 
//获取第一段的高     
文档片段：<p>Hello</p><p>2nd Paragraph</p> 
*/ 
alert($("p").height());
//获取文档的高 
alert($(document).height()); 
2、height(val) 
为每个匹配的元素设置CSS高度(hidth)属性的值。如果没有明确指定单位（如：em或%），使用px。如果没有明确指定单位（如：em或%），使用px。 
返回值 jQuery 
参数 
val (String, Number) : 设定CSS中 'height' 的值 
示例：
/* 
//把所有段落的高设为 20  
文档片段：<p>Hello</p><p>2nd Paragraph</p> 
*/ 
$("p").height(20);
alert($("p").height());
3、width() 
取得第一个匹配元素当前计算的宽度值（px）。在 jQuery 1.2 以后可以用来获取 window 和 document 的宽 
返回值 Integer 
示例：0
/* 
//获取第一段的宽 
文档片段：<p>Hello</p><p>2nd Paragraph</p> 
*/
alert($("p").width()); 
4、width(val) 
为每个匹配的元素设置CSS宽度(width)属性的值。如果没有明确指定单位（如：em或%），使用px。 
返回值 jQuery 
参数 
val (String, Number) : 设定 CSS 'width' 的属性值 
示例：
/* 
//将所有段落的宽设为 20 
文档片段：<p>Hello</p><p>2nd Paragraph</p> 
*/ 
$("p").width(20); 
alert($("p").width()); 
5、innerHeight() 
获取第一个匹配元素内部区域高度（包括补白、不包括边框）。此方法对可见和隐藏元素均有效。 
返回值 Integer 
示例：
/* 
//获取第一段落内部区域高度 
文档片段：<p>Hello</p><p>2nd Paragraph</p> 
*/ 
var p = $("p:first"); 
$("p:last").text("innerHeight:" + p.innerHeight()); 
7、innerWidth() 
获取第一个匹配元素内部区域宽度（包括补白、不包括边框）。此方法对可见和隐藏元素均有效。 
返回值 Integer 
示例：
/* 
//获取第一段落内部区域宽度 
文档片段：<p>Hello</p><p>2nd Paragraph</p> 
*/ 
var p = $("p:first"); 
$("p:last").text("innerWidth:" + p.innerWidth());
7、outerHeight(options) 
获取第一个匹配元素外部高度（默认包括补白和边框）。此方法对可见和隐藏元素均有效。 
返回值 Integer 
参数 
options(Boolean) : (false)  设置为 true 时，计算边距在内。 
示例：
/* 
//获取第一段落外部高度 
文档片段：<p>Hello</p><p>2nd Paragraph</p> 
*/ 
var p = $("p:first"); 
$("p:last").text("outerHeight:" + p.outerHeight() + " , outerHeight(true):" + p.outerHeight(true)); 
8、outerHeight(options) 
获取第一个匹配元素外部宽度（默认包括补白和边框）。此方法对可见和隐藏元素均有效。 
返回值 Integer 
参数 
options(Boolean) : (false)   设置为 true 时，计算边距在内。 
示例：
/* 
//获取第一段落外部宽度 
文档片段：<p>Hello</p><p>2nd Paragraph</p> 
*/ 
var p = $("p:first"); 
$("p:last").text("outerWidth:" + p.outerWidth() + " , outerWidth(true):" + p.outerWidth(true));


补充另一篇文章


//1、获取和设置样式
$("#tow").attr("class")获取ID为tow的class属性
$("#two").attr("class","divClass")设置Id为two的class属性。
//2、追加样式
$("#two").addClass("divClass2")为ID为two的对象追加样式divClass2
//3、移除样式
$("#two").removeClass("divClass")移除 ID为two的对象的class名为divClass的样式。
$(#two).removeClass("divClass divClass2")移除多个样式。
//4、切换类名
$("#two").toggleClass("anotherClass") //重复切换anotherClass样式
//5、判断是否含有某项样式
$("#two").hasClass("another")==$("#two").is(".another");
//6、获取css样式中的样式
$("div").css("color") 设置color属性值. $(element).css(style)
//设置单个样式
$("div").css("color","red")
//设置多个样式
$("div").css({fontSize:"30px",color:"red"})
$("div").css("height","30px")==$("div").height("30px")
$("div").css("width","30px")==$("div").height("30px")
//7.offset()方法
//它的作用是获取元素在当前视窗的相对偏移，其中返回对象包含两个属性,即top和left 。
//注意：只对可见元素有效。
var offset=$("div").offset();
var left=offset.left;         //获取左偏移
var top=offset.top;        //获取右偏移
//8、position()方法
//它的作用是获取元素相对于最近的一个position样式属性设置为relative或者absolute的祖父节点的相对偏移，与offset()一样，它返回的对象也包括两个属性即top和left。
//9、scrollTop()方法和scrollLeft()方法
$("div").scrollTop();        //获取元素的滚动条距顶端的距离。
$("div").scrollLeft();         //获取元素的滚动条距左侧的距离。
//10、jQuery中的 toggle和slideToggle 方法，都可以实现对一个元素的显示和隐藏。区别是：
//toggle：动态效果为从右至左。横向动作。
//slideToggle：动态效果从下至上。竖向动作。
//比如想实现一个树由下至上收缩的动态效果，就使用slideToggle就ok了。
$('input').attr("readonly",true)//将input元素设置为readonly
$('input').attr("readonly",false)//去除input元素的readonly属性
$('input').attr("disabled",true)//将input元素设置为disabled
$('input').attr("disabled",false)//去除input元素的disabled属性
```

