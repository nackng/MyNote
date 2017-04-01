[TOC]
##ajax的原理
在旧的交互方式中,由用户触发一个HTTP请求到服务器,服务器对其进行处理后再返回一个新的HTHL页到客户端, 每当服务器处理客户端提交的请求时,客户都只能空闲等待,并且哪怕只是一次很小的交互、只需从服务器端得到很简单的一个数据,都要返回一个完整的HTML页,而用户每次都要浪费时间和带宽去重新读取整个页面。而使用Ajax后用户从感觉上几乎所有的操作都会很快响应没有页面重载（白屏）的等待。
Ajax的原理简单来说是在用户和服务器之间加了—个中间层(AJAX引擎)，通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。使用户操作与服务器响应异步化。这其中最关键的一步就是从服务器获得请求数据。
Ajax的过程只涉及JavaScript、XMLHttpRequest和DOM。XMLHttpRequest是ajax的核心机制，它是在IE5中首先引入的，是一种支持异步请求的技术。简单的说，也就是javascript可以及时向服务器提出请求和处理响应，而不阻塞用户。达到无刷新的效果。
```

ajax过程
获得ajax
打开地址
发送数据
接收数据
<script>
 // 1.获得ajax
 if (window.XMLHttpRequest) { //查看当前浏览器XMLHttpRequest是否是全局变量
     var oAjax = new XMLHttpResquest();
 } else {
     var oAjax = new ActiveXObject('Microsoft.XMLHTTP'); //IE6,传入微软参数
 }

 // 2.打开地址
 switch (json.type.toLowerCase()) {
     case 'get':
         oAjax.open('GET', json.url + '?' + jsonToURL(json.data), true); // 提交方式(大写)，url，是否异步
         oAjax.send(); // 3.发送数据
         break;
     case 'post':
         oAjax.open('POST', json.url, true);
         oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
         oAjax.send(jsonToURL(json.data)); // 3.发送数据
         break;
 }

 // 4.接收数据
 oAjax.onreadystatechange = function() { //监控状态
     if (oAjax.readyState == 4) {
         json.complete && json.complete();
         if (oAjax.status >= 200 && oAjax.status < 300 ||
             oAjax.status == 304) {
             json.success && json.success(oAjax.responseText); //执行成功的回调函数, responseText为响应内容
         } else {
             json.error && json.error(oAjax.status); //执行失败的回调函数
         }
     }
 };
</script>
```