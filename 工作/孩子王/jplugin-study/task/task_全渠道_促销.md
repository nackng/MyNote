##Bug品类查询不到
```
/oprom/productPathQuery.do

http://localhost:8083/jplugin-study/oprom/productPathQuery.do?NaviId=303895
resp.getChildNav()为空
resp.getFullPath();不为空，有可能可以使用这个方法
[NavEntryDdo[version=142,NavId=1005159,MapId=1,PNavId=0,Name=母婴,Type=3,Catalog=0,Note=,Order=1,PropertyStr=00040000,SearchCond=,HasAttr=0,CustomStr1=,CustomStr2=,CustomUint1=0,CustomUint2=0,IsPreDelete=0,IsCooperatorFirst=0,IsLowPriceFirst=1,IsHighPriceFirst=0,PropertyMask={13},ExtraData={}], NavEntryDdo[version=142,NavId=1005166,MapId=1,PNavId=1005159,Name=奶粉,Type=3,Catalog=0,Note=,Order=10000,PropertyStr=00040000,SearchCond=,HasAttr=0,CustomStr1=,CustomStr2=,CustomUint1=0,CustomUint2=0,IsPreDelete=0,IsCooperatorFirst=0,IsLowPriceFirst=1,IsHighPriceFirst=0,PropertyMask={13},ExtraData={}], NavEntryDdo[version=142,NavId=1005169,MapId=1,PNavId=1005166,Name=国产奶粉,Type=3,Catalog=0,Note=,Order=10000,PropertyStr=00040000,SearchCond=,HasAttr=0,CustomStr1=,CustomStr2=,CustomUint1=0,CustomUint2=0,IsPreDelete=0,IsCooperatorFirst=0,IsLowPriceFirst=1,IsHighPriceFirst=0,PropertyMask={13},ExtraData={}], NavEntryDdo[version=142,NavId=303895,MapId=1,PNavId=1005169,Name=尿不湿,Type=4,Catalog=0,Note=,Order=0,PropertyStr=01040000,SearchCond=,HasAttr=1,CustomStr1=,CustomStr2=,CustomUint1=0,CustomUint2=0,IsPreDelete=0,IsCooperatorFirst=0,IsLowPriceFirst=1,IsHighPriceFirst=0,PropertyMask={7, 13},ExtraData={}]]  
```
##获取用户所拥有的权限
```
获取用户所拥有的权限：
http://test.salecenter.haiziwang.com/jplugin-study/cust/checkLoginPermission.do?siteToken=MjNGQUFBQzQzMDJCODM0MUU5M0QzMkZGRDI0NDczRDA=
```
##TODO
```
1.全渠道未获取到的字段
2.促销列表查询


``` ##参与商家
```
var  sellerMode = $( "input[name='sellerMode']:checked" ).val();
         if (sellerMode == 0){ //自营
            $( "#sel_seller_query_div" ).hide();
            $( "#sel_seller_select_div" ).hide();
        } else   if (sellerMode == 1){ //联营
            $( "#sel_seller_query_div" ).show();
            $( "#sel_seller_select_div" ).show();         }   

```
##满件数促销
```
< div   class = "row" >
                 < div   class = "col-md-12" >
                     < div   class = "form-group" >
                         < label   class = "control-label col-md-2" > 促销类型： </ label >
                         < div   class = "col-md-4" >
                             < select   class = "form-control"   id = "ruleType" >
                                 < option   value = "1" > 满件数定价 </ option >
                                 < option   value = "2" > 满件数减金额 </ option >
                                 < option   value = "3" > 满件数赠商品 </ option >
                             </ select >
                         </ div >
                     </ div >
                 </ div >              </ div >  


function  showRuleType(){
         var  type = $( "#ruleType option:selected" ).val();
        console.log( 'ruleType:' +type);
         if (type == 1 || type == 2){ //满件数定价,满件数减金额
            $( "#money_set_div" ).show();
            hideRuleType( '.money_gift_div' ); //满件数赠商品
            showMoneysetLabel(type);
        } else   if (type == 3){ //满件数赠商品
            $( "#money_gift_div" ).show(); //满件数赠商品
            $( "#money_set_div" ).hide();
        }
    }


function  showMoneysetLabel(type){
         if (type == 1){
            $( '#label_auto_money' ).html( '元' );
            $( '#label_manual_money' ).html( '元' );
        } else   if (type == 2){
            $( '#label_auto_money' ).html( '减金额（元）' );
            $( '#label_manual_money' ).html( '减金额（元）' );
        }
    }  

```
##金额设置
```
梯度类型 1 - 手动梯度 - 满X元 2 - 自动梯度 - 满X元(自动循环) 3 - 手动梯度 - 满X件 4 - 自动梯度 - 满X件(自动循环)
 *
 * 版本 >= 0
 */      private   long   conditionStageType ;  
```
##参数设置
resultCode = 10241，表示参数设置错误：
productIncludeList= [1234]
```
vector
SellerInclude = [0]
productIncludeList = [1234]

conditionStageInfo = {600=com.haiziwang.jplugin.study.dbo.ConditionPo@3d7447c5}
600:满金额
conditionPo = 
  {
500(favouragePrice)减金额
  }
conditionStageType = 2
discountType =1（满金额减金额）

参数一：discounType
/**
* 优惠促销类型 1优惠价格 2折扣 3赠品 4优惠券优惠 5换购 6定价
*
* 版本 >= 0
*/
private long discountType;
最终发现：就是 discountType这个参数没有设置导致 。
参数二：
/**
 * 梯度类型 1 - 手动梯度 - 满X元   2 - 自动梯度 - 满X元(自动循环) 3 - 手动梯度 - 满X件   4 - 自动梯度 - 满X件(自动循环)
 *
 * 版本 >= 0
 */       private   long   conditionStageType ;  //梯度类型
```
##对于品类，需要增加字段
```
查询线上、线下的品类 是同样的接口，调徐琦的。
创建规则时，我们本地会落地时（方便查询促销规则详情的时候展示 ），所以需要增加一个字段来区分 线上还是线下。
【脚本 要保留好，上线前让DBA先去执行】
ALTER TABLE `t_core_salecentercategory` ADD COLUMN channelType INT(11) COMMENT'渠道类型:0全渠道,1线上,2线下' AFTER categoryType;
```
##验证品类
```
if  ( includeCategoryList  !=  null  &&  excludeCategoryList  !=  null ) {
             if  ( includeCategoryList .get(0).get( "totalCategory" ) !=  null
                    &&  excludeCategoryList .get(0).get( "totalCategory" ) !=  null ) {
                 chkVal  = CategoryCheckUtil. checkSameInOutCategory ( includeCategory ,  excludeCategory );
                 switch  ( chkVal ) {
                 case  0:
                     logger .info( "包含品类和不包含品类验证通过" );
                     // 包含品类添加参数
                    StringBuffer  sbin  =  new  StringBuffer(1024);
                     logger .info( "includeCategoryList:"  +  includeCategoryList .size());
                     for  ( int   i  = 0;  i  <  includeCategoryList .size();  i ++) {
                        Vector<NavEntryDdo>  list  = (Vector<NavEntryDdo>)  includeCategoryList .get( i )
                                .get( "totalCategory" );
                         if  ( null  !=  list ) {
                             for  (NavEntryDdo  nav  :  list ) {
                                 sbin .append( nav .getNavId()).append( "," );
                            }
                             rulePo .setCategoryIncludeList(NormalUtil. GetUintByStringList ( sbin .toString()));
                        }  else  {
                             includeCategoryList .clear();
                        }
                    }
                     // 不包含品类添加参数
                     // 不包含品类的所有子品类赋值
                    StringBuffer  sbex  =  new  StringBuffer(1024);
                     logger .info( "excludeCategoryList:"  +  excludeCategoryList .size());
                     for  ( int   i  = 0;  i  <  excludeCategoryList .size();  i ++) {
                        Vector<NavEntryDdo>  list  = (Vector<NavEntryDdo>)  excludeCategoryList .get( i )
                                .get( "totalCategory" );
                         logger .info( "list:"  +  list );
                         if  ( null  !=  list ) {
                             for  (NavEntryDdo  nav  :  list ) {
                                 sbex .append( nav .getNavId()).append( "," );
                            }
                             rulePo .setCategoryExcludeList(NormalUtil. GetUintByStringList ( sbex .toString()));
                        }  else  {
                             excludeCategoryList .clear();
                        }
                    }
                     break ;
                 case  1:
                     logger .info( "包含品类中存在不包含品类" );
                     chkRes  = 3;
                     break ;
                }
            }  else   if  ( includeCategoryList .get(0).get( "totalCategory" ) !=  null
                    &&  excludeCategoryList .get(0).get( "totalCategory" ) ==  null ) {
                 switch  ( includeChkRes ) {
                 case  0:
                     logger .info( "包含品类验证通过" );
                     // 包含品类的所有子品类赋值
                    StringBuffer  sbin  =  new  StringBuffer(1024);
                     for  ( int   i  = 0;  i  <  includeCategoryList .size();  i ++) {
                        Vector<NavEntryDdo>  list  = (Vector<NavEntryDdo>)  includeCategoryList .get( i )
                                .get( "totalCategory" );
                         if  ( null  !=  list ) {
                             for  (NavEntryDdo  nav  :  list ) {
                                 sbin .append( nav .getNavId()).append( "," );
                            }
                             rulePo .setCategoryIncludeList(NormalUtil. GetUintByStringList ( sbin .toString()));
                        }  else  {
                             includeCategoryList .clear();
                        }
                    }
                     break ;
                 case  1:
                     logger .info( "包含品类存在重复品类!" );
                     chkRes  = 1;
                     break ;
                }
            }  else   if  ( includeCategoryList .get(0).get( "totalCategory" ) ==  null
                    &&  excludeCategoryList .get(0).get( "totalCategory" ) !=  null ) {
                 // 单独不包含品类
                 switch  ( excludeChkRes ) {
                 case  0:
                     logger .info( "不包含品类验证通过" );
                     // 排除品类的所有子品类赋值
                    StringBuffer  sbex  =  new  StringBuffer(1024);
                     for  ( int   i  = 0;  i  <  excludeCategoryList .size();  i ++) {
                        Vector<NavEntryDdo>  list  = (Vector<NavEntryDdo>)  excludeCategoryList .get( i )
                                .get( "totalCategory" );
                         if  ( null  !=  list ) {
                             for  (NavEntryDdo  nav  :  list ) {
                                 sbex .append( nav .getNavId()).append( "," );
                            }
                             rulePo .setCategoryExcludeList(NormalUtil. GetUintByStringList ( sbex .toString()));
                        }  else  {
                             excludeCategoryList .clear();
                        }
                    }
                     break ;
                 case  1:
                     logger .info( "不包含品类存在重复品类!" );
                     chkRes  = 2;
                     break ;
                }
            }         }   

```
##获取品类
```
List<Map<String, Object>>  excludeCategoryOffList  =  null ;
         int   excludeChkResOff  = CategoryCheckUtil. checkSameCategory ( excludeCategoryOff );
         if  ( excludeChkResOff  == 0) {
             excludeCategoryOffList  = getCategory( excludeCategoryOff );         }   

```
##落地品类
```
sql error:
INSERT INTO t_core_salecenterCategory (salePriceId,categoryType,channelType,category_big,category_middle,category_small,category_little,category_show_name,createTime,creator) VALUES (5421,0,1?,?,?,?,?,?,?) , (5421,0,1?,?,?,?,?,?,?) 

 Parameters: 1005159:母婴(String), 1005166:奶粉(String), 1005169:国产奶粉(String), 303895:尿不湿(String), 303895:尿不湿(String), 2016-11-25 17:01:30(String), Frank(String), 0000000:--大类--(String), 0000000:--中类--(String), 0000000:--小类--(String), 0000000:--品类--(String), 303895:尿不湿(String), 2016-11-25 17:01:30(String), Frank(String)   

原因为：mapper文件少了一个逗号(第3个参数后面 channelType)

     < insert   id = "addCategory" >
        insert into t_core_salecenterCategory (salePriceId,categoryType,channelType,category_big,category_middle,category_small,category_little,category_show_name,createTime,creator) 
            values 
             < foreach   collection = "categoryList"   item = "item"   separator = ","   index = "index" >
                (${item.salePriceId},${item.categoryType},${item.channelType}#{item.category_big},#{item.category_mid},#{item.category_small},#{item.category_little},#{item.category_show_name},#{item.createTime},#{item.creator})
             </ foreach >      </ insert >   

```
##线上、线下品类
```
includeRangeList  : 

[{navid=303895, name=尿不湿}, {navid=303895, name=尿不湿}, {navid=303895, name=尿不湿}, {navid=303885, name=孩子王特卖APP(普通商品)}]   

usedCategory:
[{category_mid_id=1005166, category_little_name=尿不湿, category_little_id=303895, category_big_id=1005159, category_sml_id=1005169, category_sml_name=国产奶粉, category_mid_name=奶粉, category_big_name=母婴}, {category_mid_id=0000000, category_little_name=--品类--, category_little_id=0000000, category_big_id=0000000, category_sml_id=0000000, category_sml_name=--小类--, category_mid_name=--中类--, category_big_name=--大类--}, {category_mid_id=1005166, category_little_name=尿不湿, category_little_id=303895, category_big_id=1005159, category_sml_id=1005169, category_sml_name=国产奶粉, category_mid_name=奶粉, category_big_name=母婴}, {category_mid_id=1005178, category_little_name=孩子王特卖APP(普通商品), category_little_id=303885, category_big_id=1005177, category_sml_id=1005179, category_sml_name=孩子王特卖APP, category_mid_name=孩子王特卖APP, category_big_name=孩子王特卖APP}]




usedCategorySelect:
<div class='col-md-12'><div class='form-group'><label class='control-label col-md-2'>品类：</label><div class='col-md-2'><select id='category_big' class='form-control' onchange='choseMidCategory(this,0)'><option selected='selected'  value='1005159' disabled='disabled'>母婴</option></select></div><div class='col-md-2'><select id='category_mid' class='form-control' onchange='choseSmlCategory(this,0)'><option selected='selected'  value='1005166' disabled='disabled'>奶粉</option></select></div><div class='col-md-2'><select id='category_sml' class='form-control' ><option selected='selected'  value='1005169' disabled='disabled'>国产奶粉</option></select></div><div class='col-md-2'><select id='category_sml' class='form-control' ><option selected='selected'  value='303895' disabled='disabled'>尿不湿</option></select></div></div></div><div class='row'></div><div class='col-md-12'><div class='form-group'><label class='control-label col-md-2'></label><div class='col-md-2'><select id='category_big' class='form-control' onchange='choseMidCategory(this,0)'><option selected='selected'  value='0000000' disabled='disabled'>--大类--</option></select></div><div class='col-md-2'><select id='category_mid' class='form-control' onchange='choseSmlCategory(this,0)'><option selected='selected'  value='0000000' disabled='disabled'>--中类--</option></select></div><div class='col-md-2'><select id='category_sml' class='form-control' ><option selected='selected'  value='0000000' disabled='disabled'>--小类--</option></select></div><div class='col-md-2'><select id='category_sml' class='form-control' ><option selected='selected'  value='0000000' disabled='disabled'>--品类--</option></select></div></div></div><div class='row'></div><div class='col-md-12'><div class='form-group'><label class='control-label col-md-2'></label><div class='col-md-2'><select id='category_big' class='form-control' onchange='choseMidCategory(this,0)'><option selected='selected'  value='1005159' disabled='disabled'>母婴</option></select></div><div class='col-md-2'><select id='category_mid' class='form-control' onchange='choseSmlCategory(this,0)'><option selected='selected'  value='1005166' disabled='disabled'>奶粉</option></select></div><div class='col-md-2'><select id='category_sml' class='form-control' ><option selected='selected'  value='1005169' disabled='disabled'>国产奶粉</option></select></div><div class='col-md-2'><select id='category_sml' class='form-control' ><option selected='selected'  value='303895' disabled='disabled'>尿不湿</option></select></div></div></div><div class='row'></div><div class='col-md-12'><div class='form-group'><label class='control-label col-md-2'></label><div class='col-md-2'><select id='category_big' class='form-control' onchange='choseMidCategory(this,0)'><option selected='selected'  value='1005177' disabled='disabled'>孩子王特卖APP</option></select></div><div class='col-md-2'><select id='category_mid' class='form-control' onchange='choseSmlCategory(this,0)'><option selected='selected'  value='1005178' disabled='disabled'>孩子王特卖APP</option></select></div><div class='col-md-2'><select id='category_sml' class='form-control' ><option selected='selected'  value='1005179' disabled='disabled'>孩子王特卖APP</option></select></div><div class='col-md-2'><select id='category_sml' class='form-control' ><option selected='selected'  value='303885' disabled='disabled'>孩子王特卖APP(普通商品)</option></select></div></div></div><div class='row'></div>

//不包含品类select(线上)
                     if (excludeCategory_on !=  "" ){
                        dlgHtml =  "" ;
                        $( "#unavailableCategory" ).html(excludeCategory_on);
                        $( "#unUsedCategory tbody" ).html( "" );
                         //不包含品类select详情
                         for ( var  i=0;i<excludeCategoryList.length;i++){
                            dlgHtml +=  "<tr><td>" +excludeCategoryList[i][ "navid" ]+ "</td>"
                                    + "<td>" +excludeCategoryList[i][ "name" ]+ "</td></tr>" ;
                        }
                        $( "#unUsedCategory tbody" ).html(dlgHtml);
                    } else {
                        $( "#excludeCategory_div" ).hide();
                        $( "#unavailableCategory" ).hide();
                    }
                    
                     //不包含品类select(线下)
                     if (excludeCategory_off !=  "" ){
                        dlgHtml =  "" ;
                        $( "#unavailableCategory" ).html(excludeCategory_off);
                        $( "#unUsedCategory tbody" ).html( "" );
                         //不包含品类select详情
                         for ( var  i=0;i<excludeCategoryList.length;i++){
                            dlgHtml +=  "<tr><td>" +excludeCategoryList[i][ "navid" ]+ "</td>"
                                    + "<td>" +excludeCategoryList[i][ "name" ]+ "</td></tr>" ;
                        }
                        $( "#unUsedCategory_off tbody" ).html(dlgHtml);
                    } else {
                        $( "#excludeCategory_off_div" ).hide();
                        $( "#unavailableCategory_off" ).hide();                     }  
 

```
##添加品类报错
```
解决：
将 ${item.channelType}修改为：#{item.channelType}
```
##促销 查询 error
```
[2016/11/29 12:30:41][ERROR][ConnectionState] Connection timed out for connection string (172.172.178.47:2181) and timeout (15000) / elapsed (35219)
org.apache.curator.CuratorConnectionLossException : KeeperErrorCode = ConnectionLoss
    at org.apache.curator.ConnectionState.checkTimeouts( ConnectionState.java:197 )
    at org.apache.curator.ConnectionState.getZooKeeper( ConnectionState.java:88 )
    at org.apache.curator.CuratorZookeeperClient.getZooKeeper( CuratorZookeeperClient.java:116 )
    at org.apache.curator.framework.imps.CuratorFrameworkImpl.performBackgroundOperation( CuratorFrameworkImpl.java:835 )
    at org.apache.curator.framework.imps.CuratorFrameworkImpl.backgroundOperationsLoop( CuratorFrameworkImpl.java:809 )
    at org.apache.curator.framework.imps.CuratorFrameworkImpl.access$300( CuratorFrameworkImpl.java:64 )
    at org.apache.curator.framework.imps.CuratorFrameworkImpl$4.call( CuratorFrameworkImpl.java:267 )
    at java.util.concurrent.FutureTask.run( FutureTask.java:266 )
    at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.access$201( ScheduledThreadPoolExecutor.java:180 )
    at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run( ScheduledThreadPoolExecutor.java:293 )
    at java.util.concurrent.ThreadPoolExecutor.runWorker( ThreadPoolExecutor.java:1142 )
    at java.util.concurrent.ThreadPoolExecutor$Worker.run( ThreadPoolExecutor.java:617 )     at java.lang.Thread.run( Thread.java:745 )  






启动error2:
org.apache.http.conn.ConnectTimeoutException : Connect to test.appcenter.haiziwang.com:80 [test.appcenter.haiziwang.com/172.172.178.9] failed: connect timed out
    at org.apache.http.impl.conn.DefaultHttpClientConnectionOperator.connect( DefaultHttpClientConnectionOperator.java:150 )
    at org.apache.http.impl.conn.PoolingHttpClientConnectionManager.connect( PoolingHttpClientConnectionManager.java:353 )  

```
##满件数、奇偶促销（促销类型）
```
discountType:优惠促销类型 1优惠价格 2折扣 3赠品 4优惠券优惠 5换购 6定价   
conditionStageType  : 梯度类型 1 - 手动梯度 - 满X元 2 - 自动梯度 - 满X元(自动循环) 3 - 手动梯度 - 满X件 4 - 自动梯度 - 满X件(自动循环)  
满金额减金额： ruleType =1,  discountType=1 , c onditionStageType( 1 or 2 ); // （满金额）1手动,2自动
满金额赠实物: ruleType=2,discountType=3,conditionStageType(1);
满金额换购： ruleType=3,discountType=5,conditionStageType(1 );
满金额返券： ruleType=4,discountType=4,conditionStageType( 1 );

满件数定价：    ruleType=10,discountType=6,conditionStageType(3 or 4 );// （满件数）3手动,4自动
满件数减金额： ruleType=14,discountType=1,conditionStageType(3 or 4 );

满件数赠商品： ruleType=2,discountType=3,conditionStageType(3 );

（线下）满金额折扣：    ruleType=12,discountType=2,conditionStageType(1 or 2)

（线下）满件数折扣：    ruleType=13,discountType=2,conditionStageType(3 or 4 )


奇偶定价：       ruleType=11,discountType=6,conditionStageType(4 );
奇偶打折：       ruleType=11,discountType=2,conditionStageType(4 );

问题：
满件数定价ruleType为1 还是10？同组合购是同一类型，10
奇偶打折 ruleType 是否为11？ 是11.

线下促销类型：
满金额折扣：ruleType = 12, discountType = 2
满件数折扣：ruleType = 13, discountType = 2

```
##rulePo入参
##根据销售类型（仅自营、跨商家过滤规则）
```
// prplist = filterConditionRule(sellType, sellerId, prplist);   

private  List<PromotionRulePo>  filterConditionRule(Integer  sellType , String  sellerId ,
            List<PromotionRulePo>  prplist )  {
        List<PromotionRulePo>  resList  =  new  ArrayList<PromotionRulePo>();
         if  ( sellType  == -1) {
             return   prplist ;
        }  else   if  ( sellType  == 0) {
             for  (PromotionRulePo  rule  :  prplist ) {
                Vector<uint64_t>  sellerInclude  =  rule .getSellerInclude();
                 if  ( sellerInclude  !=  null  &&  sellerInclude .size() == 1) {
                     for  (uint64_t  seller  :  sellerInclude ) {
                         if  ( seller .intValue() == 3) {
                             resList .add( rule );
                             break ;
                        }
                    }
                }
            }
        }  else   if  ( sellType  == 1) {
             for  (PromotionRulePo  rule  :  prplist ) {
                Vector<uint64_t>  sellerInclude  =  rule .getSellerInclude();
                 if  ( sellerInclude  !=  null  &&  sellerInclude .size() > 0) {
                     for  (uint64_t  seller  :  sellerInclude ) {
                         if  ( seller .intValue() == Integer. parseInt ( sellerId )) {
                             resList .add( rule );
                             continue ;
                        }
                    }
                }
            }
        }
         return   resList ;     }
//已选商家
                     /*if(entityFlag == 1){
                        for(var i = 0; i < sellerList.length; i++){
                            var id         = sellerList[i].partnerId;
                            var name     = sellerList[i].partnerName;
                            $("#selectedsellers").append("<option value='"+id+"'>("+id+")"+name+"</option>")
                        }
                    }*/
  

```
##对接中台待核查接口





##门店列表


##促销列表查询
```
全渠道：
http://localhost:8083/jplugin-study/oprom/promotionQuery.do?code=&entity=8000&saleway=1&actname=&ruletype=0&status=0&from=&creatername=&site=1&pageno=1&pagesize=10&sellerId=3&joinType=1&_=1481775298720




跨店铺：
http://localhost:8083/jplugin-study/cust/promotionQuery.do?code=&actname=&ruletype=0&status=0&from=&creatername=&site=1&pageno=1&pagesize=10&sellerId=3&joinType=1&_=1481775481762


```
跨店铺：



全渠道：





code_bak
```
function  removeSeller(){
     //销售模式
     var  sellModel = [];
    $( "input[name='sellModel']:checked" ).each( function (){
        sellModel.push($( this ).val());
    });
    sellModel = JSON.stringify(sellModel);
    console.log( "sellModel:" +sellModel);
    
     var  selectingSeller = $( "#selectingsellers" );
        var  sltSrc = $( "#selectingsellers option:selected" );
     var  sltTarget=document.getElementById( 'selectedsellers' );
     var  tempOption=sltSrc.val();
        for ( var  j=0;j<sltTarget.options.length;j++){
         if (tempOption==sltTarget.options[j].value){
            alert( "该商家已存在" );
            sltTarget.options[j].selected =  true ;
             var  myselect = $( "select#selectedsellers" );
            myselect[0].focus();
            myselect[0].selectedIndex = j;
             return ;
        }
    }
       
        var  ruleType = $( "#ruleType" ).val();
     if (ruleType != 0 && ruleType != 1){
         var  seller_count;
         if (selectedsellerStr != "" ){
            seller_count = selectedsellerStr.split( "," ).length;
        } else {
            seller_count = 0;
        }
           console.log( "ruleType:" +ruleType+ ",seller_count:" +seller_count+ ",selectedsellerStr:" +selectedsellerStr);
            if (seller_count > 0){
               alert( "该促销类型，只能选择1个商家" );
                return   false ;
           }
    }
    
       console.info( "selllength:" +selectedsellerStr);
       console.info( "tempOption:" +isNaN(tempOption));
        if (!isNaN(tempOption)){
            //记录添加的商家，查重使用
            if (selectedsellerStr ==  "" ){
               selectedsellerStr += tempOption;
        } else {
            selectedsellerStr +=  ","  + tempOption;
        }
           $( "#selectedsellers" ).append( "<option value='" +tempOption+ "'>" +sltSrc.text()+ "</option>" )
           $( "#selectingsellers option:selected" ).remove();
            var  seller_count;
         if (selectedsellerStr != "" ){
            seller_count = selectedsellerStr.split( "," ).length;
        } else {
            seller_count = 0;
        }
           console.log( "ruleType:" +ruleType+ ",seller_count:" +seller_count+ ",selectedsellerStr:" +selectedsellerStr);
           dynamicSeller(seller_count,ruleType, 'remove' );
       } else {
            return   false ;
       }
}
    
function  dynamicSeller(seller_count,ruleType,oper){
     //商家类型
     var  sellModel = [];
    $( "input[name='sellModel']:checked" ).each( function (){
        sellModel.push($( this ).val());
    });
    console.log( "sellModel:" +sellModel);
    console.log( "dynamicSeller.seller_count:" +seller_count);
     if (sellModel.length > 1){ //多种商家类型
        $( "#ruleType" ).val(1);
        $( "#ruleType" ).attr( "disabled" , "disabled" );
        
    } else   if (sellModel.length == 1){
         if (sellModel[0] == 2){ //仅全球购商家
            $( "#ruleType" ).removeAttr( "disabled" );
        } else { //非全球购商家
                if (seller_count >= 2){ //已选择1家商家
                   $( "#ruleType" ).val(1);
                $( "#ruleType" ).attr( "disabled" , "disabled" );
               } else {
                   $( "#ruleType" ).removeAttr( "disabled" );
               }
            
        }
    }
    
    showRuleType(); //促销规则
    showMoneyset(); //金额设置
}
    
/*取消商家*/
function  addSeller(){
     var  ruleType = $( "#ruleType" ).val();
     var  sltSrc=document.getElementById( 'selectingsellers' );
     var  sltTarget=document.getElementById( 'selectedsellers' );
     for ( var  i=0;i<sltTarget.options.length;i++)
    {
         var  tempOption=sltTarget.options[i];
         if (tempOption.selected){
            sltTarget.removeChild(tempOption);
            sltSrc.appendChild(tempOption);
               console.info( "删除前selectedsellers:" +selectedsellerStr);
              selectedsellerStr = selectedsellerStr.replace(tempOption.value, "" ).replace( ",," , "," ).replace( "/,$/gi" , "" );
               if (selectedsellerStr.substr(0,1) ==  "," ){
                  selectedsellerStr = selectedsellerStr.substr(1);
              }
               console.info( "删除后selectedsellers:" +selectedsellerStr);
                if (selectedsellerStr.lastIndexOf( "," ) == selectedsellerStr.length-1){
                   selectedsellerStr = selectedsellerStr.substring(0,selectedsellerStr.length-1);
               }
             var  seller_count;
                if (selectedsellerStr != "" ){
                   seller_count = selectedsellerStr.split( "," ).length;
               } else {
                   seller_count = 0;
               }
            console.log( "seller_count:" +seller_count+ ",selectedsellerStr:" +selectedsellerStr)
            dynamicSeller(seller_count,ruleType, 'add' );
        }
    }
    console.info( "最后的sellers:" +selectedsellerStr); }   

```
##促销查询
```
1. 查询满金额赠实物
http://localhost:8083/jplugin-study/oprom/promotionQuery.do?ruleId=&entity=8000&saleway=1&actname=&ruletype=2&status=0&from=&creatername=&site=1&pageno=1&pagesize=10&sellerId=&joinType=&_=1482369557873




```
##只有孩子王自营与全球购商家才能选择全球购商品（除了孩子王自营，其他商家包含全球购商家，必须要验证是否属于所选择商家）


##点击查询，对应的商品数量 + 1


```
$("#query_gift").click(function(){
$("#validateInfo").css("display","none");
var skuid=$("input[name='skucode_gift']").val();  
var siteId=$("#site option:selected").val();
//获取类型
var type = $("#type option:selected").val();
if(type==""){
alert("请选择类型");
return;
}


if(skuid=="")
{
alert("请输入商品ID");
return;
}

if($("#num_gift_" + skuid).val())
{
var num = $("#num_gift_" + skuid).val();
if(!isNaN(num))
{
$("#num_gift_" + skuid).val(++num);
}
else
{
$("#num_gift_" + skuid).val(1);
}
}
else
{
$.ajax({
url:'/jplugin-study/cust/pmSingleQueryForSku.do',
data:{"skuid":skuid,"siteId":siteId},
dataType:'json',
cache:false,
type:'get',
success:function(data){
var dlgHtml = "";
var tip = "";
if(data.resultCode == "1")
{
//var ordinary = data.otherbody;
//获取skuinfo
var skuinfo = data.databody;
var areaPrice = '未知';
var areaCostPrice = '未知';

//组合购商品标志位
var isComb = [];
if(typeof(skuinfo) != undefined){
isComb = skuinfo.combChildSkuInfoList;
}
if(isComb.length > 0 && type==6){//类型为买A赠B且为组合购商品
tip = "*组合码商品不可作为赠品出售！请更换！";
$("#validateInfoSpan").text(tip);
$("#validateInfo").css("display","block");
}else{
if('' != data.msg){
areaPrice = data.msg.split("-")[0] / 100.0;
areaCostPrice = data.msg.split("-")[1] / 100.0;
}
dlgHtml = "<tr id='tr_gift_" + skuinfo["skuId"] + "' erpCode='" + data.msg.split("-")[2] + "' areaPrice='" + data.msg.split("-")[0] + "' skuid='" + skuinfo["skuId"] + "' skutitle='" + skuinfo["ordinaryInfo"]["skuTitle"] + "'><td>"+skuinfo["skuId"]+"</td><td>" + skuinfo["ordinaryInfo"]["skuTitle"] + "</td><td id='areaPrice" + skuinfo["skuId"] + "' val='" + areaPrice + "'>"+ areaPrice+"</td><td>"+areaCostPrice+"</td><td><input type='text' class='form-control' maxlength='12' value='1' id='num_gift_" + skuid + "' style='width:60px;' onkeyup='changeVal(this)' onafterpaste='changeVal(this)'></td><td><button type='button' class='btn default' onclick=delTr('tr_gift_" + skuid + "')>删除</button></td></tr>";
$('#sample_gift tbody').append(dlgHtml);
}
}else{
alert(data.msg);
}
}
});
}

});
```
##线上、线下品类及品牌
```
线上与原有逻辑保持一致。
线下品类：需要调用两次接口，第一次与原来接口一样，第二次需要再调用一次。
http://localhost:8083/jplugin-study/cust/productPathQuery.do?NaviId=1005159
调用大类、中类、小类时，只有NaviId这一个参数不同。


线下品牌：与线上品牌是调用不同的接口。
http://localhost:8083/jplugin-study/cust/promotionAttrQuery.do?brandName=s&attrid=55




/**
     * 获得线下品牌
     */
     public   void  getOfflineBrandSelect() {
        WebStubCntl  stub  = CppClientProxyFactory. createCppWebStubCntl ();
        RespJson  resjon  =  new  RespJson();
        String  erpBrandName  =  "" ;
        List<BrandInfoPo>  baseofflineBrandList  =  new  ArrayList<BrandInfoPo>();
         erpBrandName  = NormalUtil. decodeToString (getParam( "erpBrandName" ));
         final  GetErpBrandsReq  req  =  new  GetErpBrandsReq();
         req .setMachineKey( this . MachineKey  +  "_getOfflineBrandSelect" );
         req .setSource( this . Source );
         req .setSceneId( this . SceneId );
         final  GetErpBrandsResp  resp  =  new  GetErpBrandsResp();
         try  {
             stub .invoke( req ,  resp , 1024 * 1024);
             if  ( resp .getResult() == 0 &&  resp .getBrandInfo() !=  null ) {
                 // 筛选erp线下品牌
                Iterator<Map.Entry<String, BrandInfoPo>>  entries  =  resp .getBrandInfo().entrySet().iterator();
                 while  ( entries .hasNext()) {
                    Map.Entry<String, BrandInfoPo>  entry  =  entries .next();
                     if  ( entry .getValue().getErpBrandName().indexOf( erpBrandName ) > -1) {
                         baseofflineBrandList .add( entry .getValue());
                    }
                }
                 resjon .setResultCode( "1" );
                 resjon .setDatabody( baseofflineBrandList );
                renderJson(JSON. toJSONString ( resjon ));
            }  else  {
                 resjon .setResultCode( resp .getResult() +  "" );
                 resjon .setMsg( resp .getErrmsg());
            }
        }  catch  (Exception  e ) {
             e .printStackTrace();
             resjon .setResultCode( "0" );
             resjon .setMsg( "调用查询线下品牌接口异常" );
            renderJson(JSON. toJSONString ( resjon ));
        }
    }
     /**
     * 获得线上、线下品类
     */
     public   void  getCategory() {
        WebStubCntl  stub  = CppClientProxyFactory. createCppWebStubCntl ();
        RespJson  resjon  =  new  RespJson();
        Integer  NaviId  = Integer. parseInt (getParam( "NaviId" ));
         int   type  = Integer. parseInt (getParam( "type" ));
         final  GetPathByNavId_WGReq  req  =  new  GetPathByNavId_WGReq();
         req .setMachineKey( this . MachineKey  +  "haiziwang213123" );
         req .setSource( this . Source );
         req .setSceneId( this . SceneId );
         req .setMapId( this . MapId );
         req .setNavId( NaviId );
         final  GetPathByNavId_WGResp  resp  =  new  GetPathByNavId_WGResp();
         resp .setFullPath( new  Vector<NavEntryDdo>());
         resp .setChildNav( new  Vector<NavEntryDdo>());
         try  {
             stub .invoke( req ,  resp , 1024 * 1024);
            List<NavEntryDdo>  ned  =  resp .getChildNav();
             if  ( ned  !=  null  &  ned .size() > 0) {
                List<Map<String, Object>>  nedList  =  null ;
                 if  ( type  != 0) {
                     // 将线上品类转换成线下品类
                     nedList  = formatOfflineCategory( ned );
                }
                 resjon .setResultCode( "1" );
                 resjon .setDatabody( ned );
                 resjon . setInitDataBody ( nedList );
                 resjon .setMsg( "" );
                renderJson(JSON. toJSONString ( resjon ));
            }  else  {
                 resjon .setResultCode( "0" );
                 resjon .setMsg( "no data" );
                renderJson(JSON. toJSONString ( resjon ));
            }
        }  catch  ( final  Exception  e1 ) {
             resjon .setResultCode( "0" );
             resjon .setMsg( "Query Error" );
            renderJson(JSON. toJSONString ( resjon ));
             e1 .printStackTrace();
        }
    }
     /**
     * 把线上品类转换成线下品类
     *  @param  navList
     *  @return
     *  @throws  Exception 
     */
     private  List<Map<String, Object>> formatOfflineCategory(List<NavEntryDdo>  navList )  throws  Exception {
        WebStubCntl  stub  = CppClientProxyFactory. createCppWebStubCntl ();
        List<Map<String, Object>>  offlineCategoryList  =  new  ArrayList<Map<String, Object>>();
        Vector<uint64_t>  navIds  =  new  Vector<uint64_t>();
         final  GetPubNavReq  req  =  new  GetPubNavReq();
         req .setMachineKey( this . MachineKey  +  "_formatOfflineCategory" );
         req .setSceneId( this . SceneId );
         req .setSource( this . Source );
        uint64_t  t  =  null ;
         for  (NavEntryDdo  nav  :  navList ) {
             t  =  new  uint64_t();
             t .setValue( nav .getNavId());
             navIds .add( t );
        }
        PubNavFilterPo  po  =  new  PubNavFilterPo();
         po .setPubNavId( navIds );
         req .setRequestFilter( po );
         final  GetPubNavResp  resp  =  new  GetPubNavResp();
         stub .invoke( req ,  resp , 1024 * 1024);
         if  ( resp .getResult() == 0 &&  resp .getPubNav() !=  null ) {
            Map<String, Object>  navMap  =  null ;
            Map<uint32_t, PubNavPo>  pubNavMap  =  resp .getPubNav();
            PubNavPo  pubNavPo  =  null ;
            uint32_t  u32  =  null ;
             for  (uint64_t  nav  :  navIds ) {
                 navMap  =  new  HashMap<String, Object>();
                 u32  =  new  uint32_t();
                 u32 .setValue( nav .intValue());
                 logger .info( "--pubNavPo--"  +  pubNavMap .get( u32 ));
                 if  ( pubNavMap .get( u32 ) !=  null ) {
                     pubNavPo  =  pubNavMap .get( u32 );
                     navMap .put( "navId" ,  pubNavPo .getErpPubNavId());
                     navMap .put( "name" ,  pubNavPo .getErpPubNavName());
                     offlineCategoryList .add( navMap );
                }
            }
        }
         return   offlineCategoryList ;     }   

```
##线下品类
```
FILE:ao_classconfig_WG.cpp LN:1302 FUN:GetMetaClassesByPubNavId EN:3585 EM:pubnav[1:1005591] not exists
includeCategory:
1005159,母婴;1005166,奶粉;1005169,国产奶粉;303895,尿不湿
根据303895查询
[NavEntryDdo[version=142,NavId=303895,MapId=1,PNavId=1005169,Name=尿不湿,Type=4,Catalog=0,Note=,Order=0,PropertyStr=01040000,SearchCond=,HasAttr=1,CustomStr1=,CustomStr2=,CustomUint1=0,CustomUint2=0,IsPreDelete=0,IsCooperatorFirst=0,IsLowPriceFirst=1,IsHighPriceFirst=0,PropertyMask={7, 13},ExtraData={}]]


includeCategoryOff:
1005586,玩具;1005589,益智成长类;1005590,手工制作;1005591,彩泥






```