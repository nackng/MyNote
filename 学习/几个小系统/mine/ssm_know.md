[TOC]
##项目
```
https://github.com/adanac/mavenWeb
可通过mybatis-generator根据数据库表自动生成mapper文件。

```
###配置多个数据源
```
通过alibaba的cobarclient可以轻松实现多个数据源的配置。
1.数据源 DataSource
CobarClient 的 DataSource 分为三层
ICobarDataSourceService: 封装了多个 DataSourceDescriptor, 以及 HA 包装的 IHADataSourceCreator
DataSourceDescriptor: 封装了 identity, 主 targetDataSource 以及 备 standbyDataSource
DataSource: 实际数据库 DataSource

2.路由 Router
CobarClient 的路由规则依赖于 iBatis, 它主要由 SqlMap 的 id 和路由字段共同决定最终的datasource

/ssm-interface-dao/src/test/resources/config/test-spring-database-config.xml:
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:util="http://www.springframework.org/schema/util" xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:property-placeholder ignore-resource-not-found="true"
                                  location="classpath*:/config/test.database.properties"/>
    <!-- 数据源1 (demo数据库)-->
    <bean id="dataSource1" class="org.apache.tomcat.jdbc.pool.DataSource">
        <property name="driverClassName" value="${partition1.driverClassName}"/>
        <property name="url" value="${partition1.url}"/>
        <property name="username" value="${partition1.username}"/>
        <property name="password" value="${partition1.password}"/>
        <property name="maxActive" value="${partition1.maxActive}"/>
        <property name="maxWait" value="${partition1.maxWait}"/>
        <property name="initialSize" value="${partition1.initialSize}"/>
        <property name="maxIdle" value="${partition1.maxActive}"/>
        <property name="minIdle" value="${partition1.minIdle}"/>
        <property name="testWhileIdle" value="${partition1.testWhileIdle}"/>
        <property name="testOnReturn" value="${partition1.testOnReturn}"/>
        <property name="testOnBorrow" value="${partition1.testOnBorrow}"/>
        <property name="validationQuery" value="${partition1.validationQuery}"/>
        <property name="validationInterval" value="30000" />
        <property name="timeBetweenEvictionRunsMillis" value="${partition1.timeBetweenEvictionRunsMillis}"/>
        <property name="minEvictableIdleTimeMillis" value="${partition1.minEvictableIdleTimeMillis}"/>
    </bean>

    <!-- 数据源2 (ssm数据库)-->
    <bean id="dataSource2" class="org.apache.tomcat.jdbc.pool.DataSource">
        <property name="driverClassName" value="${partition2.driverClassName}"/>
        <property name="url" value="${partition2.url}"/>
        <property name="username" value="${partition2.username}"/>
        <property name="password" value="${partition2.password}"/>
        <property name="maxActive" value="${partition2.maxActive}"/>
        <property name="maxWait" value="${partition2.maxWait}"/>
        <property name="initialSize" value="${partition2.initialSize}"/>
        <property name="maxIdle" value="${partition2.maxActive}"/>
        <property name="minIdle" value="${partition2.minIdle}"/>
        <property name="testWhileIdle" value="${partition2.testWhileIdle}"/>
        <property name="testOnReturn" value="${partition2.testOnReturn}"/>
        <property name="testOnBorrow" value="${partition2.testOnBorrow}"/>
        <property name="validationQuery" value="${partition2.validationQuery}"/>
        <property name="validationInterval" value="30000" />
        <property name="timeBetweenEvictionRunsMillis" value="${partition2.timeBetweenEvictionRunsMillis}"/>
        <property name="minEvictableIdleTimeMillis" value="${partition2.minEvictableIdleTimeMillis}"/>
    </bean>

    

    <!-- Partition配置 -->
    <bean id="partition1" class="com.alibaba.cobarclient.Shard">
        <property name="id" value="partition1"/>
        <property name="dataSource" ref="dataSource1"/>
    </bean>
    <bean id="partition2" class="com.alibaba.cobarclient.Shard">
        <property name="id" value="partition2"/>
        <property name="dataSource" ref="dataSource2"/>
    </bean>
    

    <!-- Shards 配置 -->
    <util:set id="shardSet" set-class="java.util.LinkedHashSet">
        <ref bean="partition1"/>
        <ref bean="partition2"/>
    </util:set>

    <!-- 路由配置 -->
    <bean id="router" class="com.alibaba.cobarclient.config.SimpleRouterFactoryBean">
        <property name="configLocations">
            <!-- 注意： 默认使用 partition1 路由，仅在使用其他路由时需要在此配置规则 -->
            <list>
                <value>classpath:/rules/task-rule.xml</value>
                <value>classpath:/rules/student-rule.xml</value>
                <value>classpath:/rules/teacher-rule.xml</value>
            </list>
        </property>
        <property name="shards" ref="shardSet"/>
    </bean>

    <!-- SqlSession 和 SqlSessionFactory配置 -->
    <bean id="sqlSession" class="com.raycloud.cobarclient.mybatis.spring.MySqlSessionTemplate">
        <constructor-arg index="0" ref="sqlSessionFactory"/>
        <property name="router" ref="router"/>
        <property name="shards" ref="shardSet"/>
    </bean>
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource1"/>
        <property name="configLocation" value="classpath:config/test-mybatis-config.xml"/>
        <property name="mapperLocations" value="classpath*:mybatis.mapper/*.xml"/>
    </bean>

    <!-- 事务配置 -->
    <tx:annotation-driven transaction-manager="transactionManager" proxy-target-class="true"/>
    <aop:aspectj-autoproxy proxy-target-class="true"/>
    <bean id="transactionManager"
          class="com.alibaba.cobarclient.transaction.MyBestEffortMultiDataSourceTransactionManager">
        <property name="shards" ref="shardSet"/>
        <property name="transactionSynchronization" value="2"/>
    </bean>
</beans>

/ssm-interface-dao/src/test/resources/config/test.database.properties
## partition1
partition1.driverClassName=com.mysql.jdbc.Driver
partition1.ip=192.168.24.87
partition1.port=3306
partition1.database=demo
partition1.url=jdbc:mysql://localhost:3306/demo?useUnicode=true&characterEncoding=utf8&allowMultiQueries=true
partition1.username=root
partition1.password=root
partition1.maxActive=50
partition1.maxWait=1800
partition1.initialSize=2
partition1.minIdle=2
partition1.testWhileIdle=true
partition1.testOnReturn=false
partition1.testOnBorrow=true
partition1.validationQuery=select now()
partition1.timeBetweenEvictionRunsMillis=60000
partition1.minEvictableIdleTimeMillis=180000

## partition2
partition2.driverClassName=com.mysql.jdbc.Driver
partition2.ip=192.168.24.87
partition2.port=3306
partition2.database=ssm
partition2.url=jdbc:mysql://localhost:3306/ssm?useUnicode=true&characterEncoding=utf8&allowMultiQueries=true
partition2.username=root
partition2.password=root
partition2.maxActive=50
partition2.maxWait=1800
partition2.initialSize=2
partition2.minIdle=2
partition2.testWhileIdle=true
partition2.testOnReturn=false
partition2.testOnBorrow=true
partition2.validationQuery=select now()
partition2.timeBetweenEvictionRunsMillis=60000
partition2.minEvictableIdleTimeMillis=180000


```