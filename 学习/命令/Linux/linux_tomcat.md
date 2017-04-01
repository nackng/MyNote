[TOC]
##重启tomcat
```
cd /usr/local/tomcat/bin
./shutdown.sh (关闭tomcat)
ps -ef|grep java (查看Tomcat是否关闭)
kill -9 7010 (杀死Tomcat进程)
ps -ef|grep java (继续查看tomcat是否关闭)
./startup.sh  (启动tomcat)
```
##实时查看tomcat运行日志
```
1、先切换到：cd usr/local/tomcat5/logs
2、tail -f catalina.out
3、这样运行时就可以实时查看运行日志了
Ctrl+c 是退出tail命令。
```
##查看tomcat状态和日志
```
场景1:浏览器报错了,如何定位错误
tail -n 50 ../../logs/catalina.out  (只显示catalina.out 最后50行)

场景2:如何实时查看tomcat日志内容呢?
tail -f ../../logs/catalina.out  

场景3:通过关键字查询日志
grep -nH "Excetion message" test.text  
参数说明
-n, --line-number 行号
-H, --with-filename 打印每个匹配的文件名 
-r, --recursive      like --directories=recurse 递归
```
##判断tomcat是否在运行
```
#!/bin/sh  
$grep_result
grep_result=`ps -ef |grep tomcat|grep "/home/whuang/software/apache/apache-tomcat-7.0.53"|grep -v "grep"`  
echo $grep_result  
    if [ x"$grep_result" = x"" ];then  
        echo "tomcat not run"  
    else  
        echo "tomcat is running..."    
    fi  
```
##定时启动tomcat
```
编辑定时器:
crontab -e
 
*/1 * * * * /home/whuang/software/auto_start_tomcat.sh
每隔一分钟就执行指定脚本
 
脚本内容如下:
#!/bin/sh  
$grep_result
grep_result=`ps -ef |grep tomcat|grep "/home/whuang/software/apache/apache-tomcat-7.0.53"|grep -v "grep"`  
if [ x"$grep_result" = x"" ];then  
        catalina_home2=/home/whuang/software/apache/apache-tomcat-7.0.53  
        CATALINA_HOME=$catalina_home2  
        cd $catalina_home2/bin  
        ./startup.sh  
    else  
        echo "tomcat is running..."    
    fi  
```