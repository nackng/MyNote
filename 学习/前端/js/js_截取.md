[TOC]
js 获取字符串中最后一个斜杠后面的内容
var index = str.lastIndexOf("\\");  
str = str.substring(index + 1, str.length);
console.log(str);
