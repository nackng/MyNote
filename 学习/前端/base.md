##textarea赋值问题
```
没有value属性,用innerHTML。

如果后台传过来的值，可以通过js进行赋值：
< textarea   id = "msgTextarea"    /> 

$( "#msgTextarea" ).val(${msgTemp.msgContent! '' })   

``` ##如何去掉button的formAction属性
```
1.去掉form的action,
2.改button的type=submit为button
```
##ztree获取中的值
var setting = {
   callback:{
        onCheck:onCheck
    }
};
function onCheck(e, treeId, treeNode) {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
    nodes = treeObj.getCheckedNodes(true),
    k = "";
    v = "";
    for (var i = 0; i < nodes.length; i++) {
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
##zTree的全选/全不选
<input id="select-all" type="checkbox" />全选
$('#select-all').on('change', function () {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
    nodes = zTree.getSelectedNodes();
    if ($(this).prop('checked')) {
        zTree.checkAllNodes(true);
    } else {
        zTree.checkAllNodes(false);
    }
    onCheck();
});

