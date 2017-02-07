##数据库优化方面的经验
```
1.用PreparedStatement 一般来说比Statement 性能高：
一个sql 发给服务器去执行，涉及步骤：语法检查、语义分析，编译，缓存
“inert into user values(1,1,1)”- 二进制

2.有外键约束会影响插入和删除性能，如果程序能够保证数据的完整性，
那在设计数据库时就去掉外键。
（比喻：就好比免检产品，就是为了提高效率，充分相信产品的制造商）
（对于hibernate 来说，就应该有一个变化：empleyee->Deptment对象，现在设计时就成了employee deptid）

3.根据扫描的原理，第一条子查询语句要比第二条关联查询的效率高：
1. select e.name,e.salary where e.managerid=(select id from
employee where name='zxx');
2. select e.name,e.salary,m.name,m.salary from employees
e,employees m Where e.managerid = m.id and m.name='zxx';

4.表中允许适当冗余，譬如，主题帖的回复数量和最后回复时间等将姓名
和密码单独从用户表中独立出来。这可以是非常好的一对一的案例哟！

5.sql 语句全部大写，特别是列名和表名都大写。
特别是sql 命令的缓存功能，更加需要统一大小写，sql 语句 发给oracle 服务器 语法检
查和编译成为内部指令 缓存和执行指令。根据缓存的特点， 不要拼凑
条件， 而是用? 和PreparedStatment还有索引对查询性能的改进也是
值得关注的。

```
