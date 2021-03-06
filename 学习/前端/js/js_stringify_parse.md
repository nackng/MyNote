##stringify详解
```
<html>
<title>stringify</title>
<head>
<script type="text/javascript" src="jquery-1.5.2.min.js"></script>
<script type="text/javascript">
/**
* JSON.stringify 语法实例讲解
* 语法： 
　　JSON.stringify(value [, replacer] [, space]) 


value：是必选字段。就是你输入的对象，比如数组，类等。 
replacer：这个是可选的。它又分为2种方式，一种是数组，第二种是方法。 
　　情况一：replacer为数组时，通过后面的实验可以知道，它是和第一个参数value有关系的。一般来说，系列化后的结果是通过键值对来进行表示的。 所以，如果此时第二个参数的值在第一个存在，那么就以第二个参数的值做key，第一个参数的值为value进行表示，如果不存在，就忽略。


　　情况二：replacer为方法时，那很简单，就是说把系列化后的每一个对象（记住是每一个）传进方法里面进行处理。 


space：就是用什么来做分隔符的。 
　　1）如果省略的话，那么显示出来的值就没有分隔符，直接输出来 。
　　2）如果是一个数字的话，那么它就定义缩进几个字符，当然如果大于10 ，则默认为10，因为最大值为10。
　　3）如果是一些转义字符，比如“\t”，表示回车，那么它每行一个回车。 
　　4）如果仅仅是字符串，就在每行输出值的时候把这些字符串附加上去。当然，最大长度也是10个字符。 
*/
//1 只有第一个参数的情况下
var student = new Object(); 
student.name = "Lanny"; 
student.age = "25"; 
student.location = "China"; 
var json = JSON.stringify(student); 
//alert(json); //{"name":"Lanny","age":"25","location":"China"}
//alert(student);//如果不用stringify方法，直接alert(student);//[object Object]

//2 第二个参数存在，并且第二个参数还是function的时候 
var students = new Array() ; 
students[0] = "onepiece"; 
students[1] = "naruto"; 
students[2] = "bleach"; 
var json = JSON.stringify(students,switchUpper); 
function switchUpper(key, value) { 
   return value.toString().toUpperCase(); 
} 
//alert(json);//"ONEPIECE,NARUTO,BLEACH"
/*下面这种方式也可以
var json = JSON.stringify(students, function (key,value) { return value.toString().toUpperCase()}); 
alert(json);
*/


//3 第二个参数存在，并且第二个参数不是function，而是数组的时候
var stuArr1 = new Array() ; 
stuArr1[0] = "onepiece"; 
stuArr1[1] = "naruto"; 
stuArr1[2] = "bleach"; 
var stuArr2 = new Array(); 
stuArr2[0] = "1"; 
stuArr2[1] = "2"; 
var json = JSON.stringify(stuArr1,stuArr2)
//alert(json);//["onepiece","naruto","bleach"] 第二个参数被忽略了，只是第一个参数被系列化了。

//4 如果第一个参数是对象，第二个参数是数组的情况
var stuObj = new Object(); 
stuObj.id = "20122014001"; 
stuObj.name = "Tomy"; 
stuObj.age = 25; 


var stuArr = new Array(); 
stuArr[0] = "id"; 
stuArr[1] = "age"; 
stuArr[2] = "addr";//这个stuObj对象里不存在


var json = JSON.stringify(stuObj,stuArr); 
// var json = JSON.stringify(stuObj,stuArr,1000); //{"id": "20122014001","age": 25}
// var json = JSON.stringify(stuObj,stuArr,'\t'); //{"id": "20122014001","age": 25}
// var json = JSON.stringify(stuObj,stuArr,'OK '); //{OK "id": "20122014001",OK "age": 25}
alert(json);//{"id":"20122014001","age":25}


</script>
</head>
<body>
  hello
</body>
</html>
```
##JSON.parse()和JSON.stringify()

```
parse用于从一个字符串中解析出json对象,如
var str = '{"name":"huangxiaojian","age":"23"}'
JSON.parse(str)结果：
Object
age: "23"
name: "huangxiaojian"
__proto__: Object
注意：单引号写在{}外，每个属性名都必须用双引号，否则会抛出异常。


stringify()用于从一个对象解析出字符串，如
var a = {a:1,b:2}
结果：
JSON.stringify(a)
"{"a":1,"b":2}"
```
##stringify作用
```
实例一：
//商家id
         var  sellerId = [];
         var  sellModel = [];
        $( "input[name='sellModel']:checked" ).each( function (){
            sellModel.push($( this ).val());
        });
        sellModel = JSON.stringify(sellModel);//stringify前：sellModel=[1,2]; stringify后：sellModel=["1","2"];
        console.log( "sellModel:" +sellModel);
         if (sellModel ==  "[]" ){//注意，使用stringify方法后，判断为空的方式
            alert( "请选择销售模式" );
             return ;
        }
        $( "#selectedSellers option" ).each( function (){
            sellerId.push($( this ).val());
        });
         if (my_in_array(1,sellModel)){
             if (sellerId.length == 0){//注意，使用stringify方法前，判断为空的方式
                alert( "限制了商家，请选择商家" );
                 return   false ;
            }
        }
        
        sellerId = JSON.stringify(sellerId);         console.log( "sellerId:" +sellerId);   

```