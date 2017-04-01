[TOC]
##@Param
```
@Param("id") ：全局限定别名，定义查询参数在sql语句中的位置不再是顺序下标0,1,2,3....的形式，而是对应名称，该名称就在这里定义。 


@Param("testBean") ：是一个自定义的对象，指定了sql语句中的表现形式，如果要在sql中引用对象里面的属性，只要使用testBean.id，testBean.textText即可，mybatis会通过反射找到这些属性值。 

eg:public void save(@Param("tableMap") Map<Object, Map<Object, Object>> tableMap);
```