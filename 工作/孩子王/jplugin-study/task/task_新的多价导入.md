[TOC]
1.下面列“导入成功、失败数，及进度（已校验数/excel中的总记录数）”要 通过任务 去执行。
2.点击 促销类型 展示规则内容 要查询 新建的中间表。


function initStore(){
    var loginName = '29000145';
    var setting = {
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    };

    var zNodes =[
        { id:1, pId:0, name:"随意勾选 1", open:true},
        { id:11, pId:1, name:"随意勾选 1-1", open:true},
        { id:111, pId:11, name:"随意勾选 1-1-1"},
        { id:112, pId:11, name:"随意勾选 1-1-2"},
        { id:12, pId:1, name:"随意勾选 1-2", open:true},
        { id:121, pId:12, name:"随意勾选 1-2-1"},
        { id:122, pId:12, name:"随意勾选 1-2-2"},
        { id:2, pId:0, name:"随意勾选 2", checked:true, open:true},
        { id:21, pId:2, name:"随意勾选 2-1"},
        { id:22, pId:2, name:"随意勾选 2-2", open:true},
        { id:221, pId:22, name:"随意勾选 2-2-1", checked:true},
        { id:222, pId:22, name:"随意勾选 2-2-2"},
        { id:23, pId:2, name:"随意勾选 2-3"}
    ];
    
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
}

CREATE TABLE `t_sales_importrule` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键',
  `check_id` INT(11) DEFAULT NULL COMMENT '中间表ID',
  `entityInclude` TEXT COMMENT '参与实体',
  `ruleType` INT(2) DEFAULT NULL COMMENT '价格类型',
  `userType` INT(2) DEFAULT NULL COMMENT '促销对象',
  `startTime` DATETIME DEFAULT NULL COMMENT '活动开始时间',
  `endTime` DATETIME DEFAULT NULL COMMENT '活动结束时间',
  `beginInterval` VARCHAR(32) DEFAULT NULL COMMENT '活动开始时段',
  `endInterval` VARCHAR(32) DEFAULT NULL COMMENT '活动结束时段',
  `skuType` INT(2) DEFAULT NULL COMMENT '商品明细类型',
  `channelType` INT(2) DEFAULT NULL COMMENT '销售渠道',
  `totalLimit` INT(10) DEFAULT NULL COMMENT '商品购买总量',
  `perbuyLimit` INT(10) DEFAULT NULL COMMENT '每人购买商品数量',
  `perpartLimit` INT(10) DEFAULT NULL COMMENT '每人每天购买商品数量',
  `tempType` INT(2) DEFAULT NULL COMMENT '模板类型',
  `userCode` VARCHAR(32) DEFAULT NULL COMMENT '创建者工号',
  `userName` VARCHAR(32) DEFAULT NULL COMMENT '创建者',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8


基础校验：
导入文件表头内容是否正确——您上传的模板有误！
填写内容的格式内容是否正确——
折扣仅支持正整数！
供应商承担比例仅支持正整数！
补偿方式错误！（若选择折扣，却选择按销售补偿；反之亦然）
特供价未填写！（选择了按销售补偿，却没填写特供价）
供应商承担比例未填写！（类同上条）
XXXX未填写！（编码，定价金额/折扣，批量总价或单品定价，若填写了批量总价，则批量数量必须填写）（通用规则里的：商品购买总量，活动时间，实体）
未导入文件！

[[[erp编码, 品类编码, 品牌编码, 定价方式, 定价金额/折扣, 补偿方式, 特供价, 供应商承担比率], 
[539866, , , 折扣, 50, 按折扣补偿, , 67], 
[, 01, , 定价, 176.99, 按销售补偿, 166.99, ], 
[, , 3, 折扣, 90, 按折扣补偿, , 89], 
[1234, , , 折扣, 98, 不补偿, , ]]]

1490153247087.xlsx


sheetList
[[[erp编码, 品类编码, 品牌编码, 定价方式, 定价金额/折扣, 补偿方式, 特供价, 结果], 
[539866, , , 折扣, 50, 按折扣补偿, , ], 
[, 01, , 定价, 176.99, 按销售补偿, 166.99, ], 
[, , 3, 折扣, 90, 按折扣补偿, , ], 
[1234, , , 折扣, 98, 不补偿, , 供应商承担比率未填写;]]]

[[erp编码, 品类编码, 品牌编码, 定价方式, 定价金额/折扣, 补偿方式, 特供价, 供应商承担比率], 
[539866, , , 折扣, 50, 按折扣补偿, , 67], 
[, 01, , 定价, 176.99, 按销售补偿, 166.99, ], 
[, , 3, 折扣, 90, 按折扣补偿, , 89], 
[1234, , , 折扣, 98, 不补偿, , ]]

[[[erp编码, 品类编码, 品牌编码, 定价方式, 定价金额/折扣, 补偿方式, 特供价, 供应商承担比率], 
[539866, , , 折扣, 50, 按折扣补偿, , 67], 
[, 01, , 定价, 176.99, 按销售补偿, 166.99, ], 
[, , 3, 折扣, 90, 按折扣补偿, , 89], 
[1234, , , 折扣, 98, 不补偿, , ]]]

[[erp编码, 品类编码, 品牌编码, 定价方式, 定价金额/折扣, 补偿方式, 特供价, 结果], 
[539866, , , 折扣, 50, 按折扣补偿, , ], 
[, 01, , 定价, 176.99, 按销售补偿, 166.99, ], 
[, , 3, 折扣, 90, 按折扣补偿, , ], 
[1234, , , 折扣, 98, 不补偿, , ]]

{perpartLimit=0, beginInterval=, channelType=2, skuType=1, totalLimit=0, ruleType=11, startTime=2017-03-26 00:00:00, perbuyLimit=0, userType=1, endTime=2017-03-26 23:59:59, entityInclude=5986, endInterval=, tempType=2}

{perpartLimit=0, beginInterval=16:55, channelType=2, skuType=1, totalLimit=0, ruleType=11, startTime=2017-03-26 00:00:00, perbuyLimit=0, id=1, userType=1, endTime=2017-03-26 23:59:59, entityInclude=5986, endInterval=22:50, tempType=1}

update t_sales_importcheck     SET tempType = ?,                     entityInclude=8017,8018,8021,8048,8074,8099,8185,5876,11,1233123,1299479,9511,8011,5986,             ruleType=?,             userType=?,             startTime=?,             endTime=?,             beginInterval=?,             endInterval=?,             skuType=?,             channelType=?,             totalLimit=?,             perbuyLimit=?,             perpartLimit=?     WHERE  id = 1
### Cause: com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '8018,8021,8048,8074,8099,8185,5876,11,1233123,1299479,9511,8011,5986,
      
      
    ' at line 7

    Parameters: 1(String), 8017,8018,8021,8048,8074,8099,8185,5876,11,1233123,1299479,9511,8011,5986(String), 11(String), 1(String), 2017-03-26 00:00:00(String), 2017-03-26 23:59:59(String), 16:55(String), 22:50(String), 1(String), 2(String), 0(String), 0(String), 0(String)
[2017/03/22 16:17:22][DEBUG][BaseJdbcLogger] <==    Updates: 1


==>  Preparing: select sl.id,sl.status,sc.id checkId,sc.status importStatus,sc.fileName checkName,sl.fileName,sl.filePath,DATE_FORMAT(sl.createTime, '%Y-%m-%d %H:%i:%S') createTime, DATE_FORMAT(sl.updateTime, '%Y-%m-%d %H:%i:%S') updateTime,sl.createPin from t_sales_importLog sl, t_sales_importcheck sc WHERE sl.check_id = sc.id and sl.createPin = ? order by id desc limit ?,? 
[2017/03/22 16:35:21][DEBUG][BaseJdbcLogger] ==> Parameters: undefined(String), 0(Integer), 10(Integer)

href=javascript:toDownLoad('" + prplist[i]["checkId"] + "',0)>"+ checkName+"</a>

<td><a title=" + prplist[i]["fileName"] + " href=javascript:toDownLoad('" + prplist[i]["id"] + "',1)>"+ fileName+"</a></td><td>"+operateTime+"</td><td>"+getImportStatus(importStatus) +"</td><td>"+getStatus(prplist[i]["status"]) +"</td>



导入文件时只插入校验表，不插入log表，在提交时再插入log表。
// 插入审核表
            param.put("check_id", param.get("checkId"));
            int log_id = svc.insertSales(param, 2);
            if (log_id > 0) {
              log.info("插入审核表:" + log_id);
            }

            // 更新审核表
          Map<String, Object> paramUpdate = new HashMap<String, Object>();
          paramUpdate.put("check_id", checkId);
          paramUpdate.put("status", MultiPriceEnum.VERIFY_NONE.getValue());
          paramUpdate.put("fileName", retLs.get(0).split(",")[1]);
          paramUpdate.put("filePath", PropertiesUtil.get("ftp.path") + "/" + fileName);
          // paramUpdate.put("updatePin",
          // param.get("createPin").toString());
          int log_update = svc.updateSales(paramUpdate);
          if (log_update > 0) {
            log.info("更新审核表成功:" + log_update);
          }

java8:
Vector<ShoppingListInfoPo> vecListInfoList = resp.getVecListInfoOut();

          vecListInfoList.forEach(
              e -> e.setListExtData(getMobileByUserId(String.valueOf(e.getBuyerId())).toString()));


http://test.site.haiziwang.com/sso-web/site/loginNew.do
t.addCookie("lastAccount",account);


"jguid=c383ebdb-6fe3-666d-ef9e-4611033a5233; siteid=rKzIFVjPo8VXGBybLCWZAg==; LtpaToken=AAECAzU4Q0ZBMkExNThEMDRCNjEyOTAwMDE0NSKMgpGvF4Ah3ZN7flZ2sd83x9HA; _platform_num="MTAwMDE="; siteToken="OTYzMEU5MDA3Q0FCMURDRTcxNEE2Qjg2M0QyMDc3RTc="; siteUserId="MzA5MjY="; siteUserName=5YiY56aP56Wv"

Preparing: select sl.id,sl.createTime,sc.tempType,sc.count_yes countYes,sc.count_no countNo,sc.createPin,sc.ruleType,sl.status,sc.id checkId,sc.fileName checkName,sl.fileName,sl.filePath,DATE_FORMAT(sl.createTime, '%Y-%m-%d %H:%i:%S') createTime, DATE_FORMAT(sl.updateTime, '%Y-%m-%d %H:%i:%S') updateTime,sl.createPin from t_sales_importLog sl, t_sales_importcheck sc WHERE sl.check_id = sc.id and sc.tempType = ? order by id desc limit ?,? 
[2017/03/23 16:04:32][DEBUG][BaseJdbcLogger] ==> Parameters: 1(String), 0(Integer), 10(Integer)
[2017/03/23 16:04:32][DEBUG][BaseJdbcLogger] <==      Total: 1



<a href="#" id="autocomplete" data-target="#myModal_autocomplete" role="button" class="btn green" data-toggle="modal" style="margin-left:15px;">批量导入</a>

data-target='#myModal_count_no'

var errHtml = "<a href='#' onclick=showCountno('"+prplist[i]["id"]+"','"+prplist[i]["tempType"]+"','"+prplist[i]["countNo"]+"'); data-target='#myModal_count_no' class='btn' data-toggle='modal'>"+prplist[i]["countNo"]+"</a>";

点击促销类型，可能是跳转到详情页面。


[[erp编码, 品类编码, 品牌编码, 定价方式, 定价金额/折扣, 补偿方式, 特供价, 供应商承担比率, 结果], 
[539866, , , 折扣, 50, 按折扣补偿, , 67, 成功], 
[, 01, , 定价, 176.99, 按销售补偿, 166.99, , 成功], 
[, , 3, 折扣, 90, 按折扣补偿, , 89.1, 供应商承担比率仅支持正整数;],
 [1234, , , 折扣, 98, 不补偿, , , 成功],
  [539866, , , 折扣, 50, 按折扣补偿, , 67, 成功],
   [, 01, , 定价, 176.99, 按销售补偿, 166.99, , 成功], 
   [, , 3, 折扣, 90, 按折扣补偿, , 89.1, 供应商承担比率仅支持正整数;], 
   [1234, , , 折扣, 98, 不补偿, , , 成功], [539866, , , 折扣, 50, 按折扣补偿, , 67, 成功], [, 01, , 定价, 176.99, 按销售补偿, 166.99, , 成功], [, , 3, 折扣, 90, 按折扣补偿, , 89.1, 供应商承担比率仅支持正整数;], [1234, , , 折扣, 98, 不补偿, , , 成功], [539866, , , 折扣, 50, 按折扣补偿, , 67, 成功], [, 01, , 定价, 176.99, 按销售补偿, 166.99, , 成功], [, , 3, 折扣, 90, 按折扣补偿, , 89.1, 供应商承担比率仅支持正整数;], [1234, , , 折扣, 98, 不补偿, , , 成功], [539866, , , 折扣, 50, 按折扣补偿, , 67, 成功], [, 01, , 定价, 176.99, 按销售补偿, 166.99, , 成功], [, , 3, 折扣, 90, 按折扣补偿, , 89.1, 供应商承担比率仅支持正整数;], [1234, , , 折扣, 98, 不补偿, , , 成功], [539866, , , 折扣, 50, 按折扣补偿, , 67, 成功], [, 01, , 定价, 176.99, 按销售补偿, 166.99, , 成功], [, , 3, 折扣, 90, 按折扣补偿, , 89.1, 供应商承担比率仅支持正整数;], [1234, , , 折扣, 98, 不补偿, , , 成功], [539866, , , 折扣, 50, 按折扣补偿, , 67, 成功], [, 01, , 定价, 176.99, 按销售补偿, 166.99, , 成功], [, , 3, 折扣, 90, 按折扣补偿, , 89.1, 供应商承担比率仅支持正整数;], [1234, , , 折扣, 98, 不补偿, , , 成功]]



   为何要将c++的校验接口单独出来。

##bug


##校验逻辑
###对于商品明细
若为商品品牌，则上传表单可填写品牌编码或者品牌+品类，默认交集。不支持只填品类。
若为具体商品，表内不能上传品牌/品类。
###对于excel表单
0.您上传的模板有误！表头不正确
0.折扣仅支持正整数！
0.供应商承担比例仅支持正整数！
0.补偿方式错误！（若选择折扣，却选择按销售补偿；反之亦然）
0.特供价未填写！（选择了按销售补偿，却没填写特供价）
0.供应商承担比例未填写！（类同上条）
0.
1.补偿方式冲突，定价方式与补偿方式不对应
2.编码冲突！erp编码，品类编码，品牌编码都填了或者商品编码和品类或品牌组合了。
3.批量总价与单品定价只可填写一项！
###对于组织数据
批量总价与单品定价只可填写一项！
所以在组织品类、品牌的补偿信息时，要根据tempType,以及批量总价、单品定价的有无来组织。
要调两步接口，只有我的接口通过了，才进行组装数据再调用c++的校验结果。


####对于品类、品牌补偿信息，如果有对应的按销售补偿，那么中台PriceBrandCompensatePo少个特供价字段，因此猜想对于品类、品牌没有按销售补偿，只有按折扣补偿。

###
ERP编码的补偿方式有按销量补偿、按折扣补偿

##思路：
发现在导入模板时可以不用校验，我的检验方法是独立的，可以跑个定时任务与 调用c++的校验接口放在一起。
同时，在校验时先调用我的方法，在调用c++接口时，只校验我的校验结果为true的记录。
###关于导入成功数、失败数
关键看：这个记录是什么时候的？是导入的还是校验的还是审核的？
是什么时候的就什么什么更新校验表即可。
###修改规则后，
status要变为0：未校验
countY变0，countN变为0.

###定时任务


##bak
if(tempType.equals(MultiPriceEnum.TEMPTYPE_1.getValue())){
            catePo.setCategoryCode(cateCode);
            catePo.set
          }else if(tempType.equals(MultiPriceEnum.TEMPTYPE_2.getValue())){
            if(!NormalUtil.isNullOrEmpty(String.valueOf(line.get(4)))){
              
            }else{
              
            }
            
          }


###导入校验
erp编码 品类编码  品牌编码  定价方式  单品定价金额/折扣 补偿方式  特供价 供应商承担比率 结果
539866      折扣  50  按折扣补偿   67  成功
539867  01    定价  176.99  按销售补偿 166.99    成功
539868    3 定价    按折扣补偿   89  补偿方式错误;
1234      折扣  98  不补偿     成功
539866      折扣  50  按折扣补偿   67  成功
539867  01    定价  176.99  按销售补偿 166.99    成功
539868    3 定价    按折扣补偿   89  补偿方式错误;
1234      折扣  98  不补偿     成功



[[erp编码, 品类编码, 品牌编码, 定价方式, 单品定价金额/折扣, 补偿方式, 特供价, 供应商承担比率, 结果], [539866, , , 折扣, 50, 按折扣补偿, , 67, 成功], [539867, 01, , 定价, 176.99, 按销售补偿, 166.99, , 成功], [539868, , 3, 定价, , 按折扣补偿, , 89, 补偿方式错误;], [1234, , , 折扣, 98, 不补偿, , , 成功], [539866, , , 折扣, 50, 按折扣补偿, , 67, 成功], [539867, 01, , 定价, 176.99, 按销售补偿, 166.99, , 成功], [539868, , 3, 定价, , 按折扣补偿, , 89, 补偿方式错误;], [1234, , , 折扣, 98, 不补偿, , , 成功]]

[[erp编码, 品类编码, 品牌编码, 定价方式, 单品定价金额/折扣, 补偿方式, 特供价, 供应商承担比率, 结果], 
[539866, , , 折扣, 50, 按折扣补偿, , 67, 成功],
 [539867, 01, , 定价, 176.99, 按销售补偿, 166.99, , 成功], 
 [539868, , 3, 定价, , 按折扣补偿, , 89, 补偿方式冲突;补偿方式错误;需填写定价金额/折扣], 

 [1234, , , 折扣, 98, 不补偿, , , 成功], 
 [539866, , , 折扣, 50, 按折扣补偿, , 67, 成功], 
 [539867, 01, , 定价, 176.99, 按销售补偿, 166.99, , 成功], 
 [539868, , 3, 定价, , 按折扣补偿, , 89, 补偿方式冲突;补偿方式错误;需填写定价金额/折扣], 

 [1234, , , 折扣, 98, 不补偿, , , 成功]]



 [[erp编码, 品类编码, 品牌编码, 定价方式, 单品定价金额/折扣, 补偿方式, 特供价, 供应商承担比率, 结果], 
 [539866, , , 折扣, 50, 按折扣补偿, , 67, 成功< <创建的价格类型不是一般促销价，且必须填写线下价格类型><促销类型编码设置错误><补偿方式 CompensateType 没有设置>], 

 [539867, 01, , 定价, 176.99, 按销售补偿, 166.99, , 成功< <创建的价格类型不是一般促销价，且必须填写线下价格类型><促销类型编码设置错误><优惠类型PriceMode 设置无效><折扣应该小于100><品牌多价补偿信息未设置>], 

 [539868, , 3, 定价, , 按折扣补偿, , 89, 补偿方式冲突;补偿方式错误;需填写定价金额/折扣< <创建的价格类型不是一般促销价，且必须填写线下价格类型><促销类型编码设置错误><补偿方式 CompensateType 没有设置>], 

 [1234, , , 折扣, 98, 不补偿, , , 成功< <创建的价格类型不是一般促销价，且必须填写线下价格类型><促销类型编码设置错误><补偿方式 CompensateType 没有设置>], 




 [539866, , , 折扣, 50, 按折扣补偿, , 67, 成功< <创建的价格类型不是一般促销价，且必须填写线下价格类型><促销类型编码设置错误><优惠类型PriceMode 设置无效><折扣应该小于100><品牌多价补偿信息未设置>], 

 [539867, 01, , 定价, 176.99, 按销售补偿, 166.99, , 成功< <创建的价格类型不是一般促销价，且必须填写线下价格类型><促销类型编码设置错误><补偿方式 CompensateType 没有设置>], 

 [539868, , 3, 定价, , 按折扣补偿, , 89, 补偿方式冲突;补偿方式错误;需填写定价金额/折扣],

  [1234, , , 折扣, 98, 不补偿, , , 成功]]



  ruleInfo:
  {"activityId":0,"activityId_u":0,"batchNum":0,"batchNum_u":0,"beginInterval":"null","beginInterval_u":1,"channelInclude":"2","channelInclude_u":1,"compensateType":2,"compensateType_u":1,"endInterval":"null","endInterval_u":1,"entityInclude":"8018,5876","entityInclude_u":1,"erpCode":"","erpCode_u":0,"isScore":0,"isScore_u":0,"isWholePrice":0,"isWholePrice_u":0,"itemSkuId":539866,"itemSkuId_u":1,"mutiPrice":50,"mutiPrice_u":1,"platformId":0,"platformId_u":0,"priceBase":0,"priceBase_u":0,"priceBitProperty":{"empty":true},"priceBitProperty_u":0,"priceBuyLimitFlag":0,"priceBuyLimitFlag_u":0,"priceBuyLimitRule":"0#0#0","priceBuyLimitRule_u":1,"priceCreaterId":"frankkiu","priceCreaterId_u":1,"priceDealOperationNum":0,"priceDealOperationNum_u":0,"priceDealOperationType":0,"priceDealOperationType_u":0,"priceDesc":"","priceDesc_u":0,"priceEndTime":1490543999,"priceEndTime_u":1,"priceGenTime":0,"priceGenTime_u":0,"priceLastModifiyer":"","priceLastModifiyer_u":0,"priceLastUpdateTime":0,"priceLastUpdateTime_u":0,"priceMode":2,"priceMode_u":1,"priceName":"","priceName_u":0,"pricePromotionDesc":"","pricePromotionDesc_u":0,"priceSceneId":1,"priceSceneId_u":1,"priceSourceId":0,"priceSourceId_u":0,"priceStartTime":1490457600,"priceStartTime_u":1,"priceState":1,"priceState_u":1,"productRelation":1,"productRelation_u":1,"promotionTypeCode":"11","promotionTypeCode_u":1,"purchaseCost":0,"purchaseCost_u":0,"reserveStr":"","reserveStr_u":0,"sellerId":0,"sellerId_u":0,"siteId":1,"siteId_u":1,"size":302,"specCost":0,"specCost_u":0,"userInclude":"1","userInclude_u":1,"vecBrandCompensatePo":[],"vecBrandCompensatePo_u":0,"vecCategoryCompensatePo":[],"vecCategoryCompensatePo_u":0,"vecPriceCompensatePo":[],"vecPriceCompensatePo_u":1,"version":20170320,"version_u":0,"vipPriceInfo":{},"vipPriceInfo_u":0}
[2017/03/25 11:59:24][DEBUG][Logger4Log4j] counter value -> 1


insert into t_sales_importcheck   (createTime,createCode,createPin,status,tempType,count_yes,count_no,fileName,filePath,entityInclude,ruleType,userType,startTime,endTime,beginInterval,endInterval,skuType,channelType,totalLimit,perbuyLimit,perpartLimit)    values   (now(),?,?,,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
### Cause: com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''1',null,null,'temp_1_erp.xlsx','test/1490420303063.xlsx',null,null,null,null,nu' at line 4
org.apache.ibatis.exceptions.PersistenceException: 
### Error updating database.  Cause: com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''1',null,null,'temp_1_erp.xlsx','test/1490420303063.xlsx',null,null,null,null,nu' at line 4
### The error may involve com.haiziwang.jplugin.study.mapper.ISalesCheckMapper.insertSalesCheck-Inline


{fileName=temp_1_erp.xlsx, createPin=刘福祯, filePath=test/1490420697122.xlsx, createCode=29000145, checkId=, tempType=1}

insert into t_sales_importcheck   (createTime,createCode,createPin,status,tempType,count_yes,count_no,fileName,filePath,entityInclude,ruleType,userType,startTime,endTime,beginInterval,endInterval,skuType,channelType,totalLimit,perbuyLimit,perpartLimit)    values   (now(),?,?,,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
### Cause: com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''1',null,null,'temp_1_erp.xlsx','test/1490420697122.xlsx',null,null,null,null,nu' at line 4



SQL: insert into t_sales_importcheck   (createTime,createCode,createPin,status,tempType,count_yes,count_no,fileName,filePath,entityInclude,ruleType,userType,startTime,endTime,beginInterval,endInterval,skuType,channelType,totalLimit,perbuyLimit,perpartLimit)    values   (now(),?,?,,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
### Cause: com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''1',null,null,'temp_1_erp.xlsx','test/1490421318025.xlsx',null,null,null,null,nu' at line 4



{
    "activityId": 0,
    "activityId_u": 0,
    "batchNum": 0,
    "batchNum_u": 0,
    "beginInterval": "null",
    "beginInterval_u": 1,
    "channelInclude": "2",
    "channelInclude_u": 1,
    "compensateType": 1,
    "compensateType_u": 1,
    "endInterval": "null",
    "endInterval_u": 1,
    "entityInclude": "8017,8018",
    "entityInclude_u": 1,
    "erpCode": "",
    "erpCode_u": 0,
    "isScore": 0,
    "isScore_u": 0,
    "isWholePrice": 0,
    "isWholePrice_u": 0,
    "itemSkuId": 539866,
    "itemSkuId_u": 1,
    "mutiPrice": 5100,
    "mutiPrice_u": 1,
    "platformId": 0,
    "platformId_u": 0,
    "priceBase": 0,
    "priceBase_u": 0,
    "priceBitProperty": {
        "empty": true
    },
    "priceBitProperty_u": 0,
    "priceBuyLimitFlag": 0,
    "priceBuyLimitFlag_u": 0,
    "priceBuyLimitRule": "0#0#1",
    "priceBuyLimitRule_u": 1,
    "priceCreaterId": "frankkiu",
    "priceCreaterId_u": 1,
    "priceDealOperationNum": 0,
    "priceDealOperationNum_u": 0,
    "priceDealOperationType": 0,
    "priceDealOperationType_u": 0,
    "priceDesc": "",
    "priceDesc_u": 0,
    "priceEndTime": 1491062399,
    "priceEndTime_u": 1,
    "priceGenTime": 0,
    "priceGenTime_u": 0,
    "priceLastModifiyer": "",
    "priceLastModifiyer_u": 0,
    "priceLastUpdateTime": 0,
    "priceLastUpdateTime_u": 0,
    "priceMode": 1,
    "priceMode_u": 1,
    "priceName": "",
    "priceName_u": 0,
    "pricePromotionDesc": "",
    "pricePromotionDesc_u": 0,
    "priceSceneId": 1,
    "priceSceneId_u": 1,
    "priceSourceId": 0,
    "priceSourceId_u": 0,
    "priceStartTime": 1490976000,
    "priceStartTime_u": 1,
    "priceState": 1,
    "priceState_u": 1,
    "productRelation": 1,
    "productRelation_u": 1,
    "promotionTypeCode": "11",
    "promotionTypeCode_u": 1,
    "purchaseCost": 0,
    "purchaseCost_u": 0,
    "reserveStr": "",
    "reserveStr_u": 0,
    "sellerId": 0,
    "sellerId_u": 0,
    "siteId": 1,
    "siteId_u": 1,
    "size": 376,
    "specCost": 0,
    "specCost_u": 0,
    "userInclude": "1",
    "userInclude_u": 1,
    "vecBrandCompensatePo": [],
    "vecBrandCompensatePo_u": 0,
    "vecCategoryCompensatePo": [],
    "vecCategoryCompensatePo_u": 0,
    "vecPriceCompensatePo": [
        {
            "agioRate": 0,
            "entityId": "",
            "itemSkuId": 539866,
            "priceId": 0,
            "purchaseCost": 0,
            "size": 74,
            "sourceId": 0,
            "specPrice": 18911,
            "supplierId": "",
            "version": 0
        }
    ],
    "vecPriceCompensatePo_u": 1,
    "version": 20170320,
    "version_u": 0,
    "vipPriceInfo": {},
    "vipPriceInfo_u": 0
}

<优惠类型PriceMode 设置无效><折扣应该小于100><品牌多价补偿信息未设置>



<来源参数source没有设置><销售渠道若为线下或全渠道，则多价规则只可填写一般促销价，且必须填写线下价格类型><未取到skuid>


##线下商品
商品编码  商品名称  供应商承担比例
0199992381  孩子王 148.1
0199992377  flt8000测试促销商品 148.1
0199992376  店APP测试商品0020  148.1
0199992375  8017-sk0309-001 148.1
0199992370  flt商品8000多规格加入8002-子  148.1
0199992369  flt商品8000多规格加入8002-主  148.1
0199992360  flt测试店app商品购物车8002  148.1
0199992284  sk0307线下商品  148.1
0199992262  flt测试店app商品8000可编辑字段  148.1
0199992259  测试价格相关进价1.99售价2.2最低2.0最高4.22  148.1
0199992240  严俊霞扫码购商品哈哈哈 148.1
0199992238  8018测试纯线下商品 148.1
0199992237  8012  148.1
0199992230  程思远测试商品3  148.1
0199992225  flt店app商品0301-8018-1  148.1
0199992224  merry测试数据1  148.1
0199992223  店APP测试商品03  148.1
0199992222  店APP测试商品02  148.1
0199992221  店APP测试商品01  148.1
0199992220  flt店app测试商品0301-01  148.1


update t_sales_importcheck SET status = ?, createTime = now(), count_no = ?, fileName = ?, filePath = ? WHERE id = 3 
[2017/03/25 16:29:35][DEBUG][BaseJdbcLogger] ==> Parameters: 2(String), 3(Integer), temp_1_erp.xlsx(String), test/1490430574935.xlsx(String)
[2017/03/25 16:29:35][DEBUG][BaseJdbcLogger] <==    Updates: 1



{fileName=temp_1_erp.xlsx, countNo=2, filePath=test/1490433642925.xlsx, perpartLimit=0, channelType=2, countYes=1, skuType=2, createPin=Frank, totalLimit=0, createTime=2017-03-25 17:18:41, ruleType=11, startTime=2017-04-02 00:00:00.0, perbuyLimit=0, id=1, userType=1, endTime=2017-04-02 23:59:59.0, entityInclude=8017,8018, createCode=29000145, tempType=1, status=2}

###关于审核操作
审核通过后，如果一部分生效，一部分未生效，则规则状态是？



{"fileName":"temp_1_erp.xlsx","filePath":"test/1490583754924.xlsx","perpartLimit":0,"channelType":2,"skuType":2,"createPin":"Frank","totalLimit":0,"createTime":"2017-03-27 11:00:42","ruleType":11,"startTime":1491062400000,"perbuyLimit":0,"id":2,"userType":1,"endTime":1491148799000,"entityInclude":"8021,8048","createCode":"29000145","tempType":1}
[2017/03/27 11:19:37][DEBUG][Logger4Log4j] getChannel -> channels size : 1


Preparing: SELECT sc.id,sc.status,sc.tempType from t_sales_importlog sl, t_sales_importcheck sc WHERE sl.check_id = sc.id AND sc.status = 0 OR sc.status is NULL 
[2017/03/27 11:58:41][DEBUG][BaseJdbcLogger] ==> Parameters: 



http://localhost:8083/jplugin-study/views/ocanal/price/imlist.jsp


[[erp编码, 品类编码, 品牌编码, 定价方式, 定价金额/折扣, 补偿方式, 特供价, 供应商承担比率, 结果], [0199992377, , , 定价, 51, 按销售补偿, 189.11, 67, <未取到skuid>], [0199992238, , , 折扣, 50, 按折扣补偿, , 68, <未取到skuid>], [0199992375, , , 定价, 98.12, 不补偿, , , 成功.]]


[[erp编码, 品类编码, 品牌编码, 定价方式, 定价金额/折扣, 补偿方式, 特供价, 供应商承担比率, ], [0199992377, , , 定价, 51, 按销售补偿, 189.11, 67, ], [0199992238, , , 折扣, 50, 按折扣补偿, , 68, ], [0199992375, , , 定价, 98.12, 不补偿, , , ]]


if (respErp != null && respErp.getResult() != 0) {
            countNo++;
            flag = false;
            List<Object> rule = ruleSheet.get(i + 1);// 第i条规则
            String finalTip = respErp.getErrmsg();
            rule.set(rule.size() - 1, finalTip);
          } else {
            countYes++;
            List<Object> rule = ruleSheet.get(i + 1);// 第i条规则
            String finalTip = "成功" + SaleCenterConstants.POINT_STRING;
            rule.set(rule.size() - 1, finalTip);
          }


          if (respCate != null && respCate.getResult() != 0) {
            countNo++;
            flag = false;
            List<Object> rule = ruleSheet.get(i + 1);// 第i条规则
            String finalTip = rule.get(rule.size() - 1).toString() + "< " + respCate.getErrmsg();
            rule.set(rule.size() - 1, finalTip);
          } else {
            countYes++;
            List<Object> rule = ruleSheet.get(i + 1);// 第i条规则
            String finalTip = "成功" + SaleCenterConstants.POINT_STRING;
            rule.set(rule.size() - 1, finalTip);
          }


@Override
  public Map<String, Object> updatePrice(List<List<Object>> ruleSheet, PriceImportCpp priceImportCpp) {
    WebStubCntl stub = CppClientProxyFactory.createCppWebStubCntl();
    Map<String, Object> map = new HashMap<String, Object>();
    final UpdateMultiPriceRuleResp resp = new UpdateMultiPriceRuleResp();
    boolean flag;
    String errmsg = "";
    try {
      UpdateMultiPriceRuleReq req = priceImportCpp.getUpdateRule();
      stub.invoke(req, resp, 1024 * 1024);
      if (resp != null && resp.getPriceRuleOut() != null && resp.getResult() == 0) {
        flag = true;
        errmsg = resp.getErrmsg();
      } else {
        flag = false;
        log.info("更新规则失败:" + resp.getErrmsg());
        errmsg = resp.getErrmsg();
      }
      map.put("flag", flag);
      map.put("errmsg", errmsg);

    } catch (Exception e) {
      e.printStackTrace();
    }
    return map;
  }

{fileName=offline_batchprice.xlsx, countNo=0, filePath=test/1490689520243.xlsx, perpartLimit=1, beginInterval=13:05, channelType=2, countYes=2, skuType=2, createPin=张靖, totalLimit=3, createTime=2017-03-28 16:23:18, ruleType=11, ruleOps=38315,38316, countTotal=2, startTime=2017-03-28 13:00:00.0, perbuyLimit=2, id=28, userType=1, endTime=2017-03-28 23:59:59.0, entityInclude=8017,8018,8021,8048,8074,8099,8185,5876,11,1233123,1299479,9511,8011, createCode=19017587, tempType=1, endInterval=15:30, status=1}

{fileName=offline_batchprice.xlsx, perpartLimit=1, channelType=2, countYes=2, skuIds=99992455,99992521, createPin=张靖, ruleType=11, ruleOps=38315,38316, countTotal=2, startTime=2017-03-28 13:00:00.0, id=28, createCode=19017587, tempType=1, endInterval=15:30, countNo=0, filePath=test/1490689520243.xlsx, beginInterval=13:05, skuType=2, totalLimit=3, createTime=2017-03-28 16:23:18, perbuyLimit=2, userType=1, endTime=2017-03-28 23:59:59.0, entityInclude=8017,8018,8021,8048,8074,8099,8185,5876,11,1233123,1299479,9511,8011, status=0}

第一次调用校验接口：
[2017/03/29 10:55:32][INFO][Logger4Log4j] checkRule--->begin--->1490756132916

第二次调用校验接口：
[2017/03/29 10:56:32][DEBUG][ManagedTransaction] Opening JDBC Connection
[2017/03/29 10:56:32][DEBUG][BaseJdbcLogger] ==>  Preparing: SELECT sc.id,sc.status,sc.tempType from t_sales_importlog sl, t_sales_importcheck sc WHERE sl.check_id = sc.id AND (sc.status = 0 OR sc.status is NULL) 
[2017/03/29 10:56:32][DEBUG][BaseJdbcLogger] ==> Parameters: 
[2017/03/29 10:56:32][DEBUG][BaseJdbcLogger] <==      Total: 0
[2017/03/29 10:56:32][INFO][Logger4Log4j] getCheckRule--->[]


###调用校验接口
本地：
http://localhost:8083/jplugin-study/ocanal/import/getCheckRule.do
测试环境：
http://test.salecenter.haiziwang.com/jplugin-study/ocanal/import/getCheckRule.do
###批量审核
http://localhost:8083/jplugin-study/ocanal/import/updateBatch.do?id=19&checkId=28&tempType=1&status=2&updatePin='fff'
###bug
更新规则后，列表导入时间没有更新
####g更新规则
params.put("countYes", null);
      params.put("countNo", null);
      params.put("countTotal", null);
      log.info("更新规则入参：" + JSON.toJSONString(params));

      int updatePrice = checkService.updateSalesCheck(params);

###线下品类
品类编码  品类名称  供应商承担比例(%)
01010101  彩泥  0
01  玩具  0
###线下参与品牌
品牌编码  品牌名称  供应商承担比例(%)
2 雅培1 0
999 羚滋  0
987 金贝氏 0

###品牌rule
{
    "activityId": 0,
    "activityId_u": 0,
    "batchNum": 0,
    "batchNum_u": 0,
    "beginInterval": "",
    "beginInterval_u": 0,
    "channelInclude": "2",
    "channelInclude_u": 1,
    "compensateType": 1,
    "compensateType_u": 1,
    "endInterval": "",
    "endInterval_u": 0,
    "entityInclude": "8017,8018",
    "entityInclude_u": 1,
    "erpCode": "",
    "erpCode_u": 0,
    "isScore": 0,
    "isScore_u": 0,
    "isWholePrice": 0,
    "isWholePrice_u": 0,
    "itemSkuId": 0,
    "itemSkuId_u": 0,
    "mutiPrice": 7110,
    "mutiPrice_u": 1,
    "platformId": 0,
    "platformId_u": 0,
    "priceBase": 0,
    "priceBase_u": 0,
    "priceBitProperty": {
        "empty": true
    },
    "priceBitProperty_u": 0,
    "priceBuyLimitFlag": 0,
    "priceBuyLimitFlag_u": 0,
    "priceBuyLimitRule": "0#0#0",
    "priceBuyLimitRule_u": 1,
    "priceCreaterId": "刘福祯",
    "priceCreaterId_u": 1,
    "priceDealOperationNum": 0,
    "priceDealOperationNum_u": 0,
    "priceDealOperationType": 0,
    "priceDealOperationType_u": 0,
    "priceDesc": "",
    "priceDesc_u": 0,
    "priceEndTime": 1491148799,
    "priceEndTime_u": 1,
    "priceGenTime": 0,
    "priceGenTime_u": 0,
    "priceLastModifiyer": "",
    "priceLastModifiyer_u": 0,
    "priceLastUpdateTime": 0,
    "priceLastUpdateTime_u": 0,
    "priceMode": 1,
    "priceMode_u": 1,
    "priceName": "",
    "priceName_u": 0,
    "pricePromotionDesc": "",
    "pricePromotionDesc_u": 0,
    "priceSceneId": 1,
    "priceSceneId_u": 1,
    "priceSourceId": 0,
    "priceSourceId_u": 0,
    "priceStartTime": 1491062400,
    "priceStartTime_u": 1,
    "priceState": 1,
    "priceState_u": 1,
    "productRelation": 1,
    "productRelation_u": 1,
    "promotionTypeCode": "11",
    "promotionTypeCode_u": 1,
    "purchaseCost": 0,
    "purchaseCost_u": 0,
    "reserveStr": "",
    "reserveStr_u": 0,
    "sellerId": 0,
    "sellerId_u": 0,
    "siteId": 1,
    "siteId_u": 1,
    "size": 354,
    "specCost": 0,
    "specCost_u": 0,
    "userInclude": "1",
    "userInclude_u": 1,
    "vecBrandCompensatePo": [
        {
            "agioRate": 0,
            "brandCode": "987",
            "categoryCode": "",
            "priceBrand": "",
            "priceCategory": "",
            "priceId": 0,
            "size": 59,
            "supplierId": "",
            "version": 0
        }
    ],
    "vecBrandCompensatePo_u": 1,
    "vecCategoryCompensatePo": [],
    "vecCategoryCompensatePo_u": 0,
    "vecPriceCompensatePo": [],
    "vecPriceCompensatePo_u": 0,
    "version": 20170320,
    "version_u": 0,
    "vipPriceInfo": {},
    "vipPriceInfo_u": 0
}

{flag=false, errmsg=<优惠类型PriceMode 设置无效><折扣应该小于100><补偿方式冲突！>}


###bug补偿信息查询不到
Vector<PriceCompensatePo> compensateList = resp.getVecPriceCompensatePo();
list为空。

查询详情：
0199992215      折扣  60  按折扣补偿   89  创建成功

0199992215      折扣  60  按折扣补偿   89  成功
###多价导入脚本
DROP TABLE IF EXISTS `t_sales_importcheck`;
CREATE TABLE `t_sales_importcheck` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `createCode` varchar(30) DEFAULT NULL COMMENT '创建者工号',
  `createPin` varchar(50) DEFAULT NULL COMMENT '创建人',
  `updateCode` varchar(30) DEFAULT NULL COMMENT '修改者工号',
  `updatePin` varchar(50) DEFAULT NULL COMMENT '修改人',
  `status` int(11) DEFAULT NULL COMMENT '校验状态,0:未校验,1:校验通过,2:校验未通过',
  `tempType` int(2) DEFAULT NULL COMMENT '模板类型',
  `count_yes` int(10) DEFAULT NULL COMMENT '导入成功数',
  `count_no` int(10) DEFAULT NULL COMMENT '导入失败数',
  `count_total` int(10) DEFAULT NULL COMMENT '导入总数',
  `fileName` varchar(512) DEFAULT NULL COMMENT '文件名称',
  `filePath` varchar(256) DEFAULT NULL COMMENT '文件路径',
  `entityInclude` text COMMENT '参与实体',
  `ruleType` int(2) DEFAULT NULL COMMENT '价格类型',
  `userType` int(2) DEFAULT NULL COMMENT '促销对象',
  `startTime` datetime DEFAULT NULL COMMENT '活动开始时间',
  `endTime` datetime DEFAULT NULL COMMENT '活动结束时间',
  `beginInterval` varchar(10) DEFAULT NULL COMMENT '活动开始时段',
  `endInterval` varchar(10) DEFAULT NULL COMMENT '活动结束时段',
  `skuType` int(2) DEFAULT NULL COMMENT '商品明细类型',
  `channelType` int(2) DEFAULT NULL COMMENT '销售渠道',
  `totalLimit` int(10) DEFAULT NULL COMMENT '商品购买总量',
  `perbuyLimit` int(10) DEFAULT NULL COMMENT '每人购买商品数量',
  `perpartLimit` int(10) DEFAULT NULL COMMENT '每人每天购买商品数量',
  `yn` bit(1) NOT NULL DEFAULT b'1' COMMENT '是否有效',
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'TS',
  `ruleOps` text COMMENT '生效的规则ID',
  `skuIds` text COMMENT 'skuID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='多价导入校验表'

getStoreByStore
{"storeDesc":"上海顺恒广场店","storeName":"上海顺恒","storeId":"12","storeCode":"8018"}

getStoreByPart
{"is_municipality":"1","store_desc":"上海盛源广场店","distance":0,"city":310200,"support_scan_code":1,"freight":1000,"link":"","open_time":"1473042969","open_progress":"4","province":310000,"address_province":"上海市","feature":1,"is_fetch":1,"yn":"1","store_name":"上海盛源","address_district":"崇明县","store_id":11,"store_code":"8017","area":"HD","spell":"SH","contact_phone_02":"","contact_phone_01":"021-1264452","freightThreshold":5800,"end_time":"20:30","new_store":"0","photo":"http://activpic-10003009.image.myqcloud.com/7375e892-ce2e-42c2-a18f-3abf4c1cf332","is_delivery":2,"provinceId":"SH","support_hm_flag":0,"address_city":"县","support_online_service":0,"start_time":"7:00","address_street":"上海市县崇明县金沙江路","district":"310230","departmentNo":8017,"entity":8017}


ruleId=20
test/1490856950805.xlsx

change()后：
test/1490868469623.xlsx
提交后：
test/1490868469623.xlsx

###bug批量数据
erp编码 品类编码  品牌编码  定价方式  定价金额/折扣 补偿方式  特供价 供应商承担比率 批量总价  批量数量  结果

    2 折扣  49  按折扣补偿   89  99  3 <优惠类型PriceMode 设置无效>
priceMode=3
批量总价与定价金额（折扣）没有传过去。
###定价方式不填应该有问题，查如果不设置，询详情优惠类型就为未知，而且multiprice取的也不对。
