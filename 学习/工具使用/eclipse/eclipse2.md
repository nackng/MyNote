## Eclipse设置不格式化注释
```
　　注释中写点带格式的文字，format后全乱了，解决办法如下：
　　Windows -> Preferces -> Java -> Code Style -> Formatter -> Edit -> Comments
　　取消勾选“Enable Javadoc comment formatting”.
　　整个世界安静了.....
```
##java was started but returned exit code=13
原因：eclipse的版本与jdk版本不一致，分32位和64位，将二者版本保持不至即可。

在eclipse.ini中添加jdk路径：
-vm
C:\\Program Files (x86)\\Java\\jdk1.7.0_03\\bin\\javaw.exe
##java.lang.ClassNotFoundException: org.springframework.web.util.Log4jConfigListen


```
除了引入相应的jar包外，还需要把maven依赖包放入lib中。
```
右键项目，Deploy ment Assempbly..


.classpath文件中会有修改,在

```

<classpathentry kind="con" path="org.eclipse.m2e.MAVEN2_CLASSPATH_CONTAINER">
<attributes>
<attribute name="maven.pomderived" value="true"/>
<attribute name="org.eclipse.jst.component.dependency" value="/WEB-INF/lib"/>
</attributes>
</classpathentry>
```


##Eclipse中的Web项目部署不成功
```
将web项目部署到tomcat服务中，发现只有jar包，没有其他内容。

原因是，web项目的.project文件少了：
<nature>org.eclipse.jem.workbench.JavaEMFNature</nature>         <nature>org.eclipse.wst.common.modulecore.ModuleCoreNature</nature>  
 

```


添加好之后，web项目的目录结构就全了：


## Eclipse设置不格式化注释

　　Windows -> Preferces -> java -> Code Style -> Formatter -> Edit -> Comments

　　取消勾选“Enable Javadoc comment formatting”.

　　整个世界安静了..... ##eclipse ctrl左键失效
window-->preferences-- >General-->Editors-->Text Editors-->hyperlink.   全部勾上

如果不行，将项目工程关闭后再打开即可。
##eclipse一直building working ,只能结束进程
解决方法： 把Maven Project Builder禁用掉就OK了。 在项目右键点击->Properties->Builder->Maven Project Builder取消勾选就可以了。其他保持不变。
解决方法：eclipse选择Navigator视图，打开项目的.project文件，将验证js文件的配置清除。






然后，不要自动编译，进行手工编译，ctrl+b.
```
自动编译：点击菜单-Project-Build Automatically，这个取消勾选。Build Automatically 的意思是自动编译，选择的功能就是，在修改代码保存的时候，就编译了。
手动编译：选择要编译的java文件或包,按ctrl + b ,前提是project下边的那个自动编译勾选掉,手动编译,时常会出问题(编译文件不全) ,而且,你写好的文件,也时常会忘记手动编译。
```
## 在Eclipse中如何对整个项目重新编译
在Eclipse下，选中Project下的Clean一项，进入之后可以看到Clean all projects选后点“OK”就可以了。这时我们再打开Eclipse中用来保存编译文件的classes文件就可以看到刚才编译的。
##eclipse里报:An internal error occurred during: "Building workspace". Java heap space
解决办法1：把extjs4的工程安装包不要放到web工程中就ok大笑或者建议直接用myeclipse直接导入的exjts4包，就没问题。


解决办法2：导入ExtJS包，这样会卡死eclipse的。去到工程根目录下，找到.project，用记事本打开，把两处删除掉：
 
第一处：
 ```html
<buildCommand>
         <name>org.eclipse.wst.jsdt.core.javascriptValidator</name>
         <arguments>
         </arguments>
</buildCommand>
```
第二处：
 ```
<nature>org.eclipse.wst.jsdt.core.jsNature</nature>
```
保存退出，refresh一下工程。再把ext包复制进工程）



