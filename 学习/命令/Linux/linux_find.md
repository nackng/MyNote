[TOC]
##tail命令
```
tail -f filename会把filename里最尾部的内容显示在屏幕上,并且不但刷新.
命令参数：
-f 循环读取
-q 不显示处理信息
-v 显示详细的处理信息
-c<数目> 显示的字节数
-n<行数> 显示行数
--pid=PID 与-f合用,表示在进程ID,PID死掉之后结束. 
-q, --quiet, --silent 从不输出给出文件名的首部 
-s, --sleep-interval=S 与-f合用,表示在每次反复的间隔休眠S秒

实例：
实例1：显示文件最后5行内容
命令：
tail -n 5 log2014.log 

实例2：循环查看文件内容
命令：
tail -f test.log 
ping 192.168.120.204 > test.log & //在后台ping远程主机。并输出文件到test.log；

实例3：从第5行开始显示文件
命令：
tail -n +5 log2014.log
```
##查找字符串在文件中的位置
```
在当前目录下 查找"hello,world!"字符串,可以这样:
grep -rn "hello,world!" ./
./ : 表示路径为当前目录.
-r 是递归查找
-n 是显示行号
```
