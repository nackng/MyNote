[TOC]
##ztree中的autoParam参数
```
autoParam作用是：
异步加载时需要自动提交父节点属性的参数。[setting.async.enable = true 时生效]
默认值：[ ]

[ "id", "name" ]就是会把父节点里的id，name属性也提交过去。
```
##ztree页面没有按树的结构展现出来
有可能是从数据库中查出来的数据没有排好序导致的。
##ztree回显数据
http://blog.sina.com.cn/s/blog_6b2a34c50102uwfn.html
var zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo");    
// 获取 zTree 对象，是一个全局变量，用户可以随时使用此方法获取需要进行操作的 zTree 对象
var tids = [103,102];//假设要选中的节点的id为103,102这两个节点
var nodes = zTree_Menu.transformToArray(zTree_Menu.getNodes());
if(nodes.length > 0) {
    for(var j =0;j<tids.length;j++){
        for (var i = 0; i < nodes.length; i++) {
            if(nodes[i].id == tids[j]) {
                nodes[i].checked = true;
                zTree_Menu.updateNode(nodes[i]);
                zTree_Menu.selectNode(nodes[i],true);//指定选中ID的节点
                zTree_Menu.expandNode(nodes[i], true, false);//指定选中ID节点展开
            }
        }
    }
}

##模拟点击事件
var tree = $.fn.zTree.getZTreeObj("topicTree");
var sel = tree.getNodeByParam('id', '${topicId}');
/* tree.expandNode(sel,true,true, true, true);
                    tree.selectNode(sel); */
$("#" + sel.tId + "_a").click();

##需要触发自动关联勾选操作
var setting = {
    check: {
        enable: true,
        autoCheckTrigger: true
    }
};
##ztree 展开到选中节点
var treeObj = $("#treeDemo");
$.fn.zTree.init(treeObj, setting, Znode1);
zTree_Menu = $.fn.zTree.getZTreeObj("treeDemo");
var node = zTree_Menu.getNodeByParam("id", pid);
zTree_Menu.selectNode(node, true); //指定选中ID的节点
zTree_Menu.expandNode(node, true, false); //指定选中ID节点展开
<!-- treeDemo 就是你显示树的网页中DIV的ID -->
<!-- Znode1 是你的树的JSOn数据 -->
<!-- pid  就是你指定要选中 或者要展开节点的 ID -->
<!-- node 获取你指定ID的节点 -->
<!-- selectNode 方法是选中指定的节点 -->
<!-- expandNode 方法是展开你指定ID的几点方法 -->
##查看页面ztree不让其修改
//设置禁用的复选框节点
function setDisabledNode(){
      var treeObj = $.fn.zTree.getZTreeObj("columnTree");
      var disabledNode = treeObj.getNodeByParam("level", 0);
      treeObj.setChkDisabled(disabledNode, true);   
}
实例一：
function initStore(){
    var loginName = $("#createCode").val();
    loginName = '29000145';
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
        async:false,
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

function onCheck(e, treeId, treeNode) {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
    nodes = treeObj.getCheckedNodes(true),
    k = "";
    v = "";
    for (var i = 0; i < nodes.length; i++) {
        treeObj.setChkDisabled(nodes[i],true);//关键代码，设置每一个节点置灰。
        if(!nodes[i].isParent){
            k += nodes[i].storeCode + ",";
            v += nodes[i].name + ",";
        }
    }
    if(k!=""){
        k = k.substr(0,k.length-1);
    }
    if(v!=""){
        v = v.substr(0,v.length-1);
    }
    $("#storecodes").val(k);
    $("#storenames").val(v);
    
}

