[TOC]
##js replace
```
var sku = "1234，1111，11,9999";
sku = sku.replace( /，/g , ',' );//将字符串中所有的"，"   替换为","
```
##a标签的点击函数
```
在a中调用js函数最适当的方法推荐使用：
a href="javascript:void(0);" onclick="js_method()"
a href="javascript:;" onclick="js_method()"
a href="#" onclick="js_method();return false;"
```
##html变量、双引号拼接
```
用\"转义成“
js代码中：
+ "<button id='addCategory_" +index+ "' type='button' class='btn green' onclick='addCategory(1,\"" +line+ "\")'>添加</button>"   

浏览器解析后：
<button id="addCategory_7" type="button" class="btn green" onclick="addCategory(1,&quot;on&quot;)">添加</button>

也就是<button id="addCategory_7" type="button" class="btn green" onclick="addCategory(1,“on”)">添加</button>

```
##lastIndexOf()
```
lastIndexOf()方法返回从右向左出现某个字符或字符串的首个字符索引值（与indexOf相反）
var src = "abc/cde/fg";

alert(src.lastIndexOf('/'));
alert(src.lastIndexOf('c'));
弹出值依次为：8,4
```
##js截取最后4个字符串
```
方式一：
alert("abcdefg".slice(-4));
方式二：
var str= "abcdefbg";
alert(str.substr(str.length-4));
方式三：
var tag = names.lastIndexOf("b");
var name = names.slice(-tag+1);
```
##split用法
```
<script language="javascript">   
function mysplit(){   
      datastr="2,2,3,5,6,6";      
        var str= new Array(); 
     str=datastr.split(",");      
    for (i=0;i<str.length ;i++ )   {   
        document.write(str[i]+"<br/>");   
    }   
}   
mysplit();   
</script>  
```

##table每3行换一个颜色
```
<body>
<script type="text/javascript">
    window.onload = function() {
        var tbl = document.getElementById("tbl");
        rows = tbl.getElementsByTagName("tr");
        for (i = 0; i < rows.length; i++) {
            var j = parseInt(i / 3);
            if (j % 2 == 0) rows[i].style.backgroundColor = "#f00";
            else rows[i].style.backgroundColor = "#0f0";
        }
    }
</script>
    <table id="tbl">
    <tr>
        <td>
            1
        </td>
    </tr>
    <tr>
        <td>
            2
        </td>
    </tr>
    <tr>
        <td>
            3
        </td>
    </tr>
    <tr>
        <td>
            4
        </td>
    </tr>
    <tr>
        <td>
            5
        </td>
    </tr>
    <tr>
        <td>
            6
        </td>
    </tr>
    <tr>
        <td>
            7
        </td>
    </tr>
    <tr>
        <td>
            8
        </td>
    </tr>
    <tr>
        <td>
            9
        </td>
    </tr>
    <tr>
        <td>
            10
        </td>
    </tr>
</table>
</body>
```
##去除空格
```
function trimStr(str){return str.replace(/(^\s*)|(\s*$)/g,"");}
```
##javascript 正则获取倒数第二个/后面的字符串
var aaa = "adf/abc/cvb/dfg/123";
var bbb = aaa.replace(/.*\/([^\/]+\/[^\/]+)$/, '$1');
 
// 不用正则
var aaa = "adf/abc/cvb/dfg/123";
var bbb = aaa.substr(aaa.lastIndexOf('/', aaa.lastIndexOf('/') - 1) + 1);
