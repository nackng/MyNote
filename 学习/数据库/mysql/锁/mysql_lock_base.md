[TOC]
##锁状态
```
mysql的锁有表锁和行锁，myisam最小锁为表锁，innodb最小锁为行锁，可以通过以下命令获取锁定次数、锁定造成其他线程等待次数，以及锁定等待时间信息。
 
mysql> show status like '%lock%';
+------------------------------------------+---------+
| Variable_name                            | Value   |
+------------------------------------------+---------+
| Com_lock_tables                          | 0       |
| Com_unlock_tables                        | 0       |
| Innodb_row_lock_current_waits            | 0       |
| Innodb_row_lock_time                     | 0       |
| Innodb_row_lock_time_avg                 | 0       |
| Innodb_row_lock_time_max                 | 0       |
| Innodb_row_lock_waits                    | 0       |
| Key_blocks_not_flushed                   | 0       |
| Key_blocks_unused                        | 13396   |
| Key_blocks_used                          | 19      |
| Performance_schema_locker_lost           | 0       |
| Performance_schema_rwlock_classes_lost   | 0       |
| Performance_schema_rwlock_instances_lost | 0       |
| Qcache_free_blocks                       | 0       |
| Qcache_total_blocks                      | 0       |
| Table_locks_immediate                    | 1570736 |
| Table_locks_waited                       | 7294    |
+------------------------------------------+---------+
 
如当Table_locks_waited与Table_locks_immediate的比值较大，则说明我们的表锁造成的阻塞比较严重，可能需要调整Query语句，或者更改存储引擎，亦或者需要调整业务逻辑。当然，具体改善方式必须根据实际场景来判断。而Innodb_row_lock_waits较大，则说明Innodb的行锁也比较严重，且影响了其他线程的正常处理。同样需要查找出原因并解决。造成Innodb行锁严重的原因可能是Query语句所利用的索引不够合理（Innodb行锁是基于索引来锁定的），造成间隙锁过大。也可能是系统本身处理能力有限，则需要从其他方面来考虑解决。

Table_locks_immediate  指的是能够立即获得表级锁的次数

Table_locks_waited  指的是不能立即获取表级锁而需要等待的次数

1、查看正在被锁定的的表
show OPEN TABLES where In_use > 0;
 
2、查询进程
show processlist
查询到相对应的进程===然后 kill    id
 
补充：
查看正在锁的事务
SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCKS; 
 
查看等待锁的事务
SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCK_WAITS; 
```
##mysql普通索引（非唯一索引） 与 唯一索引 与 主键索引
###普通索引(非唯一索引)
```
普通索引（由关键字key或index定义的索引）的唯一任务是加快对数据的访问速度。因此，应该只为那些最经常出现在查询条件（wherecolumn=）或排序条件（orderbycolumn）中的数据列创建索引。只要有可能，就应该选择一个数据最整齐、最紧凑的数据列（如一个整数类型的数据列）来创建索引。
一个文章库，里面有两个表：category和article。category里面有10条分类数据。article里面有20万条。article里面有一个"article_category"字段是与category里的"category_id"字段相对应的。
article表里面已经把 article_category字义为了索引。数据库大小为1.3g。

问题描述：
执行一个很普通的查询： select * from `article` where article_category=11 order by article_id desc limit 5 。执行时间大约要5秒左右

解决方案：
建一个索引：create index idx_u on article (article_category,article_id);
select * from `article` where article_category=11 order by article_id desc limit 5 减少到0.0027秒
```
###唯一索引
```
普通索引允许被索引的数据列包含重复的值。比如说，因为人有可能同名，所以同一个姓名在同一个“员工个人资料”数据表里可能出现两次或更多次。
如果能确定某个数据列将只包含彼此各不相同的值，在为这个数据列创建索引的时候就应该用关键字unique把它定义为一个唯一索引。这么做的好处：一是简化了mysql对这个索引的管理工作，这个索引也因此而变得更有效率；二是mysql会在有新记录插入数据表时，自动检查新记录的这个字段的值是否已经在某个记录的这个字段里出现过了；如果是，mysql将拒绝插入那条新记录。也就是说，唯一索引可以保证数据记录的唯一性。事实上，在许多场合，人们创建唯一索引的目的往往不是为了提高访问速度，而只是为了避免数据出现重复。

CREATE TABLE persons (
  id_p INT NOT NULL,
  lastname VARCHAR (255) NOT NULL,
  firstname VARCHAR (255),
  address VARCHAR (255),
  city VARCHAR (255),
  CONSTRAINT uc_personid UNIQUE (id_p, lastname)
)

如需撤销 unique 约束，请使用下面的 sql：
mysql:alter table persons drop index uc_personid;
 
唯一索引。
它与前面的"普通索引"类似，不同的就是：索引列的值必须唯一，但允许有空值。
如果是组合索引，则列值的组合必须唯一。
它有以下几种创建方式：
（1）创建索引：create unique index indexname on tablename(tablecolumns(length))
（2）修改表结构：alter tablename add unique [indexname] on (tablecolumns(length))
（3）创建表的时候直接指定：create table tablename ( [...], unique [indexname] (tablecolumns(length));
```
###主键索引
```
主键索引是唯一索引的特殊类型。
数据库表通常有一列或列组合，其值用来唯一标识表中的每一行。该列称为表的主键。
在数据库关系图中为表定义一个主键将自动创建主键索引，主键索引是唯一索引的特殊类型。主键索引要求主键中的每个值是唯一的。当在查询中使用主键索引时，它还允许快速访问数据。
它们的一些比较：
(1)对于主健/unique constraint ， oracle/sql server/mysql等都会自动建立唯一索引；
(2)主键不一定只包含一个字段，所以如果你在主键的其中一个字段建唯一索引还是必要的；
(3)主健可作外健，唯一索引不可；
(4)主健不可为空，唯一索引可；
(5)主健也可是多个字段的组合；
(6)主键与唯一索引不同的是：
a.有not null属性；
b.每个表只能有一个。
```
###唯一索引与非唯一索引实例
```
索引的作用是“排列好次序，使得查询时可以快速找到”

1.唯一索引：被索引的字段组合，其数据在全表中唯一。
如下表中，为’学号‘建索引：
学号        姓名
-----------------------
001         张三
002         李四

2.非唯一索引：数据可以不唯一。
如下表中，为Score建索引，可不唯一：
Score | Name
--------------------
98        张三
98        李四
96        王五
```
##锁的算法测试
###建立测试表
```
在RR事务隔离级别下，创建6个表，存储引擎innodb

CREATE TABLE `a` (
    a INT(11) NOT NULL,
    b INT(11) NOT NULL
)ENGINE=INNODB DEFAULT CHARSET=utf8

CREATE TABLE `b` (
    a INT(11) NOT NULL,
    b INT(11) NOT NULL,
    KEY `a`(`a`)
)ENGINE=INNODB DEFAULT CHARSET=utf8

CREATE TABLE `c` (
    a INT(11) NOT NULL,
    b INT(11) NOT NULL,
    PRIMARY KEY (`a`)
)ENGINE=INNODB DEFAULT CHARSET=utf8

CREATE TABLE `d` (
    a INT(11) NOT NULL,
    b INT(11) NOT NULL,
    KEY `b`(`b`)
)ENGINE=INNODB DEFAULT CHARSET=utf8

CREATE TABLE `e` (
    a INT(11) NOT NULL,
    b INT(11) NOT NULL,
    PRIMARY KEY(`a`),
    KEY `b`(`b`)
)ENGINE=INNODB DEFAULT CHARSET=utf8

CREATE TABLE `f` (
    a INT(11) NOT NULL,
    b INT(11) NOT NULL,
    KEY `a`(`a`),
    KEY `b`(`b`)
)ENGINE=INNODB DEFAULT CHARSET=utf8

每个表的数据如下：
INSERT INTO a(a,b) VALUES(1,2),(3,4),(6,7),(8,9),(15,16),(50,51);
```
###测试a表(a表的两个字段都没有索引)
```
开启两个会话。
会话一：
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

此时，在会话2执行以下插入操作：
mysql> insert into a values(5,6);
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted

mysql> update a set b=100 where a=6;
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted

通过以上测试，由于表没有任何索引，当记录a=6被锁定后，无论插入，更新操作都会被锁定。
```
###测试b表(b表的a字段有非唯一索引，b字段没有索引)
```
1.执行插入操作
会话1执行：
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> select * from b where a=6 for update;
+---+---+
| a | b |
+---+---+
| 6 | 7 |
+---+---+
1 row in set (0.11 sec)

会话2执行：
现在a=6的前一条记录和后一条记录的范围中插入数据
mysql> insert into b values(5,6);
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted
mysql> insert into b values(7,8);
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted


在a小于3，或者a<8的范围内插入数据，发现可以成功。
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> insert into b values(100,101);
Query OK, 1 row affected (0.00 sec)

mysql> insert into b values(9,10);
Query OK, 1 row affected (0.00 sec)

mysql> insert into b values(2,3);
Query OK, 1 row affected (0.00 sec)


2.执行更新操作
前提条件，之前在会话1中：
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> select * from b where a=6 for update;
+---+---+
| a | b |
+---+---+
| 6 | 7 |
+---+---+
1 row in set (0.11 sec)
a=6这行记录被锁定。

在会话2中执行更新：
mysql> update b set b=100 where a=3;
Query OK, 1 row affected (0.02 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update b set b=100 where a=8;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0
发现：a=3和a=8这行记录没有被锁定。

```
###测试c表(c表的a字段为主键，b字段没有索引)
```
1.执行插入操作
会话1执行：
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> select * from c where a=6 for update;
+---+---+
| a | b |
+---+---+
| 6 | 7 |
+---+---+
1 row in set (0.13 sec)

会话2执行：
执行a=6这行记录的前后记录进行插入。
mysql> begin;
ERROR 2006 (HY000): MySQL server has gone away
No connection. Trying to reconnect...
Connection id:    19
Current database: demo

Query OK, 0 rows affected (0.09 sec)

mysql> insert into c values(5,6);
Query OK, 1 row affected (0.11 sec)

mysql> insert into c values(4,5);
Query OK, 1 row affected (0.00 sec)

mysql> insert into c values(7,8);
Query OK, 1 row affected (0.00 sec)

2.执行更新操作
对a=6这行记录已经前后行记录进行更新，更新成功。
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> update c set b=100 where a=6;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

在会话2中执行：
mysql> update c set b=100 where a=3;
Query OK, 1 row affected (0.02 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update c set b=100 where a=8;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update c set b=100 where a=6;
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted

执行提交后，完成本次事务，即可看到结果。
mysql> commit;
Query OK, 0 rows affected (0.00 sec)


```
###测试d表(d表的a字段没有索引, b字段非唯一索引)
```
会话1执行：
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> select * from d where a=6 for update;
+---+---+
| a | b |
+---+---+
| 6 | 7 |
+---+---+
1 row in set (0.08 sec)

会话2中执行：
在a=6的这行记录前后写入数据，失败。
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> insert into d values(5,6);
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted
mysql> insert into d values(4,5);
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted
mysql> insert into d values(7,8);
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted
mysql> insert into d values(3,11);
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted
mysql> insert into d values(2,11);
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted

在a=6的这行记录前后更新数据，失败。
mysql> update d set b=100 where a=6;
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted
mysql> update d set b=100 where a=3;
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted
mysql> update d set b=100 where a=2;
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted
mysql> update d set b=100 where a=1;
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted


```
###测试e表(e表的a字段主键索引，b字段非唯一索引)
```
会话1
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> select * from e where a=6 for update;
+---+---+
| a | b |
+---+---+
| 6 | 7 |
+---+---+
1 row in set (0.06 sec)

会话2执行
执行a=6的前后插入，成功。
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> insert into e values(5,6);
Query OK, 1 row affected (0.08 sec)

mysql> insert into e values(4,5);
Query OK, 1 row affected (0.00 sec)

mysql> insert into e values(7,8);
Query OK, 1 row affected (0.00 sec)

mysql> commit;
Query OK, 0 rows affected (0.00 sec)

执行更新，
更新a=6记录失败，更新其他记录成功：

mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> update e set b=100 where a=6;
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted
mysql> update e set b=1001 where a=7;
Query OK, 1 row affected (0.05 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update e set b=1002 where a=5;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> commit;
Query OK, 0 rows affected (0.00 sec)


```
###测试f表(f表的a字段非唯一索引，b字段非唯一索引)
```
会话1执行
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> select * from f where a=6 for update;
+---+---+
| a | b |
+---+---+
| 6 | 7 |
+---+---+
1 row in set (0.11 sec)

会话2执行
1.执行插入
(a=6附近的记录)，失败，（非附近的记录a=17,成功）：
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> insert into f values(5,6);
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted
mysql> insert into f values(4,5);
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted
mysql> insert into f values(7,8);
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted



插入a前面一条记录和后面一条记录之外的范围，插入可以成功。
mysql> insert into f values(17,18);
Query OK, 1 row affected (0.00 sec)

2.执行更新，
更新a=6这行记录失败，其他记录成功：
mysql> begin;
Query OK, 0 rows affected (0.00 sec)

mysql> update f set b=100 where a=6;
^C -- query aborted
ERROR 1317 (70100): Query execution was interrupted
mysql> update f set b=100 where a=15;
Query OK, 1 rows affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> update f set b=100 where a=7;
Query OK, 1 rows affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

```