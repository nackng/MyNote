[TOC]
## 项目本地测试运行，没有问题，而部署到其他服务器时，报404
```
情况1.可能将工程源代码拷贝到了webapps目录下。
解决方案：
--将工程项目打成war包拷贝到Webapps目录下  或者  将本地运行的服务器下的项目拷贝到 webapps 目录下。


情况2：本地运行项目正常，部署到服务器就提示404，访问服务器下的index.html也不可以：
原因可能是服务器配置有问题，比如没有在conf/context.xml中配置数据源等问题。
<Context>
<Resource auth="Container" driverClassName="com.mysql.jdbc.Driver" maxActive="5" maxIdle="2" maxWait="-1" name="jdbc/uaa" password="" type="javax.sql.DataS
ource" url="jdbc:mysql://192.168.1.44:3306/b2b_uaa_dev?useUnicode=true&amp;characterEncoding=UTF-8" username="root"/>
</Context>
```

