##用到的测试页面
```
<%@ page language="java" import="java.util.*,java.sql.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <body>
<%
//连接MYSQL的字符串.
//jdbc:mysql://localhost:3306/demo
//驱动:数据库://地址:端口/数据库名称
String mysqlConnection = "jdbc:mysql://192.168.1.173:3306/demo";


//加载驱动  com.mysql.jdbc.Driver 是JAVA与MYSQL 连接用的JDBC驱动
Class.forName("com.mysql.jdbc.Driver").newInstance(); 


//建立MYSQL链接 root是用户名 cx0321 是密码
Connection connection = DriverManager.getConnection(mysqlConnection, "root", "root");


//建立一个查询对象
Statement statment = connection.createStatement();


//建立一个查询返回集合. 就是说查询完以后返回的数据全部都在这个里面.
ResultSet resultSet = null;


//从account里面读取数据.
resultSet = statment.executeQuery("select * from account where accountId = '"+ request.getParameter("id") +"'");


//循环,直到resultSet结束
while(resultSet.next())
{
//从resultSet读取出值输出到页面.
    out.print(resultSet.getInt(1)+"|");//取出第一列的值,因为是数字类型的所以是getInt();
    out.print(resultSet.getString(2)+"|");//取出第二列的值,因为是字符串类型的所以是getString();
    out.print(resultSet.getString(3)+"|");
    out.print("<br />");//页面输出换行
}
%>
  </body>
</html>
```