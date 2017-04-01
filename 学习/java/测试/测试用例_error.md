[TOC]
##测试用例 Caused by: java.lang.ClassNotFoundException: com.mysql.jdbc.Driver
原因:module对应的pom.xml中没有引入mysql-connector-java.jar
解决：
<!-- MySQL -->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>${mysql-connector.version}</version>
</dependency>
##解析不了数据库配置文件
原因：配置文件中没有引入database.properties
解决一：
test-spring-outbound-database-config.xml
<context:property-placeholder ignore-resource-not-found="true"
                                  location="classpath*:/config/test.database.properties"/>
解决二:
通过bean的方式
<bean id="propertyConfigurer"
      class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
    <property name="locations">
        <list>
            <value>classpath:config/database.properties</value>
        </list>
    </property>
</bean>