[TOC]
##如何动态添加元素到页面中
```
https://segmentfault.com/a/1190000008571506
假设在点击“添加一个乘客”按钮的时候，需要JS动态创建出一个新的输入框来填写姓名：

<h2>乘客列表：</h2>
<form class="form">
    <div class="form-group">
        乘客姓名：<input type="text" class="form-control" name="member[]">
    </div>
    <button class="create-passenger" type="button">添加一个乘客</button>
    <button type="submit">保存</button>
</form>
从上面可以看出，要实现这个功能，我们需要处理的HTML片段是：

<div class="form-group">
    乘客姓名：<input type="text" class="form-control" name="member[]">
</div>
勉强的方案：手动复制粘贴HTML拼接成JS字符串
那么我们先来看看传统的做法是这样子的：

先直接手动复制粘贴HTML拼接成JS字符串，然后再插入到表单中。

$('.create-passenger').on('click', function() {
    
    // 先直接手动复制粘贴HTML拼接成JS字符串
    var html = 
        '<div class="form-group">' +
        '    乘客姓名：<input type="text" class="form-control" name="member[]">' +
        '</div>';
    // 然后再插入到表单中
    $('.form').append(html);
});
点评&分析
这是种偷懒的实现方式，在部分中小型网站、教科书上，最常见到它的身影。

在开发时的时候，某些情况下使用这种方案，的确可能会比较快速，直接复制粘贴HTML拼成JS字符串就可以了。

但满足这样的条件必须是：

要拼接的HTML字符串很短；
页面结构已经很稳定，能保证以后不会需要作出修改；
页面HMTL和JS的代码量都不多，或者已经直接把JS写在页面上了，所以即使设计不合理也能比较容易查看和维护。
问题&思考
没有做好HTML和JS的分离，脚本强烈耦合了HTML，不妥不妥。

要是后期页面上的HTML有了改动，必须同时记得去找出相关的脚本文件，在JS代码中搜索并修改里面写死的HTML字符串才行。

换个角度再想一想，如果插入的HTML很复杂，有几百行的话。要在JS脚本中手动拼接庞大的字符串，是件非常的麻烦事情，还十分容易出差错。

更好的方案：模板分离原则
模板分离原则：将定义模板的那一部分，与JS的代码逻辑分离开来，让代码更加优雅且利于维护。
一、利用页面上现有的DOM元素作为模板
通过分析页面我们可以知道，表单初始的时候是至少会存在一个乘客输入项的。

所以我们可以复制表单上第一个乘客的DOM来作为模板：

$('.create-passenger').on('click', function() {

    // 复制第一个乘客的DOM作为模板
    var template = $('.form .form-group:first-child').clone();
    // 将DOM模板插入到表单中，形成新的一行
    $('.form').append(template);
});
注意点&细节解析

实例中用了jquery的clone()方法，可以复制整个jquery包装过的DOM对象（不包括对象绑定的事件，如果要连事件也一起复制的话，可以加个参数clone(true)哦）。

有时候复制过来的DOM对象有可能不是最原始的状态，所以记得要初始化一下。例如有像input这样的输入项，要记得把value的值先初始化哦template.find('input').val('')。

二、在隐藏的标签中定义模板
如果页面本来就没有相关的DOM，这时候可以手动新建一个隐藏的<div>，然后在里面定义我们的模板：

<div id="passenger-template" style="display: none;">
    <div class="form-group">
        乘客姓名：<input type="text" class="form-control" name="member[]">
    </div>
</div>
接下来用JS去取这个元素的内容作为模板：

var template = $('#passenger-template > div').clone();
注意点&细节解析

用一个标签来包裹模板的理由，

一是取模板的时候可以很方便，直接clone()或者html()就可以了；
二是为了更好地分类和规范。例如定义模板时，要求大家都用同一种标签和CSS类：<div class="template">
当然不一定去用<div>，也可以使用别的标签，或者自定义一个<template>标签专门放模板，不过这时候要注意IE8下面自定义标签会有些许问题哦。

三、在<script>标签中定义模板
如果想更加清晰地区分开模板和正常的页面元素的话，还可以用<script>标签：

<script id="passenger-template" type="text/html"> <!- 注意标签内的type属性 -!>
    <div class="form-group">
        乘客姓名：<input type="text" class="form-control" name="member[]">
    </div>
</script>
注意点&细节解析

<script>标签内的type="text/html"，它能告诉浏览器这个标签里面的内容不是JS脚本，可以直接忽略不用去解析。这样浏览器就不会报错了。

还有一点是这时候就不能直接使用clone()了哦，因为<script>标签里面的内容不是DOM对象，而是字符串类型的HTML片段。

所以记得要通过html()方法获取我们字符串形式的模板：

var template = $('#passenger-template').html(); // 获取的是字符串，不是DOM对象
模板分离原则的好处
JS和HTML做到了完全的解耦，十分利于后期的修改和维护。
脚本上没有了多余的代码，我们在开发的时候，只需关注业务逻辑了。
不用再去手动复制粘贴HTML来拼接JS字符串，写HTML比拼JS字符串要来的轻松，而且不容易出错。所以是一个明智之举，也算是有技巧地偷懒。
如果复制页面现有的DOM作为模板的话，可以完全脱离后期需要维护模板的限制。以后即使页面有修改了，JS这个“添加一个乘客”的功能，也一样能正常工作，适应性极强。
```
##如何添加数据到动态添加的元素中
```
新增的需求是这样的：如果想把特定的乘客信息，添加到新增的页面元素中，那样该怎么办呢？

$.ajax({
    url: '/getPassengers', // 后台获取所有乘客的信息
    success: function(passengers) {
        
        var html = ''; // 储存要插入到页面的HTML片段
        var len = passengers.length;
        for (var i = 0; i < len; i++) {
            // 获取带有该乘客信息的HTML片段
            html += get_passenger_html(passengers[i]); // 后面将详细讲这个函数的实现方式
        }
        $('.form').append(html);
    }
});
下面将集中讲一下，改如何生成带有指定乘客信息的HTML片段，也就是这个get_passenger_html()的内部实现方式。

勉强的方案：手动将数据拼接到HTML字符串中去
function get_passenger_html(passenger) {
    
    var html = '';
    html += '<div class="form-group">';
    html += '    乘客姓名：<input type="text" class="form-control" name="member[]" ';
    html += '    value="' + passenger.name + '">'; // 将乘客姓名拼接到HTML字符串中
    html += '</div>';
    
    return html;
}
点评&分析
这个也是最传统的数据跟HTML字符串拼接的的方式，没有用到模板，脚本上会存在冗长的HTML字符串拼接代码。

问题&思考
这种做法没办法使用之前提到的模板技术，后期维护难是一个重大问题。

数据多一点或者html复杂一点，手动拼接字符串耗费精力、容易出错的弊端就会越来越显现。

更好的方案：分离数据操作和模板定义
能不能先定义好模板，然后再做数据插入的操作呢？这样就可以将模板定义和数据操作分离开来了，跟JS的字符串拼接Say good bye啦。

下面展示两种分离数据操作和模板定义的实现方式：

一、操作DOM对象来插入数据
如果要插入的数据刚好是在某个标签或属性内，可以使用操作DOM对象的方式来插入数据：

function get_passenger_html(passenger) {
    
    var html = $('#passenger-template').html(); // 获取HTML字符串模板
    var dom = $(html); // 先即将HTML字符转成DOM对象
    dom.find('.name').html(passenger.name); // 找到存放乘客姓名的DOM节点并插入数据
    dom.find('.tel').html(passenger.tel); // 找到存放乘客电话的DOM节点并插入数据
    // 把处理完毕的DOM转回HTML字符串并返回
    return dom.prop("outerHTML"); 
}
注意点&细节解析

如果模板不是clone()得来的，要先用$(html)将HTML字符串转成DOM对象，然后才能用find()去找到对应的DOM节点来操作哦。
html()方法只能获取子元素的HTML字符串，要获取包括自己的HTML字符串的话，要去读取outerHTML属性，这是个DOM对象原生的属性，所以要用prop()才能获取得到哦。
二、替换自定义的占位符成指定数据
第一步先安照前面讲到的模板分离原则，定义了一个模板。在定义这个模板的时候，顺带添加一些带有特殊含义的占位符：{name}和{tel}。

<script id="passenger-template" type="text/html">
    <ul class="passenger-list">
        <li>
            乘客姓名：
            <span class="name">{name}</span>
        </li>
        <li>
            乘客电话：
            <span class="tel">{tel}</span>
        </li>
    </ul>
</div>
第二步就是利用String.replace()逐个替换掉这些自定义的占位符：

function get_passenger_html(passenger) {
    
    var html = $('#passenger-template').html(); // 获取HTML字符串模板
    // 用乘客姓名替换掉我们自定义的占位符
    html = html.replace(passenger.name, '{name}'); // 替换姓名占位符
    html = html.replace(passenger.tel, '{tel}'); // 替换电话占位符
    
    return html;
}
注意点&细节解析

占位符的边界要特殊一点，例如用{和}，这样子就能避免在替换的时候，把其他有相似的字符被抹掉了。

更通用的方案：智能结合模板和数据
介绍通用方案前，假设我们获取到的模板是下面这一段字符串：

var template = '乘客姓名：{name}，他的电话是：{tel}，哈哈哈哈哈。';
想要替换掉占位符的JSON数据是：

var data = {
    name: '小神游',
    tel: 12312423423
};
按之前介绍的方法，要一个个写死:

template.replace('{name}', data.name); 
template.replace('{tel}', data.tel); 
太麻烦了，本来已经模板上定了一次占位符。但是到了对应的JS上也要再手写一次，并且数据属性名也要手写，才能够保证可以替换成功。这样子代码写得一点都不优雅。

懒惰的我们，从不喜欢重复劳动。这时候新建了个通用方法，能将特定模板和对应数据智能地匹配。

使用方法是这样的：

// 直接传入模板和数据即可
var html = template_replace(template, data);
console.log(html);
// 输出替换了数据的模板字符：乘客姓名：小神游，他的电话是：12312423423，哈哈哈哈哈。
哈哈哈，直接搞定！能够智能匹配模板和数据，而且还能复用在别的地方，以后可以偷懒了！

那么怎样写这个方法，把模板和数据智能地匹配呢？

以替换占位符{name}为例，大体思路是：

找出模板占位符的左右边界，也就是{和}
获取边界内的字符串，得到数据属性名，也就是name
把整个占位符用属性值替换掉，也就是{name}替换成data['name']
方法的整体结构
// 将模板和数据结合起来
var template_replace = function(template, data) {

    // 内部方法：获取第一个匹配到的占位符位置，也就是"{"和"}"的索引
    function get_next_placeholder_index_range() { ... }

    // 内部方法：将索引范围内的字符串，替换成data中具体的属性值
    function set_replacement(indexRange) { ... }

    // 内部方法：替换所有占位符成为对应数据
    function begin_replace() { ... }
    
    // 开始执行替换
    begin_replace();
    
    return template; // 返回替换完毕的模板字符串
};
内部方法：获取占位符位置
这个内部方法get_next_placeholder_index_range()，
用于获取第一个匹配到的占位符位置，也就是"{"和"}"的索引

从索引0开始，查找第一个匹配到的左边界{的索引值

var leftIndex = template.indexOf('{', 0);
从左边界的索引开始，查找第一个匹配到的右边界}的索引值

var rightIndex = template.indexOf('}', leftIndex);
根据情况返回包含左右边界索引值的对象

if (leftIndex === -1 || rightIndex === -1) { // 没有搜素到匹配的占位符
    return false;
} else { // 存在占位符，返回开始和结束的索引
    return {left: leftIndex, right: rightIndex};
}
注意点：如果没有匹配的项，indexOf()会返回-1。

内部方法：替换数据
这个内部方法set_replacement()，用于将索引范围内的字符串，替换成data中具体的属性值。

获取左右边界内的字符串，不包括{和}

var key = template.slice(indexRange.left + 1, indexRange.right);
注意点：slice()的第一个参数表示从哪个index开始截取（包括这个index的字符），所以如果要忽略{的话，要从indexRange.left + 1开始截取。

注意点：slice()的第二个参数表示获取这个index值之前的字符串，所以刚好可以直接写indexRange.right来忽略}了。

用属性值提替换掉占位符内的字符串，包括{和}

template = template.replace('{' + key + '}', data[key]);
注意点：示例没有做二维三维数据的转换，有需要的话可以扩展下代码：

var key = template.slice(indexRange.left + 1, indexRange.right);
var keys = key.split('.'); // 根据点语法获取各级的属性名
var value = ''; // 属性值
switch (keys.length) {
    case 1: // 一维，如{name}
        value = data[keys[0]];
        break;
    case 2: // 二维，如{name.firstName}
        value = data[keys[0]][keys[1]];
        break;
    case 3: // 三维，如{name.firstName.firstWord}
        value = data[keys[0]][keys[1]][keys[2]];
        break;
    default:;
}
template = template.replace('{' + key + '}', value);
不过扩展时要注意适度的权衡。当我们扩展的代码越来越多的时候，就证明这个自定义的函数已经开始满足不了需求了，这时候建议转向使用第三方解决方案，后面会有介绍一个最佳的模板框架。

注意点：这个简单示例没有做容错机制，目的是展示数据替换的方法。所以前提是假设模板的占位符都已经和数据是对应的哦。

继续递归替换

begin_replace(); // 继续递归替换
利用begin_replace方法，检查模板中还有没有下一个占位符，如果存在下一个占位符的话，begin_replace会继续递归调用get_replacement来替换下一个，这两个函数的互相调用会一直轮回，直到模板所有占位符替换结束为止。

内部方法：统筹递归替换数据
这个方法begin_replace()将会调用前面的定义两个内部函数，目的是为了统筹递归替换数据的操作。

检查模板中还有没有占位符

var indexRange = get_next_placeholder_index_range();
开始进行替换

如果有占位符，可以开始进行替换了：

if (indexRange) { // 
  set_replacement(indexRange);
}
完整的使用示例
var template = '乘客姓名：{name}，他的电话是：{tel}，哈哈哈哈哈。';
var data = {
    name: '小神游',
    tel: 12312423423
};
// 直接传入模板和数据即可
var html = template_replace(template, data);
console.log(html);
// 乘客姓名：小神游，他的电话是：12312423423，哈哈哈哈哈。
完整的代码示例
var template_replace = function(template, data) {

  function get_next_placeholder_index_range() { 
  
    var leftIndex = template.indexOf('{', 0);
    var rightIndex = template.indexOf('}', leftIndex);
    if (leftIndex === -1 || rightIndex === -1) {
      return false;
    } else {
      return {left: leftIndex, right: rightIndex};
    }
  }

  function set_replacement(indexRange) {
    
    var key = template.slice(indexRange.left + 1, indexRange.right);
    template = template.replace('{' + key + '}', data[key]);
    begin_replace();
  }

  function begin_replace() {

    var indexRange = get_next_placeholder_index_range();
    if (indexRange) {
      set_replacement(indexRange);
    }
  }

  begin_replace();
  
  return template;
};
代码最后大概20行左右，从此就可以大大提高生产力，也让以后写的代码都更加优雅。

第三方解决方案：ArtTemplate.js
当你需要更Power的模板功能的时候，不一定要自己写，更理智的做法是使用成熟的模板引擎。

这里给出我多年一直在使用的、认为是最好的模板引擎：Artemplate.js
Github地址是：https://github.com/aui/artTem...

ArtTemplate是腾讯出的模板引擎，支持很多高级的模板操作，例如循环遍历、条件分支等等；并且它的解析速度是众多模板引擎中最快的。

哈哈，在我们尝试写过简单的模板解析，理解了应该怎样善用模板和处理模板，让代码更加优雅且利于维护之后。用起第三方的模板引擎的时候会更加的感动：我的天，这东西怎么会这么方便。

结语
通过对比“勉强的方案”，和介绍各种“更好的方案”，其实总结起来都离不开一句话：让代码更加优雅且利于维护。
```
## 用JS获取地址栏参数的方法（超级简单）
```
方法一：采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）

alert(GetQueryString("参数名1"));
若地址栏URL为：abc.html?id=123&url=http://www.maidq.com
那么，但你用上面的方法去调用：alert(GetQueryString("url"));
则会弹出一个对话框：内容就是 http://www.maidq.com
如果用：alert(GetQueryString("id"));那么弹出的内容就是 123 啦；
function  GetQueryString(name){
      var  reg =  new  RegExp( "(^|&)" + name + "=([^&]*)(&|$)" );
      var  r = window.location.search.substr(1).match(reg);
      if (r!= null ) return   unescape(r[2]);  return   null ; }   


方法二：
方法二：传统方法
<script type="text/javascript">
function UrlSearch() 
{
   var name,value; 
   var str=location.href; //取得整个地址栏
   var num=str.indexOf("?") 
   str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]


   var arr=str.split("&"); //各个参数放到数组里
   for(var i=0;i < arr.length;i++){ 
    num=arr[i].indexOf("="); 
    if(num>0){ 
     name=arr[i].substring(0,num);
     value=arr[i].substr(num+1);
     this[name]=value;
     } 
    } 
} 
var Request=new UrlSearch(); //实例化
alert(Request.id);
</script>


比如说把这个代码存为1.html


那么我要访问1.html?id=test


这个时候就取到test的值了

在html里调用
<script type="text/javascript">
var a="http://baidu.com";
</script>
</head>
<body>
<a id="a1" href="">sadfsdfas</a>
<script>
var a1=document.getElementById("a1");
a1.href=a;
</script>


<script type="text/javascript"> 
var a="http://xxx.com/gg.htm?cctv"; 
var s=a.indexOf("?"); 
var t=a.substring(s+1);// t就是?后面的东西了 
</script>

stringvar.substr(start [, length ]

返回一个从指定位置开始的指定长度的子字符串。

stringvar

必选项。要提取子字符串的字符串文字或 String 对象。

start


必选项。所需的子字符串的起始位置。字符串中的第一个字符的索引为 0。


length


可选项。在返回的子字符串中应包括的字符个数。


如果 length 为 0 或负数，将返回一个空字符串。如果没有指定该参数，则子字符串将延续到 stringvar 的最后。


下面列举出一些相关的参数：


str.toLowerCase()   转换成小写  
str.toUpperCase()   字符串全部转换成大写


URL即:统一资源定位符 (Uniform Resource Locator, URL) 
完整的URL由这几个部分构成：
scheme://host:port/path?query#fragment 
scheme:通信协议
常用的http,ftp,maito等


host:主机
服务器(计算机)域名系统 (DNS) 主机名或 IP 地址。


port:端口号
整数，可选，省略时使用方案的默认端口，如http的默认端口为80。


path:路径
由零或多个"/"符号隔开的字符串，一般用来表示主机上的一个目录或文件地址。


query:查询
可选，用于给动态网页（如使用CGI、ISAPI、PHP/JSP/ASP/ASP.NET等技术制作的网页）传递参数，可有多个参数，用"&"符号隔开，每个参数的名和值用"="符号隔开。


fragment:信息片断
字符串，用于指定网络资源中的片断。例如一个网页中有多个名词解释，可使用fragment直接定位到某一名词解释。(也称为锚点.)


对于这样一个URL


http://www.maidq.com/index.html?ver=1.0&id=6#imhere


我们可以用javascript获得其中的各个部分
1, window.location.href
整个URl字符串(在浏览器中就是完整的地址栏)
本例返回值: http://www.maidq.com/index.html?ver=1.0&id=6#imhere


2,window.location.protocol
URL 的协议部分
本例返回值:http:


3,window.location.host
URL 的主机部分
本例返回值:www.maidq.com


4,window.location.port
URL 的端口部分
如果采用默认的80端口(update:即使添加了:80)，那么返回值并不是默认的80而是空字符
本例返回值:""


5,window.location.pathname
URL 的路径部分(就是文件地址)
本例返回值:/fisker/post/0703/window.location.html


6,window.location.search
查询(参数)部分
除了给动态语言赋值以外，我们同样可以给静态页面,并使用javascript来获得相信应的参数值
本例返回值:?ver=1.0&id=6


7,window.location.hash
锚点
本例返回值:#imhere


```
##js函数,移除元素、元素是否在数组中
```
Array.prototype.indexOf =  function (val) {
     for  ( var  i = 0; i <  this .length; i++) {
         if  ( this [i] == val)  return  i;
    }
     return  - 1;
};
Array.prototype.remove =  function (val) {
     var  index =  this .indexOf(val);
     if  (index > -1) {
         this .splice(index, 1);
    }
};
Array.prototype.in_array =  function (e){  
     for (i=0;i< this .length;i++){
         if ( this [i] == e)  
         return   true ;  
    }
     return   false ;   }   

```
##js数组去重
```
1.先将数组排序（会有弊端，如果排序后还会用到原来的数组顺序，此方法就不行）
//保存时是否有相同条码
function checkBarCode(){
var flag = false;
var nary=barCodeList.sort();
for(var i=0;i<barCodeList.length;i++){
if (barCodeList[i]==barCodeList[i+1]){
alert("数组重复内容："+barCodeList[i]);
flag = true;
break;
}
}
return flag;
}


2.推荐这种方式
function unique(arr) {
var result = [], hash = {};
for (var i = 0, elem; (elem = arr[i]) != null; i++) {
if (!hash[elem]) {
hash[elem] = true;
}else{
result.push(elem);
}
}
return result;
}
```
## js 获取select的值 / js动态给select赋值
```
<script type="text/javascript">
    function getSelectValue() {
        var selectCount = document.getElementById("select1").options;
        for (var i = 0; i < selectCount.length; i++) {
            if (selectCount[i].selected) {
                alert(selectCount[i].value);
            }
        }
        setSelectValue();
    }
    function setSelectValue() {
        var t = document.getElementById("select1");
        var selectValue = t.options[t.selectedIndex].value; //获取select的值  
        var t1 = document.getElementById("select2");


        for (i = 0; i < t1.length; i++) { //给select赋值  
            if (selectValue == t.options[i].value) {
                t1.options[i].selected = true
            }
        }
    }
</script>


<select id="select1">
    <option value="0">
        0
    </option>
    <option value="1">
        1
    </option>
    <option value="2">
        2
    </option>
</select>


<select id="select2">
    <option value="0">
        a
    </option>
    <option value="1">
b
    </option>
    <option value="2">
        c
    </option>
</select>
<input type="button" id="button1" value="submit" onclick="getSelectValue()"
/>
```
##实现 select中指定option选中触发事件
```
<select id="addTwSelect" name="addTwSelect" class="form-control select2me" data-placeholder="0">
    <option value="0">--请选择--</option>
    <option value="1">百年科技介绍</option>
</select>
$('#addTwSelect').change(function(){
        console.log("sel change")
        var id=$("#addTwSelect").val();
        queryTwById(id);
});




<!-- 网友 -->
<select id="pid" onchange="gradeChange()">
    <option grade="1" value="a">选项一</a>
    <option grade="2" value="b">选项二</a>
</select>


<script type="text/JavaScript">
       function gradeChange(){
        var objS = document.getElementById("pid");
        var grade = objS.options[objS.selectedIndex].grade;
        alert(grade);
       }
</script>
```


##jq动态改变图片IMG的src地址
```
$("#img_a").attr("src", "login_image/b_2.jpg");
```


##jq获取选中的option的值
```
<select id="isshow" name="isshow" style="width: 100px">
<option value="1">显示</option>
<option value="2">不显示</option>
</select>


var isshow = $("#isshow ").val();
获取select 选中的 text :  
   $("#isshow").find("option:selected").text();  
   
获取select选中的 value:  
   $("#isshow").val();
```

##为table动态添加行
```
<table id="tw_list" data-side-pagination="server" data-pagination="true" data-height="" class="table table-hover dataTable no-footer table-striped table-bordered" style="width: 100%;border:1px solid #ddd;">
                </table>
var new_tr2 = "<tr data-index='1'><td style='text-align: center; vertical-align: middle; '>"
+"<div class='sou-pic'>"
+"<img src='"+imgsrc+"' alt=''></div></td></tr>";
$("#tw_list tbody").prepend(new_tr2);
```
##js动态设置select的值
```


```
##JavaScript 显示 Y-m-d H:i:s 的日期时间格式
```
老实的方法

let date = new Date();
let result = [
  [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ].join('-'),
  [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ].join(':')
].join(' ').replace(/\b\d\b/g, '0$&'); diao 一点的方法

var date = new Date();
var result = date.toLocaleString('zh-CN', { hour12: false })
  .replace(/\//g, '-').replace(/\b\d\b/g, '0$&');

来源：  http://www.codeceo.com/article/javascript-date-guide.html
```
##Javascript 动态加载脚本
```
即脚本在页面加载时不存在，但将来的某一时刻通过修改 DOM 动态添加脚本，从而实现按需加载脚本。

加载脚本文件
function loadScriptFile(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // 在执行到这行代码将 <script> 元素添加到页面之前，不会下载指定外部文件
    document.body.appendChild(script);
}

内联脚本代码
function loadScriptString(code) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = code;

    // 在执行到这行代码将 <script> 元素添加到页面之前，不会下载指定外部文件
    document.body.appendChild(script);
}
以这种方式加载的代码会在全局作用域中执行，而且当脚本执行后将立即可用。实际上，这样执行代码与在全局作用域中把相同的字符串传递给 eval() 是一样的。
```
##js获取当前当前行号
```
$('p').click({
    var index = $(this).index();
    alert(index); //索引值是从0开始的
});
```
##获得某月的天数
```
方法一：
function getDays(year, month) {
  if (month === 1) return new Date(year, month, 29).getMonth() === 1 ? 29 : 28;
  return new Date(year, month, 31).getMonth() === month ? 31 : 30;
}
方法二：
function getDays(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
console.log(getDays0(2016,3))//得到的是4月份的天数
console.log(getDays1(2016,5))//得到的是6月份的天数
```
##js获取上个月的第一天和最后一天和当天

```
function lastMonthFirst(){
              var today=new Date();
              var yy=today.getFullYear();
            var m=today.getMonth();
            var mm=(m<10)?"0"+m:m;
            var dd="01";
            return yy+"-"+mm+"-"+dd;// 获取上月第一天日期    
        }
function lastMonthLast(){
              var today=new Date();
              var yy=today.getFullYear();
            var m=today.getMonth();
            var mm=(m<10)?"0"+m:m;
            var dd="01";
            return yy+"-"+mm+"-"+dd;
              var dd = new Date(yy,mm,0);

              var lastday = yy + '-' + month + '-' + dd.getDate();

              return lastday; // 获取上月最后一天日期    

        }
```
##js获取当前月的第一天和最后一天和当天
```
function getFirstAndLastMonthDay(year, month){    
                var firstdate = year + '-' + month + '-01';  // 获取当月第一天日期    
                var day = new Date(year,month,0);   
                var lastdate = year + '-' + month + '-' + day.getDate();//获取当月最后一天日期    
                return lastdate;  
             }


function firstday(){
              var today=new Date();
              var yy=today.getFullYear();
            var m=today.getMonth()+1;
            var mm=(m<10)?"0"+m:m;
            var dd="01";
            return yy+"-"+mm+"-"+dd;// 获取当月当天日期    
        }


<input type="text" class="form-control value-null date-picker input-small firstday input-circle" id="startTime" name="startTime" placeholder="" data-date-format="yyyy-mm-dd">
至
<input type="text" class="form-control value-null date-picker input-small today input-circle" id="endTime" name="endTime" placeholder="" data-date-format="yyyy-mm-dd">


$(".firstday").attr('placeholder',firstday());
$(".today").attr('placeholder',today());     //将当天时间作为时间选择器默认值
```
##如果没有选择日期控件，默认时间为当前月第1天至最后一天
```
function initPromotionTime(){
    return firstday();
}
//获取当月当天日期   
function firstday(){
    var today = new Date();
    var year  = today.getFullYear();
    var month = today.getMonth() + 1;
    var mm = (month < 10)?"0" + month:month;
    var dd = "01";
    var fd = year + "-" + mm +"-" + dd +" 00:00:00";
    var ld = lastday(year,mm)+" 23:59:59";
    return fd+"至"+ld;
}
function lastday(year, month){    
    //var firstdate = year + '-' + month + '-01';  //获取当月第一天日期    
    var day = new Date(year,month,0);   
    var lastdate = year + '-' + month + '-' + day.getDate();//获取当月最后一天日期    
    return lastdate;    }   

```
##判断当前时间是否小于选择时间
```
if (!dateCompare(sTime,eTime)){
        layer.msg( '活动开始/结束时间小于当前时间' , { time: 1500 });
         return   false ;     }  
  function  dateCompare(sTime,eTime){

     var  time1 =  new  Date(sTime).getTime();
     var  time2 =  new  Date(eTime).getTime();
     var  time3 =  new  Date().getTime();// time3 =  1461830247031 时间戳的方式
    console.log(time1+ "--" +time2+ "--" +time3)
     if (time1>=time3&&time2>time1){
         return   true ;
    } else {
         return   false ;
    } }
```
##比较时间大小 
```
//比较日期，时间大小  
function compareCalendar(startDate, endDate) {
    if (startDate.indexOf(" ") != -1 && endDate.indexOf(" ") != -1) {
        //包含时间，日期  
        compareTime(startDate, endDate);
    } else {
        //不包含时间，只包含日期  
        compareDate(startDate, endDate);
    }


    //判断日期，时间大小  
    function compareTime(startDate, endDate) {
        if (startDate.length > 0 && endDate.length > 0) {
            var startDateTemp = startDate.split(" ");
            var endDateTemp = endDate.split(" ");


            var arrStartDate = startDateTemp[0].split("-");
            var arrEndDate = endDateTemp[0].split("-");


            var arrStartTime = startDateTemp[1].split(":");
            var arrEndTime = endDateTemp[1].split(":");


            var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);
            var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);


            if (allStartDate.getTime() >= allEndDate.getTime()) {
                alert("startTime不能大于endTime，不能通过");
                return false;
            } else {
                alert("startTime小于endTime，所以通过了");
                return true;
            }
        } else {
            alert("时间不能为空");
            return false;
        }
    }
```

##判断结束时间要大于开始时间
```
方式一：
< input   type = "text"   class = "form-control link5 form-control1 today validate[required] unitname"   id = "startDttm"   name = "startTime"    size = "16"   value = ""   style =" width :  140px ; height :  36px ;" >  
< input   type = "text"   class = "form-control link5 form-control1 today validate[required] unitname"   id = "endDttm"   name = "endTime"    size = "16"   value = ""   style =" width :  140px ; height :  36px ;" >  

var  startDttm = $( "#startDttm" ).val();
     var  splitFirst = startDttm.split( '-' );
     var  k1 = splitFirst.join( '' );
     var  k2 = k1.split( ':' );
     var  k3 = k2.join( '' );
     var  k4 = k3.split( ' ' );
     var  k5 = k4.join( '' );
     var  kkk = parseInt(k5);
    
  
     var  endDttm = $( "#endDttm" ).val();
     var  splitFirst1 = endDttm.split( '-' );
     var  k11 = splitFirst1.join( '' );
     var  k21 = k11.split( ':' );
     var  k31 = k21.join( '' );
     var  k41 = k31.split( ' ' );
     var  k51 = k41.join( '' );      var  kkk1 = parseInt(k51);  
if (kkk1 < kkk){
        layer.msg( "您填入的活动的结束时间应大于开始时间,请重新填写!" );
         return   false ;
} 



方式二：
if (comptime(eTime, sTime)){
        layer.msg( '活动结束时间不能小于开始时间' , { time: 1500 });
         return   false ; }   

//比较时间yyyy-MM-dd HH:mm:ss
function  comptime(beginTime, endTime) {
    beginTime = beginTime +  ":00" ;
    endTime = endTime +  ":00" ;
     var  beginTimes = beginTime.substring(0, 10).split( '-' );
     var  endTimes = endTime.substring(0, 10).split( '-' );
    beginTime = beginTimes[1] +  '/'  + beginTimes[2] +  '/'  + beginTimes[0] +  ' '  + beginTime.substring(10, 19);
    endTime = endTimes[1] +  '/'  + endTimes[2] +  '/'  + endTimes[0] +  ' '  + endTime.substring(10, 19);
     var  a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
     if  (a < 0) {
         //alert("endTime小!");
         return   false ;
    }  else   if  (a > 0) {
         //alert("endTime大!");
         return   true ;
    }  else   if  (a == 0) {
         //alert("时间相等!");
         return   true ;
    }  else  {
         return   false ;
    } }  
 

``` 
##将表单元素序列化
```
/**
  *   ajax   post请求
  *   @param   url
  *   @param   data
  *   @param   callBack
  *   @param   async
  */
function  ajaxPost(url,data,callBack,async){
    $.ajax({
        type: "post" ,
        dataType: "json" ,
        url:url,
        data:data,
        async:async ? async: true ,
        success: function (data){
            callBack(data);
        },
        error: function (e){
            console.error(e);
        }
    })
}
$.serializeObject =  function  (form) {
     var  o = {};
    $.each(form.serializeArray(),  function  (index) {
         if  (o[ this [ 'name' ]]) {
            o[ this [ 'name' ]] = o[ this [ 'name' ]] +  ","  +  this [ 'value' ];
        }  else  {
            o[ this [ 'name' ]] =  this [ 'value' ];
        }
    });
     return  o;
};


/**
  *   导航菜单切换
  */
function  menuStateChanage(){
    $( '#system-menu' ).on( 'click' , 'a.menuitem' , function (event){
         //加载页面内容
        loadPanelPage($( this ).attr( 'data-href' ));
    });
}
/**
  *   加载面板内容
  *   @param   url
  */
function  loadPanelPage(url){
    $( '#system-panel' ).attr( 'src' ,url);
}
function  center($obj,top,left){
    $obj.css({
        position :  'absolute' ,
         'top'  :top,
        left :-left
    }).show();
}
//预览html内容
function  previewHtml(htmlContent){
     var  content_window=window.open( "about:blank" , "" , "fullscreen=1,location=no" );
    content_window.moveTo(0,0);
    content_window.resizeTo(screen.width-200,screen.height-200);
    content_window.focus();
    content_window.document.open();
    content_window.document.write(htmlContent);
    content_window.document.close(); }   

```
##实现clone函数
```
实现一个函数clone，可以对JavaScript中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行值复制

/**
 * 对象克隆
 * 支持基本数据类型及对象
 * 递归方法
 */
function clone(obj) {
    var o;
    switch (typeof obj) {
        case "undefined":
            break;
        case "string":
            o = obj + "";
            break;
        case "number":
            o = obj - 0;
            break;
        case "boolean":
            o = obj;
            break;
        case "object": // object 分为两种情况 对象（Object）或数组（Array）
            if (obj === null) {
                o = null;
            } else {
                if (Object.prototype.toString.call(obj).slice(8, -1) === "Array") {
                    o = [];
                    for (var i = 0; i < obj.length; i++) {
                        o.push(clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var k in obj) {
                        o[k] = clone(obj[k]);
                    }
                }
            }
            break;
        default:
            o = obj;
            break;
    }
    return o;
}
```
##统计字符串”aaaabbbccccddfgh”中字母个数或统计最多字母数
```
var str = "aaaabbbccccddfgh";
var obj  = {};
for(var i=0;i<str.length;i++){
    var v = str.charAt(i);
    if(obj[v] && obj[v].value == v){
        obj[v].count = ++ obj[v].count;
    }else{
        obj[v] = {};
        obj[v].count = 1;
        obj[v].value = v;
    }
}
for(key in obj){
    document.write(obj[key].value +'='+obj[key].count+' '); // a=4  b=3  c=4  d=2  f=1  g=1  h=1 
}
```
##写一个function，清除字符串前后的空格。（兼容所有浏览器）
```
function trim(str) {
    if (str && typeof str === "string") {
        return str.replace(/(^\s*)|(\s*)$/g,""); //去除前后空白符
    }
}
```
