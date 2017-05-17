[TOC]
##like 优化---反向索引，合并索引
```
背景
业务操作的场景有很多需要数据进行模糊查询，这个时候就会用到关键字"like",虽然这样对用查询东西比较方便，但是随着数据量的增加，这样的语句越来愈慢。

SELECT
   *
FROM
    table_A A
inner join table_B B f on A.ID = B.ID
WHERE
    A.NAME LIKE '%s%'
ORDER BY
    A.ID DESC
LIMIT 10;
优化思路

反向索引

like 的字段建立索引，但是由于前面加了%索引会失效。这个时候可以通过空间换时间的方式。把原来的like前面的%去掉，新增一个字段，存储NAME字段的方向数据，并且对新增的字段也加索引。例如原来的字段里面存的是“abcd”,那新增的字段就是存“dcba”的数据，这个时候语句变成如下：

SELECT
   *
FROM
    table_A A
inner join table_B B f on A.ID = B.ID
WHERE
    A.NAME LIKE 's%'
  or A.RES_NAME LIKE CONCAT(REVERSE('s'),'%')
ORDER BY
    A.ID DESC
LIMIT 10;
新增的字段需要对要查找的值进行反转，这样的话，该语句可以达到前面的语句的功能，而且两个字段的索引都有效

合并索引

虽然上面的like的字段都可以用上索引了，但是因为用了or并且进行排序，性能没有得到多大的提升,通过分析是因为需要进行排序导致查询比较慢，但是排序是业务需要，没有办法去掉。通过修改为下面的语句：

SELECT
   *
FROM
    table_A A
left join table_B B f on A.ID = B.ID
WHERE
    A.NAME LIKE 's%'
  or A.RES_NAME LIKE CONCAT(REVERSE('s'),'%')
ORDER BY
    A.ID DESC
LIMIT 10;
通过把inner join 改为left join后，对语句进行解释，发现extra字段出现“Using sort_union”，修改前该字段现实“Using where”。对于修改后的最终版本进行测试，原来的语句执行需要1.00s,优化后0.00s。
```