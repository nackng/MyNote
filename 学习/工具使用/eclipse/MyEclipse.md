MyEclipse中没有Project Facets配置选项


MyEclipse
中没有
Project
 
Facets
配置选项，则需要到当前项目的.
settings
文件夹下，找到
org
.
eclipse
.
wst
.
common
.
project
.
facet
.
core
.
xml
文件，其内容如下：

<?
xml version
=
"1.0"
 encoding
=
"UTF-8"
?>

<
faceted
-
project
>

<
fixed facet
=
"wst.jsdt.web"
/>

<
installed facet
=
"java"
 version
=
"1.6"
/>

<
installed facet
=
"jst.web"
 version
=
"2.5"
/>

<
installed facet
=
"wst.jsdt.web"
 version
=
"1.0"
/>

</
faceted
-
project
>

其中<
installed facet
=
"java"
 version
=
"1.6"
/>这行就是
faceted project
的编译级别配置。<
installed facet
=
"jst.web"
 version
=
"2.5"
/>这行配置在某些情况下也需要修改，比如在
MyEclipse
中建了个
web
项目，后来又导入到
eclipse jee
，有时候就需要修改这个配置。
Myeclipse中java项目转成Web项目


在
eclipse
导入一个
myeclipse
建的
web
项目后，在
Eclipse
中显示的还是
java
项目，按下面的步骤可以将其转换成
web
项目。
  

1
、找到项目目录下的.
project
文件
  

2
、编辑.
project
文件，找到<
natures
>...</
natures
>
  

3
、
2
中找到的结点中加下面的的代码(如果没有)
  

<
nature
>
org
.
eclipse
.
wst
.
common
.
project
.
facet
.
core
.
nature
</
nature
>
  

<
nature
>
org
.
eclipse
.
wst
.
common
.
modulecore
.
ModuleCoreNature
</
nature
>
  

<
nature
>
org
.
eclipse
.
jem
.
workbench
.
JavaEMFNature
</
nature
>
  

4
、在
eclipse
刷新项目或重启
eclipse  

5
、选择项目，右键，选择属性
  

6
、在左侧列表中找到
Myeclipse
->
Project
 
Facets
，在右侧选择“
Dynamic
 
Web
 
Module
”和
"Java"
，点击”
OK
”
  
myeclipse启动不起来，java.lang.outofmemoryerror


解决方法如下：

 
1.
从
Intalled
 
JREs
里修改；
window
->
Preferences
->
Java
->
Installed
 
JREs
，选择当前的
JRE
，然后
edit
它；在新窗口里设置
Default
 VM 
Arguments
为
 
-
Xms128M
 
-
Xmx512M
即可；这个设置对所有的工程都有效；（经验证有效）

 
2.
如果仅仅是想对某个工程的有效的话，从
Debug
...
 
或
Run
...里修改，在(
x
)=
Arguments
里设置和上面相同的参数即可；

 
3.
如果小猫猫
Tomcat
的话，
window
->
Preferences
->
Application
 
Servers
->
Tomcat
->
Tomcat
 
6.x
，选择
JDK
设置即可；

或者

直接修改myeclipse.ini文件中的 -Xms参数
myeclipse Unhandled event loop exception  Error occurred during status handling



可能的解决办法：

1.
打开你的
myeclipse
，然后
window
-->
preferences
-->
general
-->
editors
-->
file 
Associations
,然后在上面选择
jsp
,把下面的第一个编辑器移除掉，换为其他的编辑器，点击确定就
OK
。

2.
安装的某个软件与
myeclipse
有冲突。

3.
重启机器。


myeclipse  启动时 Unable to update index for central| http://repo1.maven.org/maven



解决方案：
 

preference
→
MyEclipse
→
Maven4MyEclipse

去掉右边
 
Download
 repository index updates on startup 
选项。
关于java.lang.NoClassDefFoundError: com/sun/mail/util/LineInputStream解决办法



在编写邮件发送相关程序时，会报错！

 

主要原因是
 

javax
.
mail
和
javax
.
activation
这两个包已经在
javaEE5
当中属于基础包了，就是
JDK
中自带了已经，但是里面的方法与现在外面的
mail
.
jar
和
activation
.
jar
有一些出入，所以初学者在直接
copy
别人代码的时候往往会出现上面的错误。
 

废话不多说下面是解决方法
 

进到

X
:/
Program
 
Files
/
MyEclipse
 
6.5
/
myeclipse
/
eclipse
/
plugins
/
com
.
genuitec
.
eclipse
.
j2eedt
.
core_6
.
5.0
.
zmyeclipse650200806
/
data
/
libraryset
/
EE_5

这个路径里,可以看到
javaee
.
jar
,用
rar
把这个文件打开,然后进到
javax
文件夹里,删除
mail
.
jar
和
activation
.
jar
(我的
javaee
.
jar
里，这两个东西是文件夹，总之删掉就
OK
，不过要注意备份一下)

