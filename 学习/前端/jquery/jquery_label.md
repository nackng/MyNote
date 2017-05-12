[TOC]
动态设置label的值
var type = $("#ruleType option:selected").val();
if(type=="7"){
    $("#label_gift").html("换购商品：");
}else if(type=="6"){
    $("#label_gift").html("赠品：");
}