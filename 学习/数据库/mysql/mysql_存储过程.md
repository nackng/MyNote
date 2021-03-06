[TOC]
##变量的使用
```
在向actor表中插入记录时，如果没有进行条件的处理，在主键重的时候会抛出异常并退出，如果对条件进行了处理，就不会再抛出异常
/*DDL 信息*/------------


CREATE TABLE `actor` (
  `act_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`act_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8


INSERT INTO actor VALUES(2,'adanac','loo');
SELECT MAX(act_id) FROM actor;
max(act_id)  
-------------
            2

create procedure act_insert ()
begin
set @x = 1;
insert into actor(act_id,first_name,last_name)values(201,'test','tt');
set @x = 2;
insert into actor(act_id,first_name,last_name)values(1,'test','tt');
set @x = 3;
end;


call act_insert();
```
##光标的使用
```
循环100次向actor表插入记录 
create procedure actor_insert()
begin
 set @x = 0;
ins: loop
 set @x = @x + 1;
 if @x = 100 then
   leave ins;
 end if;
   insert into actor(first_name,last_name) values ('Test','301');
 end loop ins;
 end;
call actor_insert();
```


##创建表 
```
/*DDL 信息*/------------


CREATE TABLE `seq_table` (
  `SEQ_ID` varchar(50) NOT NULL,
  `CUR_VAL` bigint(20) DEFAULT '0',
  `INC_VAL` int(11) DEFAULT '1',
  PRIMARY KEY (`SEQ_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用于流水生成的表'

```
##创建存储过程
```
DELIMITER $$

USE `grpbuy`$$

DROP PROCEDURE IF EXISTS `GenSequence`$$

CREATE DEFINER=`root`@`%` PROCEDURE `GenSequence`(IN SEQ_NAME VARCHAR(50),OUT `SEQ_VAL` BIGINT)
BEGIN
DECLARE t_error INTEGER DEFAULT 0;
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=1;

SET SEQ_VAL = 0;

START TRANSACTION;
UPDATE SEQ_TABLE SET CUR_VAL=CUR_VAL+1 WHERE SEQ_ID = SEQ_NAME;
SELECT CUR_VAL INTO SEQ_VAL FROM SEQ_TABLE WHERE SEQ_ID = SEQ_NAME;

IF t_error =1`seq_table` THEN
    ROLLBACK;
  ELSE
    COMMIT;
  END IF;

END$$

DELIMITER ;
```

##查看存储过程
```
查看存储过程或函数的状态
show procedure status like 'film_in_stock';

查看存储过程或函数的定义
show create procedure film_in_stock;
或
select * from routines where ROUTINE_NAME = 'film_in_stock';
```

##删除存储过程 film_in_stock
```
DROP PROCEDURE film_in_stock;

```
##存储过程实例一
```
DELIMITER $$

USE `demo`$$

DROP PROCEDURE IF EXISTS `LocalCodeSequence`$$

CREATE DEFINER=`root`@`192.168.1.173` PROCEDURE `LocalCodeSequence`(IN SEQ_NAME VARCHAR(50), OUT SEQ_VAL BIGINT)
BEGIN
DECLARE lock_cursor CURSOR FOR SELECT CUR_VAL FROM SEQ_TABLE WHERE SEQ_ID = SEQ_NAME FOR UPDATE;
    SET SEQ_VAL = 0;
    OPEN lock_cursor;
    FETCH lock_cursor INTO SEQ_VAL;
    IF SEQ_VAL IS NOT NULL THEN
        UPDATE SEQ_TABLE SET CUR_VAL=CUR_VAL+INC_VAL WHERE SEQ_ID = SEQ_NAME;
    END IF;
    CLOSE lock_cursor;
    COMMIT;
    END$$
DELIMITER ;
```
##用 JDBC 如何调用存储过程
```
package com.allen.common.db.mysql;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Types;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class JdbcPrepareCall {
  public static void main(String[] args) {
    Connection cn = null;
    CallableStatement cstmt = null;
    try {
      // 这里最好不要这么干，因为驱动名写死在程序中了
      Class.forName("com.mysql.jdbc.Driver");
      Context ctx = new InitialContext();
      // 实际项目中，这里应用DataSource数据，如果用框架，
      // 这个数据源不需要我们编码创建，我们只需
      DataSource ds = (DataSource) ctx.lookup("java:comp/env");
      // cn = ds.getConnection();
      cn = DriverManager.getConnection("jdbc:mysql:///test", "root", "root");
      cstmt = cn.prepareCall("{call insert_Student(?,?,?)}");
      cstmt.registerOutParameter(3, Types.INTEGER);
      cstmt.setString(1, "wangwu");
      cstmt.setInt(2, 25);
      cstmt.execute();
      // get第几个，不同的数据库不一样，建议不写
      System.out.println(cstmt.getString(3));
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      try {
        if (cstmt != null)
          cstmt.close();
        if (cn != null)
          cn.close();
      } catch (SQLException e) {
        e.printStackTrace();
      }
    }
  }
}

```
