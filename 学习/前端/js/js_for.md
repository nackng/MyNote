##  jquery $.each 和for 怎么跳出循环（终止本次循环）
```
1、for循环中我们使用continue；终止本次循环计入下一个循环，使用break终止整个循环。
2、而在jQuery中 $.each则对应的使用return true  和return false。
```
##js for循环
```
function getSellModel(sellerInclude,flag){
var res = "";
var selfTrue = false;
var selfFalse = false;
var modelSelfList = getModelSelfList();
if(sellerInclude.length > 0 && typeof(sellerInclude) != "undefined"){
for(var i in sellerInclude){
console.log(sellerInclude[i].value);
if(my_in_array(sellerInclude[i].value,modelSelfList)){
selfTrue = true;
}else{
selfFalse = true;
}
}
if(selfTrue && !selfFalse){//仅自营
res = flag == 0 ? "全站" : "自营";
}else if(selfTrue && selfFalse){//自营+联营
res = flag == 0 ? "--" : "自营+联营";
}else if(!selfTrue && selfFalse){//联营
res = flag == 0 ? "--" : "联营";
}
}
return res;
}

function getModelSelfList(){
var modelList = [];
modelList.push(1);
modelList.push(2);
modelList.push(3);
modelList.push(4);
modelList.push(5);
modelList.push(6);
modelList.push(7);
return modelList;
}

function my_in_array(ele,arr){
for(i=0;i<arr.length;i++){
       if(arr[i] == ele)  
       return true;  
   }
   return false;  
}
```
##js 数组 遍历
```
第一种：一般的for循环，例如：
var a = new Array("first", "second", "third") 
for(var i = 0;i < a.length; i++) {
document.write(a[i]+",");
}
输出的结果：fitst,second,third
第一种：用for...in 这种遍历的方式，例如：
var arr = new Array("first", "second", "third") 
for(var item in arr) {
document.write(arr[item]+",");
}
输出的结果：fitst,second,third
```