

Unknown Faceted Project Problem


重新配置了服务器，导致之前的工程会报错。

--原因分析：
 

更换机器或系统后，旧工程所使用的
Tomcat
已不存在，
 


--解决：
 

1
、打开工程，属性
 

2
、打开
"Project Facets"
，打开面板右侧
"Runtimes"
，选择现在的
tomcat
服务器，然后点击
apply
即可。
 

The CATALINA_HOME environment variable is not defined correctly



配置
JDK
环境变量（在步骤查看如何配置环境变量）

1
，新建变量名：
JAVA_HOME
，变量值：
C
:
\Program 
Files
\Java\jdk1
.
7.0

2
，打开
PATH
，添加变量值：%
JAVA_HOME
%
\bin
;%
JAVA_HOME
%
\jre\bin

3
，新建变量名：
CLASSPATH
，变量值：.;%
JAVA_HOME
%
\lib\dt
.
jar
;%
JAVA_HOME
%
\lib\tools
.
jar

备注：

1
，.表示当前路径，%
JAVA_HOME
%就是引用前面指定的
JAVA_HOME
；

2
，
JAVA_HOME
指明
JDK
安装路径，此路径下包括
lib
，
bin
，
jre
等文件夹，
tomcat
，
eclipse
等的运行都需要依靠此变量。

3
，
PATH
使得系统可以在任何路径下识别
java
命令。

4
，
CLASSPATH
为
java
加载类(
class
 or lib
)路径，只有类在
classpath
中，
java
命令才能识别。

测试
JDK

在
CMD
命令下输入
javac
，
java
，
javadoc
命令


配置
Tomcat
环境变量

1
，新建变量名：
CATALINA_BASE
，变量值：
C
:
\tomcat

2
，新建变量名：
CATALINA_HOME
，变量值：
C
:
\tomcat

3
，打开
PATH
，添加变量值：%
CATALINA_HOME
%
\lib
;%
CATALINA_HOME
%
\bin

