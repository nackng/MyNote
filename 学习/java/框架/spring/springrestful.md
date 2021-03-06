[TOC]
##同一资源 多种表述
```
同一资源 多种表述
如果写完一个方法,返回request到JSP, 可同时手机端需要调接口怎么办, 如果前台的一层皮换成了以nodejs为服务的框架调用怎么办
可以每个需求再写一个方法返回JSON, 可下面这个可以同一资源,多种返回
spring-servlet.xml加入如下配置


 <!-- ContentNegotiatingViewResolver视图解析器,利用他就可以配置多种返回值 -->
 <bean  class="org.springframework.web.servlet.view.ContentNegotiatingViewResolver">   
       
   <!-- 这里是否忽略掉accept header，默认就是false -->
   <property name="ignoreAcceptHeader" value="true" />   
    
   <!-- 如果所有的mediaType都没匹配上，就会使用defaultContentType -->
   <property name="defaultContentType" value="text/html" />   
    
   <property name="mediaTypes">    
    <map>     
     <entry key="json" value="application/json" />      
     <entry key="xml" value="application/xml" />      
    </map>    
   </property>   
  <!-- 默认使用MappingJacksonJsonView生成jsonview-->
  <property name="defaultViews">    
    <list>     
     <bean  class="org.springframework.web.servlet.view.json.MappingJacksonJsonView">        
         <property  name="extractValueFromSingleKeyModel" value="true" />     
      </bean>        
      <bean  class="org.springframework.web.servlet.view.xml.MarshallingView">      
       <property name="marshaller">        
        <bean  class="org.springframework.oxm.xstream.XStreamMarshaller" />        
      </property>      
      </bean>      
     </list>     
    </property>  
  </bean>
 
这样同一个地址,只要在后面加 .json  mediaTypes就可以把 http://localhost:8080/RestFulMvc/api/products/info/00001/23123.json 的 .json映射到application/json
值得注意的是, 如果不加 <property  name="extractValueFromSingleKeyModel" value="true" />
得出来的Product对象的JSON为
{"product":{"pid":"00001","pname":"23123"}}
如果想要的结果为
{"pid":"00001","pname":"23123"}
则不要前面的对象名称包在外面时, 请加上它
 
后台代码


@RequestMapping(value={"/info/{pid}"},method=RequestMethod.GET)
    public ModelAndView getProductInfo(@PathVariable String pid, HttpServletRequest request,HttpServletResponse response) throws Exception {
   
          Map<String,Object> map = new HashMap<String,Object>();
           
          Product pro = new Product();
          pro.setPid(pid);
          map.put("name", pid);
          map.put("pro", pro);
           
          ModelAndView mav=new ModelAndView("products/list",map);
           
          return mav;
         
    }
 
测试: 输入地址 :  http://localhost:8080/RestFulMvc/api/products/info/00001.json
 
得到的结果为
{"pro":{"pid":"00001","pname":null},"name":"00001"}
 
ModelAndView是springmvc自带的重定向方法
第一个参数是返回的地址,和以往一样,  第二个参数以后, 是传给前台的值 .
如果有第二个参数, 没有第三个参数 , 那第二个参数只能是map的
也可以第二个参数为建, 第三个参数为值的方式传给前台,  具体大家可以new一个ModelAndView看看它提供的构造方法
 
 
最后 如果是nodejs  ajax提交的数据,以application/json格式提交时,
接收参数可以在参数前加 @@RequestBody
public ModelAndView getProductInfo(@RequestBody Product pro, HttpServletRequest request .....
它可以把json转换为对象里的属性
来源： http://my.oschina.net/u/2272916/blog/352297
```