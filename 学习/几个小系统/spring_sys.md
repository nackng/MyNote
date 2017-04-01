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
