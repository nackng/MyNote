[TOC]
##spring mvc对异步请求的处理
```
1.修改web.xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="3.0" xmlns="http://java.sun.com/xml/ns/javaee"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee 
    http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">
...
</web-app>

1.1、声明version="3.0"，声明web-app_3_0.xsd

1.2、为servlet或者filter设置启用异步支持：<async-supported>true</async-supported>，修改WEB应用的web.xml
<!-- spring mvc -->
<servlet>
<servlet-name>SpringMvc</servlet-name>
<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
<init-param>
<param-name>contextConfigLocation</param-name>
<param-value>...</param-value>
</init-param>
<load-on-startup>1</load-on-startup>
<async-supported>true</async-supported>
</servlet>
2、使controller类支持async

2.1、返回java.util.concurrent.Callable来完成异步处理
package org.springframework.samples.mvc.async;
  
import java.util.concurrent.Callable;
  
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.WebAsyncTask;
  
@Controller
@RequestMapping("/async/callable")
public class CallableController {
    @RequestMapping("/response-body")
    public @ResponseBody Callable<String> callable() {
  
        return new Callable<String>() {
            @Override
            public String call() throws Exception {
                Thread.sleep(2000);
                return "Callable result";
            }
        };
    }
  
    @RequestMapping("/view")
    public Callable<String> callableWithView(final Model model) {
  
        return new Callable<String>() {
            @Override
            public String call() throws Exception {
                Thread.sleep(2000);
                model.addAttribute("foo", "bar");
                model.addAttribute("fruit", "apple");
                return "views/html";
            }
        };
    }
  
    @RequestMapping("/exception")
    public @ResponseBody Callable<String> callableWithException(
            final @RequestParam(required=false, defaultValue="true") boolean handled) {
  
        return new Callable<String>() {
            @Override
            public String call() throws Exception {
                Thread.sleep(2000);
                if (handled) {
                    // see handleException method further below
                    throw new IllegalStateException("Callable error");
                }
                else {
                    throw new IllegalArgumentException("Callable error");
                }
            }
        };
    }
  
    @RequestMapping("/custom-timeout-handling")
    public @ResponseBody WebAsyncTask<String> callableWithCustomTimeoutHandling() {
  
        Callable<String> callable = new Callable<String>() {
            @Override
            public String call() throws Exception {
                Thread.sleep(2000);
                return "Callable result";
            }
        };
  
        return new WebAsyncTask<String>(1000, callable);
    }
  
    @ExceptionHandler
    @ResponseBody
    public String handleException(IllegalStateException ex) {
        return "Handled exception: " + ex.getMessage();
    }
  
}

2.2、在异步处理完成时返回org.springframework.web.context.request.async.DeferredResult其他线程，例如一个JMS或一个AMQP消息,Redis通知等等：

@RequestMapping("/quotes")
@ResponseBody
public DeferredResult<String> quotes() {
  DeferredResult<String> deferredResult = new DeferredResult<String>();
  // Add deferredResult to a Queue or a Map...
  return deferredResult;
}
    
// In some other thread...
deferredResult.setResult(data);
// Remove deferredResult from the Queue or Map

3、spring配置文件的修改

spring mvc的dtd的声明必须大于等于3.2

<mvc:annotation-driven>
<!--  可不设置，使用默认的超时时间 -->
    <mvc:async-support default-timeout="3000"/>
</mvc:annotation-driven>

4、实际使用示例：

function deferred(){
    $.get('quotes.htm',function(data){
        console.log(data);
        deferred();//每次请求完成,再发一次请求,避免客户端定时刷新来获取数据
    });
}

这么做的好处避免web server的连接池被长期占用而引起性能问题，调用后生成一个非web的服务线程来处理，增加web服务器的吞吐量~~

可以看下这个blog，还不错：http://wiselyman.iteye.com/blog/2215852
```