[TOC]
##JS每隔一段时间执行一个方法
function funcTest(){
    //每隔3秒执行一次timelyFun方法
    window.setInterval("timelyFun()",3000);
}
window.onload = funcTest;
另外有setTimeout方法，这两个方法之间的区别就是：setInterval方法是每隔一段时间执行一次，是循环执行的，而setTimeout方法是页面加载完毕之后的规定时间内执行一次，就不再执行了。

如果页面没有打开，肯定不执行
如果页面打开了，你把它放着或最小化什么的，只要不关闭，它会执行的。
