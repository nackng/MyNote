## JDWP Unable to get JNI 1.2 environment, jvm->GetEnv() return code = -2
```


在用java编程的时候，偶尔会出现下面的错误，jdk1.6.0-rc1：

ERROR: JDWP Unable to get JNI 1.2 environment, jvm->GetEnv() return code = -2
JDWP exit error AGENT_ERROR_NO_JNI_ENV(183): [http://www.cnblogs.com/../src/share/back/util.c:820]

解决方法：

在程序最后，main()函数中添加：

System.exit(0);
将解决这个问题。具体的线程问题还要等新版本出来吧。

参考链接： http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=6476706  

来源：  http://www.cnblogs.com/abinxm/archive/2011/11/07/2239081.html
```
## java.lang. NoClassDefFoundError : org/apache/http/config/Lookup
```
这个问题比较特殊，其他的项目运行没问题，有一个项目运行有问题。
跟踪发现是这个项目的pom文件中引入的http相关的jar版本不一致导致 。
比如一致的版本组合：   

<httpclient>4.5.1</httpclient>
<httpcore>4.4.3</httpcore> <httpmine>4.5.1</httpmine>  
```
##Cannot load JDBC driver class 'com.mysql.jdbc.Driver'
```
将mysql-connector-java-5.1.38.jar放到tomcat/lib文件夹下即可。

``` ##further occurrences of HTTP header parsing errors will be logged at DEBUG level.
```
headerBufferSize和socketReadBufferSize，如果读取时数据的长度大于这两个值，就会报iib.requestheadertoolarge.error即Request header is too large，在网上搜索时，有的是因为这个设置导致的400，解决方法就是修改Tomcat的server.xml，  
在<Connector port="8080" protocol="HTTP/1.1"  
 connectionTimeout="20000"    redirectPort="8443" />的配置中增加maxHttpHeaderSize的配置,比如：
<Connector connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443" maxHttpHeaderSize="10240000"/>  

```