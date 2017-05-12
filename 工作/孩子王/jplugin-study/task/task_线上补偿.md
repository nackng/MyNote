[TOC]
线上品类id      品类名称
303901      儿童家居
304604      笔记本
304189      中式床
304191      游戏床
303895      尿不湿

线上商品
商品编号   ERP编码   商品名称     
539868  999999038   孙滔自动化商品038
606 0104010965  ZOOBIES（如比）鳄鱼BP110
1234    0501011798  Humana金装较大婴儿配方奶粉（2段）（D）
111 0603011497  comotomo奶瓶150ML粉色

##促销优化
https://www.tapd.cn/20019631/prong/stories/view/1120019631001012876
1.2.3.5.7.11.14.15.16

6、商品购买总量限制和每人每天去除（所有线下的促销，多价的单个和批量导入）；需求不明确
8、折扣必须为2位数；(目前折扣就是仅支持整数)
9、促销价查询展示erp编码（如果维护的是erp编码则展示erp编码，现在统一展示商品id）不懂
10、品牌和品类导入可以一行输入多个（多价导入功能）
12、必填项目前增加“*” 不明确
13、销售渠道去除展示，默认线上商城对应线上，门店的线上线下打通。 不明确

7、促销价单个维护若为线下则填写商品编码改为erp编码；
9、促销价查询展示erp编码（如果维护的是erp编码则展示erp编码，现在统一展示商品id）

skuId erpCode
41      0103030120

2/7/16/17


99994527    0199994527 
99994519    0199994519  
99994512    0199994512  
99994510    0199994510  
99994509    0199994509 
99994508    0199994508

502040204,504020953,502040203,502010858,502040202,502010857,502040342,502040341,502040038,502010856,502040016,502010855,5.02040023E8,502040205,504020952,502040061,502040062,502040060,502040025,502040231,502040232,502040043,502040024,502040045商品不存在!
原因：前面少0.






//线上特供价
        if (!NormalUtil.isNullOrEmpty(specCost)) {
            if(MultiPriceEnum.ENTITYINCLUDE.getValue().equals(entityInclude)){
                if(Long.parseLong(compensateType) == 1){
                    priceRuleCreateParam.setCompensateType(Long.parseLong(compensateType));
                    Long longSpecCost = NormalUtil.GetLongByFloat(Double.parseDouble(specCost));
                    priceRuleCreateParam.setSpecCost(longSpecCost);// 元转化成分
                }else{
                    priceRuleCreateParam.setCompensateType(Long.parseLong(compensateType));
                }
            }
        }else{
            if(MultiPriceEnum.ENTITYINCLUDE.getValue().equals(entityInclude)){
                if(Long.parseLong(compensateType) == 2){
                    priceRuleCreateParam.setCompensateType(Long.parseLong(compensateType));
                    Long longOnline_compensate_ratio = Long.parseLong(online_compensate_ratio);
                    priceRuleCreateParam.setSpecCost(longOnline_compensate_ratio);  //承担比例
                }else{
                    priceRuleCreateParam.setCompensateType(Long.parseLong(compensateType));
                }
            }
        }



        if (Long.parseLong(compensateType) == 1) {
            priceRuleCreateParam.setCompensateType(Long.parseLong(compensateType));
            Long longSpecCost = NormalUtil.GetLongByFloat(Double.parseDouble(specCost));
            priceRuleCreateParam.setSpecCost(longSpecCost);// 元转化成分
        } else {
            priceRuleCreateParam.setCompensateType(Long.parseLong(compensateType));
            Long longOnline_compensate_ratio = Long.parseLong(online_compensate_ratio);
            priceRuleCreateParam.setSpecCost(longOnline_compensate_ratio); // 承担比例
        }
        priceRuleCreateParam.setCompensateType(Long.parseLong(compensateType));


        对于第6条：
        6、商品购买总量限制和每人每天去除（所有线下的促销，多价的单个和批量导入，包括全渠道）（除线下满返和积分促销不去除）；

        id="uselimit"  buylimit  partlimit

        


        限制不用改。
        

function showCompType(){
    showCompTypeDiv();
    var compensateType = $("input[name='compRadio']:checked").val();
    var th = "<td>供应商承担比例</td>";
    var tc = "<td><input style='width:105px;' /></td>";
    var len = $("#dataTableDetail_on tbody tr:first").find("td").length;
    if(compensateType == 1){
        if(len < 4){
            $("#dataTableDetail_on tbody tr:first").find('td:eq(1)').after(th);
            $("#dataTableDetail_on tbody tr:not(:first)").find('td:eq(1)').after(tc);
            $("#dataTableDetail_off tbody tr:first").find('td:eq(1)').after(th);
            $("#dataTableDetail_off tbody tr:not(:first)").find('td:eq(1)').after(tc);
        }
    }else if(compensateType == 2){
        var len = $("#dataTableDetail_on tbody tr:first").find("td").length;
        if(len < 4){
            $("#bd_dataTableDetail_on tbody tr:first").find('td:eq(1)').after(th);
            $("#bd_dataTableDetail_on tbody tr:not(:first)").find('td:eq(1)').after(tc);
            $("#bd_dataTableDetail_off tbody tr:first").find('td:eq(1)').after(th);
            $("#bd_dataTableDetail_off tbody tr:not(:first)").find('td:eq(1)').after(tc);
        }
    }else{
        if(len == 4){
            $("#dataTableDetail_on tbody tr").find('td:eq(2)').remove();
            $("#dataTableDetail_off tbody tr").find('td:eq(2)').remove();
            $("#bd_dataTableDetail_on tbody tr").find('td:eq(2)').remove();
            $("#bd_dataTableDetail_off tbody tr").find('td:eq(2)').remove();
        }
    }
}

##计算类型去除不了，规则转换错误

##需去除不必要信息
###线上
        $("#dataTableDetail_on tbody tr:not(:first)").remove();
        $("#exclude_dataTableDetail_on tbody tr:not(:first)").remove();
        $("#bd_dataTableDetail_on tbody tr:not(:first)").remove();
        $("#bd_dataTableDetail_on_exclude tbody tr:not(:first)").remove();
        $("#includeselectedProduct").val('');
        $("#excludeselectedProduct").val('');
        $("#on_include_sku_table tbody tr:not(:first)").remove();
        $("#on_exclude_sku_table tbody tr:not(:first)").remove();
        $("#includeOnSkuIds").val('');
        $("#includeOnSkuComps").val('');
        $("#excludeOnSkuComps").val('');
###线下
        $("#dataTableDetail_off tbody tr:not(:first)").remove();
        $("#dataTableDetail_off tbody tr:not(:first)").remove();
        $("#exclude_dataTableDetail_off tbody tr:not(:first)").remove();
        $("#bd_dataTableDetail_off tbody tr:not(:first)").remove();
        $("#exclude_bd_dtblDetail_off tbody tr:not(:first)").remove();
        $("#includeHiddenSkuIds").val('');
        $("#excludeHiddenSkuIds").val('');
        $("#off_includeTab tbody tr:not(:first)").remove();
        $("#off_excludeTab tbody tr:not(:first)").remove();


##满件数减金额促销
{
    "bornTime": 1494381331858,
    "cmdId": 807278593,
    "liveTime": 7784,
    "machineKey": "sale_center_OpromController_promotionCreate",
    "netSeqNo": 0,
    "option": 0,
    "promotionRuleInfoIn": {
        "activityId": 0,
        "activityId_u": 0,
        "allocId": 0,
        "allocId_u": 0,
        "applyTimesPerOrder": 0,
        "applyTimesPerOrder_u": 0,
        "applyTimesPerUser": 0,
        "applyTimesPerUser_u": 0,
        "approval": "",
        "approvalTime": 0,
        "approvalTime_u": 0,
        "approval_u": 0,
        "brandExcludeList": [
            
        ],
        "brandExcludeList_u": 0,
        "brandExcludeOfflineList": [
            
        ],
        "brandExcludeOfflineList_u": 0,
        "brandIncludeList": [
            
        ],
        "brandIncludeList_u": 0,
        "brandIncludeOfflineList": [
            
        ],
        "brandIncludeOfflineList_u": 0,
        "categoryExcludeList": [
            
        ],
        "categoryExcludeList_u": 0,
        "categoryExcludeOfflineList": [
            
        ],
        "categoryExcludeOfflineList_u": 0,
        "categoryIncludeList": [
            
        ],
        "categoryIncludeList_u": 0,
        "categoryIncludeOfflineList": [
            "0202"
        ],
        "categoryIncludeOfflineList_u": 1,
        "channelIncludeList": [
            {
                "value": 2
            }
        ],
        "channelIncludeList_u": 1,
        "compensate": 0,
        "compensateDisType": 0,
        "compensateDisType_u": 0,
        "compensateList": [
            
        ],
        "compensateList_u": 0,
        "compensate_u": 1,
        "conditionExt": "",
        "conditionExt_u": 0,
        "conditionStageInfo": {
            "conditionInfoList": {
                {
                    "value": 15
                }: {
                    "couponBatchId": [
                        
                    ],
                    "couponBatchId_u": 0,
                    "couponBatchList": {
                        
                    },
                    "couponBatchList_u": 0,
                    "discount": 0,
                    "discount_u": 0,
                    "favouredPrice": 200,
                    "favouredPrice_u": 1,
                    "giftGrantAmt": 0,
                    "giftGrantAmt_u": 0,
                    "giftGrantType": 0,
                    "giftGrantType_u": 0,
                    "giftItemList": [
                        
                    ],
                    "giftItemList_u": 0,
                    "giftLimit": 0,
                    "giftLimit_u": 0,
                    "promotionDesc": "",
                    "promotionDesc_u": 0,
                    "promotionPrice": 0,
                    "promotionPrice_u": 0,
                    "reserveStr": "",
                    "reserveStr_u": 0,
                    "scoreNum": 0,
                    "scoreNum_u": 0,
                    "size": 69,
                    "version": 20170220,
                    "version_u": 0
                }
            },
            "conditionStageType": 3,
            "conditionStageType_u": 1,
            "discountType": 1,
            "discountType_u": 1,
            "giftGrantWay": 0,
            "giftGrantWay_u": 0,
            "reserveStr": "",
            "reserveStr_u": 0,
            "size": 106,
            "version": 20161107,
            "version_u": 0
        },
        "createTime": 0,
        "createTime_u": 0,
        "creater": "userName",
        "creater_u": 1,
        "divide": "",
        "divideType": 0,
        "divideType_u": 0,
        "divide_u": 0,
        "endTime": 1494777599,
        "endTime_u": 1,
        "entityIncludeList": [
            {
                "value": 8018
            }
        ],
        "entityIncludeList_u": 1,
        "forecastTime": 0,
        "forecastTime_u": 0,
        "globalSite": 0,
        "globalSite_u": 1,
        "innerId": 0,
        "innerId_u": 0,
        "isCrossSeller": 0,
        "isCrossSeller_u": 0,
        "isScore": 1,
        "isScore_u": 1,
        "itemPriceMode": 1,
        "itemPriceMode_u": 1,
        "maxAgio": 0,
        "maxAgio_u": 0,
        "maxDiscountAmt": 0,
        "maxDiscountAmt_u": 0,
        "modifyTime": 0,
        "modifyTime_u": 0,
        "optionInfo": "",
        "optionInfo_u": 0,
        "optionUrl": "1",
        "optionUrl_u": 1,
        "pause": "",
        "pauseTime": 0,
        "pauseTime_u": 0,
        "pause_u": 0,
        "platformId": 0,
        "platformId_u": 0,
        "priority": 0,
        "priority_u": 0,
        "productExcRelation": 1,
        "productExcRelation_u": 1,
        "productExcludeList": [
            
        ],
        "productExcludeList_u": 0,
        "productExcludeOfflineList": [
            
        ],
        "productExcludeOfflineList_u": 0,
        "productIncRelation": 1,
        "productIncRelation_u": 1,
        "productIncludeList": [
            
        ],
        "productIncludeList_u": 0,
        "productIncludeOfflineList": [
            
        ],
        "productIncludeOfflineList_u": 0,
        "remark": "",
        "remark_u": 0,
        "reserveStr": "",
        "reserveStr_u": 0,
        "ruleDesc": "1",
        "ruleDesc_u": 1,
        "ruleId": 0,
        "ruleId_u": 0,
        "ruleName": "jio",
        "ruleName_u": 1,
        "ruleType": 14,
        "ruleType_u": 1,
        "scenceId": 0,
        "scenceId_u": 0,
        "sellerId": 0,
        "sellerId_u": 0,
        "sellerInclude": [
            
        ],
        "sellerInclude_u": 0,
        "sellerType": 0,
        "sellerType_u": 0,
        "siteId": 1,
        "siteId_u": 1,
        "size": 585,
        "sourceId": 0,
        "sourceId_u": 0,
        "startTime": 1494691200,
        "startTime_u": 1,
        "state": 1,
        "state_u": 1,
        "stopTime": 0,
        "stopTime_u": 0,
        "stopper": "",
        "stopper_u": 0,
        "syncSuccFlag": 0,
        "syncSuccFlag_u": 0,
        "userExcRelation": 0,
        "userExcRelation_u": 0,
        "userExcludeList": [
            
        ],
        "userExcludeList_u": 0,
        "userIncRelation": 0,
        "userIncRelation_u": 0,
        "userIncludeList": [
            {
                "value": "1"
            },
            {
                "value": "2"
            },
            {
                "value": "3"
            },
            {
                "value": "4"
            }
        ],
        "userIncludeList_u": 1,
        "userLevelExcludeList": [
            
        ],
        "userLevelExcludeList_u": 0,
        "userLevelIncludeList": [
            
        ],
        "userLevelIncludeList_u": 0,
        "userTypeExcludeList": [
            
        ],
        "userTypeExcludeList_u": 0,
        "userTypeIncludeList": [
            
        ],
        "userTypeIncludeList_u": 0,
        "version": 20170316,
        "version_u": 0,
        "whId": 0,
        "whId_u": 0
    },
    "reserveIn": "",
    "result": 0,
    "sceneId": 0,
    "size": 675,
    "source": "sale_center_promotionCreate"
}
<满减阶梯[1]优惠金额不能大于等于条件金额>

##满件数促销根据参与方式清除不必要的信息
品类
includeCate  = $("#hiddenCategory_on").val();
excludeCate  = $("#hiddenExCategory_on").val();

品牌
$("#includeselectedbrand option").each(function () {
    includeBrand = includeBrand + $(this).val() + ",";
});

$("#excludeselectedbrand option").each(function () {
    excludeBrand = excludeBrand + $(this).val() + ",";
});

商品
includeProduct = $("#includeselectedProduct").val();
excludeProduct = $("#excludeselectedProduct").val();

线下商品：
includeProduct_off = $("#includeHiddenSkuIds").val();
excludeProduct_off = $("#excludeHiddenSkuIds").val();
