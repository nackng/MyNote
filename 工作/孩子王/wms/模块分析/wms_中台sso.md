##sso
###接口
```
/wms-rpc-outbound-service/src/main/java/com/haiziwang/kwms/outbound/service/SsoService.java

package com.haiziwang.kwms.outbound.service;

import com.haiziwang.kwms.common.domain.dto.sys.CheckPwdResDto;
import com.haiziwang.kwms.common.domain.dto.sys.GetResListResDto;
import com.haiziwang.kwms.common.domain.dto.sys.SsoUserReqDto;

/**
 * Copyright: 2016 Haiziwang
 * *
 * Author:  Daniel Kong
 * Date:    2016-07-06
 * Desc:    调用中台SSO接口
 */
public interface SsoService {

    /**
     * 验证用户名密码
     *
     * @param reqDto 查询请求
     * @return 验证结果
     */
    CheckPwdResDto checkPassword(SsoUserReqDto reqDto);

    /**
     * 根据用户密码查询用户可访问资源
     *
     * @param reqDto 查询请求
     * @return 可访问资源列表
     */
    GetResListResDto getResListByPwd(SsoUserReqDto reqDto);
}

```
###实现类
```
/wms-rpc-outbound-service/src/main/java/com/haiziwang/kwms/outbound/service/impl/SsoServiceImpl.java

package com.haiziwang.kwms.outbound.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.haiziwang.kwms.common.domain.dto.sys.CheckPwdResDto;
import com.haiziwang.kwms.common.domain.dto.sys.GetResListResDto;
import com.haiziwang.kwms.common.domain.dto.sys.SsoUserReqDto;
import com.haiziwang.kwms.common.domain.util.HttpUtils;
import com.haiziwang.kwms.outbound.service.SsoService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Copyright: 2016 Haiziwang
 * *
 * Author:  Daniel Kong
 * Date:    2016-07-06
 * Desc:    调用中台SSO接口
 */
@Service("ssoService")
public class SsoServiceImpl implements SsoService {

    @Value("${sso.pwd.url}")
    private String SSO_PWD_URL;

    @Value("${sso.res.url}")
    private String SSO_RES_URL;

    /**
     * 构建参数map
     *
     * @param reqDto sso请求
     * @return 参数
     */
    private Map createMapFromReq(SsoUserReqDto reqDto){
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("loginName", reqDto.getLoginName());
        params.put("loginPass", reqDto.getLoginPass());
        params.put("appCode", reqDto.getAppCode());
        return params;
    }

    /**
     * 验证用户名密码
     *
     * @param reqDto 查询请求
     * @return 验证结果
     */
    @Override
    public CheckPwdResDto checkPassword(SsoUserReqDto reqDto) {
        CheckPwdResDto resDto = null;
        try {
            String response = HttpUtils.sendHttpPost(SSO_PWD_URL, null, null, HttpUtils.buildParamsFromMap(createMapFromReq(reqDto)));
            if (response != null)
                resDto = JSONObject.parseObject(response, CheckPwdResDto.class);
        }catch (Exception e){
            e.printStackTrace();
        }
        return resDto;
    }

    /**
     * 根据用户密码查询用户可访问资源
     *
     * @param reqDto 查询请求
     * @return 可访问资源列表
     */
    @Override
    public GetResListResDto getResListByPwd(SsoUserReqDto reqDto) {
        GetResListResDto resDto = null;
        try {
            String response = HttpUtils.sendHttpPost(SSO_RES_URL, null, null, HttpUtils.buildParamsFromMap(createMapFromReq(reqDto)));
            if (response != null)
                resDto = JSONObject.parseObject(response, GetResListResDto.class);
        }catch (Exception e){
            e.printStackTrace();
        }
        return resDto;
    }
}

```
###sso.properties
```
/wms-rpc-outbound-service/src/test/resources/config/sso.properties
sso.site.host=http://test.site.haiziwang.com
sso.pwd.url=http://test.site.haiziwang.com/sso-web/checkuser/checkPassword.do
sso.res.url=http://test.site.haiziwang.com/sso-web/checkuser/getResListByPwd.do

emp.url=http://172.172.178.17:8080/subscriber-web/emp/getEmpInfo.do
```
###测试用例
```
/wms-rpc-outbound-service/src/test/java/com/haiziwang/kwms/outbound/service/TestSsoService.java

package com.haiziwang.kwms.outbound.service;

import com.alibaba.fastjson.JSON;
import com.haiziwang.kwms.common.domain.dto.sys.CheckPwdResDto;
import com.haiziwang.kwms.common.domain.dto.sys.GetResListResDto;
import com.haiziwang.kwms.common.domain.dto.sys.SsoUserReqDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Copyright: 2016 Haiziwang
 * *
 * Author:  Daniel Kong
 * Date:    2016-07-06
 * Desc:    SsoService 的单元测试
 */
@ContextConfiguration(locations = {"classpath:/config/test-spring-outbound-config.xml"})
@RunWith(SpringJUnit4ClassRunner.class)
public class TestSsoService {

    private static final Logger logger = LoggerFactory.getLogger(TestSsoService.class);

    @Autowired
    private SsoService ssoService;

    @Test
    public void testCheckPassword()  {
        SsoUserReqDto reqDto = new SsoUserReqDto();
        reqDto.setLoginName("19020906");
        reqDto.setLoginPass("fff16a8f283fb8b58b957dfb9d3a0594");
        reqDto.setAppCode("KWMS");

        CheckPwdResDto resDto = ssoService.checkPassword(reqDto);
        logger.info(JSON.toJSONString(resDto));
    }

    @Test
    public void testGetResListByPwd()  {
        SsoUserReqDto reqDto = new SsoUserReqDto();
        reqDto.setLoginName("19020906");
        reqDto.setLoginPass("fff16a8f283fb8b58b957dfb9d3a0594");
        reqDto.setAppCode("KWMS");

        GetResListResDto resDto = ssoService.getResListByPwd(reqDto);
        logger.info(JSON.toJSONString(resDto));
    }
}

```
###test-spring-outbound-config.xml
```
/wms-rpc-outbound-service/src/test/resources/config/test-spring-outbound-config.xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:annotation-config/>
    <context:component-scan base-package="com.haiziwang.kwms"/>

    <!-- 引入其他 spring 配置文件 -->
    <import resource="classpath:config/test-spring-outbound-database-config.xml"/>



    <bean id="threadPoolTaskExecutor"
          class="org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor">

        <!-- 核心线程数，默认为1 -->
        <property name="corePoolSize" value="10" />

        <!-- 最大线程数，默认为Integer.MAX_VALUE -->
        <property name="maxPoolSize" value="50" />

        <!-- 队列最大长度，一般需要设置值>=notifyScheduledMainExecutor.maxNum；默认为Integer.MAX_VALUE-->
        <property name="queueCapacity" value="1000" />

        <!-- 线程池维护线程所允许的空闲时间，默认为60s -->
        <property name="keepAliveSeconds" value="300" />

        <!-- 线程池对拒绝任务（无线程可用）的处理策略，目前只支持AbortPolicy、CallerRunsPolicy；默认为后者 -->
        <property name="rejectedExecutionHandler">
            <!-- AbortPolicy:直接抛出java.util.concurrent.RejectedExecutionException异常 -->
            <!-- CallerRunsPolicy:主线程直接执行该任务，执行完之后尝试添加下一个任务到线程池中，可以有效降低向线程池内添加任务的速度 -->
            <!-- DiscardOldestPolicy:抛弃旧的任务、暂不支持；会导致被丢弃的任务无法再次被执行 -->
            <!-- DiscardPolicy:抛弃当前任务、暂不支持；会导致被丢弃的任务无法再次被执行 -->
            <bean class="java.util.concurrent.ThreadPoolExecutor$CallerRunsPolicy" />
        </property>
    </bean>

</beans>

```
###test-spring-outbound-database-config.xml
```
/wms-rpc-outbound-service/src/test/resources/config/test-spring-outbound-database-config.xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:util="http://www.springframework.org/schema/util" xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:property-placeholder ignore-resource-not-found="true"
                                  location="classpath*:/config/test.database.properties,classpath:/config/test.jwt.properties,classpath*:/config/kmem.config.properties,classpath:/config/sso.properties, classpath:/config/courier.properties, classpath:/config/mail.properties"/>
    <!-- 数据源1 (kwms数据库)-->
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

    <!-- 数据源2 (kwms_interface数据库)-->
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

    <!-- 数据源3 (kwms_invoice数据库)-->
    <bean id="dataSource3" class="org.apache.tomcat.jdbc.pool.DataSource">
        <property name="driverClassName" value="${partition3.driverClassName}"/>
        <property name="url" value="${partition3.url}"/>
        <property name="username" value="${partition3.username}"/>
        <property name="password" value="${partition3.password}"/>
        <property name="maxActive" value="${partition3.maxActive}"/>
        <property name="maxWait" value="${partition3.maxWait}"/>
        <property name="initialSize" value="${partition3.initialSize}"/>
        <property name="maxIdle" value="${partition3.maxActive}"/>
        <property name="minIdle" value="${partition3.minIdle}"/>
        <property name="testWhileIdle" value="${partition3.testWhileIdle}"/>
        <property name="testOnReturn" value="${partition3.testOnReturn}"/>
        <property name="testOnBorrow" value="${partition3.testOnBorrow}"/>
        <property name="validationQuery" value="${partition3.validationQuery}"/>
        <property name="validationInterval" value="30000" />
        <property name="timeBetweenEvictionRunsMillis" value="${partition3.timeBetweenEvictionRunsMillis}"/>
        <property name="minEvictableIdleTimeMillis" value="${partition3.minEvictableIdleTimeMillis}"/>
    </bean>

    <!-- 商品品类库 （同步基础数据表 mst_sku的品类信息 使用）-->
    <bean id="dataSourceSkuCat" class="org.apache.tomcat.jdbc.pool.DataSource">
        <property name="driverClassName" value="${sync.skucat.driverClassName}"/>
        <property name="url" value="${sync.skucat.url}"/>
        <property name="username" value="${sync.skucat.username}"/>
        <property name="password" value="${sync.skucat.password}"/>
        <property name="maxActive" value="${sync.skucat.maxActive}"/>
        <property name="maxWait" value="${sync.skucat.maxWait}"/>
        <property name="initialSize" value="${sync.skucat.initialSize}"/>
        <property name="maxIdle" value="${sync.skucat.maxActive}"/>
        <property name="minIdle" value="${sync.skucat.minIdle}"/>
        <property name="testWhileIdle" value="${sync.skucat.testWhileIdle}"/>
        <property name="testOnReturn" value="${sync.skucat.testOnReturn}"/>
        <property name="testOnBorrow" value="${sync.skucat.testOnBorrow}"/>
        <property name="validationQuery" value="${sync.skucat.validationQuery}"/>
        <property name="validationInterval" value="30000" />
        <property name="timeBetweenEvictionRunsMillis" value="${sync.skucat.timeBetweenEvictionRunsMillis}"/>
        <property name="minEvictableIdleTimeMillis" value="${sync.skucat.minEvictableIdleTimeMillis}"/>
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
    <bean id="partition3" class="com.alibaba.cobarclient.Shard">
        <property name="id" value="partition3"/>
        <property name="dataSource" ref="dataSource3"/>
    </bean>
    <bean id="partitionSkuCat" class="com.alibaba.cobarclient.Shard">
        <property name="id" value="partitionSkuCat"/>
        <property name="dataSource" ref="dataSourceSkuCat"/>
    </bean>

    <!-- Shards 配置 -->
    <util:set id="shardSet" set-class="java.util.LinkedHashSet">
        <ref bean="partition1"/>
        <ref bean="partition2"/>
        <ref bean="partition3"/>
        <ref bean="partitionSkuCat"/>
    </util:set>

    <!-- 路由配置 -->
    <bean id="router" class="com.alibaba.cobarclient.config.SimpleRouterFactoryBean">
        <property name="configLocations">
            <!-- 注意： 默认使用 partition1 路由，仅在使用其他路由时需要在此配置规则 -->
            <list>
                <value>classpath*:/rules/invoice-auto-print-wave-rule.xml</value>
                <value>classpath*:/rules/invoice-auto-print-outbound-rule.xml</value>
                <value>classpath*:/rules/invoice-code-number-rule.xml</value>
                <value>classpath*:/rules/invoice-company-rule.xml</value>
                <value>classpath*:/rules/invoice-distribute-item-rule.xml</value>
                <value>classpath*:/rules/invoice-distribute-rule.xml</value>
                <value>classpath*:/rules/invoice-wave-order-rule.xml</value>
                <value>classpath*:/rules/invoice-wave-print-rule.xml</value>
                <value>classpath*:/rules/invoice-inventory-rule.xml</value>
                <value>classpath*:/rules/invoice-machine-rule.xml</value>
                <value>classpath*:/rules/invoice-mst-basedefine-rule.xml</value>
                <value>classpath*:/rules/invoice-outbound-rule.xml</value>
                <value>classpath*:/rules/invoice-pick-order-rule.xml</value>
                <value>classpath*:/rules/invoice-pick-orderline-rule.xml</value>
                <value>classpath*:/rules/invoice-print-detail-rule.xml</value>
                <value>classpath*:/rules/invoice-template-rule.xml</value>
                <value>classpath*:/rules/invoice-tinvoice-rule.xml</value>
                <value>classpath*:/rules/auto-print-rule.xml</value>
                <value>classpath*:/rules/sku-catalog-class-rule.xml</value>
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
```