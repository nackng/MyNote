[TOC]
##mysql tinyint和char(1)性能对比
```
2017-01-17 肖忠 小菜鸟DBA
在数据库设计的时候会遇到很多只需要0、1、2这种固定几个值的状态字段，基本上都建议设置为只占一字节的tinyint类型，有些觉得char(1)是一样，毕竟char(1)存储数字和字母时一个字符也只是占一个字节

mysql是用c++写的，而在c++中字符类型是存放对应ascii码的二进制到存储空间，而整型数字是直接存数字的二进制，虽然最终都是二进制存储，但是环节上有少许不同，同样在msyql查找时也会有所不同

今天对tinyint和char(1)做了个简单测试，分表建两个表t1、t2，结构如下：
mysql> show create table t1\G
*************************** 1. row ***************************
       Table: t1
Create Table: CREATE TABLE `t1` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` tinyint(4) DEFAULT NULL,
  `title` text,
  PRIMARY KEY (`_id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2400096 DEFAULT CHARSET=utf8
1 row in set (0.00 sec)

mysql> show create table t2\G
*************************** 1. row ***************************
       Table: t2
Create Table: CREATE TABLE `t2` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `id` char(1) DEFAULT NULL,
  `title` text,
  PRIMARY KEY (`_id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2400096 DEFAULT CHARSET=utf8
1 row in set (0.00 sec)

两个表唯一不同为id字段类型，总数据量都为2400096，id只有0、1、2三个，为了两个表的数据一样且磁盘上分布也一样，降低IO对测试的影响，分别加载的数据如下：
mysql> select id,count(*) from t1 group by id;
+------+----------+
| id   | count(*) |
+------+----------+
|    0 |  1199998 |
|    1 |  1199998 |
|    2 |       99 |
+------+----------+
3 rows in set (0.55 sec)

mysql> select id,count(*) from t2 group by id; 
+------+----------+
| id   | count(*) |
+------+----------+
| 0    |  1199998 |
| 1    |  1199998 |
| 2    |       99 |
+------+----------+
3 rows in set (0.77 sec)

查看执行计划：
mysql> explain select _id from test.t2 where id='1';                      
+----+-------------+-------+------+---------------+------+---------+-------+---------+--------------------------+
| id | select_type | table | type | possible_keys | key  | key_len | ref   | rows    | Extra                    |
+----+-------------+-------+------+---------------+------+---------+-------+---------+--------------------------+
|  1 | SIMPLE      | t2    | ref  | id            | id   | 4       | const | 1170900 | Using where; Using index |
+----+-------------+-------+------+---------------+------+---------+-------+---------+--------------------------+
1 row in set (0.00 sec)

mysql> explain select _id from test.t1 where id=1; 
+----+-------------+-------+------+---------------+------+---------+-------+---------+-------------+
| id | select_type | table | type | possible_keys | key  | key_len | ref   | rows    | Extra       |
+----+-------------+-------+------+---------------+------+---------+-------+---------+-------------+
|  1 | SIMPLE      | t1    | ref  | id            | id   | 2       | const | 1170601 | Using index |
+----+-------------+-------+------+---------------+------+---------+-------+---------+-------------+
1 row in set (0.00 sec)

两个表都使用了id索引，再看看information_schema.tables的信息是否和之前理解的存储字节大小是否有出入：
mysql> select DATA_LENGTH/1024/1024,INDEX_LENGTH/1024/1024,data_free from tables where table_name in ('t1','t2');
+-----------------------+------------------------+-----------+
| DATA_LENGTH/1024/1024 | INDEX_LENGTH/1024/1024 | data_free |
+-----------------------+------------------------+-----------+
|          310.81250000 |            27.56250000 |         0 |
|          313.81250000 |            29.56250000 |         0 |
+-----------------------+------------------------+-----------+
2 rows in set (0.00 sec)

两个表大小相差不多，确认char(1)和tinyint占字节数相同，现在直接看执行时间：
mysql> show profiles;
+----------+------------+---------------------------------------------------------------+
| Query_ID | Duration   | Query                                                         |
+----------+------------+---------------------------------------------------------------+
|        1 | 0.60804275 | select count(*) from (select _id from test.t1 where id=1) a   |
|        2 | 0.59277575 | select count(*) from (select _id from test.t1 where id=1) a   |
|        3 | 0.60398000 | select count(*) from (select _id from test.t1 where id=1) a   |
|        4 | 0.69068025 | select count(*) from (select _id from test.t2 where id='1') a |
|        5 | 0.69654200 | select count(*) from (select _id from test.t2 where id='1') a |
|        6 | 0.67788800 | select count(*) from (select _id from test.t2 where id='1') a |
+----------+------------+---------------------------------------------------------------+

这样就很明显可以看出为char(1)字段的t2表查询时消耗时间偏多，如果几条几百条的情况根本看不出char(1)和tinyint的差别，毕竟现在CPU的效率是非常高的，这里测试的利用了id=1的数据，有1199998条，这样就可以看出点差别了！！虽然效率差别不是很大，为了生产环境统一以及提升QPS还是使用短小的整型更好
```