[TOC]
##创建zTree树
```
1.查询父节点
http://test.pmc.haiziwang.com/commodity-center-web/basic/listStoreForTree.do
[{"code":"XS","id":"22","isParent":true,"name":"线上","type":"1"},{"code":"SH","id":"14","isParent":true,"name":"上海1","type":"1"}]
2.查询子节点
http://test.pmc.haiziwang.com/commodity-center-web/basic/listStoreForTree.do?code=SD
[{"branchCode":"SD","code":"0301001","feature":1,"id":"134","name":"0301001","type":"2","yn":"1"},{"branchCode":"SD","code":"0301002","feature":1,"id":"135","name":"0301002","type":"2","yn":"1"}]

```
###根据返回的门店列表创建
getStoreByStore
{"storeDesc":"上海顺恒广场店","storeName":"上海顺恒","storeId":"12","storeCode":"8018"}

JSONArray maintenStores = empInfo.getJSONArray("maintenStores");
resMap.put("maintenStores", maintenStores.toJSONString());
if (maintenStores != null && maintenStores.size() > 0) {
    for (int i = 0; i < maintenStores.size(); i++) {
        JSONObject storeObj = maintenStores.getJSONObject(i);
        getStoreByStore(storeObj, i, resList);
    }
}
private void getStoreByStore(JSONObject storeObj, int i, List<StoreEntity> resList) {

    StoreEntity store = new StoreEntity();
    store.setId(storeObj.getInteger("storeCode"));
    store.setpId(-1);
    store.setCheck(false);
    store.setOpen(false);
    store.setName(storeObj.getString("storeName"));
    store.setStoreCode(storeObj.getString("storeCode"));
    resList.add(store);
}
###根据返回的区域列表创建
resMap.put("maintenParcels", maintenParcels.toJSONString());
if (maintenParcels != null && maintenParcels.size() > 0) {
    for (int i = 0; i < maintenParcels.size(); i++) {
        JSONObject partObj = maintenParcels.getJSONObject(i);
        getStoreByPart(partObj, i, resList);
    }
}
private void getStoreByPart(JSONObject partObj, int i, List<StoreEntity> resList) throws IOException {
    String url = PropertiesUtil.get("saleCenterStoreUrl");
    Map<String, String> map = new HashMap<String, String>();
    StoreEntity store = null;
    String code = partObj.getString("provinceId");
    if (!NormalUtil.isNullOrEmpty(code)) {
        map.put("branch", code);
    }

    store = new StoreEntity();
    store.setId(i);
    store.setCheck(false);
    store.setpId(-1);
    store.setOpen(false);
    store.setName(partObj.getString("provinceName"));
    store.setBrCode(partObj.getString("provinceId"));
    resList.add(store);
    String res = HttpClientUtils.doPost(map, url);
    JSONObject obj = JSON.parseObject(res);
    JSONArray dataArray = obj.getJSONArray("data");
    if (null != dataArray) {
        for (int j = 0; j < dataArray.size(); j++) {
            store = new StoreEntity();
            JSONObject storeObj = dataArray.getJSONObject(j);
            store.setId(Integer.parseInt(storeObj.getString("entity")));
            store.setpId(i);
            store.setCheck(false);
            store.setOpen(false);
            store.setName(storeObj.getString("store_name"));
            store.setStoreCode(storeObj.getString("entity"));
            resList.add(store);
        }
    }
}
function initStore(){
    var loginName = $("#createCode").val();
    //loginName = '29000145';
    var setting = {
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback:{
            onCheck:onCheck
        }
    };

    var zNodes =[];
    $.ajax({
        url: $ctx +'/ocanal/import/getStoreInfo.do?loginName='+loginName,
        type:'get',
        success:function(_data){
            if(_data.resultCode == 0){
                zNodes = _data.databody;
                $.each(zNodes, function(i,val){
                    if(this.isParent == "true"){
                        //this.nocheck = true;
                    }
                });
                $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            }else{
                layer.alert("获取门店信息失败！", {icon: 8});
                return false;
            }

        }
    });
}


