[TOC]
##1、Js实现回车查询
①：JS监听某个输入框
//回车事件绑定
$('#search_input').bind('keyup', function(event) {
    if (event.keyCode == "13") {
        //回车执行查询
        $('#search_button').click();
    }
});
②：JS监听某个DIV区域
$("#queryTable").bind("keydown",function(e){
        // 兼容FF和IE和Opera    
    var theEvent = e || window.event;    
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;    
    if (code == 13) {    
        //回车执行查询
            $("#queryButton").click();
        }    
});

##Js实现鼠标进入文本框清空文本移出还原默认值
<input id="keyWord" name="keyWord" type="text" value="标题/发布人" defaultValue="标题/发布人" onfocus="$(this).val('');" onblur="if($(this).val()=='')$(this).val($(this).attr('defaultValue'))" />
