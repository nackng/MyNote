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
        <servlet-name>spring</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:applicationContext-mvc.xml</param-value>
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
@RequestMapping("/job")
public class ScheduleJobController {
    /**
     * 同步所有任务
     * @return
     */
    @RequiresPermissions("maintain:job:start")
    @RequestMapping(value="/async")
    public String async(RedirectAttributes redirectAttributes){
        scheduleJobService.async();
        redirectAttributes.addFlashAttribute("msg", "同步所有任务成功");
        return "redirect:/job/1";
    }
}

这么做的好处避免web server的连接池被长期占用而引起性能问题，调用后生成一个非web的服务线程来处理，增加web服务器的吞吐量~~

可以看下这个blog，还不错：http://wiselyman.iteye.com/blog/2215852
```