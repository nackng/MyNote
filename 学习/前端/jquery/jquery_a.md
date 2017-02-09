##a标签的显示 /隐藏
```
jQuery

display 隐藏后，原来位置被占掉

visibility 隐藏后，原来位置还在

 

$("#id").show()表示display:block, 
$("#id").hide()表示display:none;

$("#id").css('display','none'); 
$("#id").css('display','block');

或者

$("#id")[0].style.display = 'none';

 

$("#id").css('visibility', 'visible');

$("#id").css('visibility', 'hidden');
```