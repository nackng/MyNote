[TOC]
##设计索引原则
```
1. 搜索的索引列，不一定是所要选择的列。换句话说，最适合索引的列是出现在 WHERE 子句中的列，或连接子句中指定的列，而不是出现在 SELECT 关键字后的选择列表中的 列 。
2. 使用惟一索引。考虑某列中值的分布。对于惟一值的列，索引的效果最好，而具有多个
重复值的列，其索引效果最差。例如，存放年龄的列具有不同值，很容易区分各行。
而用来记录性别的列，只含有 “ M ” 和 “ F ” ，则对此列进行索引没有多大用处（不管搜索哪个值，都会得出大约一半的行）
3.使用短索引。如果对串列进行索引，应该指定一个前缀长度，只要有可能就应该这样做。
例如，如果有一个 CHAR(200) 列，如果在前 10 个或 20 个字符内，多数值是惟一的，
那么就不要对整个列进行索引。对前 10 个或 20 个字符进行索引能够节省大量索引空
间，也可能会使查询更快。较小的索引涉及的磁盘 I/O 较少，较短的值比较起来更快 。
更为重要的是，对于较短的键值，索引高速缓存中的块能容纳更多的键值，因此， MySQL
也可以在内存中容纳更多的值。这增加了找到行而不用读取索引中较多块的可能性。
（当然，应该利用一些常识。如仅用列值的第一个字符进行索引是不可能有多大好处的，
因为这个索引中不会有许多不 同的值。）
4. 利用最左前缀。在创建 一个 n 列的索引时，实际是创建了 MySQL 可利用的 n 个索引。多列索引可起几个索引的作用，因为可利用索引中最左边的列集来匹配行。这样的列 集
称为最左前缀。（这与索引一个列的前缀不同，索引一个列的前缀是利用该的前 n 个 字
符作为索引值。）
5. 不要过度索引。不要以为 索引 “ 越多越好 ” 什么东西都用索引是错的。每个额外的 索引都要占用额外的磁盘空间，并降低写操作的性能，这一点我们前面已经介绍 过。
在修改表的内容时，索引必须进行更新，有时可能需要重构，因此，索引越多，所花的 时间越长。如果有一个索引很少利用或从不使用，那么会不必要地减缓表的修改速度。
此外， MySQL 在生成一个执行计划时，要考虑各个索引，这也要费时间。创建多余的 索引给查询优化带来了更多的工作。索引太多，也可能会使 MySQL 选择不到所要使用的最好索引。只保持所需的索引有利于查询优化。如果想给已索引的表增加索引，应该考虑所要增加的索引是否是现有多列索引的最左索引。如果是，则就不要费力去增加这个索引了，因为已经有了。
6. 考虑在列上进行 的比较类型。索引可用于 “ < ” 、 “ < = ” 、 “ = ” 、 “ > = ” 、 “ >” 和 BETWEEN 运算。在模式具有一个直接量前缀时，索引也用于 LIKE 运算。如果只将某个列用于其他类型的运算时（如 STRCMP( ) ），对其进行索引没有价值。
```

##不要在选择性非常差的字段上建索引
```
——字段选择性的基础知识——
引子：什么字段都可以建索引吗？
如下表所示，sort 字段的选择性非常差，你可以执行 show index from ads 命令,
可以看到 sort 的 Cardinality（散列程度）只有 9，这种字段上本不应该建索引.
 
优化策略A：字段选择性

选择性较低索引 可能带来的性能问题
索引选择性=索引列唯一值/表记录数；
选择性越高索引检索价值越高，消耗系统资源越少；选择性越低索引检索价值越低，消耗系统资源越多；

查询条件含有多个字段时，不要在选择性很低字段上创建索引
可通过创建组合索引来增强低字段选择性和避免选择性很低字段创建索引带来副作用；
尽量减少possible_keys，正确索引会提高sql查询速度，过多索引会增加优化器选择索引的代价，不要滥用索引；
```

##不要建了组合索引却完全用不上
```
查询条件里出现范围查询（如A>7，A in (2,3)）时，要警惕 ，不要建了组合索引却完全用不上,原因见优化策略B；

再回顾组合索引与范围查询的业务场景。

——组合索引字段顺序与范围查询之间的关系——

引子：范围查询 city_id in (0,8,10) 能用组合索引 (ads_id,city_id) 吗？

举例，ac 表有一个组合索引(ads_id,city_id)。
那么如下 ac.city_id IN (0, 8005) 查询条件能用到 ac表的组合索引(ads_id,city_id) 吗？

EXPLAIN
SELECT ac.ads_id
FROM ads,  ac
WHERE
      ads.id = ac.ads_id
      AND  ac.city_id IN (0, 8005) 
      AND ads.status = 'online'
      AND ac.start_time<UNIX_TIMESTAMP()
      AND ac.end_time>UNIX_TIMESTAMP()

优化策略B：

由于 mysql 索引是基于 B-Tree 的，所以组合索引有“字段顺序”概念。
所以，查询条件中有  ac.city_id IN (0, 8005) ，而组合索引是  (ads_id,city_id) ，则该查询无法使用到这个组合索引。
```

##组合索引
```
把mysql客户端（如SQLyog，如HeidiSQL）放在桌面上， 时不时拿出来 explain 一把，这是一种美德 ！
确保亲手查过SQL的执行计划，一定要注意看执行计划里的 possible_keys、key和rows这三个值，
让影响行数尽量少，保证使用到正确的索引，减少不必要的Using temporary/Using filesort；


DBA总结道：
组合索引查询的各种场景
兹有 Index (A,B,C) ——组合索引多字段是有序的，并且是个完整的BTree 索引。

下面条件可以用上该组合索引查询：
A>5
A=5 AND B>6
A=5 AND B=6 AND C=7
A=5 AND B IN (2,3) AND C>5

下面条件将不能用上组合索引查询：
B>5 ——查询条件不包含组合索引首列字段
B=6 AND C=7 ——查询条件不包含组合索引首列字段

下面条件将能用上部分组合索引查询：
A>5 AND B=2 ——当范围查询使用第一列，查询条件仅仅能使用第一列
A=5 AND B>6 AND C=2 ——范围查询使用第二列，查询条件仅仅能使用前二列

 
组合索引排序的各种场景
兹有组合索引 Index(A,B)。

下面条件可以用上组合索引排序：
ORDER BY A——首列排序
A=5 ORDER BY B——第一列过滤后第二列排序
ORDER BY A  DESC , B  DESC ——注意，此时两列以相同顺序排序
A>5 ORDER BY A——数据检索和排序都在第一列

下面条件不能用上组合索引排序：
ORDER BY B ——排序在索引的第二列
A>5 ORDER BY B ——范围查询在第一列，排序在第二列
A IN(1,2) ORDER BY B ——理由同上
ORDER BY A  ASC , B  DESC  ——注意，此时两列以不同顺序排序

顺着组合索引怎么建继续往下延伸，请各位注意“索引合并”概念：

MySQL 5,0以下版本，SQL查询时，一张表只能用一个索引，

从 MySQL 5.0开始，引入了  index merge  概念，
包括 多个索引并集访问，包括多个索引交集访问，可以在一个SQL查询里用到一张表里的多个索引。

MySQL 在5.6.7之前，使用 index merge 有一个重要的前提条件：没有 range 可以使用。

索引合并的简单说明：
MySQL 索引合并能使用多个索引
SELECT * FROM TB WHERE A=5  AND  B=6
能分别使用索引(A) 和 (B) 或 索引合并；
创建组合索引(A,B) 更好；

SELECT * FROM TB WHERE A=5  OR  B=6
能分别使用索引(A) 和 (B) 或 索引合并；
组合索引(A,B)不能用于此查询，分别创建索引(A) 和 (B)会更好；

最后的总结：
仍然是强调再强调：
记住，explain 后再提测是一种美德！
```

## 如何利用索引优化ORDER BY排序语句
```
MySQL索引通常是被用于提高WHERE条件的数据行匹配或者
执行联结操作时匹配其它表的数据行的搜索速度。
MySQL也能利用索引来快速地执行ORDER BY和GROUP BY语句的排序和分组操作。
通过索引优化来实现MySQL的ORDER BY语句优化：

1、ORDER BY的索引优化。如果一个SQL语句形如：
SELECT [column1],[column2],…. FROM [TABLE] ORDER BY [sort];
在[sort]这个栏位上建立索引就可以实现利用索引进行order by 优化。


2、WHERE + ORDER BY的索引优化，形如：
SELECT [column1],[column2],…. FROM [TABLE] WHERE [columnX] = [value] ORDER BY [sort];
建立一个联合索引(columnX,sort)来实现order by 优化。


注意：如果columnX对应多个值，如下面语句就无法利用索引来实现order by的优化
SELECT [column1],[column2],…. FROM [TABLE] WHERE [columnX] IN ([value1],[value2],…) ORDER BY[sort];


3、WHERE+ 多个字段ORDER BY
SELECT * FROM [table] WHERE uid=1 ORDER x,y LIMIT 0,10;
建立索引(uid,x,y)实现order by的优化,比建立(x,y,uid)索引效果要好得多。


MySQL Order By不能使用索引来优化排序的情况
* 对不同的索引键做 ORDER BY ：(key1,key2分别建立索引)
SELECT * FROM t1 ORDER BY key1, key2;


* 在非连续的索引键部分上做 ORDER BY：(key_part1,key_part2建立联合索引;key2建立索引)
SELECT * FROM t1 WHERE key2=constant ORDER BY key_part2;


* 同时使用了 ASC 和 DESC：(key_part1,key_part2建立联合索引)
SELECT * FROM t1 ORDER BY key_part1 DESC, key_part2 ASC;


* 用于搜索记录的索引键和做 ORDER BY 的不是同一个：(key1,key2分别建立索引)
SELECT * FROM t1 WHERE key2=constant ORDER BY key1;


* 如果在WHERE和ORDER BY的栏位上应用表达式(函数)时，则无法利用索引来实现order by的优化
SELECT * FROM t1 ORDER BY YEAR(logindate) LIMIT 0,10;


特别提示:
1>mysql一次查询只能使用一个索引。如果要对多个字段使用索引，建立复合索引。
2>在ORDER BY操作中，MySQL只有在排序条件不是一个查询条件表达式的情况下才使用索引。
```

