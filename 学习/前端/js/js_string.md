##js 截取最后一个字符 前面的内容
```
var  ss  = '1,e,2r,drf,dsfds,fdsfwf,';
var msg = ss.substring(0, ss.lastIndexOf(','));

```
##js字符串去除首尾 逗号
```
<script language="javascript">  
var str="asdfk,asdf345345,345345"; 
//替换除数字与逗号以外的所有字符。
str=str.replace(/[^0-9,]*/g,""); 
//去掉第一个逗号
if (str.substr(0,1)==',') str=str.substr(1);
//去掉最后一个逗号
var reg=/,$/gi; 
str=str.replace(reg,""); 
alert(str); 
</script>
```
##js 将String转为字符串
```
function getSaleWayLabel(source) {//可能的值source="10,50"
var res = "";
var arr = source.split(",");
for (i=0;i<arr.length ;i++){ 
   if(arr[i]==10){
    res += "线上";
   }else if(arr[i]==50){
    res += "线下";
   }
   res +=",";
}
return res;//线上,线下
}
```