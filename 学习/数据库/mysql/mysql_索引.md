[TOC]
##索引的本质
```
http://blog.codinglabs.org/articles/theory-of-mysql-index.html

索引（Index）是帮助MySQL高效获取数据的数据结构。提取句子主干，所以索引的本质是数据结构。
我们都希望查询数据的速度能尽可能的快，因此数据库系统的设计者会从查询算法的角度进行优化。最基本的查询算法当然是顺序查找（linear search），这种复杂度为O(n)的算法在数据量很大时显然是糟糕的，好在计算机科学的发展提供了很多更优秀的查找算法，例如二分查找（binary search）、二叉树查找（binary tree search）等。如果稍微分析一下会发现，每种查找算法都只能应用于特定的数据结构之上，例如二分查找要求被检索数据有序，而二叉树查找只能应用于二叉查找树上，但是数据本身的组织结构不可能完全满足各种数据结构（例如，理论上不可能同时将两列都按顺序进行组织），所以，在数据之外，数据库系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式引用（指向）数据，这样就可以在这些数据结构上实现高级查找算法。这种数据结构，就是索引。

```
##创建高性能的索引
###索引是如何工作的
```
比如要看某个话题，索引就像书的目录，找到对应的页码。
存储引擎先在索引中找到对应的值，根据匹配的索引记录，找到对应的数据行。

```
##索引区别
###唯一索引与非唯一索引
```
非唯一索引，就是这个索引里面的值，是允许重复的。
唯一索引，就是这个索引里面的值，是不允许重复的。
比如：我们的身份证。如果存储到数据库里面。
如果在姓名上面创建一个索引，那么是非唯一索引，因为同名的人是存在的。
如果在身份证号码上面创建一个索引，那么是唯一索引，因为身份证号码一般不重复。
```
##同一数据库,同一表,同样索引;同一条查询语句 ,使用索引的情况不一样
查询时间 一个要 4 s ,一个 0.1 秒
一个走了索引
一个没走索引 
所以一个快,一个慢
环境都一样,为什么索引使用情况不同呢
##MySql单列索引和联合索引的使用区别
```
建立联合索引的时候字段是什么顺序,查询语句中where后面的字段就要按照什么顺序来。
CREATE TABLE `gift` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `name` VARCHAR(50) DEFAULT NULL COMMENT '道具名称',
  `description` VARCHAR(300) DEFAULT NULL COMMENT '道具功能简介',
  `status` TINYINT(1) DEFAULT NULL COMMENT '道具状态,1:启用中，0:',
  `scene_type` INT(11) DEFAULT NULL COMMENT '场景类型，0:直播场景,1:回放场景',
  `price` FLOAT DEFAULT NULL COMMENT '价格',
  `integration` FLOAT DEFAULT NULL COMMENT '道具积分',
  `charge_status` INT(11) DEFAULT NULL COMMENT '收费状态（0:免费,1:收费,2:折扣）',
  `rank` INT(11) DEFAULT NULL COMMENT '排序,比如有新道具，需要优先进行推荐',
  `app_id` INT(11) DEFAULT NULL COMMENT '应用的标识',
  `create_time` DATETIME DEFAULT NULL COMMENT '创建时间',
  `create_user` INT(11) DEFAULT NULL COMMENT '创建人ID',
  `data` VARCHAR(1000) DEFAULT NULL COMMENT '预留字段，用来存放logo，效果图等信息，JSON串形式',
  PRIMARY KEY (`id`),
  KEY `idx` (`name`,`status`,`scene_type`,`app_id`)
) ENGINE=INNODB AUTO_INCREMENT=786663 DEFAULT CHARSET=utf8;

CREATE TABLE `gift2` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键，自增',
  `name` VARCHAR(50) DEFAULT NULL COMMENT '道具名称',
  `description` VARCHAR(300) DEFAULT NULL COMMENT '道具功能简介',
  `status` TINYINT(1) DEFAULT NULL COMMENT '道具状态,1:启用中，0:',
  `scene_type` INT(11) DEFAULT NULL COMMENT '场景类型，0:直播场景,1:回放场景',
  `price` FLOAT DEFAULT NULL COMMENT '价格',
  `integration` FLOAT DEFAULT NULL COMMENT '道具积分',
  `charge_status` INT(11) DEFAULT NULL COMMENT '收费状态（0:免费,1:收费,2:折扣）',
  `rank` INT(11) DEFAULT NULL COMMENT '排序,比如有新道具，需要优先进行推荐',
  `app_id` INT(11) DEFAULT NULL COMMENT '应用的标识',
  `create_time` DATETIME DEFAULT NULL COMMENT '创建时间',
  `create_user` INT(11) DEFAULT NULL COMMENT '创建人ID',
  `data` VARCHAR(1000) DEFAULT NULL COMMENT '预留字段，用来存放logo，效果图等信息，JSON串形式',
  PRIMARY KEY (`id`),
  KEY `status_idx` (`status`),
  KEY `name_idx` (`name`),
  KEY `scene_type_idx` (`scene_type`),
  KEY `app_id_idx` (`app_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8;

/*1.相同的SQL分别查询两张表，使用EXPLAIN解析一下SQL*/
EXPLAIN SELECT * FROM gift WHERE `name`='道具' AND scene_type=1;
EXPLAIN SELECT * FROM gift2 WHERE `name`='道具' AND scene_type=1;
/*两条语句都会用到索引*/
/*2.只查询其中的某列，但是这个列已经创建索引*/
EXPLAIN SELECT `name`,`status` FROM gift WHERE `name`='道具' AND scene_type=1;
EXPLAIN SELECT `name`,`status` FROM gift2 WHERE `name`='道具' AND scene_type=1;
/*两条语句都会用到索引*/
/*3.查询没有创建索引的列，这里rank字段并没有创建索引*/
EXPLAIN SELECT `name`,`status`,rank FROM gift WHERE `name`='道具' AND scene_type=1;
EXPLAIN SELECT `name`,`status`,rank FROM gift2 WHERE `name`='道具' AND scene_type=1;
/*两条语句都会用到索引*/
/*4.把SQL调整一下，name字段都建立了索引，下面把where条件里的name条件去掉*/
EXPLAIN SELECT `name`,`status` FROM gift WHERE scene_type=1;
EXPLAIN SELECT `name`,`status` FROM gift2 WHERE scene_type=1;
/*两条语句都会用到索引*/
/*5.加上未建立索引的列 rank*/
EXPLAIN SELECT `name`,`status`,rank FROM gift WHERE scene_type=1;
EXPLAIN SELECT `name`,`status`,rank FROM gift2 WHERE scene_type=1;
/*第一条SQL根本没有用到索引，第二条SQL还和以前一样，同样使用到了索引。*/
/*结论：在联合索引上会有一个mysql索引最左匹配原则，但是如果联合索引的第一个列不在where条件语句中，
并且所查询的列其中有的是没有建立索引的，那么这个联合索引就是无效的，
建议如果使用联合索引，那么where条件也要尽量根据联合索引的顺序来，
如果不按照顺序来，索引也同样会用到，但是在执行前，SQL优化器也会将条件调整为联合索引的顺序，
既然可以直接避免这种情况，就没必要再让SQL优化器去处理，毕竟处理也是有开销的。*/

```
##mysql 什么时候用单列索引？什么使用用联合索引？
```
链接：https://www.zhihu.com/question/40736083/answer/88191544
哪些字段可以建索引，一般都where、order by 或者 group by 后面的字段。
3，记录修改的时候需要维护索引，所以会有开销，要衡量建了索引之后的得与失。
  学生表，可以认为name的重复度比较小，而age的重复度比较大，对于单列索引来说，比较适合建在重读度低的列上。
  对于select * from students where name='张三’and  age=18; 题主所说的两种情况
A. name 和 age 各自单独建立索引。 
  一般来说mysql会选择其中一个索引，name的可能性比较大，因为mysq会统计每个索引上的重复度，选用低重复度的字段。另外一个age的索引就不会用到，但还有维护索引的开销，所以age的索引不需要创建。
B. name和age的联合索引
  这种索引的切合度最好，mysql会直接选用这个索引。但相对单独的name索引来说，维护的成本要大一些，并且索引数据占用的存储空间也要更大一些。
  回过来看，有必要使用联合索引吗？ 我的看法是没有必要，因为学校里可能会有重名的人，但比较少。用name就可以比较精准的找到记录，即使有重复的也比较少。
  什么情况下使用联合索引比较好呢？ 举一个例子，大学选认课老师，需要创建一个关系对应表，有2个字段,student_id 和 teacher_id，想要查询某个老师和某个学生是否存在师生关系。
  一个学生会选几十个老师，一个老师会带几百个学生
  如果只为student_id建立索引的情况下，经过索引会选出几十条记录，然后在内存中where一下，去除其余的老师。
  相反如果只为teacher_id建立索引，经过索引会选出几百条记录，然后在内存中where一下，去除其余的学生。
  两种情况都不是最优的，这个时候使用联合索引最合适，通过索引直接找到对应记录。
```

