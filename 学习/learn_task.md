[TOC]
##0306
```
完成了[model-store](mybatis自动建表)项目的分析。

```
##0307
```
mybatis分页插件的分析
SpiderJackson
mybatis的乐观锁
```
##0329
假如时光倒流，我会这么学习http://mp.weixin.qq.com/s?__biz=MzAxOTc0NzExNg==&mid=415513252&idx=1&sn=1c1211e23c507c34f9befbf5282a85c8&scene=21#wechat_redirect
http://blog.csdn.net/nylx/article/details/50903129
##0412 要读的书
http://www.dengzhiwei.me/2016/11/20/my-fav-computer-books/#more
##刷题
http://www.acmerblog.com/leetcode-solutions-6422.html

###me
 熟悉spring的IOC容器和AOP框架
 熟悉mybatis和springmvc
 熟悉jQuery/ajax/bootstrap等
 熟悉mysql，了解SQL优化
 熟悉linux基本操作
 了解缓存技术（redis/memcached等）
 了解zookeeper/dubbo等分布式技术
 了解SVN、GIT版本控制工具；
工作经历
2015/12 - 至今:       创纪云网络
2015/06 - 2015/12:    文思海辉
2014/03 - 2015/05:    帝思普网络
2013/04 - 2014/02:    锐杰网格信息
项目经历
2016/09 - 至今
全渠道促销系统
开发技术：   jplugin + mybatis + maven + jquery
开发工具：   eclipse + jdk8.0 + Tomcat8.0 + mysql
项目简介：   本系统是基于B/S架构，系统的实现可让用户在不同渠道（线上、线下、线上+线下）参加不同         类型的促销活动；
该系统包括价格促销、订单促销、跨店铺促销、全球购免税促销、单品促销等模块组成。
责任描述：   在这个项目中我负责价格促销、订单促销、跨店铺促销，部分参与单品促销模块的开发。
项目描述： 
一、价格促销及订单促销：
1、创建，价格促销设置分为两块：销售范围设置（实体、门店、渠道） 和 价格规则设置。
2、修改，线下不支持修改促销规则，线上仅支持修改特供价。
3、审核与作废，根据规则id修改规则状态。
4、查询，结果列：规则id、参与实体、销售渠道、商品名称等。
5、多价导入，规则信息 + 补偿信息（storeCode + skuId），批量审核生效。


2016/06 - 2016/09
集中补货平台系统
开发技术：   spring + springmvc + mybatis + jquery
开发工具：   eclipse + jdk8.0 + tomcat8.0 + mysql 
项目简介：   本系统是基于B/S架构，该项目是为了实现苏果快速进行补货。
该系统主要有参数设置，补货生成、查询，商品、供应商差异报表，用户管理等几大模块组成。
责任描述：   在这个项目中我负责部门供应商参数设置，部门品类参数设置功能模块的开发。
项目描述： 
一、数据项目主要有：部门编码、供应商编码、物流模式、最小起订箱数、最小起订金额、最大订货        箱数、最大订货金额、供应商出单日、供应商不可出单日、供应商送货周期...
二、部门供应商参数设置
1） 参数维护：用户进入“部门供应商参数”模块，界面显示部门供应商参数表格。用户录入数据点击保存，系统批量保存数据。
2） 参数取消：系统从“部门供应商参数”中删除相应记录，并保存“部门供应商参数日志”
3） 参数查询：用户可录入部门编码（多个部门编码用逗号分隔），供应商编码，选择物流模式查询，用户点击导出按钮，系统将查询出的数据导出文件格式为CSV。


2015/12 - 2016/05
零售全渠道020项目
开发技术：   ssm + zk + dubbo + maven + jquery + freemarker
开发工具：   eclipse + jdk7.0 + tomcat7.0 + mysql 
项目简介：   O2O项目一期，主要实现零售商户在020平台上，申请微信公众号服务、注册会员，领取   优           惠券，在微商城进行购物，到线下实体店自提。
该系统主要有商品中心、库存中心、促销中心、交易中心、会员中心等几大模块组成。
责任描述：   在这个项目中我主要负责营销中心模块的开发。
项目描述：
一、限时促销
商家登录平台后，可对自己售卖中的商品设置各种营销活动，只支持限时促销。
商家对其售卖中的商品做限时促销管理，包括查询限时促销活动，新建、修改、终止限时促销。
限时促销活动是针对单品做一口价、打折的一种促销：
1）  一个单品不允许同时参加2个有效的限时促销；
2）  支持对同一个买家限购数量控制，不可购买超过限购的数量。
教育经历
2009/09 - 2013/07  鲁东大学 ｜ 信息管理与信息系统 本科
自我评价
工作中的感悟：我相信作为一名优秀的工程师只懂得专业知识是远远不够的，只有广泛地学习，不断拓宽自己的视野，提升自己的综合素质，技术水平才能得到质的提升。
##springboot
##redis
##0503
https://www.oschina.net/p/cboard
easyreport
(java线程学习)https://pan.baidu.com/share/home?uk=1728517328#category/type=0

(springboot-learning)http://git.oschina.net/jeff1993/springboot-learning-example
(t-io)https://git.oschina.net/tywo45/t-io
##jeesite
https://github.com/thinkgem/jeesite
##springboot-learning
https://github.com/JeffLi1993/springboot-learning-example/blob/master/springboot-dubbo-server/DubboProperties.md

https://github.com/JeffLi1993/springboot-learning-example/blob/master/springboot-dubbo-server/DubboProperties.md
