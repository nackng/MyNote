[TOC]
##idea maven项目打包自动脚本
项目 -> lifecycle -> Create
command line: clean package -Dmaven.test.skip=true
##idea部署maven项目到tomcat
```
1.Run -> Edit Configurations + -> TomcatServer -> local -> 为name起个名字。
2.切换到 Deployment 选项卡 -> + -> 把打包项目加进去 -> 选择出现的打包方式(exploded) -> 
3.切换回 Server 选项卡 -> 设置 on 'update' action (Update classes and resources) 和 on frame deactivation (Update classes and resources)
```
##idea调试代码
F9            resume programe 恢复程序
Alt+F10       show execution point 显示执行断点
F8            Step Over 相当于eclipse的f6      跳到下一步
F7            Step Into 相当于eclipse的f5就是  进入到代码
Alt+shift+F7  Force Step Into 这个是强制进入代码
Shift+F8      Step Out  (跳转到下一个断点)相当于eclipse的f8跳到下一个断点，也相当于eclipse的f7跳出函数
Atl+F9        Run To Cursor 运行到光标处
ctrl+shift+F9   debug运行java类
ctrl+shift+F10  正常运行java类
alt+F8          debug时选中查看值
##idea 运行到下一个断点
shift+f8
##idea 像 eclipse那样比较两个项目的异同
##idea 自动引入所用到的包
http://images2015.cnblogs.com/blog/443934/201611/443934-20161102211617783-991618094.png
##idea快速写main
psvm
##idea生成JUNIT测试类
ctrl+shift+T
##idea maven打包跳过测试
clean package -Dmaven.test.skip=true
##idea创建项目
IDEA的project 相当于之前eclipse的workspace,IDEA的Module是相当于eclipse的项目（project）
##idea错误代码信息
提示错误信息，点入进去又没有了提示。项目右击->Synchornized下即可。
##idea控制台中文乱码
1.配置Intellij的配置文件
bin/idea64.exe.vmoptions
在配置文件中添加：
-Dfile.encoding=UTF-8
2.配置项目编码及IDE编码
进入settings，选择File Encodings，把IDE Encoding和Project Encoding配置为UTF-8，同时将下面的Default encoding for properties files也配置为UTF-8。
Settings -> Editor -> File Encodings
3.配置项目启动服务器参数
在VM options 项中添加
-Dfile.encoding=UTF-8
Run -> Edit Configurations -> Server -> Vm Options
配置完成后，重启idea即可。
##修改配置文件，idea需要重启吗
##idea分享文件到github
https://github.com/adanac/adanac-ztree
…or create a new repository on the command line

echo "# adanac-ztree" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:adanac/adanac-ztree.git
git push -u origin master
…or push an existing repository from the command line

git remote add origin git@github.com:adanac/adanac-ztree.git
git push -u origin master
…or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.

Import code
##idea创建自己的项目
1.创建pom工程
File -> New (maven-archetype-quickstart)-> New Project -> new window.
保留pom.xml,删除src,然后关闭这个Window,在之前的Window中引入 Module from exist....。

2.创建子工程
New -> Module -> 不要设置module name,直接设置 Content root 添加\(module的ArtifactId后，module name自动添加好了)
              -> Content root E:\adanac_demo\aDb\aDb-common

##idea打开控制台
##idea中执行.bat脚本
项目--->Lifecycle--->右击--->Create--->clean package -Dmaven.test.skip=true 即创建了一个包含clean、打包的自动化的脚本。
##idea切换Project
##idea实现快速热部署
Run -> Edit configurations -> VM optioins : On 'update' action 选择Redeploy, On frame deactivation: update classes and resources .
当源文件修改后，点一下Deployment选项卡中的Deploy All按钮即可。
##idea svn使用
http://www.cnblogs.com/whc321/p/5669804.html
##idea运行项目调用方法结果集乱码
在configurations中的VM options里加上-Dfile.encoding=UTF-8，就好了，这种问题是操作系统不是中文环境导致的。
http://www.cnblogs.com/echo1937/p/6347483.html
##idea 设置修改jsp 不重启tomcat
run->edit configurations，
设置On ‘Update’ action为Redeploy。
设置On frame deactivation为Update classes and resourcees。
##IntelliJ IDEA “Finds duplicated code”提示如何关闭
Settings —> Editor —> Inspections —> General —> Duplicated Code取消勾选即可。
##IDEA Properties中文unicode转码问题
在IDEA中创建了properties文件，发现默认中文不会自动进行unicode转码。如下
#\u4EA7\u54C1\u4FE1\u606F\u8BBE\u7F6E
productName=JeeSite \u5FEB\u901F\u5F00\u53D1\u5E73\u53F0
copyrightYear=2015
version=V1.2.6
在File-->Setting-->Editor-->File Encodings，在箭头指的选项上打上勾，确定即可
##idea 方法参数可以自动提示
Settings --> Editor --> General --> show quick document...
或者直接在方法的括号内 ctrl + p 
##idea 同时修改多行
多行选中与不选快捷键: Alt + Shift + 鼠标左键
去除多行选中快捷键: Esc

备注：如果是多行的同一位置可以，按住Alt往下拉鼠标选中多行，输入即可同时写多行代码，方便写一些重复的控件声明。
##idea实战快捷键
Ctrl+Alt+F7 查找某个方法的所有调用地方
Alt + 7 显示类中的所有方法
ctrl + p 提示方法参数
