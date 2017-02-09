##Redis学习笔记
```

内置工具
redis-server：服务器
redis-cli：命令行客户端
redis-benchmark：性能测试工具
redis-check-aof：AOF 文件修复工具
redis-check-dump：RDB 文件检查工具
使用基础
redis-server：直接启动服务器，默认端口为 6379
redis-server --port 6380：指定端口号启动服务器
redis-server /path/to/redis.conf：指定配置文件启动服务器。可同时传递命令行参数，命令行参数的优先级高于配置文件参数
redis-cli shutdown：停止服务器（发送的命令不区分大小写）
kill Redis进程PID：同样可以正常停止服务器
redis-cli -h 127.0.0.1 -p 6380：连接指定服务器、指定端口的 Redis 服务器
redis-cli ping：测试连接，连接正常会返回 PONG
redis-cli 既可以接参数作为命令执行，也可以不带任何参数进入一个交互的 Shell，支持 Tab 键命令补全和上下键查看历史记录

理论基础
Redis 是一个字典结构的存储服务器，一个字典就相当于一个独立的数据库，客户端可以指定将数据存储在哪个字典

默认支持 16 个数据库，编号分别是 0 到 15，可以通过配置参数 databases 修改数据库个数的上限

客户端与 Redis 建立连接后会自动选择 0 号数据库，但后续可以通过 select 命令自行切换

Redis 的数据库间实际上并未完全隔离，也不支持自定义数据库的名字，在一个实例中，数据库更像是命名空间，用于在不同的数据库中存储同一个应用不同类型的数据

数据类型
string：字符串
list：列表（有序、不唯一）
hash：哈希（无序、唯一）
set：集合（无序、唯一）
zset：有序集合（有序、唯一）
常用命令
系统相关命令
ping：测试连接是否正常
echo Ruchee：输出信息
shutdown：关闭服务器
config set loglevel warning：在不重启服务器的情况下动态修改配置
config get loglevel：查看某个指定的服务器配置值
info：查看服务器状态信息
数据库级命令
select 2：切换数据库
dbsize：查询键的个数
基本数据操作命令
set name Ruchee：设置键
get name：取键对应的数据
mset name Ruchee email my@ruchee.com：同时设置多个键
mget name email：同时获取多个键值
del name email：删除数据，可一次指定多个键，用空格分隔，返回值为删除键的个数
type name：查询某个键的数据类型
keys *：返回匹配的键名，支持通配符
exists name：判断某个键是否存在
setnx name Ruchee：当指定键不存在时才设置键值，如果键存在则不修改
incr num：递增 1
incrby num 3：递增指定的整数
incrbyfloat num 2.13：递增指定的浮点数（没有递减浮点数这么个指令，decrbyfloat 是不存在的）
decr num：递减 1
decrby num 3：递减指定的整数
strlen name：获取指定键名，其键值字符串的长度
append name ' Good'：向指定键名的值后面附加内容，相当于字符串拼接
del 命令不支持通配符，但可以利用 Linux 管道来实现一次删除多个键的目的，如：redis-cli keys test* | xargs redis-cli del

incrby key -2 相当于 decrby key 2，同理，decrby key -2 相当于 incrby key 2

位级数据操作命令
setbit name 2 0：设置指定键对应键值二进制位的指定位数，只能设成 0 或 1
getbit name 2：取指定键对应键值二进制位的指定位数
bitcount name 2 10：统计二进制位中 1 的个数，可以加后续两参数限定统计的下标范围
bitop 逻辑运算符 存储结果的键 参与运算的键1 参与运算的键2：如 bitop or res name email，对 name 和 email 执行位级或运算，结果存储在键 res
哈希操作命令
hset ruchee name Ruchee：设置指定哈希下指定键的值，这里是设置 ruchee 这个哈希下，键 name 的值为 Ruchee
hget ruchee name：取指定哈希下指定键的值
hmset ruchee name Ruchee email my@ruchee.com：同时设置指定哈希下的多个键值
hmget ruchee name email：同时获取指定哈希下的多个键值
hgetall ruchee：获取指定哈希下的全部键值对数据
hexists ruchee name：判断指定哈希下指定键是否存在
hsetnx ruchee name Ruchee：当指定哈希下指定键不存在时才设置键值，如果键存在则不修改
hincrby ruchee age 3：给指定哈希下指定键键值递增指定的整数（没有 hincr、hdecr、hdecrby、hdecrbyfloat 这些命令）
hincrbyfloat ruchee age 2.3：给指定哈希下指定键键值递增指定的浮点数
hkeys ruchee：获得指定哈希下所有的键名
hvals ruchee：获得指定哈希下所有的键值
hlen ruchee：统计指定哈希下键值对的个数
hdel ruchee name：删除指定哈希下的指定键
列表操作命令
lpush ruchee 1 2 3：向指定列表左侧新增元素，可同时新增多个元素，用空格分隔
rpush ruchee 1 2 3：向指定列表右侧新增元素，可同时新增多个元素，用空格分隔
lpop ruchee：从指定列表左侧弹出一个元素
rpop ruchee：从指定列表右侧弹出一个元素
llen ruchee：统计指定列表中元素的个数
lrange ruchee 0 10：取出指定列表某一段的数据，后续两参数指定起始下标和结束下标，下标支持使用负数代表反方向，lrange ruchee 0 -1 将返回指定列表的所有数据
lrem ruchee n 值：从左边开始，删除前 n 个值为指定值的数据
lrem ruchee -n 值：从右边开始，删除前 n 个值为指定值的数据
lrem ruchee 0 值：删除全部值为指定值的数据
lindex ruchee 1：取指定列表中指定索引存储的值，负数索引代表反向
lset ruchee 1 Test：设置指定列表中指定索引的值，负数索引代表反向
ltrim ruchee 0 10：只保留指定列表中指定范围内的元素，其他的全部删掉
linsert ruchee before 键 值：向指定列表中指定键前面插入一个元素
linsert ruchee after 键 值：向指定列表中指定键后面插入一个元素
rpoplpush lista listb：从 lista 的右侧弹出一个元素插入 listb 的左侧，lista 和 listb 可以是同一个列表，这样就可以实现将列表最后面的元素移到最前面
集合操作命令
sadd ruchee 1 2 3 4 5：向集合新增元素
srem ruchee 2 3：从集合删除元素
scard ruchee：统计指定集合中元素的个数
smembers ruchee：返回集合中所有的元素
sismember ruchee 2：判断指定集合中某元素是否存在
sdiff seta setb：计算集合 seta 和 setb 之间的差集，也就是 seta - setb 剩下的元素，可同时执行多个集合之间的差集计算，如 sdiff seta setb setc
sinter seta setb：计算集合 seta 和 setb 之间的交集，同样也可以同时接多个集合参数
sunion seta setb：计算集合 seta 和 setb 之间的并集，同样也可以同时接多个集合参数
sdiffstore res seta setb：执行集合间的差集运算，并将结果存储到指定的键
sinterstore res seta setb：执行集合间的交集运算，并将结果存储到指定的键
sunionstore res seta setb：执行集合间的并集运算，并将结果存储到指定的键
srandmember ruchee n：从指定集合中随机返回 n 个元素，当 n 为正数时，返回的元素唯一；当 n 为负数时，返回的元素不唯一，且一定会返回 n 个（有重复元素）
spop ruchee：从指定集合中随机弹出一个元素
列表（list）和集合（set）的区别：list 元素有序但不确保唯一，set 元素无序但能确保唯一

集合（set）在 Redis 内部就是用值为空的哈希（hash）实现的

有序集合操作命令
zadd ruchee 23 Ruchee 43.2 my@ruchee.com：向指定有序集合中插入新元素，并指定该元素的分数值（分数可以是浮点数，且 +inf 代表正无穷，-inf 代表负无穷）
zscore ruchee Ruchee：获取指定有序集合中某元素的分数值
zrange ruchee 0 10：截取指定有序集合某下标范围内的元素，按分数从小到大排序，最后面加 WITHSCORES 可同时获取各元素对应的分数
zrevrange ruchee 0 10：跟 zrange 一样，只是按分数从大到小排序
zrangebyscore ruchee 分数下限 分数上限：截取指定分数范围内的元素，后面加 WITHSCORES 可同时获取元素对应的分数，还可以加 limit 起始下标 个数 进一步截取。分数前面加半边小括号表示不包括该分数本身，如 (80 100（分数大于 80 且小于等于 100）；可以使用 -inf 和 +inf 分别代表负无穷和正无穷，如 (20 +inf（分数大于 20 的所有元素）
zincrby ruchee 分数 元素：给指定元素增加指定的分数，增加的分数可以是浮点数，加一个负值分数表示减分
zcard ruchee：统计指定有序集合中元素的个数
zcount ruchee 分数下限 分数上限：统计指定分数范围内元素的个数
zrem ruchee Ruchee my@ruchee.com：删除指定有序列表的元素
zremrangebyrank ruchee 起始下标 结束下标：删除指定下标范围内的元素
zremrangebyscore ruchee 分数下限 分数上限：删除指定分数范围内的元素
zrank ruchee Ruchee：获取指定元素在其集合中的排名，按分数从小到大排序
zrevrank ruchee Ruchee：与 zrank 一样，只是按分数从大到小排序
有序集合（zset）和列表（list）的区别

list 通过链表实现，读取两端的元素速度极快，读取中间的元素速度较慢
zset 使用散列表和跳跃表实现，读取速度与元素的位置无关
list 不能简单地调整元素位置，但 zset 可以调整
zset 的内存消耗比 list 高
date：2014-11-12、2014-11-14、2014-11-17、2014-11-18

```