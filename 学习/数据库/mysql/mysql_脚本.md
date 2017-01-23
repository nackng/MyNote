[TOC]
##导入sql文件的方式创建数据库
```
第一种方法:
 在命令行下(未连接数据库),输入 mysql -h localhost -u root -p123456 < F:\hello world\niuzi.sql (注意路径不用加引号的!!) 回车即可.
  第二种方法:
 在命令行下(已连接数据库,此时的提示符为 mysql> ),输入 source F:\hello world\niuzi.sql (注意路径不用加引号的) 或者 \. F:\hello world\niuzi.sql (注意路径不用加引号的) 回车即可
```