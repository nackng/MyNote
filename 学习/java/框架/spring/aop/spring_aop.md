[TOC]
##spring aop 实现原理
http://blog.csdn.net/moreevan/article/details/11977115/
###什么是AOP
AOP（Aspect-OrientedProgramming，面向方面编程），可以说是OOP（Object-Oriented Programing，面向对象编程）的补充和完善。OOP引入封装、继承和多态性等概念来建立一种对象层次结构，用以模拟公共行为的一个集合。当我们需要为分散的对象引入公共行为的时候，OOP则显得无能为力。也就是说，OOP允许你定义从上到下的关系，但并不适合定义从左到右的关系。例如日志功能。日志代码往往水平地散布在所有对象层次中，而与它所散布到的对象的核心功能毫无关系。对于其他类型的代码，如安全性、异常处理和透明的持续性也是如此。这种散布在各处的无关的代码被称为横切（cross-cutting）代码，在OOP设计中，它导致了大量代码的重复，而不利于各个模块的重用。
 
而AOP技术则恰恰相反，它利用一种称为“横切”的技术，剖解开封装的对象内部，并将那些影响了多个类的公共行为封装到一个可重用模块，并将其名为“Aspect”，即方面。所谓“方面”，简单地说，就是将那些与业务无关，却为业务模块所共同调用的逻辑或责任封装起来，便于减少系统的重复代码，降低模块间的耦合度，并有利于未来的可操作性和可维护性。AOP代表的是一个横向的关系，如果说“对象”是一个空心的圆柱体，其中封装的是对象的属性和行为；那么面向方面编程的方法，就仿佛一把利刃，将这些空心圆柱体剖开，以获得其内部的消息。而剖开的切面，也就是所谓的“方面”了。然后它又以巧夺天功的妙手将这些剖开的切面复原，不留痕迹。
 
使用“横切”技术，AOP把软件系统分为两个部分：核心关注点和横切关注点。业务处理的主要流程是核心关注点，与之关系不大的部分是横切关注点。横切关注点的一个特点是，他们经常发生在核心关注点的多处，而各处都基本相似。比如权限认证、日志、事务处理。Aop 的作用在于分离系统中的各种关注点，将核心关注点和横切关注点分离开来。正如Avanade公司的高级方案构架师Adam Magee所说，AOP的核心思想就是“将应用程序中的商业逻辑同对其提供支持的通用服务进行分离。”
 
实现AOP的技术，主要分为两大类：一是采用动态代理技术，利用截取消息的方式，对该消息进行装饰，以取代原有对象行为的执行；二是采用静态织入的方式，引入特定的语法创建“方面”，从而使得编译器可以在编译期间织入有关“方面”的代码。

###AOP使用场景
AOP用来封装横切关注点，具体可以在下面的场景中使用:
 
Authentication 权限
Caching 缓存
Context passing 内容传递
Error handling 错误处理
Lazy loading　懒加载
Debugging　　调试
logging, tracing, profiling and monitoring　记录跟踪　优化　校准
Performance optimization　性能优化
Persistence　　持久化
Resource pooling　资源池
Synchronization　同步
Transactions 事务

###AOP相关概念
方面（Aspect）：一个关注点的模块化，这个关注点实现可能另外横切多个对象。事务管理是J2EE应用中一个很好的横切关注点例子。方面用spring的 Advisor或拦截器实现。
 
连接点（Joinpoint）: 程序执行过程中明确的点，如方法的调用或特定的异常被抛出。
 
通知（Advice）: 在特定的连接点，AOP框架执行的动作。各种类型的通知包括“around”、“before”和“throws”通知。通知类型将在下面讨论。许多AOP框架包括Spring都是以拦截器做通知模型，维护一个“围绕”连接点的拦截器链。Spring中定义了四个advice: BeforeAdvice, AfterAdvice, ThrowAdvice和DynamicIntroductionAdvice
 
切入点（Pointcut）: 指定一个通知将被引发的一系列连接点的集合。AOP框架必须允许开发者指定切入点：例如，使用正则表达式。 Spring定义了Pointcut接口，用来组合MethodMatcher和ClassFilter，可以通过名字很清楚的理解， MethodMatcher是用来检查目标类的方法是否可以被应用此通知，而ClassFilter是用来检查Pointcut是否应该应用到目标类上
 
引入（Introduction）: 添加方法或字段到被通知的类。 Spring允许引入新的接口到任何被通知的对象。例如，你可以使用一个引入使任何对象实现 IsModified接口，来简化缓存。Spring中要使用Introduction, 可有通过DelegatingIntroductionInterceptor来实现通知，通过DefaultIntroductionAdvisor来配置Advice和代理类要实现的接口
 
目标对象（Target Object）: 包含连接点的对象。也被称作被通知或被代理对象。POJO
 
AOP代理（AOP Proxy）: AOP框架创建的对象，包含通知。 在Spring中，AOP代理可以是JDK动态代理或者CGLIB代理。
 
织入（Weaving）: 组装方面来创建一个被通知对象。这可以在编译时完成（例如使用AspectJ编译器），也可以在运行时完成。Spring和其他纯Java AOP框架一样，在运行时完成织入。

###Spring AOP组件
下面这种类图列出了Spring中主要的AOP组件
http://img.blog.csdn.net/20130924152523859?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTW9yZWVWYW4=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast

###如何使用Spring AOP

可以通过配置文件或者编程的方式来使用Spring AOP。
 
配置可以通过xml文件来进行，大概有四种方式：
1.        配置ProxyFactoryBean，显式地设置advisors, advice, target等
2.        配置AutoProxyCreator，这种方式下，还是如以前一样使用定义的bean，但是从容器中获得的其实已经是代理对象
3.        通过<aop:config>来配置
4.        通过<aop: aspectj-autoproxy>来配置，使用AspectJ的注解来标识通知及切入点
 
也可以直接使用ProxyFactory来以编程的方式使用Spring AOP，通过ProxyFactory提供的方法可以设置target对象, advisor等相关配置，最终通过 getProxy()方法来获取代理对象
 
具体使用的示例可以google. 这里略去

###Spring AOP代理对象的生成

Spring提供了两种方式来生成代理对象: JDKProxy和Cglib，具体使用哪种方式生成由AopProxyFactory根据AdvisedSupport对象的配置来决定。默认的策略是如果目标类是接口，则使用JDK动态代理技术，否则使用Cglib来生成代理。下面我们来研究一下Spring如何使用JDK来生成代理对象，具体的生成代码放在JdkDynamicAopProxy这个类中，直接上相关代码：
```
/** 
* <ol> 
* <li>获取代理类要实现的接口,除了Advised对象中配置的,还会加上SpringProxy, Advised(opaque=false) 
* <li>检查上面得到的接口中有没有定义 equals或者hashcode的接口 
* <li>调用Proxy.newProxyInstance创建代理对象 
* </ol> 
*/  
public Object getProxy(ClassLoader classLoader) {  
   if (logger.isDebugEnabled()) {  
       logger.debug("Creating JDK dynamic proxy: target source is " +this.advised.getTargetSource());  
   }  
   Class[] proxiedInterfaces =AopProxyUtils.completeProxiedInterfaces(this.advised);  
   findDefinedEqualsAndHashCodeMethods(proxiedInterfaces);  
   return Proxy.newProxyInstance(classLoader, proxiedInterfaces, this);  
}  
```

 
那这个其实很明了，注释上我也已经写清楚了，不再赘述。
 
下面的问题是，代理对象生成了，那切面是如何织入的？
我们知道InvocationHandler是JDK动态代理的核心，生成的代理对象的方法调用都会委托到InvocationHandler.invoke()方法。而通过JdkDynamicAopProxy的签名我们可以看到这个类其实也实现了InvocationHandler，下面我们就通过分析这个类中实现的invoke()方法来具体看下Spring AOP是如何织入切面的。
 
```
publicObject invoke(Object proxy, Method method, Object[] args) throwsThrowable {  
       MethodInvocation invocation = null;  
       Object oldProxy = null;  
       boolean setProxyContext = false;  
   
       TargetSource targetSource = this.advised.targetSource;  
       Class targetClass = null;  
       Object target = null;  
   
       try {  
           //eqauls()方法，具目标对象未实现此方法  
           if (!this.equalsDefined && AopUtils.isEqualsMethod(method)){  
                return (equals(args[0])? Boolean.TRUE : Boolean.FALSE);  
           }  
   
           //hashCode()方法，具目标对象未实现此方法  
           if (!this.hashCodeDefined && AopUtils.isHashCodeMethod(method)){  
                return newInteger(hashCode());  
           }  
   
           //Advised接口或者其父接口中定义的方法,直接反射调用,不应用通知  
           if (!this.advised.opaque &&method.getDeclaringClass().isInterface()  
                    &&method.getDeclaringClass().isAssignableFrom(Advised.class)) {  
                // Service invocations onProxyConfig with the proxy config...  
                return AopUtils.invokeJoinpointUsingReflection(this.advised,method, args);  
           }  
   
           Object retVal = null;  
   
           if (this.advised.exposeProxy) {  
                // Make invocation available ifnecessary.  
                oldProxy = AopContext.setCurrentProxy(proxy);  
                setProxyContext = true;  
           }  
   
           //获得目标对象的类  
           target = targetSource.getTarget();  
           if (target != null) {  
                targetClass = target.getClass();  
           }  
   
           //获取可以应用到此方法上的Interceptor列表  
           List chain = this.advised.getInterceptorsAndDynamicInterceptionAdvice(method,targetClass);  
   
           //如果没有可以应用到此方法的通知(Interceptor)，此直接反射调用 method.invoke(target, args)  
           if (chain.isEmpty()) {  
                retVal = AopUtils.invokeJoinpointUsingReflection(target,method, args);  
           } else {  
                //创建MethodInvocation  
                invocation = newReflectiveMethodInvocation(proxy, target, method, args, targetClass, chain);  
                retVal = invocation.proceed();  
           }  
   
           // Massage return value if necessary.  
           if (retVal != null && retVal == target &&method.getReturnType().isInstance(proxy)  
                    &&!RawTargetAccess.class.isAssignableFrom(method.getDeclaringClass())) {  
                // Special case: it returned"this" and the return type of the method  
                // is type-compatible. Notethat we can't help if the target sets  
                // a reference to itself inanother returned object.  
                retVal = proxy;  
           }  
           return retVal;  
       } finally {  
           if (target != null && !targetSource.isStatic()) {  
                // Must have come fromTargetSource.  
               targetSource.releaseTarget(target);  
           }  
           if (setProxyContext) {  
                // Restore old proxy.  
                AopContext.setCurrentProxy(oldProxy);  
           }  
       }  
    }  
```
 
主流程可以简述为：获取可以应用到此方法上的通知链（Interceptor Chain）,如果有,则应用通知,并执行joinpoint; 如果没有,则直接反射执行joinpoint。而这里的关键是通知链是如何获取的以及它又是如何执行的，下面逐一分析下。
 
首先，从上面的代码可以看到，通知链是通过Advised.getInterceptorsAndDynamicInterceptionAdvice()这个方法来获取的,我们来看下这个方法的实现:
```
public List<Object>getInterceptorsAndDynamicInterceptionAdvice(Method method, Class targetClass) {  
                   MethodCacheKeycacheKey = new MethodCacheKey(method);  
                   List<Object>cached = this.methodCache.get(cacheKey);  
                   if(cached == null) {  
                            cached= this.advisorChainFactory.getInterceptorsAndDynamicInterceptionAdvice(  
                                               this,method, targetClass);  
                            this.methodCache.put(cacheKey,cached);  
                   }  
                   returncached;  
         }  
```

 
可以看到实际的获取工作其实是由AdvisorChainFactory. getInterceptorsAndDynamicInterceptionAdvice()这个方法来完成的，获取到的结果会被缓存。
下面来分析下这个方法的实现：
 
```
/** 
* 从提供的配置实例config中获取advisor列表,遍历处理这些advisor.如果是IntroductionAdvisor, 
* 则判断此Advisor能否应用到目标类targetClass上.如果是PointcutAdvisor,则判断 
* 此Advisor能否应用到目标方法method上.将满足条件的Advisor通过AdvisorAdaptor转化成Interceptor列表返回. 
*/  
publicList getInterceptorsAndDynamicInterceptionAdvice(Advised config, Methodmethod, Class targetClass) {  
   // This is somewhat tricky... we have to process introductions first,  
   // but we need to preserve order in the ultimate list.  
   List interceptorList = new ArrayList(config.getAdvisors().length);  

   //查看是否包含IntroductionAdvisor  
   boolean hasIntroductions = hasMatchingIntroductions(config,targetClass);  

   //这里实际上注册一系列AdvisorAdapter,用于将Advisor转化成MethodInterceptor  
   AdvisorAdapterRegistry registry = GlobalAdvisorAdapterRegistry.getInstance();  

   Advisor[] advisors = config.getAdvisors();  
    for (int i = 0; i <advisors.length; i++) {  
       Advisor advisor = advisors[i];  
       if (advisor instanceof PointcutAdvisor) {  
            // Add it conditionally.  
            PointcutAdvisor pointcutAdvisor= (PointcutAdvisor) advisor;  
            if(config.isPreFiltered() ||pointcutAdvisor.getPointcut().getClassFilter().matches(targetClass)) {  
                //TODO: 这个地方这两个方法的位置可以互换下  
                //将Advisor转化成Interceptor  
                MethodInterceptor[]interceptors = registry.getInterceptors(advisor);  

                //检查当前advisor的pointcut是否可以匹配当前方法  
                MethodMatcher mm =pointcutAdvisor.getPointcut().getMethodMatcher();  

                if (MethodMatchers.matches(mm,method, targetClass, hasIntroductions)) {  
                    if(mm.isRuntime()) {  
                        // Creating a newobject instance in the getInterceptors() method  
                        // isn't a problemas we normally cache created chains.  
                        for (intj = 0; j < interceptors.length; j++) {  
                           interceptorList.add(new InterceptorAndDynamicMethodMatcher(interceptors[j],mm));  
                        }  
                    } else {  
                        interceptorList.addAll(Arrays.asList(interceptors));  
                    }  
                }  
            }  
       } else if (advisor instanceof IntroductionAdvisor){  
            IntroductionAdvisor ia =(IntroductionAdvisor) advisor;  
            if(config.isPreFiltered() || ia.getClassFilter().matches(targetClass)) {  
                Interceptor[] interceptors= registry.getInterceptors(advisor);  
                interceptorList.addAll(Arrays.asList(interceptors));  
            }  
       } else {  
            Interceptor[] interceptors =registry.getInterceptors(advisor);  
            interceptorList.addAll(Arrays.asList(interceptors));  
       }  
   }  
   return interceptorList;  
}  
```

 
这个方法执行完成后，Advised中配置能够应用到连接点或者目标类的Advisor全部被转化成了MethodInterceptor.
 
接下来我们再看下得到的拦截器链是怎么起作用的。
 
```
if (chain.isEmpty()) {  
    retVal = AopUtils.invokeJoinpointUsingReflection(target,method, args);  
} else {  
    //创建MethodInvocation  
    invocation = newReflectiveMethodInvocation(proxy, target, method, args, targetClass, chain);  
    retVal = invocation.proceed();  
}  
```
从这段代码可以看出，如果得到的拦截器链为空，则直接反射调用目标方法，否则创建MethodInvocation，调用其proceed方法，触发拦截器链的执行，来看下具体代码

```
public Object proceed() throws Throwable {  
   //  We start with an index of -1and increment early.  
   if (this.currentInterceptorIndex == this.interceptorsAndDynamicMethodMatchers.size()- 1) {  
       //如果Interceptor执行完了，则执行joinPoint  
       return invokeJoinpoint();  
   }  

   Object interceptorOrInterceptionAdvice =  
       this.interceptorsAndDynamicMethodMatchers.get(++this.currentInterceptorIndex);  
     
   //如果要动态匹配joinPoint  
   if (interceptorOrInterceptionAdvice instanceof InterceptorAndDynamicMethodMatcher){  
       // Evaluate dynamic method matcher here: static part will already have  
       // been evaluated and found to match.  
       InterceptorAndDynamicMethodMatcher dm =  
            (InterceptorAndDynamicMethodMatcher)interceptorOrInterceptionAdvice;  
       //动态匹配：运行时参数是否满足匹配条件  
       if (dm.methodMatcher.matches(this.method, this.targetClass,this.arguments)) {  
            //执行当前Intercetpor  
            returndm.interceptor.invoke(this);  
       }  
       else {  
            //动态匹配失败时,略过当前Intercetpor,调用下一个Interceptor  
            return proceed();  
       }  
   }  
   else {  
       // It's an interceptor, so we just invoke it: The pointcutwill have  
       // been evaluated statically before this object was constructed.  
       //执行当前Intercetpor  
       return ((MethodInterceptor) interceptorOrInterceptionAdvice).invoke(this);  
   }  
}  
```
##
Spring AOP详解

一.前言

    在以前的项目中，很少去关注spring aop的具体实现与理论，只是简单了解了一下什么是aop具体怎么用，看到了一篇博文写得还不错，就转载来学习一下，博文地址：http://www.cnblogs.com/xrq730/p/4919025.html

AOP

AOP（Aspect Oriented Programming），即面向切面编程，可以说是OOP（Object Oriented Programming，面向对象编程）的补充和完善。OOP引入封装、继承、多态等概念来建立一种对象层次结构，用于模拟公共行为的一个集合。不过OOP允许开发者定义纵向的关系，但并不适合定义横向的关系，例如日志功能。日志代码往往横向地散布在所有对象层次中，而与它对应的对象的核心功能毫无关系对于其他类型的代码，如安全性、异常处理和透明的持续性也都是如此，这种散布在各处的无关的代码被称为横切（cross cutting），在OOP设计中，它导致了大量代码的重复，而不利于各个模块的重用。

AOP技术恰恰相反，它利用一种称为"横切"的技术，剖解开封装的对象内部，并将那些影响了多个类的公共行为封装到一个可重用模块，并将其命名为"Aspect"，即切面。所谓"切面"，简单说就是那些与业务无关，却为业务模块所共同调用的逻辑或责任封装起来，便于减少系统的重复代码，降低模块之间的耦合度，并有利于未来的可操作性和可维护性。

使用"横切"技术，AOP把软件系统分为两个部分：核心关注点和横切关注点。业务处理的主要流程是核心关注点，与之关系不大的部分是横切关注点。横切关注点的一个特点是，他们经常发生在核心关注点的多处，而各处基本相似，比如权限认证、日志、事物。AOP的作用在于分离系统中的各种关注点，将核心关注点和横切关注点分离开来。

 

AOP核心概念

1、横切关注点

对哪些方法进行拦截，拦截后怎么处理，这些关注点称之为横切关注点

2、切面（aspect）

类是对物体特征的抽象，切面就是对横切关注点的抽象

3、连接点（joinpoint）

被拦截到的点，因为Spring只支持方法类型的连接点，所以在Spring中连接点指的就是被拦截到的方法，实际上连接点还可以是字段或者构造器

4、切入点（pointcut）

对连接点进行拦截的定义

5、通知（advice）

所谓通知指的就是指拦截到连接点之后要执行的代码，通知分为前置、后置、异常、最终、环绕通知五类

6、目标对象

代理的目标对象

7、织入（weave）

将切面应用到目标对象并导致代理对象创建的过程

8、引入（introduction）

在不修改代码的前提下，引入可以在运行期为类动态地添加一些方法或字段

 

Spring对AOP的支持

Spring中AOP代理由Spring的IOC容器负责生成、管理，其依赖关系也由IOC容器负责管理。因此，AOP代理可以直接使用容器中的其它bean实例作为目标，这种关系可由IOC容器的依赖注入提供。Spring创建代理的规则为：

1、默认使用Java动态代理来创建AOP代理，这样就可以为任何接口实例创建代理了

2、当需要代理的类不是代理接口的时候，Spring会切换为使用CGLIB代理，也可强制使用CGLIB

AOP编程其实是很简单的事情，纵观AOP编程，程序员只需要参与三个部分：

1、定义普通业务组件

2、定义切入点，一个切入点可能横切多个业务组件

3、定义增强处理，增强处理就是在AOP框架为普通业务组件织入的处理动作

所以进行AOP编程的关键就是定义切入点和定义增强处理，一旦定义了合适的切入点和增强处理，AOP框架将自动生成AOP代理，即：代理对象的方法=增强处理+被代理对象的方法。

下面给出一个Spring AOP的.xml文件模板，名字叫做aop.xml，之后的内容都在aop.xml上进行扩展：

复制代码
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-4.2.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop-4.2.xsd">
            
</beans>
复制代码
基于Spring的AOP简单实现

注意一下，在讲解之前，说明一点：使用Spring AOP，要成功运行起代码，只用Spring提供给开发者的jar包是不够的，请额外上网下载两个jar包：

1、aopalliance.jar

2、aspectjweaver.jar

开始讲解用Spring AOP的XML实现方式，先定义一个接口：

public interface HelloWorld
{
    void printHelloWorld();
    void doPrint();
}
定义两个接口实现类：

复制代码
public class HelloWorldImpl1 implements HelloWorld
{
    public void printHelloWorld()
    {
        System.out.println("Enter HelloWorldImpl1.printHelloWorld()");
    }
    
    public void doPrint()
    {
        System.out.println("Enter HelloWorldImpl1.doPrint()");
        return ;
    }
}
复制代码
复制代码
public class HelloWorldImpl2 implements HelloWorld
{
    public void printHelloWorld()
    {
        System.out.println("Enter HelloWorldImpl2.printHelloWorld()");
    }
    
    public void doPrint()
    {
        System.out.println("Enter HelloWorldImpl2.doPrint()");
        return ;
    }
}
复制代码
横切关注点，这里是打印时间：

复制代码
public class TimeHandler
{
    public void printTime()
    {
        System.out.println("CurrentTime = " + System.currentTimeMillis());
    }
}
复制代码
有这三个类就可以实现一个简单的Spring AOP了，看一下aop.xml的配置：

复制代码
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-4.2.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop-4.2.xsd">
        
        <bean id="helloWorldImpl1" class="com.xrq.aop.HelloWorldImpl1" />
        <bean id="helloWorldImpl2" class="com.xrq.aop.HelloWorldImpl2" />
        <bean id="timeHandler" class="com.xrq.aop.TimeHandler" />
        
        <aop:config>
            <aop:aspect id="time" ref="timeHandler">
                <aop:pointcut id="addAllMethod" expression="execution(* com.xrq.aop.HelloWorld.*(..))" />
                <aop:before method="printTime" pointcut-ref="addAllMethod" />
                <aop:after method="printTime" pointcut-ref="addAllMethod" />
            </aop:aspect>
        </aop:config>
</beans>
复制代码
写一个main函数调用一下：

复制代码
public static void main(String[] args)
{
    ApplicationContext ctx = 
            new ClassPathXmlApplicationContext("aop.xml");
        
    HelloWorld hw1 = (HelloWorld)ctx.getBean("helloWorldImpl1");
    HelloWorld hw2 = (HelloWorld)ctx.getBean("helloWorldImpl2");
    hw1.printHelloWorld();
    System.out.println();
    hw1.doPrint();
    
    System.out.println();
    hw2.printHelloWorld();
    System.out.println();
    hw2.doPrint();
}
复制代码
运行结果为：

复制代码
CurrentTime = 1446129611993
Enter HelloWorldImpl1.printHelloWorld()
CurrentTime = 1446129611993

CurrentTime = 1446129611994
Enter HelloWorldImpl1.doPrint()
CurrentTime = 1446129611994

CurrentTime = 1446129611994
Enter HelloWorldImpl2.printHelloWorld()
CurrentTime = 1446129611994

CurrentTime = 1446129611994
Enter HelloWorldImpl2.doPrint()
CurrentTime = 1446129611994
复制代码
看到给HelloWorld接口的两个实现类的所有方法都加上了代理，代理内容就是打印时间

基于Spring的AOP使用其他细节

1、增加一个横切关注点，打印日志，Java类为：

复制代码
public class LogHandler
{
    public void LogBefore()
    {
        System.out.println("Log before method");
    }
    
    public void LogAfter()
    {
        System.out.println("Log after method");
    }
}
复制代码
复制代码
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-4.2.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop-4.2.xsd">
        
        <bean id="helloWorldImpl1" class="com.xrq.aop.HelloWorldImpl1" />
        <bean id="helloWorldImpl2" class="com.xrq.aop.HelloWorldImpl2" />
        <bean id="timeHandler" class="com.xrq.aop.TimeHandler" />
        <bean id="logHandler" class="com.xrq.aop.LogHandler" />
        
        <aop:config>
            <aop:aspect id="time" ref="timeHandler" order="1">
                <aop:pointcut id="addTime" expression="execution(* com.xrq.aop.HelloWorld.*(..))" />
                <aop:before method="printTime" pointcut-ref="addTime" />
                <aop:after method="printTime" pointcut-ref="addTime" />
            </aop:aspect>
            <aop:aspect id="log" ref="logHandler" order="2">
                <aop:pointcut id="printLog" expression="execution(* com.xrq.aop.HelloWorld.*(..))" />
                <aop:before method="LogBefore" pointcut-ref="printLog" />
                <aop:after method="LogAfter" pointcut-ref="printLog" />
            </aop:aspect>
        </aop:config>
</beans>
复制代码
测试类不变，打印结果为：

复制代码
CurrentTime = 1446130273734
Log before method
Enter HelloWorldImpl1.printHelloWorld()
Log after method
CurrentTime = 1446130273735

CurrentTime = 1446130273736
Log before method
Enter HelloWorldImpl1.doPrint()
Log after method
CurrentTime = 1446130273736

CurrentTime = 1446130273736
Log before method
Enter HelloWorldImpl2.printHelloWorld()
Log after method
CurrentTime = 1446130273736

CurrentTime = 1446130273737
Log before method
Enter HelloWorldImpl2.doPrint()
Log after method
CurrentTime = 1446130273737
复制代码
要想让logHandler在timeHandler前使用有两个办法：

（1）aspect里面有一个order属性，order属性的数字就是横切关注点的顺序

（2）把logHandler定义在timeHandler前面，Spring默认以aspect的定义顺序作为织入顺序

2、我只想织入接口中的某些方法

修改一下pointcut的expression就好了：

复制代码
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xmlns:tx="http://www.springframework.org/schema/tx"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-4.2.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop-4.2.xsd">
        
        <bean id="helloWorldImpl1" class="com.xrq.aop.HelloWorldImpl1" />
        <bean id="helloWorldImpl2" class="com.xrq.aop.HelloWorldImpl2" />
        <bean id="timeHandler" class="com.xrq.aop.TimeHandler" />
        <bean id="logHandler" class="com.xrq.aop.LogHandler" />
        
        <aop:config>
            <aop:aspect id="time" ref="timeHandler" order="1">
                <aop:pointcut id="addTime" expression="execution(* com.xrq.aop.HelloWorld.print*(..))" />
                <aop:before method="printTime" pointcut-ref="addTime" />
                <aop:after method="printTime" pointcut-ref="addTime" />
            </aop:aspect>
            <aop:aspect id="log" ref="logHandler" order="2">
                <aop:pointcut id="printLog" expression="execution(* com.xrq.aop.HelloWorld.do*(..))" />
                <aop:before method="LogBefore" pointcut-ref="printLog" />
                <aop:after method="LogAfter" pointcut-ref="printLog" />
            </aop:aspect>
        </aop:config>
</beans>
复制代码
表示timeHandler只会织入HelloWorld接口print开头的方法，logHandler只会织入HelloWorld接口do开头的方法

3、强制使用CGLIB生成代理

前面说过Spring使用动态代理或是CGLIB生成代理是有规则的，高版本的Spring会自动选择是使用动态代理还是CGLIB生成代理内容，当然我们也可以强制使用CGLIB生成代理，那就是<aop:config>里面有一个"proxy-target-class"属性，这个属性值如果被设置为true，那么基于类的代理将起作用，如果proxy-target-class被设置为false或者这个属性被省略，那么基于接口的代理将起作用
