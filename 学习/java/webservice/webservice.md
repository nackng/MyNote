jax-ws 发布为web工程
第一步：下载jaxws-ri-2.2.8的扩展包
第二步：创建web工程
第三步：将扩展包中的jar拷贝至web工程下
第四步：编写服务端代码
第五步：使用 wsgen 生成 wsdl
eclipse下建立的项目的目录结构如下：




cmd
进入命令行

cd
到工程所在的目录下:

  cd D
:
\workspace\eclipse32\Webservice0728

执行
wsgen
:

  D
:
\workspace\eclipse32\Webservice0728
>
wsgen 
-
wsdl
:
Xsoap1
.
2
 
-
extension 
-
cp build\

classes org
.
allen
.
weather
.
service
.
WeatherServiceImpl
 
-
r 
WebContent
\WEB
-
INF\wsdl
刷新wsdl文件夹，即可看到生成的wsdl文件和xsd文件：


第六步：在web工程的WEB-INF下创建sun-jaxws.xml文件  
第七步：在web工程的web.xml中添加监听及servlet


Web
.
xml
中红色标的
 url
-
pattern
：/
 webservice 
/必须和
sun
-
jaxws
.
xml
中的
url
-
pattern
=
"/ webservice / "
相匹配。

通常将<
url
-
pattern
>定义为/
ws
/*，以/ws/匹配url，匹配到了则按webservice解析, sun-jaxws.xml的url-pattern也必须配置成/ws/XXXX 
第八步：启动tomcat  



测试访问：
http
:
//localhost:8080/Webservice0728/webservice/weather?wsdl



