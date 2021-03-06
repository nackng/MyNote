我们开发中很多统计表，如活动参加次数，订单序列号生成表，其中一般会先判断有没有此主键的数据，如有在原有值上加1，否则新建一条数据，这样对性能影响较大，现在有一好办法处理：
insert   .......   ON DUPLICATE KEY UPDATE

##正则表达式
```
使用$和[.,]
select name, email from t where email REGEXP "@163[.,]com$";
等同于：
select name email from t where email like "@163%,com";
```

##RAND()提取随机行
```
select * from tab1 order by rand();
```

##group by 的 with rollup 子句
```
select year,country,product,sum(profit) from sales group by year,country,product with rollup;
with rollup 是一种OLAP思想，rollup 与 order by 是互相排斥的，limit用在rollup后面。
```

##通过 show status 了解各种SQL的执行频率
```
显示当前session中所有统计参数的值：
show status like 'Com_%';
```

##如何使用索引

##mysql join 原理
```
Join原理：

在MySQL中，只有一种JOIN算法， Nested Loop Join 。它实际上就是通过驱动表（from后的第一个表）的结果集作为循环的基础数据，然后将结果集中的数据作为过滤条件一条条地到下一个表中查询数据，最后合并结果，如果还有第三个表，则将前两个表的Join结果集作为循环基础数据，再一次通过循环查询条件到第三个表中查询数据，如此反复。
示例语句：
select   t1.UserName,t2.Title,t3.Content
from   user t1, user_message t2, messge_content t3
where  t1.PKID=1001
and  t1.PKID=t2.UserID
and  t2.PKID=t3.MessageID (已在user_message的  UserID 及message_content的 MessageID 字段上建立索引)

上面查询可用如下表达式来表示：

foreach  record   u_rec   in table  user  that  u_rec.PKID=1001
{
     foreach record  g_rec  in table  user_message  that  m_rec.UserID=u_rec.PKID
    {
           foreach record  c_rec  in table  message_content  that c_rec.MessageID=m_rec.PKID
           {
                 pass the ( u_rec.UserName,  m_rec.Title, c_rec.Content )   row
                 combination to output.
           }
    }
} 

注意，建立正确定的索引，否则会导致全表扫描。

Join语句的优化：

1、尽可能减少JOIN中Nested Loop的循环次数
  最有效的方法就是使结果集尽可能的小，这也是所谓的“ 永远用小结果集驱动大结果集” （前提是通过join条件后对各个表进行访问的资   ，源消耗差别不是太大，一般因为索引的区别）；
2、优先优化Nested　Loop的内层循环；
3、保证Join语句中被驱动表的Join条件字段已经被索引；
4、当无法保证被 驱动表的Join条件字段被索引且内存充足的情况下，可以通过参数Join_buffer_size设置Join Buffer的大小 。
```
