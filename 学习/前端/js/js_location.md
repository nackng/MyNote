[TOC]
##常见的几种形式
```
目前在开发中经常要用到的几种形式有:
self.location.href;

window.location.href;

this.location.href;

location.href;

parent.location.href;

top.location.href;                                
```
 

##区别
```
a.html
<form id="form1" action="">
    <div>
        <strong>
            这是a.html页面
            < strong>
                <iframe src="b.html" width="500px" height="300px">
            </ iframe>
        </strong>
        </ strong>
    </div>
    </ form>
    < pre>
        b.html:
        < span>
            这是b.html
            </span>
            <span id="span1">
        </ span>
        < br />
        <iframe src="c.html" width="500px" height="300px">
    </ iframe>
    c.html:
    < span>
        < strong>
            这是c.html：
            < strong>
                </span>
                <span id="span1">
            </ span>
            < br />
            <iframe src="d.html" width="500px" height="300px">
        </ iframe>
        d.html:
        < span>
            这是d.html：
            </span>
            <span id="span1">
        </ span>
        < br />
        <input type='button' onclick='jump();' value='跳转'>

a.html,b.html，c.html，d.html通过iframe给联系到了一起，那么它们有什么的联系呢？

观察代码，我们可以看出:

a.html里面嵌着b.html;
b.html里面嵌着c.html;
c.html里面嵌着d.html
```

##测试几种用法
```
在d.html里面head部分写js:
function jump() {

    //经测试：window.location.href与location.href,self.location.href,location.href都是本页面跳转 

    //作用一样 

    window.location.href = "http://www.baidu.com";

    //location.href="http://www.baidu.com"; 

    //self.location.href="http://www.baidu.com"; '
    //this.location.href="http://www.baidu.com"; 

    //location.href="http://www.baidu.com"; 
} 

再次运行a.html,点击那个"跳转" 按钮 

对比图一和图二的变化，你会发现d.html部分已经跳转到了百度的首页，而其它地方没有发生变化。这也就解释了"本页跳转"是什么意思。

好，再来修改d.html里面的js部分为：
function jump(){
    parent.location.href = 'http://www.baidu.com';
}

运行a.html后，再次点击"跳转" 按钮，
对比图一和图三，你会发现a.html中嵌套的c.html部分已经跳转到了百度首页。

分析：我点击的是a.html中嵌套的d.html部分的跳转按钮，结果是a.html中嵌套的c.html部分跳转到了百度首页，这就解释了"parent.location.href是上一层页面跳转"的意思。

再次修改d.html里面的js部分为：
function jump(){
    top.location.href='http://www.baidu.com';
}

运行a.html后，再次点击"跳转" 按钮，

你会发现，a.html已经跳转到了百度首页。
 
分析：我点击的是a.html中嵌套的d.html部分的跳转按钮，结果是a.html中跳转到了百度首页，这就解释了"top.location.href是最外层的页面跳转"的意思。
```

 

 

 