##html()/text()/val()区别
```
jQuery封装的方法html,text,val
.html()用为读取和修改元素的HTML标签
.text()用来读取或修改元素的纯文本内容
.val()用来读取或修改表单元素的value值。

text和html分为一组，他们都是对元素取值或设置，只有val是对表单元素的。

另外：
innerText 设置或获取位于对象起始和结束标签内的文本 
outerText 设置(包括标签)或获取(不包括标签)对象的文本
但是innerText 不被firefox支持所以不建议使用

使用举例：
html()去元素的内容的时候，能将所选定的元素下面的格式也取到了。
如：<div id="divShow"><b><i>Write Less Do More</i></b></div>

$("#divShow").html() = "<b><i>Write Less Do More</i></b>";
$("#divShow b i").html() = "Write Less Do More";
$("#divShow").text() = "Write Less Do More";
```