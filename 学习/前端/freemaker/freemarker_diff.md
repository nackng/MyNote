##freemarker中include与import的区别
问题显示:







```

在inc1.ftl与inc2.ftl中的内容分别是:

<#assign username="刘德华">与<#assign username="张学友">

接着我在hello.ftl模版中用include将inc1.ftl包含进来

<#include "/inc/inc1.ftl">
${username}

此刻获取的结果是:刘德华

 

接着我们在hello.ftl用include将inc1.ftl与inc2.ftl同时进行包含进来

<#include "/inc/inc1.ftl">
<#include "/inc/inc2.ftl">
${username}

此刻获取的值是:张学友

 

总结：出现这种情况，在两个模版中都分别存在变量名都相同的变量的时候，include包含进来，会进行覆盖，include只时候将其公共的静态文件进行包含，而里面不涉及到内部函数以及变量声明之类的，当涉及到这种问题，我们就要用import进行导入

```






 
