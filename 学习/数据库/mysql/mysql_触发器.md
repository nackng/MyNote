##触发器
```
触发器只能创建在永久表上，不能对临时表创建触发器。
``` ##创建触发器
```
create table t1(t1_id varchar(11));
create table t2(t2_id varchar(11));
实例一：
增加t1表记录前，自动将记录增加到t2表中

DELIMITER $$


CREATE
    /*[DEFINER = { user | CURRENT_USER }]*/
    TRIGGER `demo`.`mytrigger1` BEFORE INSERT
    ON `demo`.`t1`
    FOR EACH ROW BEGIN
INSERT INTO t2(t2_id) VALUES(new.t1_id);
    END$$


DELIMITER ;


实例二：
删除 t1表中的记录后，自动删除t2表中的记录
DELIMITER $$


CREATE
    /*[DEFINER = { user | CURRENT_USER }]*/
    TRIGGER `demo`.`mytrigger2` AFTER DELETE
    ON `demo`.`t1`
    FOR EACH ROW BEGIN
DELETE FROM t2 WHERE t2_id = old.t1_id;
    END$$


DELIMITER ;
```

