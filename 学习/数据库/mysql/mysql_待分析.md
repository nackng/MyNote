http://blog.csdn.net/wuxbeyond/article/details/50963190
##sql  抽取变量 
有没有大神   下面 蓝色部分 我想抽取出来赋值个一个变量  不用每次去技术 那个时间差 要怎么做啊 ？

##delete 语句 区别 
```
 DELETE
FROM
ecom_prod_basic a,
tmp_store b
WHERE
a.product_id = b.product_id;

DELETE
FROM
ecom_prod_basic a
JOIN tmp_store b USING (product_id);
【师长】上海-dba- 2016/12/26 14:04:03

这2句sql有没有区别？
【师长】厦门-H 2016/12/26 14:05:43

应该不能执行吧
【师长】厦门-H 2016/12/26 14:06:44

效果是一样的
【师长】上海-dba- 2016/12/26 14:07:20

嗯，不能执行的
【师长】厦门-H 2016/12/26 14:08:06

DELETE 后面需要加一个别名



 我想的是，有2种要处理的情况。一种是，查询2张表相同的记录，把a表里这些记录删掉；另一种是，查询2张表相同的记录，a、b这2张表里的这些记录都删掉。

```
##INSERT INTO score(id,NAME,age,grade) VALUES (1,'a',11,1),(2,'b',12,1),(3,'c',13,1),(4,'d',11,2),(5,'e',12,2),(6,'f',13,2)

/*查所有个年级最大年龄的对应的人的名字，用group by一句话实现*/

SELECT s.id,s.name, MAX(age),grade FROM score s GROUP BY grade
