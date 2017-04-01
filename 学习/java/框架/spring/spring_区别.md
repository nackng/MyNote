[TOC]
##BeanFactory 与 FactoryBean
BeanFactory： 以Factory结尾，表示它是一个工厂类，是用于管理Bean的一个工厂

FactoryBean：以Bean结尾，表示它是一个Bean，不同于普通Bean的是：它是实现了FactoryBean<T>接口的Bean，根据该Bean的Id从BeanFactory中获取的实际上是FactoryBean的getObject()返回的对象，而不是FactoryBean本身， 如果要获取FactoryBean对象，可以在id前面加一个&符号来获取。

###spring中的Bean有两种

1.一种是普通的bean ，比如配置
```
<bean id="personService" class="com.brianway.learning.spring.ioc.factorybean.PersonServiceImpl"
     scope="prototype" >
    <property name="name" value="Feagle"/>
</bean>

public class PersonServiceImpl implements PersonService {
    private String name;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public String sayHello() {
        return "hi,"+this.name;
    }
}

public interface PersonService {


    String sayHello();

    String getName();

} 
```
那个使用BeanFactory根据id personService获取bean的时候，得到的对象就是PersonServiceImpl类型的。

2.另外一种就是实现了org.springframework.beans.factory.FactoryBean<T>接口的Bean ， 那么在从BeanFactory中根据定义的id获取bean的时候，获取的实际上是FactoryBean接口中的getObject()方法返回的对象。
以Spring提供的ProxyFactoryBean为例子，配置如下：
```
<bean id="personServiceByLog" class="org.springframework.aop.framework.ProxyFactoryBean">  
    <property name="proxyInterfaces">  
        <list>  
            <value>com.spring.service.PersonService</value>  
        </list>  
    </property>  
    <property name="interceptorNames">  
        <list>  
            <value>logInteceptor</value>  
            <value>ZFMethodAdvice</value>  
        </list>  
    </property>  
    <property name="targetName" value="personService" />    
</bean>
```
那么在代码中根据personServiceByLog来获取的Bean实际上是PersonService类型的。

`PersonService ps = context.getBean("personServiceByLog", PersonService.class);`

如果要获取ProxyFactoryBean本身:
`ProxyFactoryBean factoryBean = context.getBean("&personServiceByLog", ProxyFactoryBean.class);  
PersonService ps = (PersonService) factoryBean.getObject();
`

###自己实现一个FactoryBean
功能：用来代理一个对象，对该对象的所有方法做一个拦截，在方法调用前后都输出一行log
```
package com.brianway.learning.spring.ioc.factorybean;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.InitializingBean;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * Created by allen on 2017/3/8.
 * 功能：自己实现一个factoryBean，用来代理一个对象，对该对象的所有方法做一个拦截，在方法调用前后都输出一行log
 */
public class DefineFactoryBean implements FactoryBean<Object>, InitializingBean, DisposableBean {

    // 被代理对象实现的接口名（在使用Proxy时需要用到，用于决定生成的代理对象类型）
    private String interfaceName;

    // 被代理的对象
    private Object target;

    // 生成的代理对象
    private Object proxyObj;

    public void destroy() throws Exception {
        System.out.println("distory...");
    }

    public void afterPropertiesSet() throws Exception {

        proxyObj = Proxy.newProxyInstance(this.getClass().getClassLoader(),
                new Class[] { Class.forName(interfaceName) }, new InvocationHandler() {

                    public Object invoke(Object proxy, Method method, Object[] args)
                            throws Throwable {
                        System.out.println("method:" + method.getName());
                        System.out.println("Method before...");
                        Object result = method.invoke(target, args);
                        System.out.println("Method after...");
                        return result;
                    }
                });

        System.out.println("afterPropertiesSet");
    }

    public Object getObject() throws Exception {
        System.out.println("getObject");
        return proxyObj;
    }

    public Class<?> getObjectType() {
        return proxyObj == null ? Object.class : proxyObj.getClass();
    }

    public boolean isSingleton() {
        return true;
    }

    public String getInterfaceName() {
        return interfaceName;
    }

    public void setInterfaceName(String interfaceName) {
        this.interfaceName = interfaceName;
    }

    public Object getTarget() {
        return target;
    }

    public void setTarget(Object target) {
        this.target = target;
    }

}
```
首先这样定义bean
com/brianway/learning/spring/ioc/factorybean/beans-definefactorybean.xml
```
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <bean id="personService" class="com.brianway.learning.spring.ioc.factorybean.PersonServiceImpl"
         scope="prototype" >
        <property name="name" value="Feagle"/>
    </bean>

    <bean id="definePerson" class="com.brianway.learning.spring.ioc.factorybean.DefineFactoryBean">
        <property name="interfaceName" value="com.brianway.learning.spring.ioc.factorybean.PersonService" />
        <property name="target"  ref="personService"/>
    </bean>
</beans>
```
然后获取Bean，并测试
```
public class DefineFactoryBeanTest {
    /**
     * 会发现sayHello与getName方法调用前后都有log打印
     */
    @Test
    public void testGetBean() {
        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("com/brianway/learning/spring/ioc/factorybean/beans-definefactorybean.xml");
        PersonService person = (PersonService) ctx.getBean("definePerson");

        System.out.println(person);
        System.out.println(person.getName());
        System.out.println(person.sayHello());
    }
}
```
##