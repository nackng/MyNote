[TOC]
##spring实现初始化
```
关于在spring  容器初始化 bean 和销毁前所做的操作定义方式有三种：
第一种：通过@PostConstruct 和 @PreDestroy 方法 实现初始化和销毁bean之前进行的操作

这两个注解被用来修饰一个非静态的void()方法.而且这个方法不能有抛出异常声明。
1.@PostConstruct说明
     被@PostConstruct修饰的方法会在服务器加载Servlet的时候运行，并且只会被服务器调用一次，类似于Servlet的init()方法。被@PostConstruct修饰的方法会在构造函数之后，init()方法之前运行。

2.@PreConstruct说明
     被@PreConstruct修饰的方法会在服务器卸载Servlet的时候运行，并且只会被服务器调用一次，类似于Servlet的destroy()方法。被@PreConstruct修饰的方法会在destroy()方法之后运行，在Servlet被彻底卸载之前。

实例一：
com.adanac.ssm.web.AnnotationServlet

package com.adanac.ssm.web;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by allen on 2017/3/6.
 */


public class AnnotationServlet extends HttpServlet {
    SimpleDateFormat df = new SimpleDateFormat("HH:mm:ss.SSS");//设置日期格式,精确到毫秒

    public AnnotationServlet(){
        System.out.println("时间："+df.format(new Date())+"执行构造函数...");
    }

    public void destroy() {
        this.log("时间："+df.format(new Date())+"执行destroy()方法...");
        //super.destroy(); // Just puts "destroy" string in log
        // Put your code here
    }

    @PostConstruct
    public void someMethod(){
        //this.log("执行@PostConstruct修饰的someMethod()方法...");//注意：这样会出错
        System.out.println("时间："+df.format(new Date())+"执行@PostConstruct修饰的someMethod()方法...");
    }

    @PreDestroy
    public void otherMethod(){
        System.out.println("时间："+df.format(new Date())+"执行@PreDestroy修饰的otherMethod()方法...");
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.log("时间："+df.format(new Date())+"执行doGet()方法...");
    }

    public void init() throws ServletException {
        // Put your code here
        this.log("时间："+df.format(new Date())+"执行init()方法...");
    }

    protected void service(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException{
        this.log("时间："+df.format(new Date())+"执行service()方法...");
        super.service(request, response);
    }

}

WEB-INF/web.xml
<!-- @PostConstruct和@PreDestroy注解 -->
<servlet>
    <servlet-name>AnnotationServlet</servlet-name>
    <servlet-class>com.adanac.ssm.web.AnnotationServlet</servlet-class>
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>AnnotationServlet</servlet-name>
    <url-pattern>/servlet/AnnotationServlet</url-pattern>
</servlet-mapping>

访问：http://localhost:8080/tiny//servlet/AnnotationServlet
看到日志输出：
时间：11:24:29.129执行构造函数...
时间：11:24:29.131执行@PostConstruct修饰的someMethod()方法...


第二种是：通过 在xml中定义init-method 和  destory-method方法
第三种是： 通过bean实现InitializingBean和 DisposableBean接口
```
##配置只扫描包下的Dao
```
1。配置文件
com/brianway/learning/spring/ioc/annotation/beans-annotation.xml
<context:component-scan base-package="com.brianway.learning.spring.ioc.annotation"/>

2.实体类
com.brianway.learning.spring.ioc.annotation.Boss
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;

/**
 * 基于注解的Boss类
 */
@Component
public class Boss {

    private Car car;

    public Boss() {
        System.out.println("construct...");
    }

//  @Autowired
//  private void setCar(Car car){
//      System.out.println("execute in setCar");
//      this.car = car;
//  }

    @Resource
    private void setCar(Car car) {
        System.out.println("execute in setCar");
        this.car = car;
    }

    @PostConstruct
    private void init1() {
        System.out.println("execute in init1");
    }

    @PostConstruct
    private void init2() {
        System.out.println("execute in init2");
    }

    @PreDestroy
    private void destory1() {
        System.out.println("execute in destory1");
    }

    @PreDestroy
    private void destory2() {
        System.out.println("execute in destory2");
    }

}

3.测试类
/**
 * 测试bean的作用范围及生命过程方法
 */
public class AnnotationTest {
    @Test
    public void testBeanLife() {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("com/brianway/learning/spring/ioc/annotation/beans-annotation.xml");
        ((ClassPathXmlApplicationContext) ctx).destroy();
    }
    @Test
    public void testService() {
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();

        ctx.register(LogonController.class);
        ctx.register(LogonService.class);
        ctx.register(LogDao.class);
        ctx.register(UserDao.class);

        ctx.refresh();
        LogonController controller = ctx.getBean(LogonController.class);
        controller.invokeInitMethod();
    }
}

```
##spring中的p标签
spring的p标签是基于XML Schema的配置方式，目的是为了简化配置方式。
在XML文件头部添加xmlns:p="http://www.springframework.org/schema/p"即可使用。
```
例如：
类Person
public class Person  
{  
  private int age;  
  private Tool tool;  
  public void setAge(int age)  
  {  
     this.age=age;  
  }  
  public void setTool(Tool tool)  
  {  
     this.tool=tool;  
  }  
其余代码省略  
......  
}  
原本的bean配置为

<?xml version="1.0" encoding="GBK"?>  
<beans xmlns="http://www.springframework.org/schema/beans"  
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
    xsi:schemaLocation="http://www.springframework.org/schema/beans   
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">  
    <bean id="person" class="com.myclass.Person">  
        <property name="age" value="21"/>  
        <property name="tool" ref="tool"/>  
    </bean>  
</beans>  

使用P标签的配置为

<?xml version="1.0" encoding="GBK"?>  
<beans xmlns="http://www.springframework.org/schema/beans"  
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
    xmlns:p="http://www.springframework.org/schema/p"  
    xsi:schemaLocation="http://www.springframework.org/schema/beans   
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">  
    <bean id="person" class="com.myclass.Person" p:age="21" p:tool-ref="tool"/>  
</beans>  
tool之后添加"-ref"后缀表示是对另外一个bean的引用。
```
##使用FactoryBean接口实现自定义bean初始化
###分析
本文所要介绍的FactoryBean是Spring中定义的一个接口，当把它的实现类定义为BeanFactory中的一个bean，我们在获取其对应的bean时实际上获取的是FactoryBean所包含的那个对象，而不是它本身。我们先来看一下FactoryBean的定义。
public interface FactoryBean<T> {  
   
   /** 
    * 获取实际要返回的bean对象。 
    * @return 
    * @throws Exception 
    */  
   T getObject() throws Exception;  
   
   /** 
    * 获取返回的对象类型 
    * @return 
    */  
   Class<?> getObjectType();  
   
   /** 
    * 是否单例 
    * @return 
    */  
   boolean isSingleton();  
   
}  


我们可以看到FactoryBean是使用了泛型的，表示其对应产生的Bean是什么类型的对象。我们来看一个实现。
public class UserFactoryBean implements FactoryBean<User>{

    private User user;

    /**
     * 获取实际要返回的bean对象
     * @return
     * @throws Exception
     */
    public User getObject() throws Exception {
        if(null == user){
            synchronized (this){
                if(null == user){
                    User user = new User();
                    user.setId("1");
                    user.setName("Feagle");
                }
            }
        }
        return user;
    }

    /**
     * 获取返回的对象类型
     * @return
     */
    public Class<?> getObjectType() {
        return User.class;
    }

    /**
     * 是否单例
     * @return
     */
    public boolean isSingleton() {
        return false;
    }
}
 
 
UserFactoryBean，用以产生一个单例的User对象。
可以看到，我们在getObject()方法中使用了同步块来保证产生的bean永远是同一个对象。其实这个并不是必须的。在初始化时BeanFactory调用FactoryBean创建bean时就是同步的，而且BeanFactory创建bean时默认是单例的。也就意味着FactoryBean的getObject方法在BeanFactory中定义为单例的时候只会调用一次。

但有一种情况例外，那就是如果定义bean时指定了“lazy-init=true”时，那就意味着该bean只有在用到的时候才会进行初始化，这个时候如果刚好两个线程同时需要使用，就会出现在两个线程中同时调用FactoryBean的getObject方法进行bean的初始化，如不加控制就会出现两个实例。为保证只有一个实例，getObject方法内部需要是同步的。

此外，需要注意的是FactoryBean的isSingleton方法返回结果表示当前FactoryBean产生的bean是否是单例形式，即每次请求getObject()方法返回的是否都是同一个bean对象。其实FactoryBean更多的是在Spring内部使用，isSingleton只是用来表示当前返回的bean对象是否可以用BeanFactory缓存的一个标志。
上面示例对象的Spring配置文件如下：
<bean id="userFactoryBean" class="com.xxx.spring.factorybean.UserFactoryBean" lazy-init="false"/>  

对于一个FactoryBean接口实现类定义的bean其实Spring将实例化两个bean，一个是FactoryBean本身对应的bean，另一个是FactoryBean产生的对象对应的bean。所以当我们在通过注解方式注入一个FactoryBean实例对应的bean时，既可以把它当做一个FactoryBean进行注入，也可以把它当做一个对应产生的实例进行注入。而如果是自己直接从ApplicationContext中获取的话，则直接通过FactoryBean实现类定义的bean名称获取到的是FactoryBean实现类产生的对象。如在上面示例中，如果我们通过ApplicationContext的getBean(“userFactoryBean”)获取到的就将是对应产生的User对象，如果我们需要获取到对应的FactoryBean本身，则可以在对应的FactoryBean实现类定义的bean名称前加上“&”进行获取，如上如果我们要获取到UserFactoryBean本身，则可以通过ApplicationContext的getBean(“&userFactoryBean”)。如果是通过类型获取，就可以直接通过User类型或者UserFactoryBean类型获取到对应的bean对象了。
###总结
- 使产生的对象为不同的对象
```
public class UserFactoryBean implements FactoryBean<User> {

    private User user;

    /**
     * 获取实际要返回的bean对象
     *
     * @return
     * @throws Exception
     */
    public User getObject() throws Exception {
        User user = new User();
        user.setId("1");
        user.setName("Feagle");
        return user;
    }

    /**
     * 获取返回的对象类型
     *
     * @return
     */
    public Class<?> getObjectType() {
        return User.class;
    }

    /**
     * 是否单例
     *
     * @return
     */
    public boolean isSingleton() {
        return false;
    }
}

com/brianway/learning/spring/ioc/factorybean/beans-userfactorybean.xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

    <bean id="user" class="com.brianway.learning.spring.ioc.factorybean.User"
          p:id="101" p:name="用户1" />

    <bean id="user-factorybean" class="com.brianway.learning.spring.ioc.factorybean.UserFactoryBean" />

</beans>

public class UserFactoryBeanTest {
    @Test
    public void testGetBean() {
        ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("com/brianway/learning/spring/ioc/factorybean/beans-userfactorybean.xml");
        User userFactoryBean1 = (User) ctx.getBean("user-factorybean");
        User userFactoryBean2 = (User) ctx.getBean("user-factorybean");

        //isSingleton() return false
        System.out.println(userFactoryBean1 == userFactoryBean2);//false
        Assert.assertFalse(userFactoryBean1 == userFactoryBean2);//通过
        System.out.println(userFactoryBean1);//User{id='1', name='Feagle'}
    }
}
```
- 得到相同的两个对象
```
1.如果是单线程，并且isSingleton=true,那就可以。
public boolean isSingleton() {
    return true;
}
此时无论设置 beans-userfactorybean.xml 的lazy-init 为 true 或 false，都是相同的两个对象。
 <bean id="user-factorybean" class="com.brianway.learning.spring.ioc.factorybean.UserFactoryBean" lazy-init="true"/>

2.如果指定lazy-init=true，并且是多线程，getObject方法内部需要同步的，这样也可以。
public User getObject() throws Exception {
    if(null == user){
        synchronized (this){
            if(null == user){
                User user = new User();
                user.setId("1");
                user.setName("Feagle");
            }
        }
    }
    return user;
}

```
##lazy-init
一个设置为lazy-init属性的bean，就意味要延迟加载，也就是IoC 容器将第一次被用到时才开始实例化。
bean的默认lazy-init=false，不需要延迟加载，IoC容器将在服务器启动的时候，会解读ApplicationContext.xml文件，不管你是不是要使用该bean，都会先进行实例化。这会造成启动的时候，特别的慢。但是，也是最保险的方法。
据说，在spring设置lazy-init=true的情况下，一个应用可以从 55 秒下降到 8 秒！
##@Component和@Repository 在什么情况下不能相互取代 
@Component 是一个泛化的概念，仅仅表示一个组件 (Bean) ，可以作用在任何层次
@Repository 将 DAO 类声明为 Bean
为什么 @Repository 只能标注在 DAO 类上呢？这是因为该注解的作用不只是将类识别为 Bean，同时它还能将所标注的类中抛出的数据访问异常封装为 Spring 的数据访问异常类型。 Spring 本身提供了一个丰富的并且是与具体的数据访问技术无关的数据访问异常结构，用于封装不同的持久层框架抛出的异常，使得异常独立于底层的框架。

