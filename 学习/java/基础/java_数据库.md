[TOC]
##jdbc的增删改查方法及返回值类型
```
ResultSet executeQuery(String sql); 执行SQL查询，并返回ResultSet 对象。
int executeUpdate(String sql); 可执行增，删，改，返回执行受到影响的行数。
boolean execute(String sql); 可执行任何SQL语句，返回一个布尔值，表示是否返回ResultSet 。
java.util.Date 和 java.sql.Date的区别和相互转化
 java.util.Date是在除了SQL语句的情况下面使用的。
java.sql.Date是针对SQL语句使用的，它只包含日期而没有时间部分
它们都有getTime方法返回毫秒数，自然就可以直接构建。 java.util.Date 是 java.sql.Date 的父类，前者是常用的表示时间的类，我们通常格式化或者得到当前时间都是用他，后者之后在读写数据库的时候用他，因为PreparedStament的setDate()的第2参数和ResultSet的getDate()方法的第2个参数都是java.sql.Date。
```