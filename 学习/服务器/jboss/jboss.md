安装

windows


解压缩，启动，双击：
D
:
\soft\jboss7
.
1.1
\bin\standalone
.
bat

测试访问：
http
:
//localhost:8080/




添加用户，执行脚本：
D
:
\soft\jboss7
.
1.1
\bin\add
-
user
.
bat




linux
部署

windows


有
4
种部署方式：

Administration
 UI 
Console

Command
 
Line
 
Console

Maven
 
Plugin
(
jboss
-
as
-
maven
-
plugin
)

copy 

先看第
1
种：
Administration
 UI 
Console

访问
http
:
//localhost:8080/ 点击 Administration Console 进入 http://localhost:9990/console/App.html#deployments

点击
Runtime
 
->
 
Deployments
 
->
 
Manage
 
Deployments
 
->
 
Add
 
Content
 
,选择要部署的
 war 
包即可。






最后点击
 
Save
 
->
 
Enable
 
->
 
Confirm
，等待部署完毕即可。

测试访问：
http://localhost:8080/Weblogic0727/

http://localhost:8080/Jboss0728/
 （项目名即部署时，war包的名字）


linux
