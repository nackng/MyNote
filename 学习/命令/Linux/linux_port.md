[TOC]
##查看22端口是开启
```
netstat -nupl | grep 3306表示用数字形式显示端口号，u，表示UDP协议类型，p是程序PID，l表示处于监听状态的；

22端口是ssh服务的，执行命令“/etc/init.d/ssh start”。
然后用netstat -antulp | grep ssh看是否能看到相关信息就可以了。
```