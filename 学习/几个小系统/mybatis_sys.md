[TOC]
##mybatis_通过配置动态建表
[Mybatis_BuildTable](https://git.oschina.net/sunchenbin/Mybatis_BuildTable_V0.2)
###项目依赖关系
启动model-store-frontend项目，web.xml:
```
<servlet>
    <servlet-name>spring</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath*:core/spring-servlet.xml</param-value>
    </init-param>
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>spring</servlet-name>
    <url-pattern>*.do</url-pattern>
  </servlet-mapping>
  <welcome-file-list>
    <welcome-file>index.do</welcome-file>
  </welcome-file-list>
```
项目启动时会自动访问index.do，并且项目model-store-frontend 依赖于 model-store-web 依赖于 model-store-repo，
/model-store-web/src/main/resources/core/applicationContext.xml 配置文件 依赖于 /model-store-frontend/src/main/resources/config/config.properties，
###初始化方法及执行模式
/model-store-repo/src/main/java/com/sunchenbin/store/manager/system/SysMysqlCreateTableManagerImpl.java
中有个初始化方法
``` 
/**
 * 读取配置文件的三种状态（创建表、更新表、不做任何事情）
 */
@PostConstruct
public void createMysqlTable() {
}
所以项目启动时会执行 createMysqlTable 方法，

/**
 * 要扫描的model所在的pack
 */
@Value("#{configProperties['mybatis.model.pack']}")
private String pack;

/model-store-web/src/main/resources/core/applicationContext.xml
<bean id="configProperties" class="org.springframework.beans.factory.config.PropertiesFactoryBean">
    <property name="locations">
        <list>
            <value>classpath*:config/autoCreateTable.properties</value>
        </list>
    </property>
</bean>

<bean id="propertyConfigurer" class="org.springframework.beans.factory.config.PreferencesPlaceholderConfigurer">
    <property name="properties" ref="configProperties" />
</bean>
```
/model-store-web/src/main/resources/core/applicationContext.xml 也依赖于 /model-store-frontend/src/main/resources/config/autoCreateTable.properties
获取 创建表的模式，及 要扫描的实体。
###核心方法
核心方法allTableMapConstruct()中有一个根据表名查询库中该表的字段结构等信息findTableEnsembleByTableName();
```
/model-store-repo/src/main/java/com/sunchenbin/store/dao/system/CreateMysqlTablesMapper.java
/**
 * 根据表名查询库中该表的字段结构等信息
 * @param tableName
 * @return
 */
public List<SysMysqlColumns> findTableEnsembleByTableName(@Param("tableName") String tableName);

/model-store-repo/src/main/java/com/sunchenbin/store/mapping/system/CreateMysqlTablesMapper.xml
<!-- 根据表名查询表的结构 -->
<select id="findTableEnsembleByTableName" resultType="com.sunchenbin.store.command.SysMysqlColumns" parameterType="String">
    select * from information_schema.columns where table_name = #{tableName}
</select>

// 1. 获取总的字段（需要改进点：）
List<String> columnNames = ClassTools.getPropertyValueList(tableColumnList,
                        SysMysqlColumns.COLUMN_NAME);
//找出要删除的字段：
// 2. 找出删除的字段
buildRemoveFields(removeTableMap, table, removeFieldList, columnNames, fieldMap);
```
###改进版
改进点：
在 createMysqlTablesMapper 接口中， 增加了数据库 字段。
##mybatis-redis-counter
###简介
```
https://github.com/ScienJus/mybatis-redis-counter
https://github.com/adanac/mybatis-redis-counter
系统结合mybatis与redis操作。
mybatis操作数据库(此处仅初如化数据，插入一条数据),而利用redis进行查询、更新操作。
```
###为什么使用Redis
```
在应用程序中经常会出现一些计数需求，例如访问量、粉丝数等。

对于这些写入非常频繁的数据，直接通过SQL update数据库是一种非常耗费性能的行为，无意义的连接占用和锁占用会造成数据库压力。

所以引入拥有单线程，原子操作等优势的Redis解决这个问题再合适不过了。所有计数操作都在Redis中完成，只需要定时将Redis中的数据同步到数据库中就可以了（也可以不同步，只存放在Redis中）。

这个库没有提供同步操作的原因是：在接口层做定时任务是非常不可靠且不优雅的。同步其实很简单，你只需要写个脚本定时从Redis中使用 scan 操作查询出当前的数据然后更新到数据库中即可（注意不要用 keys 操作）。

注意这个库所做的并不是缓存，缓存解决的是读频繁问题，而这个库解决的是写频繁问题，它并不能改善读性能。

来源：  https://github.com/adanac/mybatis-redis-counter/blob/master/zh.md
```
##Mybatis-PageHelper
https://github.com/pagehelper/Mybatis-PageHelper
###sql既可以写在接口中也可以写在配置文件中
```
public interface CountryMapper {
    @Select("select * from country order by ${order}")
    List<Country> selectByOrder(@Param("order") String order);
    List<Country> selectByOrder2(@Param("order") String order);
}
mapper.xml:
<select id="selectByOrder2" resultType="com.github.pagehelper.model.Country">
    select * from country order by ${order}
</select>
测试类:
List<Country> list = countryMapper.selectByOrder2("id");
list = countryMapper.selectByOrder("countryname");
```
###
##Mybatis 通用Mapper
[mybatis-mapper](http://www.oschina.net/p/mybatis-mapper)
##mybatis根据数据库表生成实体+接口+Mapper
[mybatis-generator-gui](https://github.com/astarring/mybatis-generator-gui)
[支持oracle参考cnblog](http://www.cnblogs.com/NieXiaoHui/p/6094144.html)
