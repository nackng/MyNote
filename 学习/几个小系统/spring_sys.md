[TOC]
##spring-learning
[spring-learning](https://github.com/brianway/spring-learning)

###spring-helloworld
####分析
```
login.jsp:
<body>
<c:if test="${!empty error}">
    <font color="red"><c:out value="${error}"/></font>
</c:if>

<form action="<c:url value="/loginCheck.html"/>" method="post">
    用户名：
    <input type="text" name="userName"/>
    <br>
    密 码：
    <input type="password" name="password"/>
    <br>
    <input type="submit" value="登录"/>
    <input type="reset" value="重置"/>
</form>
</body>

点击登录，基于spring框架完成以下动作：
DEBUG [http-apr-8083-exec-1] - Creating new transaction with name [com.brianway.learning.spring.helloworld.service.UserService.hasMatchUser]: PROPAGATION_REQUIRED,ISOLATION_DEFAULT
DEBUG [http-apr-8083-exec-1] - Acquired Connection [jdbc:mysql://localhost:3306/sampledb?useSSL=false, UserName=root@localhost, MySQL Connector Java] for JDBC transaction
DEBUG [http-apr-8083-exec-1] - Switching JDBC Connection [jdbc:mysql://localhost:3306/sampledb?useSSL=false, UserName=root@localhost, MySQL Connector Java] to manual commit
DEBUG [http-apr-8083-exec-1] - Executing prepared SQL query
DEBUG [http-apr-8083-exec-1] - Executing prepared SQL statement [SELECT count(*) FROM t_user WHERE user_name = ? and password = ?]
DEBUG [http-apr-8083-exec-1] - Initiating transaction commit
DEBUG [http-apr-8083-exec-1] - Committing JDBC transaction on Connection [jdbc:mysql://localhost:3306/sampledb?useSSL=false, UserName=root@localhost, MySQL Connector Java]
DEBUG [http-apr-8083-exec-1] - Releasing JDBC Connection [jdbc:mysql://localhost:3306/sampledb?useSSL=false, UserName=root@localhost, MySQL Connector Java] after transaction
DEBUG [http-apr-8083-exec-1] - Returning JDBC Connection to DataSource
DEBUG [http-apr-8083-exec-1] - Rendering view [org.springframework.web.servlet.view.JstlView: name 'login'; URL [/WEB-INF/jsp/login.jsp]] in DispatcherServlet with name 'helloworld'
DEBUG [http-apr-8083-exec-1] - Added model object 'error' of type [java.lang.String] to request in view with name 'login'
DEBUG [http-apr-8083-exec-1] - Added model object 'loginCommand' of type [com.brianway.learning.spring.helloworld.web.LoginCommand] to request in view with name 'login'
DEBUG [http-apr-8083-exec-1] - Added model object 'org.springframework.validation.BindingResult.loginCommand' of type [org.springframework.validation.BeanPropertyBindingResult] to request in view with name 'login'
DEBUG [http-apr-8083-exec-1] - Forwarding to resource [/WEB-INF/jsp/login.jsp] in InternalResourceView 'login'
DEBUG [http-apr-8083-exec-1] - Successfully completed request

LoginController.java
@Controller
public class LoginController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/index.html")
    public String loginPage() {
        return "login";
    }

    @RequestMapping(value = "/loginCheck.html")
    public ModelAndView loginCheck(HttpServletRequest request, LoginCommand loginCommand) {
        boolean isValidUser = userService.hasMatchUser(loginCommand.getUserName(), loginCommand.getPassword());
        if (!isValidUser) {
            return new ModelAndView("login", "error", "用户名或者密码错误");
        } else {
            User user = userService.findUserByUserName(loginCommand.getUserName());
            user.setLastIp(request.getRemoteAddr());
            user.setLastVisit(new Date());
            userService.loginSuccess(user);
            request.getSession().setAttribute("user", user);
            return new ModelAndView("main");
        }
    }

}
```
###spring-ioc
```
    /**
     * 通过@Configuration组装XML配置所提供的配置信息
     */
    @Test
    public void testConfigByConfiguration() {
        ApplicationContext context = new AnnotationConfigApplicationContext(LogonAppConfig.class);
        LogonService logonService = context.getBean(LogonService.class);
        logonService.printHelllo();
    }
/**
 * 引用 XML 配置信息
 */
@Configuration
@ImportResource("classpath:com/brianway/learning/spring/ioc/conf/beans-xmlconfig.xml")
public class LogonAppConfig {

    @Bean
    @Autowired
    public LogonService logonService(UserDao userDao, LogDao logDao) {
        LogonService logonService = new LogonService();
        logonService.setUserDao(userDao);
        logonService.setLogDao(logDao);
        return logonService;
    }
}

<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
         http://www.springframework.org/schema/beans/spring-beans-4.2.xsd">

    <bean id="userDao" class="com.brianway.learning.spring.ioc.conf.UserDao"/>
    <bean id="logDao" class="com.brianway.learning.spring.ioc.conf.LogDao"/>

</beans>

```
##jeesite
https://github.com/thinkgem/jeesite
JeeSite 是一个企业信息化开发基础平台，Java企业应用开源框架，Java EE（J2EE）快速开发框架，使用经典技术组合（Spring、Spring MVC、Apache Shiro、MyBatis、Bootstrap UI），包括核心模块如：组织机构、角色用户、权限授权、数据权限、内容管理、工作流等。
###登录模块
```
1.页面
<form id="loginForm" class="form-signin" action="/jeesite/a/login" method="post" novalidate="novalidate">
    <input class="btn btn-large btn-primary" type="submit" value="登 录">&nbsp;&nbsp;
</form>
2.Controller
@Controller
public class LoginController extends BaseController{
    
    @Autowired
    private SessionDAO sessionDAO;
    
    /**
     * 管理登录
     */
    @RequestMapping(value = "${adminPath}/login", method = RequestMethod.GET)
    public String login(HttpServletRequest request, HttpServletResponse response, Model model) {
        Principal principal = UserUtils.getPrincipal();
        
        if (logger.isDebugEnabled()){
            logger.debug("login, active session size: {}", sessionDAO.getActiveSessions(false).size());
        }
        
        // 如果已登录，再次访问主页，则退出原账号。
        if (Global.TRUE.equals(Global.getConfig("notAllowRefreshIndex"))){
            CookieUtils.setCookie(response, "LOGINED", "false");
        }
        
        // 如果已经登录，则跳转到管理首页
        if(principal != null && !principal.isMobileLogin()){
            return "redirect:" + adminPath;
        }
        return "modules/sys/sysLogin";
    }
```