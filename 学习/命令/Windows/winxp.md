

--自动关机

  shutdown 
-
i  
对自动关机进行设置

  shutdown 
-
s 
-
t 
300
 
表示
300s
后自动关机

           
-
l        
注销当前用户

           
-
r        
关机并重启

           
-
f        
强行关闭应用程序

           
-
m pc2005 
控制远程计算机
pc2005


--取消自动关机

  shutdown 
-
a


--查看远程桌面连接记录

  win
+
r 
->
 regedit 
->
 HKEY_CURRENT_USER
/
Software
/
Microsoft
/
Terminal
 
Server
 
Client
/
Default

  
(比如：
MRUO
:
10.134
.
93.151
，表示用户名和对应的
IP
)


--远程桌面终端服务默认端口

  
3389


--修改默认端口

  HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal 
Server
\Wds\rdpwd\Tds\tcp
”
 
->
 
PortNumber
 
即可。

  HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal 
Server
\WinStations\RDP
-
tcp
”
 
->
 
PortNumber
 
也要同步修改。


--命令行下安装远程桌面

   
在命令行下输入如下三行命令：

　　c
:
\>echo 
[
Components
]
 
>
 c
:
\aa

　　c
:
\>echo 
TSEnable
 
=
 on 
>>
c
:
\aa

　　c
:
\>sysocmgr
/
i
:
c
:
\winnt\inf\sysoc
.
inf 
/
u
:
c
:
\aa 
/
q 
/
r


--禁止远程连接

  
--
1.
删除
 mstsc
.
exe  
（
C
:
\\windows\\system32\\mstsc
.
exe
）

  
--
2.
我的电脑图标右键属性，远程→远程设置，禁止

 

--查看证书

   戴尔电脑eDellRoot证书已被黑客利用：


  -- 网络检测：
https://edell.tlsfun.de/

  -- 手动检测：打开启动——输入certmgr.msc——跳出证书管理界面——点开受信任的根证书颁发机构，查看有没有名为eDellRoot的证书；
## windows中快速停掉占用某端口的进程的方法


1、首先查找到占用8080端口的进程号PID是多少

CMD>netstat -ano | findstr 8080

这个命令输出的最后一列表示占用8080端口的进程号是多少，假设为1234

  2、kill掉这个进程

CMD>taskkill /F /PID 1234  

这样8080端口就是释放了。

