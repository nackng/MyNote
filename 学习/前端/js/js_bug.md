##循环bug
```
function JuiceGlobal(){
var gTrue = false;
var gFalse = false;
var globals = getGlobalSellers();
var sedSellers = getSelectedSellers();
if(sedSellers.length > 0 && typeof(sedSellers) != "undefined"){//假设sedSellers.length = 4.
for(var i in sedSellers){//BUG i = 0,1,2,3,remove,in_array; 改为 for(var i = 0; i < sedSellers.length; i++)即可。
if(my_in_array(sedSellers[i],globals)){
gTrue = true;
}else{
gFalse = true;
}
}
if(gTrue && gFalse){//全球购+非全球购
$("#ruleType").val(1);
$("#ruleType").attr("disabled","disabled");
}else{
$("#ruleType").removeAttr("disabled");
}
}
}
```