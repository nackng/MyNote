
  互联网的发展，网站应用的规模不断扩大，常规的垂直应用 架构 已无法应对，分布式服务架构以及流动计算架构势在必行， Dubbo 是一个分布式服务框架，在这种情况下诞生的。 现在核心业务抽取出来，作为独立的服务，使前端应用能更快速和稳定的响应。




第一：介绍Dubbo背景




    









大规模服务化之前，应用可能只是通过 RMI 或 Hessian 等工具，简单的暴露和引用远程服务，通过配置服务的 URL 地址进行调用，通过 F5 等硬件进行负载均衡。

(1)  当服务越来越多时，服务 URL 配置管理变得非常困难， F5 硬件负载均衡器的单点压力也越来越大。

此时需要一个服务注册中心，动态的注册和发现服务，使服务的位置透明。

并通过在消费方获取服务提供方地址列表，实现软负载均衡和 Failover ，降低对 F5 硬件负载均衡器的依赖，也能减少部分成本。

(2)  当进一步发展，服务间依赖关系变得错踪复杂，甚至分不清哪个应用要在哪个应用之前启动，架构师都不能完整的描述应用的架构关系。

这时，需要自动画出应用间的依赖关系图，以帮助架构师理清理关系。

(3)  接着，服务的调用量越来越大，服务的容量问题就暴露出来，这个服务需要多少机器支撑？什么时候该加机器？

为了解决这些问题，第一步，要将服务现在每天的调用量，响应时间，都统计出来，作为容量规划的参考指标。

其次，要可以动态调整权重，在线上，将某台机器的权重一直加大，并在加大的过程中记录响应时间的变化，直到响应时间到达阀值，记录此时的访问量，再以此访问量乘以机器数反推总容量。




第二：Dubbo的简介




Dubbo 是一个分布式服务框架 , 解决了上面的所面对的问题， Dubbo 的架构如图所示：




节点角色说明：

Provider:  暴露服务的服务提供方。

Consumer:  调用远程服务的服务消费方。

Registry:  服务注册与发现的注册中心。

Monitor:  统计服务的调用次调和调用时间的监控中心。

Container :  服务运行容器。




调用关系说明：

0.  服务容器负责启动，加载，运行服务提供者。

1.  服务提供者在启动时，向注册中心注册自己提供的服务。

2.  服务消费者在启动时，向注册中心订阅自己所需的服务。

3.  注册中心返回服务提供者地址列表给消费者，如果有变更，注册中心将基于长连接推送变更数据给消费者。

4.  服务消费者，从提供者地址列表中，基于软负载均衡 算法 ，选一台提供者进行调用，如果调用失败，再选另一台调用。

5.  服务消费者和提供者，在内存中累计调用次数和调用时间，定时每分钟发送一次统计数据到监控中心。











 Dubbo 提供了很多协议， Dubbo 协 议、RMI 协议 、 Hessian 协议， 我们查看 Dubbo 源代码，有各种协议的实现，如图所示：






我们之前没用 Dubbo 之前时，大部分都使用 Hessian来使用我们服务的暴露和调用，利用 HessianProxyFactory 调用远程接口。


上面是参考了 Dubbo 官方网介绍，接下来我们来介绍 SpringMVC 、 Dubbo 、 Zookeeper 整合使用。



第三：Dubbo与 Zookeeper、SpringMVC 整合使用

  

   第一步：在 Linux 上安装 Zookeeper



        Zookeeper 作为 Dubbo 服务的注册中心， Dubbo 原先基于 数据库 的注册中心，没采用 Zookeeper ， Zookeeper 一个分布式的服务框架，是树型的目录服务 的数据存储，能做到集群管理数据 ，这里能很好的作为 Dubbo 服务的注册中心， Dubbo 能与 Zookeeper 做到集群部署，当提供者出现断电等异常停机时， Zookeeper 注册中心能自动删除提供者信息，当提供者重启时，能自动恢复注册数据，以及订阅请求。我们先在 linux 上安装 Zookeeper ，我们安装最简单的单点，集群比较麻烦。

    （1）下载 Zookeeper-3.4.6.tar.gz   地址 http://www.apache.org/dist/zookeeper/



    （2） 我们放到 Linux 下的一个文件夹，然后解压：  



      #tar zxvf zookeeper-3.4.6.tar.gz

  （3） 然后在对应的 zookeeper-3.4.6/conf  下有一个文件 zoo_sample.cfg 的这个文件里面配置了监听客户端连接的端口等一些信息， Zookeeper  在启动时会找 zoo.cfg这个文件作为默认配置文件, 所以我们复制一个名称为 zoo.cfg 的文件，如图所示：

     



   我们查看一下这个文件的里面的一些配置信息，如图所示：

    

  

说明：

 clientPort ：监听客户端连接的端口。

 tickTime ：基本事件单元，以毫秒为单位。它用来控制心跳和超时，默认情况下最小的会话超时时间为两倍的  tickTime 。

  我们可以对配置文件的端口等或者进行高级配置和集群配置例如： maxClientCnxns ：限制连接到  ZooKeeper  的客户端的数量等

 (4)启动Zookeeper 的服务，如图所示：

    

 到这边Zookeeper的安装和配置完成

   第二步：配置d ubbo-admin 的管理页面，方便我们管理页面

    (1)下载 dubbo-admin-2.4.1.war 包，在 Linux 的 tomcat 部署，先把 dubbo-admin-2.4.1 放在 tomcat 的 webapps/ROOT 下，然后进行解压：

        #jar -xvf dubbo-admin-2.4.1.war

    (2)然后到 webapps/ROOT/WEB-INF 下，有一个 dubbo.properties 文件，里面指向Zookeeper ，使用的是Zookeeper 的注册中心，如图所示：

        

    (3)然后启动 tomcat 服务，用户名和密码： root,并访问服务，显示登陆页面，说明dubbo-admin部署成功， 如图所示：

      

    第三步：SpringMVC与 Dubbo 的整合，这边使用的 Maven 的管理项目

     第一： 我们先开发服务注册的，就是提供服务，项目结构如图所示：

         

     （1）test-maven-api项目加入了一个服务接口，代码如下：


[java] view plain copy
print ?
public   interface  TestRegistryService {  
    public  String hello(String name);  
}  
public interface TestRegistryService {
   public String hello(String name);
}   （2）test-maven-console在pom .xml 加入 Dubbo 和Zookeeper的 jar 包、引用 test-maven-api 的 jar 包，代码如下：



  
[java] view plain copy
print ?
   <dependency>  
    <groupId>cn.test</groupId>  
    <artifactId>test-maven-api</artifactId>  
    <version> 0.0 . 1 -SNAPSHOT</version>  
</dependency>  
  
   <dependency>  
         <groupId>com.alibaba</groupId>  
         <artifactId>dubbo</artifactId>  
         <version> 2.5 . 3 </version>  
     </dependency>  
       
      <dependency>  
         <groupId>org.apache.zookeeper</groupId>  
<artifactId>zookeeper</artifactId>  
<version> 3.4 . 6 </version>  
     </dependency>  
  
   <dependency>  
     <groupId>com.github.sgroschupf</groupId>  
<artifactId>zkclient</artifactId>  
<version> 0.1 </version>  
   </dependency>  
      <dependency>
  		<groupId>cn.test</groupId>
  		<artifactId>test-maven-api</artifactId>
  		<version>0.0.1-SNAPSHOT</version>
  	</dependency>
  
      <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo</artifactId>
            <version>2.5.3</version>
        </dependency>
        
         <dependency>
            <groupId>org.apache.zookeeper</groupId>
			<artifactId>zookeeper</artifactId>
			<version>3.4.6</version>
        </dependency>
  
      <dependency>
     	 <groupId>com.github.sgroschupf</groupId>
		 <artifactId>zkclient</artifactId>
		 <version>0.1</version>
      </dependency> (3)test-maven-console实现具体的服务，代码如下：


[java] view plain copy
print ?
  @Service ( "testRegistryService" )  
ublic  class  TestRegistryServiceImpl  implements  TestRegistryService {  
public  String hello(String name) {    
     return   "hello" +name;  
}  
  @Service("testRegistryService")
public class TestRegistryServiceImpl implements TestRegistryService {
	public String hello(String name) {	
		return "hello"+name;
	}
}
(4)我们服务以及实现好了，这时要暴露服务，代码如下：
  
[java] view plain copy
print ?
<?xml version= "1.0"  encoding= "UTF-8" ?>  
<beans xmlns= "http://www.springframework.org/schema/beans"   
    xmlns:xsi= "http://www.w3.org/2001/XMLSchema-instance"    
    xmlns:jee= "http://www.springframework.org/schema/jee"   
    xmlns:tx= "http://www.springframework.org/schema/tx"   
    <span style= "color:#cc0000;" >xmlns:dubbo= "http://code.alibabatech.com/schema/dubbo" </span>  
    xmlns:context= "http://www.springframework.org/schema/context"   
    xsi:schemaLocation="http: //www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.1.xsd   
    http: //www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-3.1.xsd   
    http: //www.springframework.org/schema/jee http://www.springframework.org/schema/jee/spring-jee-3.1.xsd   
    <span style= "color:#990000;" >http: //code.alibabatech.com/schema/dubbo http://code.alibabatech.com/schema/dubbo/dubbo.xsd</span>   
    http: //www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.1.xsd"   
     default -lazy-init= "false"  >  
   <!-- 提供方应用名称信息，这个相当于起一个名字，我们dubbo管理页面比较清晰是哪个应用暴露出来的 -->  
   <dubbo:application name= "dubbo_provider" ></dubbo:application>  
   <!-- 使用zookeeper注册中心暴露服务地址 -->    
   <dubbo:registry address= "zookeeper://127.0.0.1:2181"  check= "false"  subscribe= "false"  register= "" ></dubbo:registry>  
  <!-- 要暴露的服务接口 -->    
  <dubbo:service  interface = "cn.test.dubbo.registry.service.TestRegistryService"  ref= "testRegistryService"  />        
</beans>  
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
 	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
 	xmlns:jee="http://www.springframework.org/schema/jee"
	xmlns:tx="http://www.springframework.org/schema/tx"
	<span style="color:#cc0000;">xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"</span>
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.1.xsd
	http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-3.1.xsd
	http://www.springframework.org/schema/jee http://www.springframework.org/schema/jee/spring-jee-3.1.xsd
	<span style="color:#990000;">http://code.alibabatech.com/schema/dubbo http://code.alibabatech.com/schema/dubbo/dubbo.xsd</span>
	http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.1.xsd"
	default-lazy-init="false" >
   <!-- 提供方应用名称信息，这个相当于起一个名字，我们dubbo管理页面比较清晰是哪个应用暴露出来的 -->
   <dubbo:application name="dubbo_provider"></dubbo:application>
   <!-- 使用zookeeper注册中心暴露服务地址 -->  
   <dubbo:registry address="zookeeper://127.0.0.1:2181" check="false" subscribe="false" register=""></dubbo:registry>
  <!-- 要暴露的服务接口 -->  
  <dubbo:service interface="cn.test.dubbo.registry.service.TestRegistryService" ref="testRegistryService" />  	
</beans>   



说明：

   dubbo:registry  标签一些属性的说明：

       1 ） register 是否向此注册中心注册服务，如果设为 false ，将只订阅，不注册 。

       2 ） check 注册中心不存在时，是否报错。

       3 ） subscribe 是否向此注册中心订阅服务，如果设为 false ，将只注册，不订阅 。

       4 ） timeout 注册中心请求超时时间 ( 毫秒 ) 。

       5 ） address 可以 Zookeeper 集群配置 ，地址可以多个以逗号隔开等。

  dubbo:service 标签的一些属性说明：

      1 ） interface服务接口的路径

      2 ） ref引用对应的实现类的 Bean 的 ID

      3 ） registry向指定注册中心注册，在多个注册中心时使用，值为 <dubbo:registry> 的 id 属性，多个注册中心 ID 用逗号分隔，如果不想将该服务注册到任何 registry ，可将值设为 N/A

      4 ） register 默认true ，该协议的服务是否注册到注册中心。




  (5)启动项目，然后我们在 Dubbo 管理页面上显示，已经暴露的服务，但显示还没有消费者，因为我们还没实现消费者服务，如图所示：

  

   第二：我们在开发服务消费者，就是调用服务，我们在新建一个新的消费者项目结构如图所示：

       

   （1）test-maven-server-console的 pom.xml 引入 Dubbo 和Zookeeper的 jar 包、 test-maven-api 的 jar 包，因为引入 test-maven-api 的 jar 包，我们在项目中调用像在本地调用一样。代码如下：

      
[java] view plain copy
print ?
   <dependency>  
    <groupId>cn.test</groupId>  
    <artifactId>test-maven-api</artifactId>  
    <version> 0.0 . 1 -SNAPSHOT</version>  
</dependency>  
  
   <dependency>  
         <groupId>com.alibaba</groupId>  
         <artifactId>dubbo</artifactId>  
         <version> 2.5 . 3 </version>  
     </dependency>  
       
      <dependency>  
         <groupId>org.apache.zookeeper</groupId>  
<artifactId>zookeeper</artifactId>  
<version> 3.4 . 6 </version>  
     </dependency>  
  
   <dependency>  
     <groupId>com.github.sgroschupf</groupId>  
<artifactId>zkclient</artifactId>  
<version> 0.1 </version>  
   </dependency>  
      <dependency>
  		<groupId>cn.test</groupId>
  		<artifactId>test-maven-api</artifactId>
  		<version>0.0.1-SNAPSHOT</version>
  	</dependency>
  
      <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>dubbo</artifactId>
            <version>2.5.3</version>
        </dependency>
        
         <dependency>
            <groupId>org.apache.zookeeper</groupId>
			<artifactId>zookeeper</artifactId>
			<version>3.4.6</version>
        </dependency>
  
      <dependency>
     	 <groupId>com.github.sgroschupf</groupId>
		 <artifactId>zkclient</artifactId>
		 <version>0.1</version>
      </dependency>
      （2）test-maven-server-console项目的具体实现，代码如下：

     
[java] view plain copy
print ?
@Controller   
public   class  IndexController {  
      
     @Autowired   
     private  TestRegistryService testRegistryService;  
      
     @RequestMapping ( "/hello" )  
     public  String index(Model model){  
         String name=testRegistryService.hello( "zz" );  
         System.out.println( "xx==" +name);  
         return   "" ;  
    }  
  
}  
@Controller
public class IndexController {
	
	@Autowired
	private TestRegistryService testRegistryService;
	
	@RequestMapping("/hello")
	public String index(Model model){
	     String name=testRegistryService.hello("zz");
	     System.out.println("xx=="+name);
		return "";
	}

}
  (3)我们要引用的地址，代码如下：
   
[java] view plain copy
print ?
<?xml version= "1.0"  encoding= "UTF-8" ?>  
<beans xmlns= "http://www.springframework.org/schema/beans"   
    xmlns:xsi= "http://www.w3.org/2001/XMLSchema-instance"    
    xmlns:jee= "http://www.springframework.org/schema/jee"   
    xmlns:tx= "http://www.springframework.org/schema/tx"   
    <span style= "background-color: rgb(255, 255, 255);" ><span style= "color:#990000;" >xmlns:dubbo= "http://code.alibabatech.com/schema/dubbo" </span></span>  
    xmlns:context= "http://www.springframework.org/schema/context"   
    xsi:schemaLocation="http: //www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.1.xsd   
    http: //www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-3.1.xsd   
    http: //www.springframework.org/schema/jee http://www.springframework.org/schema/jee/spring-jee-3.1.xsd   
    <span style= "color:#990000;" >http: //code.alibabatech.com/schema/dubbo http://code.alibabatech.com/schema/dubbo/dubbo.xsd</span>   
    http: //www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.1.xsd"   
     default -lazy-init= "false"  >  
  
   <dubbo:application name= "dubbo_consumer" ></dubbo:application>  
   <!-- 使用zookeeper注册中心暴露服务地址 -->    
   <dubbo:registry address= "zookeeper://192.168.74.129:2181"  check= "false" ></dubbo:registry>   
     <!-- 要引用的服务 -->    
   <dubbo:reference  interface = "cn.test.dubbo.registry.service.TestRegistryService"  id= "testRegistryService" ></dubbo:reference>  
</beans>  
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
 	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
 	xmlns:jee="http://www.springframework.org/schema/jee"
	xmlns:tx="http://www.springframework.org/schema/tx"
	<span style="background-color: rgb(255, 255, 255);"><span style="color:#990000;">xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"</span></span>
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.1.xsd
	http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-3.1.xsd
	http://www.springframework.org/schema/jee http://www.springframework.org/schema/jee/spring-jee-3.1.xsd
	<span style="color:#990000;">http://code.alibabatech.com/schema/dubbo http://code.alibabatech.com/schema/dubbo/dubbo.xsd</span>
	http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.1.xsd"
	default-lazy-init="false" >

   <dubbo:application name="dubbo_consumer"></dubbo:application>
   <!-- 使用zookeeper注册中心暴露服务地址 -->  
   <dubbo:registry address="zookeeper://192.168.74.129:2181" check="false"></dubbo:registry> 
     <!-- 要引用的服务 -->  
   <dubbo:reference interface="cn.test.dubbo.registry.service.TestRegistryService" id="testRegistryService"></dubbo:reference>
</beans>



说明：

   dubbo:reference  的一些属性的说明：

       1 ） interface调用的服务接口

       2 ） check 启动时检查提供者是否存在， true 报错， false 忽略

        3 ） registry  从指定注册中心注册获取服务列表，在多个注册中心时使用，值为 <dubbo:registry> 的 id 属性，多个注册中心 ID 用逗号分隔

        4 ） loadbalance 负载均衡策略，可选值： random,roundrobin,leastactive ，分别表示：随机，轮循，最少活跃调用

   

(4)项目启动， Dubbo 管理页面，能看到消费者，如图所示：

 

(5)然后访问消费者项目， Controller 层能像调用本地一样调用服务的具体实现，如图所示：

  









Dubbo 提供了多种容错方案,包括负载均衡这些，如图所示：

   


 




