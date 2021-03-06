[TOC]
##windows 无法启动nexus服务 1067
```
原因：nexus的启动要依赖jdk，由于JAVA_HOME没有配置，nexus启动时找不到javaw.exe，导致服务起不来。
备注：如果JAVA_HOME配置正确，以下步骤可省略。
1，找到nexus安装目录
修改bin\jsw\conf\wrapper.conf中的wrapper.java.command
#wrapper.java.command=java
wrapper.java.command=C:\Program Files\Java\jdk1.7.0_79\bin\java.exe(java安装目录)
2，配置Java环境变量，验证 cmd-->java 输出正常 cmd-->javac输出正常
```
## Maven2部署构件到Nexus时出现的Failed to transfer file错误
2010年01月23日   Architecture ,  JavaPlateform    maven ,  nexus
具体怎样使用deploy命令部署构件到nexus服务器上可以参考经典的 《Maven Definitive Guide》(Maven操作指南) ，书中的16.7节里面讲解的非常详细。假设我们在项目pom.xml文件中对maven服务器的设置信息如下：
```
  < distributionManagement >
        < repository >
            < id > nexus-releases </ id >
            < name > Local Nexus Repository </ name >
            < url > http://192.168.1.99:8081/content/repositories/releases </ url >
        </ repository >
        < snapshotRepository >
            < id > nexus-snapshots </ id >
            < name > Local Nexus Repository </ name >
            < url > http://192.168.1.99:8081/content/repositories/snapshots </ url >
        </ snapshotRepository >
    </ distributionManagement >

这里我要说的是在使用的过程中遇到的几个都是“Failed to transfer file”错误，错误信息如下格式：
Error deploying artifact: Failed to transfer file:… Return code is:4xx
```

也就是说前面错误的信息都是一样的，只是后面返回的HTTP状态数字不同。

1.  Return code is: 405
这个问题害我查了两个多小时才发现错误的根源，简单的错误就是在Maven执行到上传文件到服务器的时候出现一个HTTP 405错误。开始的时候总以为是Maven本身的问题，所以在这个上面浪费了不少时间。后来仔细查了405错误的含义是“用来访问本页面的 HTTP 方法不被允许”，最后终于发现是因为前面repository的地址写错了，或者是端口写错，或者是地址中的某个单词拼错了，反正原因就是 repository的地址写错了 。

2.  Return code is: 401或者Return code is: 403
其实403错误就是“禁止访问”的含义，所以问题的根源肯定在授权上面。Maven在默认情况下会使用deployment帐号(默认密码deploy)登录的系统，但是关键的Nexus中Releases仓库默认的Deployment Policy是“Disable Redeploy”，所以无法部署的问题在这个地方，方法是将其修改为“Allow Redeploy”就可以了。


到这里还没有结束，因为如果直接按照上面的设置的话会有一个安全问题，那就是这样所有的开发人员都可以将构件部署到Nexus的releases仓库中了，时间长了会导致这个仓库中非常乱，这也应该是nexus为什么默认情况下将Release仓库的发布权限关闭的原因了。解决这个问题的整体思路就是在部署构件的时候需要使用用户名和密码登录，操作如下：
(1) 首先将Releases仓库默认的Deployment Policy修改为“Allow Redeploy”；
(2) 然后在右边的Security下面的Users中，修改deployment帐号的密码，方法是在帐号上右键，然后选择“Set Password”(PS：这个操作我找了好久，后来无意中右键才找到，呵呵~~)；
< password> deploydv89 / password >
      </ server >
 
      < server >
        < id > nexus-snapshots </ id >
        < username > deployment </ username >
        < password > deploydv89 </ password >
     </ server >

这里需要特别说明一句的是里面的id必须和你在项目pom.xml文件中distributionManagement下面设置的仓库id一致！当然了，这个里面你也可以设置admin帐号，或者参照deployment的权限手动添加新的帐号等等都是可以的。

当然，问题到这里已经得到了比较完美的解放，但是如果有人还要较真的话会想到帐号的密码直接放到配置文件里面不是很安全。其实只要这里不建议放admin帐号，而deployment是无法登录的。如果非要更安全一些的话，也可以使用Maven 2.1.0之后所提供的密码加密功能，操作的步骤如下：

(1) 使用“mvn –encrypt-master-password xxx”或“mvn –emp xxx”创建一个主密钥，后面的xxx就是你所要设置的密钥的内容，这个密钥主要用于后面加密密码来用的；命令执行之后会产生一个类似{jSMOWnoPFgsHVpMvz5VrIt5kRbzGpI8u+9EF1iFQyJQ=}形式的字符串。
(2) 在${user.home}/.m/目录下创建一个名为settings-security.xml文件，我们将刚刚产生的主密钥放到这个文件中，文件的内容如下：

  <? xml   version = " 1.0 "   encoding = " UTF-8 " ?>
  < settingsSecurity >
      < master > {jSMOWnoPFgsHVpMvz5VrIt5kRbzGpI8u+9EF1iFQyJQ=} </ master >
  </ settingsSecurity >

注意，这个settings-security.xml文件一定要放在${user.home}/.m/目录下面，而不能放在${m2_home}/conf目录下！
(3) 使用“mvn –encrypt-password xxx”或“mvn –ep xxx”命令对帐号的密码进行加密，后面的xxx就是帐号的密码，加密之后依然会产生一个“{xxx}”形式的字符串，将这个字符串替换上面settings.xml文件中的server下面的password节点内容即可。
还有一种更安全的方式，就是将主密钥放到U盘里面，具体的操作可以看下面的参考资料。
```
3.  Return code is: 400
400错误的含义是“错误的请求”，在这里的原因是 往往是没有部署到nexus的仓库中 。nexus的repository分三种类型：Hosted、Proxy和Virtual，另外还有一个repository group(仓库组)用于对多个仓库进行组合。部署的时候只能部署到Hosted类型的仓库中，如果是其他类型就会出现这个400错误。

还有一种情况也会出现400错误，就是默认情况下部署构件到Releases仓库中有时也会出现400错误，这个原因就像上面提到的那样，Nexus中Releases仓库默认的Deployment Policy是“Disable Redeploy”，所以无论你在settings.xml文件中将server的username设置为deployment还是使用admin都是无法部署的，就会出现这个400错误。这个问题也困扰了我好长时间，而且我还看到网上有人说admin没有部署构件的权限，这个是不对的。修改的方法可以参考上面第2条的做法。

参考资料：
maven 中 部署构件至Nexus（mvn deploy）
Maven2中需要注意的问题
maven deploy到nexus私服出错问题
Maven Tips and Tricks: Encrypting Passwords
Maven – Password Encryption

来源：  http://www.javatang.com/archives/2010/01/23/4518375.html