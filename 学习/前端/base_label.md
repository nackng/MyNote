[TOC]
##jquery动态改变label的值
```
<label class="control-label col-md-3" id="multipriceLabel">定价金额：</label>
取值:var Label_text=document.getElementById('test_label').innerHTML;
赋值:document.getElementById('test_label').innerHTML = ids;


function showMultipriceLabel(tag){
if(tag=="1"){
$("#multipriceLabel").html("定价金额：");
}else{
$("#multipriceLabel").html("折扣设置：");
}
}
```
##获取label的值 
1）JS 正确获取：
// js label get value  
var label = document.getElementById("label_blog");  
var value = label.innerText.trim();             // "http://blog.ithomer.net"  
 
2）JQuery 正确获取：
// jquery label get value  
var value = $("#label_blog").html().trim();     // "http://blog.ithomer.net"  
 
label 赋值：
// set label value  
var label = document.getElementById("label_blog");  
label.innerText="http://proxy.ithomer.net";             // js set value  
$("#label_blog").html("http://proxy.ithomer.net");      // jquery set value  