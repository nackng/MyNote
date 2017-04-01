##字段默认值 
```
1.清除默认值
  ALTER TABLE `t_core_salecentercategory` ALTER COLUMN channelType DROP DEFAULT;
2.设置默认值
  ALTER TABLE `t_core_salecentercategory` ALTER COLUMN channelType SET DEFAULT 1;
```
##enum字段类型
```
CREATE TABLE `people` (
  `last_name` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `gender` enum('m','f') NOT NULL,
  KEY `last_name` (`last_name`,`first_name`,`dob`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8

```