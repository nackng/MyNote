
搭建该平台的目的就是为了运维、研发很方便的进行日志的查询。Kibana一个免费的web壳；Logstash集成各种收集日志插件，还是一个比较优秀的正则切割日志工具；Elasticsearch一个开源的搜索引擎框架（支持群集架构方式）。

  1 安装需求 1.1 理论拓扑

 

1.2 安装环境 1.2.1 硬件环境

192.168.50.62（HP DL 385 G7 、RAM：12G、CPU：AMD 6128、DISK：SAS 146*4）

192.168.50.98（HP DL 385 G7 、RAM：12G、CPU：AMD 6128、DISK：SAS 146*6）

192.168.10.42 (Xen虚拟机、RAM：8G、CPU：×4、DISK：100G) 1.2.2 操作系统

CentOS 5.6 X64 1.2.3 Web-server基础环境

Nginx+php（安装过程略过） 1.2.4 软件列表

JDK 1.6.0_25

logstash-1.1.0-monolithic.jar

elasticsearch-0.18.7.zip

redis-2.4.12.tar.gz

kibana 1.3 获取方法 1.3.1 Jdk获取路径

http://www.oracle.com/technetwork/java/javase/downloads/jdk-6u25-download-346242.html 1.3.2 Logstash获取路径

http://semicomplete.com/files/logstash/logstash-1.1.0-monolithic.jar 1.3.3 Elasticsearch获取路径

https://github.com/downloads/elasticsearch/elasticsearch/ elasticsearch-0.18.7.zip 1.3.4 Kibana获取路径

http://github.com/rashidkpc/Kibana/tarball/master 2 安装步骤 2.1 JDK的下载及安装

基础安装

wget http://download.oracle.com/otn-pub/java/jdk/6u25-b06/jdk-6u25-linux-x64.bin

sh jdk-6u25-linux-x64.bin

mkdir -p /usr/java

mv ./jdk1.6.0_25 /usr/java

ln –s /usr/java/jdk1.6.0_25 /usr/java/default

编辑 /etc/profile文件，加入以下行内容

export JAVA_HOME=/usr/java/default

export PATH=$JAVA_HOME/bin:$PATH

export CLASSPATH=.:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:$CLASSPATH

刷新环境变量

source /etc/profile 2.2 Redis下载及安装

wget  http://redis.googlecode.com/files/redis-2.4.14.tar.gz

make –j24

make install

mkdir -p /data/redis

cd /data/redis/

mkdir {db,log,etc} 2.3 Elasticsearch下载及安装

cd /data/

mkdir –p elasticsearch && cd elasticsearch

wget --no-check-certificate https://github.com/downloads/elasticsearch/elasticsearch/ elasticsearch-0.18.7.zip

unzip elasticsearch-0.18.7.zip 2.4 Logstash下载及安装

mkdir –p /data/logstash/ && cd /data/logstash

wget  http://semicomplete.com/files/logstash/logstash-1.1.0-monolithic.jar 2.5 Kibana下载及安装

wget http://github.com/rashidkpc/Kibana/tarball/master --no-check-certificate

tar zxvf master 3 相关配置及启动 3.1 Redis配置及启动 3.1.1 配置文件

vim /data/redis/etc/redis.conf

#----------------------------------------------------

#this is the config file for redis

pidfile /var/run/redis.pid

port 6379

timeout 0

loglevel verbose

logfile /data/redis/log/redis.log

databases 16

save 900 1

save 300 10

save 60 10000

rdbcompression yes

dbfilename dump.rdb

dir /data/redis/db/

slave-serve-stale-data yes

appendonly no

appendfsync everysec

no-appendfsync-on-rewrite no

auto-aof-rewrite-percentage 100

auto-aof-rewrite-min-size 64mb

slowlog-log-slower-than 10000

slowlog-max-len 128

vm-enabled no

vm-swap-file /tmp/redis.swap

vm-max-memory 0

vm-page-size 32

vm-pages 134217728

vm-max-threads 4

hash-max-zipmap-entries 512

hash-max-zipmap-value 64

list-max-ziplist-entries 512

list-max-ziplist-value 64

set-max-intset-entries 512

zset-max-ziplist-entries 128

zset-max-ziplist-value 64

activerehashing yes 3.1.2 Redis启动

[logstash@Logstash_2 redis]# redis-server /data/redis/etc/redis.conf & 3.2 Elasticsearch 配置及启动 3.2.1 Elasticsearch启动

[logstash@Logstash_2 redis]# /data/elasticsearch/elasticsearch-0.18.7/bin/elasticsearch –p ../esearch.pid & 3.2.2 Elasticsearch 群集配置

curl 127.0.0.1:9200/_cluster/nodes/192.168.50.62 3.3 Logstash配置及启动 3.3.1 Logstash配置文件

input {

redis {

host => "192.168.50.98"

data_type =>"list"

key => "logstash:redis"

type => "redis-input"

}

}

filter {

grok {

type => "linux-syslog"

pattern => "%{SYSLOGLINE}"

}

grok {

type => "nginx-access"

pattern => "%{NGINXACCESSLOG}"

}

}

output {

elasticsearch {

host =>"192.168.50.62"

}

} 3.3.2 Logstash启动为Index

java -jar logstash.jar agent -f my.conf & 3.3.3 Logstash启动为agent

配置文件

input {

file{

type => "linux-syslog"

path => [ "/var/log/*.log", "/var/log/messages", "/var/log/syslog" ]

}

file {

type => "nginx-access"

path => "/usr/local/nginx/logs/access.log"

}

file {

type => "nginx-error"

path => "/usr/local/nginx/logs/error.log"

}

}

output {

redis {

host => "192.168.50.98"

data_type =>"list"

key => "logstash:redis"

}

}

Agent 启动

java -jar logstash-1.1.0-monolithic.jar agent -f shipper.conf & 3.3.4 kibana配置

首先在nginx添加站点配置

server {

listen 80;

server_name logstash.test.com;

index index.php;

root /usr/local/nginx/html;

#charset koi8-r;

#access_log logs/host.access.log main;

location ~ .*\.(php|php5)$

{

#fastcgi_pass unix:/tmp/php-cgi.sock;

fastcgi_pass 127.0.0.1:9000;

fastcgi_index index.php;

include fastcgi.conf;

}

} 4 性能调优 4.1 Elasticsearch调优 4.1.1 JVM调优

编辑Elasticsearch.in.sh文件

ES_CLASSPATH=$ES_CLASSPATH:$ES_HOME/lib/*:$ES_HOME/lib/sigar/*

if [ "x$ES_MIN_MEM" = "x" ]; then

ES_MIN_MEM=4g

fi

if [ "x$ES_MAX_MEM" = "x" ]; then

ES_MAX_MEM=4g

fi 4.1.2 Elasticsearch索引压缩

vim index_elastic.sh

#!/bin/bash

#comperssion the data for elasticsearch now

date=` date +%Y.%m.%d `

# compression the new index;

/usr/bin/curl -XPUT http://localhost:9200/logstash-$date/nginx-access/_mapping -d '{"nginx-access" : {"_source" : { "compress" : true }}}'

echo ""

/usr/bin/curl -XPUT http://localhost:9200/logstash-$date/nginx-error/_mapping -d '{"nginx-error" : {"_source" : { "compress" : true }}}'

echo ""

/usr/bin/curl -XPUT http://localhost:9200/logstash-$date/linux-syslog/_mapping -d '{"linux-syslog" : {"_source" : { "compress" : true }}}'

echo ""

保存该脚本并执行

sh index_elastic.sh 5 使用 5.1 Logstash查询页

使用火狐浏览器或者谷歌浏览器访问  http://logstash.test.com

 

 



 

引自：http://enable.blog.51cto.com/747951/1049411

来源：  http://www.cnblogs.com/ibook360/archive/2013/03/15/2961428.html