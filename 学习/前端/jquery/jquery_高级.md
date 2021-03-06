## jQuery - 基于serializeArray的serializeObject ```
jQuery - 基于serializeArray的serializeObject - 君莫笑 - 博客频道 - CSDN.NET


jQuery有方法$.fn.serialize，可将表单序列化成字符串；有方法$.fn.serializeArray，可将表单序列化成数组。
如果需要其序列化为JSON对象，那么可以基于serializeArray编写方法serializeObject轻松实现：
//work with jQuery 1.x  
jQuery.prototype.serializeObject=function(){  
    var obj=new Object();  
    $.each(this.serializeArray(),function(index,param){  
        if(!(param.name in obj)){  
            obj[param.name]=param.value;  
        }  
    });  
    return obj;  
};

//work with jQuery 1.x
jQuery.prototype.serializeObject=function(){
	var obj=new Object();
	$.each(this.serializeArray(),function(index,param){
		if(!(param.name in obj)){
			obj[param.name]=param.value;
		}
	});
	return obj;
};

```
注：当表单中参数出现同名时，serializeObject会取第一个，而忽略后续的。
```



设有

[html]

<form>  

    <input type="text" name="username" />  

    <input type="text" name="password" />  

</form>  

则

[javascript]


jQuery("form").serialize(); //"username=&password="
jQuery("form").serializeArray(); //[{name:"username",value:""},{name:"password",value:""}]
jQuery("form").serializeObject(); //{username:"",password:""}



```



```

+ 此版本不再兼容IE8

+ 修复一个逻辑错误

[javascript] 

//work with jQuery 2.x  

jQuery.prototype.serializeObject=function(){  

    var hasOwnProperty=Object.prototype.hasOwnProperty;  

    return this.serializeArray().reduce(function(data,pair){  

        if(!hasOwnProperty.call(data,pair.name)){  

            data[pair.name]=pair.value;  

        }  

        return data;  

    },{});  

};  

```




```

+ 减少方法依赖，扩大兼容范围

+ 改用原生循环，提升代码性能

[javascript] 

//work with jQuery Compact 3.x  

jQuery.prototype.serializeObject=function(){  

    var a,o,h,i,e;  

    a=this.serializeArray();  

    o={};  

    h=o.hasOwnProperty;  

    for(i=0;i<a.length;i++){  

        e=a[i];  

        if(!h.call(o,e.name)){  

            o[e.name]=e.value;  

        }  

    }  

    return o;  

};  

```




