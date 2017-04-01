[TOC]
##跑测试用例时，ERROR StatusLogger No log4j2 configuration file found. Using default configuration: logging only err
解决一：Add below log4j2.xml simple configuration file under src/main/resources folder
```
E:\adanac_demo\zTree\zTree-intf\src\test\resources\log4j2.xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">

    <!-- Author:  Crunchify.com  -->
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{YYYY-MM-dd HH:mm:ss} [%t] %-5p %c{1}:%L - %msg%n"/>
        </Console>

        <RollingFile name="RollingFile" filename="log/CrunchifyTest.log"
                     filepattern="${logPath}/%d{YYYYMMddHHmmss}-fargo.log">
            <PatternLayout pattern="%d{YYYY-MM-dd HH:mm:ss} [%t] %-5p %c{1}:%L - %msg%n"/>
            <Policies>
                <SizeBasedTriggeringPolicy size="100 MB"/>
            </Policies>
            <DefaultRolloverStrategy max="20"/>
        </RollingFile>

    </Appenders>
    <Loggers>
        <Root level="info">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="RollingFile"/>
        </Root>
    </Loggers>
</Configuration>
```
##log4j:ERROR No appender named [] could be found.
