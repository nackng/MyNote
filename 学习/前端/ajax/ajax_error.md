##ajax请求error parseerror

```
现像：后台 能够正常并返回，但页面ajax 执行不到success的回调函数。
error : function ( XMLHttpRequest , textStatus , errorThrown ) {
alert ( XMLHttpRequest . status );
alert ( XMLHttpRequest . readyState );
alert ( textStatus );
},
textStatus: parse error.
原因：服务器返回的数据格式有问题，不是标准json格式，导致 ajax请求不是Success,而是error.
举例：服务器返回的某个对象为map<String,Object> 其中第二个参数Object如果真的是一个对象 ，那返回的数据就不是标准json格式。
改为List<Object>就可以了。


```
## No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://192.168.24.87:8083' is therefore not allowed access.
```
var jsontree = [];
$.ajax({
    url: "http://192.168.2.46:8000/account/getjson/",
    type: "GET",
    dataType: 'JSON',
    success: function(result){
        jsontree = result;
    }
});
将上面的dataType: 'JSON'替换为dataType: 'JSONP'即可。
返回的json数据没有问题。 估计是jquery 处理jsonp与json的方式不一样。
```
##ajax 设置async:false后，导致不停的发起同一个请求
```
function  toDetail(priceId,skuId) {
    $( "#priceId" ).val(priceId);
    $( "#skuId" ).val(skuId);
    $.ajax({
        url: '${ctx}/ocanal/multiPriceQueryDetail.do' ,
        data:{ "skuId" :skuId, "priceId" :priceId},
        dataType: 'json' ,
        cache: false ,
        type: 'post' ,
        success: function (data){
            if (data.resultCode ==  "1" ) {
                var  compensateList = QueryCompensate(priceId,skuId); //查询补偿信息
            }
         }

    }); }   



function  QueryCompensate(priceId,skuId){ //tag:0展示已选 门店信息，tag:1补偿信息详情
     var  comlist;
     var  dlgHtml =  "" ;
    
     var  compensateType = $( "#compensateTypeHid" ).val(); //优惠类型type:1定价，type:2折扣
     var  divtag = (compensateType==1)? "0" : "1" ;
    
    $.ajax({
        url: '${ctx}/ocanal/multiPriceQueryCompensate.do' ,
        data:{ "skuId" :skuId, "priceId" :priceId},
        dataType: 'json' ,
        async: false ,
        cache: false ,
        type: 'post' ,
        success: function (data){
             if (data.resultCode ==  "1" ){
                comlist = data.databody;
                $( "#compensate_div" ).hide();
                 for ( var  i=0;i<comlist.length;i++){
                    $( "#compensate_div" ).show();
                     if (compensateType==1){ //定价
                        dlgHtml = dlgHtml +  "<tr><td>" +comlist[i][ "entityId" ]+ "</td><td>" +getChannelInclude(comlist[i][ "sourceId" ])+ "</td><td>" +comlist[i][ "supplierId" ]+ "</td><td>" + getYuanByFen(comlist[i][ "purchaseCost" ])+ "</td><td>" + getYuanByFen(comlist[i][ "specPrice" ])+ "</td></tr>" ;
                    } else   if (compensateType==2){ //折扣
                        dlgHtml = dlgHtml +  "<tr><td>" +comlist[i][ "entityId" ]+ "</td><td>" +getChannelInclude(comlist[i][ "sourceId" ])+ "</td><td>" +comlist[i][ "supplierId" ]+ "</td><td>" + getYuanByFen(comlist[i][ "purchaseCost" ])+ "</td><td>" + getYuanByFen(comlist[i][ "agioRate" ])+ "</td></tr>" ;
                    }
                }
            } else {
                alert(data.msg);
            }
        }
    });
    console.log( "dlgHtml:" +dlgHtml);
    $( "#compensateHtmlHid" ).val(dlgHtml);
    $( '#compensate_' +divtag+ ' tbody' ).html( '' ); //todo
    $( '#compensate_' +divtag+ ' tbody' ).html(dlgHtml);
     return  comlist; }   





解决：
对dlgHtml的操作、以及return comlist的操作，一定要放在反调函数 success:function的外面才不会导致重复不停的发起同一个ajax请求。
```