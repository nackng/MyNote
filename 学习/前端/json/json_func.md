##json list转 java list对象
```
paramMap:
{title=t2, pushmode=1, pushType=1, msgType=2, suppId=1042, pushtime=2016-05-19 17:05:25, msgTemplateDto={contentType=2, msgType=4.0, pubnum=adb}, resList=[{title=测试2, imgsrc=http://192.168.1.23:8080/mmc-web/RES/assets/images/logo.png, order=2, remark=a}, {title=测试8, imgsrc=http://www.51qyz.cn/tpl/System/common/images/topbg.png, order=6, remark=r}]}


resList:
[{title=测试2, imgsrc=http://192.168.1.23:8080/mmc-web/RES/assets/images/logo.png, order=2, remark=a}, {title=测试8, imgsrc=http://www.51qyz.cn/tpl/System/common/images/topbg.png, order=6, remark=r}]


jsonList:
[{"title":"测试2","imgsrc":"http://192.168.1.23:8080/mmc-web/RES/assets/images/logo.png","order":"2","remark":"a"},{"title":"测试8","imgsrc":"http://www.51qyz.cn/tpl/System/common/images/topbg.png","order":"6","remark":"r"}]


List<TemplateResourceDto> tempResList:
[com.bn.b2b.wxChat.msgtemplate.dto.TemplateResourceDto@14881b0d, com.bn.b2b.wxChat.msgtemplate.dto.TemplateResourceDto@3c544981]


1.js:
function  addMsg1(){
     var  msg_form = $( '#addMsgForm' );
     var  parm = $.serializeObject(msg_form);
     var  suppId = $( "#suppId" ).val();
    parm.suppId = suppId;
     if (parm.pushmode ==  "1" ){
         var  now =  new  Date();
         var  applyDate = now.getFullYear()+ "-" +((now.getMonth()+1)<10? "0" : "" )+(now.getMonth()+1)+ "-" +(now.getDate()<10? "0" : "" )+now.getDate()+ " " +(now.getHours()<10? "0" : "" )+now.getHours()+ ":" +(now.getMinutes()<10? "0" : "" )+now.getMinutes()+ ":" +(now.getSeconds()<10? "0" : "" )+now.getSeconds();
        console.log(applyDate);
        parm.pushtime = applyDate;
    } else {
         var  pushDate = $( "#pushDate" ).val();
         var  pushHour = $( "#pushHour" ).val();
        parm.pushtime = pushDate +  " " +pushHour+ ":00:00" ;
    }
     var  msgContent = $( "#msgContent" ).val();
     var  pubnum = $( "#pubnum" ).val();
     var  msgTem =  new  Object();
    msgTem.contentType = parm.msgType;
    msgTem.msgContent = msgContent;
    msgTem.msgType = 4;
    msgTem.pubnum = pubnum;
    
    parm.msgTemplateDto = msgTem;
    
     var  paramJson = encodeURI(encodeURI(JSON.stringify(parm)));
    
     var  url = basePath +  '/message/addMsg.do?paramJson=' +paramJson;
    $.ajax({
        type :  "post" ,
        url : url,
        contentType :  "application/json;charset=utf-8" ,
        dataType :  "json" ,
        success :  function (data) {
             if  (data.status ==  "1" ) {
                alert( "推送消息成功" );
                goBack();
            } else   if  (data.status ==  "0" ) {
                alert( "推送消息失敗" );
            }
        }
    }); }  


2.action:
     @ResponseBody
     @RequestMapping (value =  "addMsg" , method = RequestMethod. POST , produces =  "application/json" )
     public  BaseResult addMsg(HttpServletRequest  request ,  @RequestParam  String  paramJson ) {
         log .info( "====addMsg====" );
        CompanyInfoDto  companyInfoDto  =  this .getMerchantInfo( request );
         String   suppId  =  companyInfoDto .getCompanyId().toString();
        BaseResult  br ;
         try  {
             paramJson  = java.net.URLDecoder. decode ( paramJson ,  "utf-8" );
            Map<String, Object>  paramMap  =  gson .fromJson( paramJson ,  new  TypeToken<Map<String, Object>>() {
            }.getType());
             br  =  msgService .addMsg( paramMap );
        }  catch  (Exception  e ) {
             log .error( "addMsg error:"  +  e .getMessage());
             br  =  new  BaseResult(BaseResult. ERROR , MmcErrorCode. ERROR_MSG_UNKNOW );
        }
         return   br ;     }   

3.service:
  String  msg  =  paramMap .get( "msgTemplateDto" ).toString();

            String  msgType  = (String)  paramMap .get( "msgType" );
            System. out .println( "2" .equals( msgType ));
            Object  resList  =  paramMap .get( "resList" );
            String  jsonList  = JsonUtil. toJson ( resList );
            List<TemplateResourceDto>  tempResList  = com.alibaba.fastjson.JSONArray. parseArray ( jsonList ,
                    TemplateResourceDto. class );
            Map<String, Object>  pMap  = com.bn.framework.web.controller.BaseController. gson .fromJson( msg ,
                     new  TypeToken<Map<String, Object>>() {
                    }.getType());
            JSONObject  msgTemp  = JSONObject. fromObject ( pMap );
            MsgTemplateDto  dto  = (MsgTemplateDto) JSONObject. toBean ( msgTemp , MsgTemplateDto. class );
             dto .setTempResList( tempResList );              task .setMsgTemplateDto( dto );
```
##String转Map
```
方法：
paramJson  = java.net.URLDecoder. decode ( paramJson ,  "utf-8" );
Map<String, Object>  paramMap  =  Gson   com . bn . framework . web . controller . BaseController . gson .fromJson( paramJson ,  new  TypeToken<Map<String, Object>>() {
            }.getType());
用法：
@ResponseBody
     @RequestMapping (value =  "addMsg" , method = RequestMethod. POST , produces =  "application/json" )
     public  BaseResult addMsg(HttpServletRequest  request ,  @RequestParam  String  paramJson ) {
         log .info( "====addMsg====" );
        CompanyInfoDto  companyInfoDto  =  this .getMerchantInfo( request );
        String  suppId  =  companyInfoDto .getCompanyId().toString();
        BaseResult  br ;
         try  {
             paramJson  = java.net.URLDecoder. decode ( paramJson ,  "utf-8" );
            Map<String, Object>  paramMap  =  gson .fromJson( paramJson ,  new  TypeToken<Map<String, Object>>() {
            }.getType());
            PushTaskDto  task  = JSON. parse ( paramJson , PushTaskDto. class );
             task .setPushmode(Integer. parseInt ((String)  paramMap .get( "pushmode" )));
             task .setPushType(Integer. parseInt ((String)  paramMap .get( "pushType" )));
             br  =  msgService .addMsg( task );
        }  catch  (Exception  e ) {
             log .error( "addMsg error:"  +  e .getMessage());
             br  =  new  BaseResult(BaseResult. ERROR , MmcErrorCode. ERROR_MSG_UNKNOW );
        }
         return   br ;     }   

 

```

##将字符串String转数组 List<Map<String, Object>>
```
1.
List<Map<String, Object>>  paramList  =  new  ArrayList<>();  
String  paramListStr  =  map .get( "paramList" );
         paramListStr  = StringUtil. proStr ( paramListStr ) ;
         paramList  = ConverUtil. parseJSON2List ( paramListStr );
 

2.proStr方法
public   static  String proStr(String  jsonStr ) {
        StringBuilder  sb  =  new  StringBuilder( jsonStr );
        String  strRes  =  "" ;
        String  str  =  sb .substring(2,  sb .length() - 2).toString();
         // str = str.replace("}", "");
         // str = str.replace("{", "");
        String[]  strArr  =  str .split( "," );
         for  ( int   i  = 0;  i  <  strArr . length ;  i ++) {
            String[]  sarr  =  strArr [ i ].split( "=" );
             sarr [1] =  "'"  +  sarr [1] +  "'" ;
            String[]  strArrRes  =  new  String[2];
             strArrRes [0] =  sarr [0];
             strArrRes [1] =  sarr [1];
             strRes  += String. join ( "=" ,  strArrRes ) +  "," ;
        }
        String  tem  =  strRes .substring(0,  strRes .length() - 1);
         tem  =  tem .replace( "}'" ,  "'}" );
         return   "[{"  +  tem  +  "}]" ;     }  
3.  parseJSON2List方法：
public   static  List<Map<String, Object>> parseJSON2List(String  jsonStr ) {
        JSONArray  jsonArr  = JSONArray. fromObject ( jsonStr );
        List<Map<String, Object>>  list  =  new  ArrayList<Map<String, Object>>();
        Iterator<JSONObject>  it  =  jsonArr .iterator() ;
         while  ( it .hasNext()) {
            JSONObject  json2  =  it .next();
             list .add( parseJSON2Map ( json2 .toString()));
        }
         return   list ;
    }  

4.  parseJSON2Map方法：
public   static  Map<String, Object> parseJSON2Map(String  jsonStr ) {
        Map<String, Object>  map  =  new  HashMap<String, Object>();
         // 最外层解析
        JSONObject  json  = JSONObject. fromObject ( jsonStr );
         for  (Object  k  :  json .keySet()) {
            Object  v  =  json .get( k );
             // 如果内层还是数组的话，继续解析
             if  ( v   instanceof  JSONArray) {
                List<Map<String, Object>>  list  =  new  ArrayList<Map<String, Object>>();
                Iterator<JSONObject>  it  =  ((JSONArray)  v ).iterator() ;
                 while  ( it .hasNext()) {
                    JSONObject  json2  =  it .next();
                     list .add( parseJSON2Map ( json2 .toString()));
                }
                 map .put( k .toString(),  list );
            }  else  {
                 map .put( k .toString(),  v );
            }
        }
         return   map ;     }   

对于处理为空的情况
XSActivityDto [id=3787b11b00854a7c84a8d7218a26adbf, suppId=1042, name=10010, startDttm=2016-05-12 10:00:00, endDttm=2016-05-21 09:00:00, discountType=1, status=null, createDttm=null, lastPer=null, lastDttm=null, url=null, descripe=null, img=http://mmcimg-10016961.image.myqcloud.com/373b9998-3c15-43f6-8f49-8f0bcc7df717, info=null, timeLast=0, goodsSum=null]



```
##判断是否满足Json格式
```
/**
     * 该字符串可能转为 JSONObject 或 JSONArray
     * 
     *  @param  string
     *  @return
     */
     public   static   boolean  mayBeJSON(String  string ) {
         return  (( string  !=  null ) && ((( "null" .equals( string )) || (( string .startsWith( "[" )) && ( string .endsWith( "]" )))
                || (( string .startsWith( "{" )) && ( string .endsWith( "}" ))))));
    }
     /**
     * 该字符串可能转为JSONObject
     * 
     *  @param  string
     *  @return
     */
     public   static   boolean  mayBeJSONObject(String  string ) {
         return  (( string  !=  null )
                && ((( "null" .equals( string )) || (( string .startsWith( "{" )) && ( string .endsWith( "}" ))))));
    }
     /**
     * 该字符串可能转为 JSONArray
     * 
     *  @param  string
     *  @return
     */
     public   static   boolean  mayBeJSONArray(String  string ) {
         return  (( string  !=  null )
                && ((( "null" .equals( string )) || (( string .startsWith( "[" )) && ( string .endsWith( "]" ))))));     }   

```
##Map与Json转换(通过Jackson)
```
/**
     * 函数注释：parseJSON2Map() <br>
     * 时间：2014 - 10 - 28 - 上午10:50:21 <br>
     * 用途：该方法用于json数据转换为<Map<String, Object>
     * 
     *  @param  jsonStr
     *  @return
     */
     public   static  Map<String, Object> parseJSON2Map(String  jsonStr ) {
        Map<String, Object>  map  =  new  HashMap<String, Object>();
         // 最外层解析
        JSONObject  json  = JSONObject. fromObject ( jsonStr );
         for  (Object  k  :  json .keySet()) {
            Object  v  =  json .get( k );
             // 如果内层还是数组的话，继续解析
             if  ( v   instanceof  JSONArray) {
                List<Map<String, Object>>  list  =  new  ArrayList<Map<String, Object>>();
                Iterator<JSONObject>  it  =  ((JSONArray)  v ).iterator() ;
                 while  ( it .hasNext()) {
                    JSONObject  json2  =  it .next();
                     list .add( parseJSON2Map ( json2 .toString()));
                }
                 map .put( k .toString(),  list );
            }  else  {
                 map .put( k .toString(),  v );
            }
        }
         return   map ;
    }
     /**
     * 函数注释：parseJSON2MapString() <br>
     * 用途：该方法用于json数据转换为<Map<String, String> <br>
     * 备注：*** <br>
     */
     public   static  Map<String, String> parseJSON2MapString(String  jsonStr ) {
        Map<String, String>  map  =  new  HashMap<String, String>();
         // 最外层解析
        JSONObject  json  = JSONObject. fromObject ( jsonStr );
         for  (Object  k  :  json .keySet()) {
            Object  v  =  json .get( k );
             if  ( null  !=  v ) {
                 map .put( k .toString(),  v .toString());
            }
        }
         return   map ;     }   

```
##json与list的转换
```
/**
     * 函数注释：parseJSON2List() <br>
     * 用途：该方法用于json数据转换为List<Map<String, Object>> <br>
     */
     public   static  List<Map<String, Object>> parseJSON2List(String  jsonStr ) {
        JSONArray  jsonArr  = JSONArray. fromObject ( jsonStr );
        List<Map<String, Object>>  list  =  new  ArrayList<Map<String, Object>>();
        Iterator<JSONObject>  it  =  jsonArr .iterator() ;
         while  ( it .hasNext()) {
            JSONObject  json2  =  it .next();
             list .add( parseJSON2Map ( json2 .toString()));
        }
         return   list ;
    }
     /**
     * 函数注释：parseJSON2ListString() <br>
     * 用途：该方法用于json数据转换为List<Map<String, String>> <br>
     */
     public   static  List<Map<String, String>> parseJSON2ListString(String  jsonStr ) {
        JSONArray  jsonArr  = JSONArray. fromObject ( jsonStr );
        List<Map<String, String>>  list  =  new  ArrayList<Map<String, String>>();
        Iterator<JSONObject>  it  =  jsonArr .iterator() ;
         while  ( it .hasNext()) {
            JSONObject  json2  =  it .next();
             list .add( parseJSON2MapString ( json2 .toString()));
        }
         return   list ;     }   

```