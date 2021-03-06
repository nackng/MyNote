##关于jdbc url参数 allowMultiQueries
```
如下的一个普通JDBC示例:
String user ="root";
String password = "root";
String url = "jdbc:mysql://localhost:3306";
Connection conn = java.sql.DriverManager.getConnection(url , user, password);
Statement stmt = conn.createStatement();
String sql = "select 'hello';select 'world'";
stmt.execute(sql);


执行时会报错:
com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'select 'world'' at line 1
at sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
at sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:57)


若一个sql中通过分号分割(或包含)了多个独立sql的话,如:
select 'hello';select 'world'


默认就会报上述错误,当若显式设置allowMultiQueries为true的话,就可以正常执行不会报错.如下所示:
String url = "  jdbc:mysql://127.0.0.1:3306/demo?useUnicode=true&characterEncoding=utf8&allowMultiQueries=true   ";


官方文档解释:
allowMultiQueries
Allow the use of ';' to delimit multiple queries during one statement (true/false), defaults to 'false', and does not affect the addBatch() and executeBatch() methods, which instead rely on rewriteBatchStatements.
Default: false
Since version: 3.1.1


想要看看当该参数设置为true和false时,源码中到底哪里有不同.经过断点调试发现了在下面代码处会有不同的结果:
//所属类和方法:void java.net.SocketOutputStream.socketWrite(byte[] b, int off, int len) throws IOException
socketWrite0(fd, b, off, len);
bytesWritten = len;


当设置为true时,执行完socketWrite0方法后查询query log,会看到这样的输出:
23 Query select 'hello';
23 Query select 'world'


当设置为false时,执行完socketWrite0后.查询query log没有任何输出.


补充如何查看query log:
mysql> show variables like 'general_log%';
+------------------+--------------------------------------------------------------------+
| Variable_name | Value |
+------------------+--------------------------------------------------------------------+
| general_log | OFF |
| general_log_file | /opt/mysql/server-5.6/data/zhuguowei-Presario-CQ43-Notebook-PC.log |
+------------------+--------------------------------------------------------------------+
mysql> set global general_log = 'on' ;
#开启另一终端
tail -f /opt/mysql/server-5.6/data/zhuguowei-Presario-CQ43-Notebook-PC.log
```