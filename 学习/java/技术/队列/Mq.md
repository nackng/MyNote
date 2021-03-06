##mq初试
```
1.下载ActiveMQ 
去官方网站下载：http://activemq.apache.org/ 
我下载的时候是 ActiveMQ 5.8.0 Release版 


2.运行ActiveMQ 
解压缩apache-activemq-5.8.0-bin.zip，然后双击apache-activemq-5.5.1\bin\activemq.bat运行ActiveMQ程序。 


启动ActiveMQ以后，登陆：http://localhost:8161/admin/，创建一个Queue，命名为FirstQueue。 


3.创建Eclipse项目并运行 
创建java project：ActiveMQ-5.8，新建lib文件夹 
打开apache-activemq-5.8.0\lib目录 
拷贝 
activemq-broker-5.8.0.jar 
activemq-client-5.8.0.jar 
geronimo-j2ee-management_1.1_spec-1.0.1.jar 
geronimo-jms_1.1_spec-1.1.1.jar 
slf4j-api-1.6.6.jar 
这5个jar文件到lib文件夹中,并Build Path->Add to Build Path 
```
##mq在两个不同系统间同步数据
```
Activiti-service中：
1.生产者发送消息（activity系统 实现类中调用 sendVirtualTopic方法 发送消息）
com.bn.b2b.activitys.service.sp.ApplyGoodServiceImpl

/**
 * 
 * 申请商品业务接口实现
 */
@Service ( "applyGoodService" )
@ com.alibaba.dubbo.config.annotation. Service (protocol = { "dubbo" })
public   class  ApplyGoodServiceImpl  implements  ApplyGoodService{
    
     private  MyLogger  log  = MyLoggerFactory. getLogger (ApplyGoodServiceImpl. class );
    
     @Autowired
     private  ApplyGoodsBaseServiceImpl  applyGoodsBaseService ;
    
     @Autowired      private  MQProducer  producer ;   

   
@Override
@Transactional
public  Boolean batchApproved(List<ApplyGoodDto>  goodList ,String  platformId , String  scheId , String  sysUserId ,String  sysUserName ) {
        
         if ( goodList == null )
        {
             log .info( "batchApproved goodList is null" );
             return   true ;
        }
          
         //1.更新申请状态
         //2.档期中的已排期商品数
         //3.商品表-已排期
         //4.增加活动商品表
         //5.下架日志
         try
        {
            Map<String, Object>[]  maps  =  new  HashMap[ goodList .size()] ;
             int   index  =0;
             //列表中只有申请Id,申请商品Id
             for (ApplyGoodDto  dto : goodList )
            {
                Map<String, Object>  map  =  new  HashMap<String, Object>();
                 //map.put("applyId", dto.getApplyId());
                 map .put( "id" ,  dto .getApplyId());
                 map .put( "status" ,ApplyStatusEnum. STATUS_APPROVED .getValue());
                 map .put( "updateTime" , TimeUtil. getCurrentTimestamp ());
                 map .put( "updateUserId" ,  sysUserId );
                 maps [ index ++] =  map ;
            }
             //更新申请状态
             applyBaseService .batchUpdate( maps );
            
             log .debug( "batchApproved apply.update success" );
            
             //档期中的已排期商品数
            ScheduleBo  sch  =  new  ScheduleBo();
             sch .setSchGoodsNum( goodList .size());
             sch .setUpdateTime(TimeUtil. getCurrentTimestamp ());
             sch .setUpdateUserId( sysUserId );
             sch .setId( scheId );
             scheduleBaseService .updateScheduleNumber( sch );
            
             log .debug( "batchApproved schedule.updateScheduleNumber success" );
            
             //3.商品表-已排期
             maps  =  new  HashMap[ goodList .size()] ;
             index  =0;
             //列表中只有申请Id,申请商品Id
             for (ApplyGoodDto  dto : goodList )
            {
                Map<String, Object>  map  =  new  HashMap<String, Object>();
                 map .put( "id" ,  dto .getId());
                 map .put( "schedule" ,YNEnum. YES .getValue());
                 map .put( "updateTime" , TimeUtil. getCurrentTimestamp ());
                 map .put( "updateUserId" ,  sysUserId );
                 //map.put("emOffShelf", YNEnum.NO.getValue());  //是否紧急下架:0否
                 maps [ index ++] =  map ;
            }
//            baseDao.batchUpdate("applyGoods.update", maps);
             applyGoodsBaseService .batchUpdate( maps );
            
             log .debug( "batchApproved applyGoods.update success" );
            
             //4.增加活动商品表
//            baseDao.batchUpdate("activityGoods.insertToSelect", maps);
             applyGoodsBaseService .batchUpdate( maps );
             log .debug( "batchApproved activityGoods.insertToSelect success" );
            
             //5.下架日志
             maps  =  new  HashMap[ goodList .size()] ;
             index  =0;
            
             //需要发送到MQ的商品
            List<ActivityGoodDto>  list  =  new  ArrayList<ActivityGoodDto>();
            
            ScheduleDto  sche  =  scheduleService .getSchedule( scheId );
            
             //列表中只有申请Id,申请商品Id
             for (ApplyGoodDto  dto : goodList )
            {
                Map<String, Object>  map  =  new  HashMap<String, Object>();
                 map .put( "id" , UUIDGenerator. getInstance ().get64BitUUID());
                 map .put( "platformId" , platformId );
                 map .put( "schId" , scheId );
                 map .put( "operType" , ScheduleEnum. SCHEDULE .getValue());
                 map .put( "operDate" , TimeUtil. getCurrentTimestamp ());
                 map .put( "operUserId" ,  sysUserId );
                 map .put( "operUserName" ,  sysUserId );
                 map .put( "skuId" ,  dto .getSkuId());
                 maps [ index ++] =  map ;
                
                ActivityGoodDto  agDto  = genActivityGood( dto , platformId , sche );
                 list .add( agDto );
            }
//            baseDao.batchUpdate("offShelfLog.insert", maps);
             applyGoodsBaseService .addOffShelfLog( maps );
            
            MqBaseResult  mqBaseResult  =  new  MqBaseResult();
             mqBaseResult .setOperType(Constants. OPER_TYPE_ADD );
             mqBaseResult .setContent( list );
             //同步活动商品到Pmc
             producer .sendVirtualTopic(Constants. ACT_SYNC_ACTGOOD , JSON. toJSONString ( mqBaseResult ),  null );
            
             log .debug( "batchApproved offShelfLog.insert success" );
             return   true ;
        }
         catch (Exception  e )
        {
             log .info( "batchApproved failed{}" , e );
             throw   new  SysException( "排期失败" , e );
        }     }


2.消费者接收消息（pmc系统中，项目启动spring容器初始化bean时，接收消息）
com.bn.b2b.pmc.service.mq.MqActivityGoodService中

@Service ( "mqActivityGoodService" )
public   class  MqActivityGoodService  implements  InitializingBean {
     @Autowired
     private  MQConsumer  consumer ;
     private  MyLogger  log  = MyLoggerFactory. getLogger (MqActivityGoodService. class );
     @Autowired
     private  ActivityGoodServiceImpl  activityGoodServiceImpl ;
     @Override
     public   void  afterPropertiesSet()  throws  Exception {
         consumer .listenVirtualTopic(Constants. ACT_SYNC_ACTGOOD , Constants. ACT_GRP_ACTGOOD ,  new  MsgListener() {
             @Override
             public   void  onMsg(Message  orginMsg , Object  msgContent ) {
                 if  (StringUtils. isEmpty ( msgContent .toString())) {
                     throw   new  SysException( "MQ解析参数为空！" );
                }
                 try  {
                     log .info( "****************************************************" );
                     log .info( "[activitygood]get msg from order {}" ,  msgContent );
                    JSONObject  jsonObj  = JSONObject. parseObject ( msgContent .toString());
                    Integer  operTypeVal  =  jsonObj .getInteger( "operType" );
                     if  ( operTypeVal  == OperTypeEnum. OPER_TYPE_ADD .getValue()) {
                        JSONArray  dtoes  =  jsonObj .getJSONArray( "content" );
                         for  ( int   i  = 0;  i  <  dtoes .size();  i ++) {
                            ActivityGoodDto  dto  = JsonUtils. json2bean (JsonUtils. bean2json ( dtoes .getJSONObject( i )),
                                    ActivityGoodDto. class );
                             dto .setId(DefaultSequenceGenerator. getInstance ().uuid());
                             activityGoodServiceImpl .addActivityGood( dto );
                        }
                    }  else   if  ( operTypeVal  == OperTypeEnum. OPER_TYPE_DEL .getValue()) {
                        String  activityGoodId  =  jsonObj .getString( "content" );
                         activityGoodServiceImpl .delByActGoodIds( activityGoodId );
                    }
                }  catch  (Exception  e ) {
                     log .error( "活动商品MQ处理失败：{}" ,  e .getMessage());
                     e .printStackTrace();
                     throw   new  SysException( "处理失败！" );
                }
            }
        });
    } }   


```