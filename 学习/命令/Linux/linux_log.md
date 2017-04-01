[TOC]
##将history导出
```
histroy > history.txt 将history命令保存为history.txt并保存到当前文件夹下
```
##查看用户登录日志：
```
方式一：
cd /var/log
less secure
方式二：
last
```
##清除历史记录
```
方式一：
[root@localhost root]# history -c 

方式二：清空用户目录下的这个文件即可 
[root@localhost root]# echo > ./.bash_histo

方式三：
[root@localhost opt]# grep -rn "HISTSIZE" /etc/profile //查找"HISTSIZE"在profile中的行号
找到HISTSIZE这个值，默认情况下历史命令将保存1000条，可以将该值改为0
```