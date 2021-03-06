## 若sql 执行 超过10分钟，则自动kill掉执行的sql，各位有什么好招？( 来自一位网友)
##通过sql 获取sql的线程id
```
 SELECT 
t1.trx_mysql_thread_id  as 'PROCESSLIST_id',                                                
UNIX_TIMESTAMP()-UNIX_TIMESTAMP(trx_started) as  exe_time
FROM
information_schema.innodb_trx t1 LEFT OUTER JOIN  performance_schema.threads  t2 on t1.trx_mysql_thread_id = t2.PROCESSLIST_ID
order by exe_time desc  
```
##mysql事务的四种隔离级别
```
===========================================================================================
       隔离级别               脏读（Dirty Read）          不可重复读（NonRepeatable Read）     幻读（Phantom Read） 
===========================================================================================

未提交读（Read uncommitted）        可能                            可能                       可能

已提交读（Read committed）          不可能                          可能                        可能

可重复读（Repeatable read）          不可能                          不可能                     可能

可串行化（Serializable ）                不可能                          不可能                     不可能

===========================================================================================

·未提交读(Read Uncommitted)：允许脏读，也就是可能读取到其他会话中未提交事务修改的数据

·提交读(Read Committed)：只能读取到已经提交的数据。Oracle等多数数据库默认都是该级别 (不重复读)

·可重复读(Repeated Read)：可重复读。在同一个事务内的查询都是事务开始时刻一致的，InnoDB默认级别。在SQL标准中，该隔离级别消除了不可重复读，但是还存在幻象读

·串行读(Serializable)：完全串行化的读，每次读都需要获得表级共享锁，读写相互都会阻塞
```