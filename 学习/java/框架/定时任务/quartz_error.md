[TOC]
##class org.springframework.scheduling.quartz.JobDetailBean has interface org.quartz.JobDetail as super class
由于Quartz 2.x修改了部分API，所以需要修改一下Quartz的配置。
大体来说很简单，如下：
1）升级Spring的jar包
2）升级Quartz的jar包
3）修改配置
将CronTriggerBean修改为CronTriggerFactoryBean
将JobDetailBean修改为JobDetailFactoryBean
本次所用到的版本为：
<quartz.version>2.2.2</quartz.version>
<spring.version>4.3.0.RELEASE</spring.version>
##Caused by: org.quartz.SchedulerException: Jobs added with no trigger must be durable.
durability 表示任务完成之后是否依然保留到数据库，默认false
在JobDetailFactoryBean 中加一句
<property name搜索="durability" value="true" />即可。