##ajax嵌套使用
```
1.js代码：
function  checkPub(id){
    $.ajax({  
        url: '${base}/cr/checkPub.do?id=' +id,
        type: 'post' ,  
        cache: false ,  
        dataType: 'json' ,  
        success: function (data) {  
             if (data.status ==  "1"  ){  
                publish(id);
            } else {  
                layer.msg( '未关联商品不可发布' , { time: 1500 });
            }  
         },  
         error :  function () {  
              console.log( "查询是否关联商品异常" );  
         }  
    });
}
function  publish(id){
    $.ajax({  
        url: '${base}/cr/publish.do?id=' +id,
        type: 'post' ,  
        cache: false ,  
        dataType: 'json' ,  
        success: function (data) {  
             if (data.status ==  "1"  ){  
                alert( '发布成功' );
                goBack();
            } else {  
                layer.msg( '发布失败，请重试' , { time: 1500 });
            }  
         },  
         error :  function () {  
              console.log( "发布优惠券异常！" );  
         }  
    }); }   


2.java代码：
@RequestMapping (value =  "checkPub" )
     public  String checkPubGoods(HttpServletRequest  request , HttpServletResponse  response , String  id ) {
         boolean   flag  =  false ;
         log .info( "DisRuleAction====>checkPubGoods====>ruleId:"  +  id );
         try  {
            PagerParam  pageParam  =  new  PagerParam();
             pageParam .setPageNumber(MmcConstants.intNum. NUM_1 );
             pageParam .setPageSize(MmcConstants.intNum. NUM_5 );
            Pager<CouponGoodsDto>  pager  =  disRuleService .queryAddList( id ,  pageParam );
            BaseResult  br  =  new  BaseResult();
             if  ( pager  !=  null  &&  pager .getDatas().size() > 0) {
                 br .setStatus(BaseResult. SUCCESS );
                 br .setContent( "此优惠券已关联商品" );
            }  else  {
                 br .setStatus(BaseResult. ERROR );
                 br .setContent( "此优惠券尚未关联商品" );
            }
             return  ajaxJson( response , JSONObject. fromObject ( br ).toString());
        }  catch  (Exception  e ) {
             log .error( "DisRuleAction====>publish====>error：" ,  e .toString());
             return   "" ;
        }
    }
@RequestMapping (value =  "publish" )
     public  String publish(HttpServletRequest  request , HttpServletResponse  response , String  id ) {
         boolean   flag  =  false ;
         log .info( "DisRuleAction====>publish====>id:"  +  id );
         try  {
            UserInfoDto  userInfo  = getUserInfo( request );
            String  userId  =  userInfo  ==  null  ?  ""  :  userInfo .getUserId().toString();
            HttpSession  session  =  request .getSession();
             // 从session中取得用户id
            CompanyInfoDto  companyInfoDto  =  this .getMerchantInfo( request );
            String  suppId  =  companyInfoDto .getCompanyId().toString();
             flag  =  disRuleService .publishCouponRule( id ,  userId );
            BaseResult  br  =  new  BaseResult();
             br .setStatus(BaseResult. SUCCESS );
             if  (! flag ) {
                 br .setStatus(BaseResult. ERROR );
            }
             return  ajaxJson( response , JSONObject. fromObject ( br ).toString());
        }  catch  (Exception  e ) {
             log .error( "DisRuleAction====>publish====>error：" ,  e .toString());
             return   "" ;
        }
    }  

``` ##ajax验证用户名是否存在
```
< input   id = "existFlag"   type = "type"   />   

< input   id = "account"   name = "account"   type = "text"   class = "form-control validate[required]"   maxlength = "40"   onblur = "checkAccount(this);" />   

function  checkAccount(obj){
     var  account = $(obj).val();
     var  url = basePath +  '/payment/check.do?account='  + account;
    $.ajax({
        type :  "post" ,
        url : url,
        async:  false ,
        contentType :  "application/json;charset=utf-8" ,
        dataType :  "json" ,
        success :  function (data) {
             if  (data.status ==  "1" ) {
                console.log( "该支付宝账号已存在，无法继续申请" );
                    $( "#existFlag" ).val( "1" );

                 return   true ; //exist
            } else   if  (data.status ==  "0" ) {
                console.log( "该支付宝账号不存在，可以申请" );
                    $( "#existFlag" ).val( "0" );

                 return   false ; // not exist
            }
        }
    }); }   

if ($( "#existFlag" ).val()== "1" ){
    layer.msg( "支付宝帐号已存在,无法继续" );
    } else {
      console.log( "支付宝申请验证通过" );
      saveAlipay(${flag}); }   



function  saveAlipay(flag){
     var  apply_form = $( '#apply_form' );
     var  param = $.serializeObject(apply_form);
     var  paramJson = encodeURI(encodeURI(JSON.stringify(param)));
    
     var  url = basePath +  '/payment/addPayAlip.do?paramJson='  + paramJson;
    $.ajax({
        type :  "post" ,
        url : url,
        contentType :  "application/json;charset=utf-8" ,
        dataType :  "json" ,
        success :  function (data) {
            $( "#save" ).removeAttr( "disabled" );
             if  (data.status ==  "1" ) {
                alert(data.message);
            } else   if  (data.status ==  "0" ) {
                alert(data.message);
            }
        }
    }); }   

```