##Redis的一些优点。
```
1.异常快 - Redis非常快，每秒可执行大约110000次的设置(SET)操作，每秒大约可执行81000次的读取/获取(GET)操作。
2.支持丰富的数据类型 - Redis支持开发人员常用的大多数数据类型，例如列表，集合，排序集和散列等等。这使得Redis很容易被用来解决各种问题，因为我们知道哪些问题可以更好使用地哪些数据类型来处理解决。
3.操作具有原子性 - 所有Redis操作都是原子操作，这确保如果两个客户端并发访问，Redis服务器能接收更新的值。
4.多实用工具 - Redis是一个多实用工具，可用于多种用例，如：缓存，消息队列(Redis本地支持发布/订阅)，应用程序中的任何短期数据，例如，web应用程序中的会话，网页命中计数等。
```
## redis windows安装
```
1.Redis官方是不支持windows的，只是 Microsoft Open Tech group 在 GitHub上开发了一个Win64的版本,项目地址是：
https://github.com/MSOpenTech/redis


可以在项目主页右边找到 zip包下载地址: https://github.com/MSOpenTech/redis/archive/2.8.zip
(注意: dist文件改变了下载地址: https://github.com/MSOpenTech/redis/releases )


2.启动Redis
进入redis目录后 开启服务  （注意加上redis.conf）
redis-server.exe redis.conf
这个窗口要保持开启  关闭时redis服务会自动关闭


redis会自动保存数据到硬盘 所以图中是我第二次开启时 多了一个 DB loaded from disk 


3.测试使用
另外开启一个命令行窗口 进入redis目录下 （注意修改自己的ip）
redis-cli.exe -h 192.168.10.61 -p 6379


4.Java开发包Jedis
Jedis ：http://www.oschina.net/p/jedis （Redis的官方首选Java开发包）
        <!--Redis -->
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
            <version>2.0.0</version>
            <type>jar</type>
            <scope>compile</scope>
        </dependency>
``` 
##【Redis基本数据结构】字典实现
```
https://segmentfault.com/a/1190000004850844

```
## redis的导入导出需要特别注意的地方
```
导出的redis与目标redis是不是要一致（安装路径一致、名称一致、配置文件一致、日志路径等一致）

```
##删除redis所有KEY  
```
批量删除Key
Redis 中有删除单个 Key 的指令 DEL，但好像没有批量删除 Key 的指令，不过我们可以借助 Linux 的 xargs 指令来完成这个动作


redis-cli keys "*" | xargs redis-cli del
//如果redis-cli没有设置成系统变量，需要指定redis-cli的完整路径
//如：/opt/redis/redis-cli keys "*" | xargs /opt/redis/redis-cli del
如果要指定 Redis 数据库访问密码，使用下面的命令


redis-cli -a password keys "*" | xargs redis-cli -a password del
如果要访问 Redis 中特定的数据库，使用下面的命令


//下面的命令指定数据序号为0，即默认数据库
redis-cli -n 0 keys "*" | xargs redis-cli -n 0 del
删除所有Key
删除所有Key，可以使用Redis的flushdb和flushall命令


//删除当前数据库中的所有Key
flushdb
//删除所有数据库中的key
flushall
注：keys 指令可以进行模糊匹配，但如果 Key 含空格，就匹配不到了，暂时还没发现好的解决办法。 ```
##命令
```
1.  KEYS/RENAME/DEL/EXISTS/MOVE/RENAMENX:
    #在Shell命令行下启动Redis客户端工具。
    /> redis-cli
    #清空当前选择的数据库，以便于对后面示例的理解。
    redis 127.0.0.1:6379>  flushdb
    OK
    #添加String类型的模拟数据。
    redis 127.0.0.1:6379>  set mykey 2
    OK
    redis 127.0.0.1:6379>  set mykey2 "hello"
    OK
    #添加Set类型的模拟数据。
    redis 127.0.0.1:6379>  sadd mysetkey 1 2 3
    (integer) 3
    #添加Hash类型的模拟数据。
    redis 127.0.0.1:6379>  hset mmtest username "stephen"
    (integer) 1
    #根据参数中的模式，获取当前数据库中符合该模式的所有key，从输出可以看出，该命令在执行时并不区分与Key关联的Value类型。
    redis 127.0.0.1:6379>  keys my*
    1) "mysetkey"
    2) "mykey"
    3) "mykey2"
    #删除了两个Keys。
    redis 127.0.0.1:6379>  del mykey mykey2
    (integer) 2
    #查看一下刚刚删除的Key是否还存在，从返回结果看，mykey确实已经删除了。
    redis 127.0.0.1:6379>  exists mykey
    (integer) 0
    #查看一下没有删除的Key，以和上面的命令结果进行比较。
    redis 127.0.0.1:6379>  exists mysetkey
    (integer) 1
    #将当前数据库中的mysetkey键移入到ID为1的数据库中，从结果可以看出已经移动成功。
    redis 127.0.0.1:6379>  move mysetkey 1
    (integer) 1
    #打开ID为1的数据库。
    redis 127.0.0.1:6379>  select 1
    OK
    #查看一下刚刚移动过来的Key是否存在，从返回结果看已经存在了。
    redis 127.0.0.1:6379[1]>  exists mysetkey
    (integer) 1
    #在重新打开ID为0的缺省数据库。
    redis 127.0.0.1:6379[1]>  select 0
    OK
    #查看一下刚刚移走的Key是否已经不存在，从返回结果看已经移走。
    redis 127.0.0.1:6379>  exists mysetkey
    (integer) 0
    #准备新的测试数据。    
    redis 127.0.0.1:6379>  set mykey "hello"
    OK
    #将mykey改名为mykey1
    redis 127.0.0.1:6379>  rename mykey mykey1
    OK
    #由于mykey已经被重新命名，再次获取将返回nil。
    redis 127.0.0.1:6379>  get mykey
    (nil)
    #通过新的键名获取。
    redis 127.0.0.1:6379>  get mykey1
    "hello"
    #由于mykey已经不存在了，所以返回错误信息。
    redis 127.0.0.1:6379>  rename mykey mykey1
    (error) ERR no such key
    #为renamenx准备测试key
    redis 127.0.0.1:6379>  set oldkey "hello"
    OK
    redis 127.0.0.1:6379>  set newkey "world"
    OK
    #由于newkey已经存在，因此该命令未能成功执行。
    redis 127.0.0.1:6379>  renamenx oldkey newkey
    (integer) 0
    #查看newkey的值，发现它也没有被renamenx覆盖。
    redis 127.0.0.1:6379>  get newkey
    "world"
        
   2. PERSIST/EXPIRE/EXPIREAT/TTL:     
    #为后面的示例准备的测试数据。
    redis 127.0.0.1:6379>  set mykey "hello"
    OK
    #将该键的超时设置为100秒。
    redis 127.0.0.1:6379>  expire mykey 100
    (integer) 1
    #通过ttl命令查看一下还剩下多少秒。
    redis 127.0.0.1:6379>  ttl mykey
    (integer) 97
    #立刻执行persist命令，该存在超时的键变成持久化的键，即将该Key的超时去掉。
    redis 127.0.0.1:6379>  persist mykey
    (integer) 1
    #ttl的返回值告诉我们，该键已经没有超时了。
    redis 127.0.0.1:6379>  ttl mykey
    (integer) -1
    #为后面的expire命令准备数据。
    redis 127.0.0.1:6379>  del mykey
    (integer) 1
    redis 127.0.0.1:6379>  set mykey "hello"
    OK
     #设置该键的超时被100秒。
    redis 127.0.0.1:6379>  expire mykey 100
    (integer) 1
    #用ttl命令看一下当前还剩下多少秒，从结果中可以看出还剩下96秒。
    redis 127.0.0.1:6379>  ttl mykey
    (integer) 96
    #重新更新该键的超时时间为20秒，从返回值可以看出该命令执行成功。
    redis 127.0.0.1:6379>  expire mykey 20
    (integer) 1
    #再用ttl确认一下，从结果中可以看出果然被更新了。
    redis 127.0.0.1:6379>  ttl mykey
    (integer) 17
    #立刻更新该键的值，以使其超时无效。
    redis 127.0.0.1:6379>  set mykey "world"
    OK
    #从ttl的结果可以看出，在上一条修改该键的命令执行后，该键的超时也无效了。
    redis 127.0.0.1:6379>  ttl mykey
    (integer) -1

   3. TYPE/RANDOMKEY/SORT:
    #由于mm键在数据库中不存在，因此该命令返回none。
    redis 127.0.0.1:6379>  type mm
    none
    #mykey的值是字符串类型，因此返回string。
    redis 127.0.0.1:6379>  type mykey
    string
    #准备一个值是set类型的键。
    redis 127.0.0.1:6379>  sadd mysetkey 1 2
    (integer) 2
    #mysetkey的键是set，因此返回字符串set。
    redis 127.0.0.1:6379>  type mysetkey
    set
    #返回数据库中的任意键。
    redis 127.0.0.1:6379>  randomkey
    "oldkey"
    #清空当前打开的数据库。
    redis 127.0.0.1:6379>  flushdb
    OK
    #由于没有数据了，因此返回nil。
    redis 127.0.0.1:6379>  randomkey
    (nil)


来源：  http://www.cnblogs.com/stephen-liu74/archive/2012/03/26/2356951.html
```