[TOC]
##打印sql
```
只要配置mapper接口类或者配置文件中mapper的路径为debug就可以了. 具体可参考[官方文档](http://www.mybatis.org/mybatis-3/zh/logging.html). 里面还说明了, 如果要打印sql语句的执行结果, 需要设置为trace级别.

log4j.properties:

log4j.rootLogger=info,stdout
 
log4j.appender.stdout=org.apache.log4j.ConsoleAppender  
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout  
log4j.appender.stdout.layout.ConversionPattern=%d %p [%c] -%m%n  
 
 
# 打印sql语句:debug; 执行结果:trace
## 指定mapper配置文件中的namespace
log4j.logger.mybatis.mapper=TRACE

mapper的配置文件:
<mapper namespace="mybatis.mapper.BacktoInErrorLogMapper">
    <select id="selectUser" parameterType="int" resultType="User">  
        <![CDATA[  
            select * from user where id = #{id}  
        ]]>
    </select>
</mapper>


其间还有个小问题, 也记录一下:

提示:

log4j:WARN No appenders could be found for logger (org.apache.ibatis.logging.LogFactory).
log4j:WARN Please initialize the log4j system properly.
log4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.

这种情况下没有打印出日志, 说明应用并没有对log4j进行初始化. 解决方法是要在应用启动时就进行

// 这里的路径根目录是指应用的根目录,而不是classes目录
PropertyConfigurator.configure("bin/conf/log4j.properties");
```
##log4j配置打印mybatis sql语句
```
<dependency>     
    <groupId>log4j</groupId>  
    <artifactId>log4j</artifactId>  
    <version>1.2.17</version>  
</dependency>

可以配置log4j.properties和log4j.xml均可以实现
如：log4j.properties
log4j.rootLogger=DEBUG, stdout    
    
log4j.appender.stdout=org.apache.log4j.ConsoleAppender    
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout    
log4j.appender.stdout.layout.ConversionPattern=[service] %d - %c -%-4r [%t] %-5p %c %x - %m%n    
    
#log4j.appender.R=org.apache.log4j.DailyRollingFileAppender    
#log4j.appender.R.File=../logs/service.log    
#log4j.appender.R.layout=org.apache.log4j.PatternLayout    
#log4j.appender.R.layout.ConversionPattern=[service] %d - %c -%-4r [%t] %-5p %c %x - %m%n    
    
#log4j.logger.com.ibatis = debug    
#log4j.logger.com.ibatis.common.jdbc.SimpleDataSource = debug    
#log4j.logger.com.ibatis.common.jdbc.ScriptRunner = debug    
#log4j.logger.com.ibatis.sqlmap.engine.impl.SqlMapClientDelegate = debug    
#log4j.logger.java.sql.Connection = debug    
log4j.logger.java.sql.Statement = debug    
log4j.logger.java.sql.PreparedStatement = debug    
log4j.logger.java.sql.ResultSet =debug


log4j.xml:
<?xml version="1.0" encoding="UTF-8"?>   
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">  
<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/"  
    debug="false">  
      
    <appender name="CONSOLE" class="org.apache.log4j.ConsoleAppender">  
        <layout class="org.apache.log4j.PatternLayout">  
            <param name="ConversionPattern" value="[%d{dd/MM/yy hh:mm:ss:sss z}] %5p %c{2}: %m%n" />  
        </layout>  
    </appender>  
  
<!--     <appender name="FILE" class="org.apache.log4j.RollingFileAppender"> -->  
<!--         <param name="file" value="${user.home}/foss-framework.log" /> -->  
<!--         <param name="append" value="true" /> -->  
<!--         <param name="maxFileSize" value="10MB" /> -->  
<!--         <param name="maxBackupIndex" value="100" /> -->  
<!--         <layout class="org.apache.log4j.PatternLayout"> -->  
<!--             <param name="ConversionPattern" value="%d [%t] %-5p %C{6} (%F:%L) - %m%n" /> -->  
<!--         </layout> -->  
<!--     </appender> -->  
  
<!--     <appender name="framework" -->  
<!--         class="com.deppon.foss.framework.server.components.logger.BufferedAppender"> -->  
<!--         <layout class="org.apache.log4j.PatternLayout"> -->  
<!--             <param name="ConversionPattern" value="[%d{dd/MM/yy hh:mm:ss:sss z}] %5p %c{2}: %m%n" /> -->  
<!--         </layout> -->  
<!--     </appender> -->  
  
    <!-- 下面是打印 mybatis语句的配置 -->  
    <logger name="com.ibatis" additivity="true">  
        <level value="DEBUG" />  
    </logger>  
  
    <logger name="java.sql.Connection" additivity="true">  
        <level value="DEBUG" />  
    </logger>  
  
    <logger name="java.sql.Statement" additivity="true">  
        <level value="DEBUG" />  
    </logger>  
  
    <logger name="java.sql.PreparedStatement" additivity="true">  
        <level value="DEBUG" />  
    </logger>  
  
    <logger name="java.sql.ResultSet" additivity="true">  
        <level value="DEBUG" />  
    </logger>  
  
    <root>  
        <level value="DEBUG" />  
        <appender-ref ref="CONSOLE" />  
<!--         <appender-ref ref="FILE" /> -->  
<!--         <appender-ref ref="framework" /> -->  
    </root>  
</log4j:configuration>
```