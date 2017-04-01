[TOC]
##批量验证商品是否属于所选门店
```
02.16修改点：
主要由验证商品是否属于所选门店，所选商家 改为 只验证商品是否上架及不存在的商品信息。（原因：C++批量验证商品areaInfo信息太大，导致接口超时。）

1.OpromController:checkSkusCondition 变为了 checkNormalSku。
2.ruleAdd.js中
checkSku方法中注释了在验证商品时，需要验证门店和商家的逻辑。

private StringBuffer getRegularSkuInfo(List<String> globalSellers, List<String> storeList,
            List<String> sellerIdList, final GetSkuInfoResp resp) {
        StringBuffer sbSku = new StringBuffer(1024);
        for (SkuInfoPo skuinfo : resp.getSkuInfoList()) {
            boolean storeContain = true;
            boolean sellerContain = true;
            for (String sid : sellerIdList) {
                if (Integer.parseInt(sid) == 3) {// 孩子王自营
                    if (Integer.parseInt(sid) == skuinfo.getOrdinaryInfo().getCooperatorId()) {
                        if (skuinfo != null && skuinfo.getAreaInfoList() != null
                                && skuinfo.getAreaInfoList().size() > 0) {
                            Map<String, Long> storeAreaMap = PromotionUtil.getStoreAreaList(skuinfo);
                            Set<String> storeAreaEntityList = storeAreaMap.keySet();
                            for (String store : storeList) {
                                if (!storeAreaEntityList.contains(store)) {
                                    storeContain = false;
                                }
                            }
                        }
                    } else {
                        sellerContain = false;
                    }
                } else {
                    if (globalSellers.contains(sid)) {// 选择了全球购商家
                        boolean global = skuinfo.getOrdinaryInfo().getSkuProperty().get(6);
                        if (global) {// 全球购
                            if (Integer.parseInt(sid) == skuinfo.getOrdinaryInfo().getCooperatorId()) {
                                if (skuinfo != null && skuinfo.getAreaInfoList() != null
                                        && skuinfo.getAreaInfoList().size() > 0) {
                                    Map<String, Long> storeAreaMap = PromotionUtil.getStoreAreaList(skuinfo);
                                    Set<String> storeAreaEntityList = storeAreaMap.keySet();
                                    for (String store : storeList) {
                                        if (!storeAreaEntityList.contains(store)) {
                                            storeContain = false;
                                        }
                                    }
                                }
                            } else {
                                sellerContain = false;
                            }
                        }
                    } else {// 普通联营商家
                        if (Integer.parseInt(sid) == skuinfo.getOrdinaryInfo().getCooperatorId()) {
                            if (skuinfo != null && skuinfo.getAreaInfoList() != null
                                    && skuinfo.getAreaInfoList().size() > 0) {
                                Map<String, Long> storeAreaMap = PromotionUtil.getStoreAreaList(skuinfo);
                                Set<String> storeAreaEntityList = storeAreaMap.keySet();
                                for (String store : storeList) {
                                    if (!storeAreaEntityList.contains(store)) {
                                        storeContain = false;
                                    }
                                }
                            }
                        } else {
                            sellerContain = false;
                        }
                    }
                }
            }
            if (storeContain && sellerContain) {// 商品属于所有选择的门店,并且属于所选商家
                sbSku.append(skuinfo.getSkuId()).append(",");
            }
        }
        return sbSku;
    }
```
##测试按钮
```
<button type="button" class="btn green" id="test_test">测试</button>
$("#test_test").click(function(){
    var res = getInCompensateList2();
    var res2 = getExCompensateList2();
    console.log(res);
    console.log(res2);
})
```
###0228版本
```
批量验证商品池由500开到2000，组合购由200开到500.所以验证商品接口改为分批调用。
之前验证商品的逻辑（是否为所属商家，是否为所属门店）
/**
 * 验证商品
 */
public void checkSkus2() {
    WebStubCntl stub = CppClientProxyFactory.createCppWebStubCntl();
    logger.info("进入验证商品接口：" + System.currentTimeMillis());
    RespJson resJson = new RespJson();

    // 全球购商家
    Vector<SellerInfoPo> sellerInfo = GetSellerInfo(SaleCenterConstants.TWO, null);
    List<String> globalSellers = proGlobalSeller(sellerInfo);

    // 已选商品
    String skuids = getParam("skuids");
    logger.info("checkSkus_skuids:" + skuids);

    // 已选商家
    String sellerId = getParam("sellerId");
    logger.info("sellerId:" + sellerId);
    JSONArray sellerIdJson = JSONArray.parseArray(sellerId);
    List<String> sellerIdList = new ArrayList<String>();
    if (sellerIdJson != null) {
        for (int i = 0; i < sellerIdJson.size(); i++) {
            sellerIdList.add(sellerIdJson.getString(i));
        }
    }

    // 促销规则类型
    String ruleType = getParam("ruleType");
    logger.info("ruleType:" + ruleType);
    final GetSkuInfoReq req = new GetSkuInfoReq();
    req.setMachineKey(this.MachineKey + "_checkSkus");
    req.setSource(this.Source);
    req.setSceneId(this.SceneId);

    SkuFilterPo skuFilter = new SkuFilterPo();
    try {
        logger.info("NormalUtil.GetSetUint64ByStringList(skuids):" + NormalUtil.GetSetUint64ByStringList(skuids));
        skuFilter.setSkuIdList(NormalUtil.GetSetUint64ByStringList(skuids));

        req.setSkuFilter(skuFilter);

        final GetSkuInfoResp resp = new GetSkuInfoResp();

        stub.invoke(req, resp, 1024 * 1024);
        logger.info("验证商品接口调用完毕：" + System.currentTimeMillis());
        logger.info("result" + resp.getResult() + "|||errormsg:" + resp.getErrmsg());
        String[] skuArray = skuids.split(",");

        if (resp.getResult() == 0 && resp.getSkuInfoList().size() > 0) {
            // 验证成功
            resJson.setResultCode("0");
            // 获得不存在的sku、以及组合购sku
            String skuRes = checkSkuidsBySameAndComb(skuArray, resp.getSkuInfoList(), ruleType, sellerIdList,
                    globalSellers);
            resJson.setOtherbody(skuRes);
        } else {
            resJson.setResultCode("1");
            resJson.setMsg("商品不存在");
            // 展示不存在的商品
            StringBuffer sb = new StringBuffer();
            for (String s : skuArray) {
                sb.append(s).append("\t\t").append("无此商品\n");
            }
            resJson.setOtherbody(sb.toString());
        }
        StringBuffer sbSku = new StringBuffer(1024);
        for (SkuInfoPo skuinfo : resp.getSkuInfoList()) {
            for (String sid : sellerIdList) {
                if (Integer.parseInt(sid) == 3) {// 孩子王自营
                    if (Integer.parseInt(sid) == skuinfo.getOrdinaryInfo().getCooperatorId()) {
                        sbSku.append(skuinfo.getSkuId()).append(",");
                    }
                } else {
                    if (globalSellers.contains(sid)) {// 选择了全球购商家
                        boolean global = skuinfo.getOrdinaryInfo().getSkuProperty().get(6);
                        if (global) {// 全球购
                            if (Integer.parseInt(sid) == skuinfo.getOrdinaryInfo().getCooperatorId()) {
                                sbSku.append(skuinfo.getSkuId()).append(",");// 全球购商品
                            }
                        }
                    } else {// 普通联营商家
                        if (Integer.parseInt(sid) == skuinfo.getOrdinaryInfo().getCooperatorId()) {
                            sbSku.append(skuinfo.getSkuId()).append(",");
                        }
                    }
                }
            }
        }
        if (sbSku.length() > 0) {
            resJson.setDatabody(sbSku.substring(0, sbSku.length() - 1));
        }

    } catch (ParseException e) {
        e.printStackTrace();
        resJson.setResultCode("1");
        resJson.setMsg("转换异常：" + e.getMessage());
    } catch (Exception e) {
        e.printStackTrace();
        resJson.setResultCode("1");
        resJson.setMsg("接口异常：" + e.getMessage());
    }
    renderJson(JSON.toJSONString(resJson));
}

/**
 * 找出不存在的sku、以及为组合码的sku列表
 * @param skuArray
 * @param skuInfoList
 * @param ruleType
 * @param sellerIdList参与商家id
 * @param globalSellers全球购商家
 * @return
 */
private String checkSkuidsBySameAndComb(String[] skuArray, Vector<SkuInfoPo> skuInfoList, String ruleType,
        List<String> sellerIdList, List<String> globalSellers) {
    Vector<String> skus = new Vector<String>(Arrays.asList(skuArray));
    Vector<String> skuInfos = new Vector<String>();

    for (String sid : sellerIdList) {
        for (SkuInfoPo skuinfo : skuInfoList) {
            if (sid.equals(String.valueOf(skuinfo.getOrdinaryInfo().getCooperatorId()))) {
                skuInfos.add(String.valueOf(skuinfo.getSkuId()));
            } else {
                if (Integer.parseInt(sid) == 3) {// 孩子王自营
                    if (Integer.parseInt(sid) == skuinfo.getOrdinaryInfo().getCooperatorId()) {
                        skuInfos.add(String.valueOf(skuinfo.getSkuId()));
                    }
                } else {
                    if (globalSellers.contains(sid)) {// 选择了全球购商家
                        boolean global = skuinfo.getOrdinaryInfo().getSkuProperty().get(6);
                        if (global) {// 全球购
                            if (Integer.parseInt(sid) == skuinfo.getOrdinaryInfo().getCooperatorId()) {
                                skuInfos.add(String.valueOf(skuinfo.getSkuId()));// 全球购商品
                            }
                        }
                    } else {// 普通联营商家
                        if (Integer.parseInt(sid) == skuinfo.getOrdinaryInfo().getCooperatorId()) {
                            skuInfos.add(String.valueOf(skuinfo.getSkuId()));
                        }
                    }
                }
            }
        }
    }

    skus.removeAll(skuInfos);
    StringBuffer sb = new StringBuffer(1024);
    for (int i = 0; i < skus.size(); i++) {
        sb.append(skus.get(i)).append("\t\t").append("无此商品\n");
    }

    // 找出组合码商品
    if ("10".equals(ruleType)) {
        for (int i = 0; i < skuInfoList.size(); i++) {
            SkuInfoPo skuinfo = skuInfoList.get(i);
            logger.info("skuId:" + skuinfo.getSkuId());
            boolean flag = skuinfo.getOrdinaryInfo().getSkuProperty().get(34);
            if (flag) {
                sb.append(skuinfo.getSkuId()).append("\t\t").append("组合码商品不可参与组合购\n");
                skuInfoList.remove(skuinfo);
                i--;
            }
        }
    }
    return sb.toString();
}
```