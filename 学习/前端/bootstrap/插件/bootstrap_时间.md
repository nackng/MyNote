[TOC]
##选择年月日
``` 
<input type="text" class="col-md-4 form-control" name="dayAroud">
<input type="text" class="col-md-4 form-control" name="timeAroud"> 
$("input[name='dayAroud']").daterangepicker({
        timePicker:true,
        format:'YYYY-MM-DD',
        timePicker12Hour:false,
        timePickerIncrement:10,
        separator:'至',
        minDate:new Date()
    });
    $("input[name='timeAroud']").daterangepicker({
        timePicker:true,
        format:'HH:mm',
        timePicker12Hour:false,
        timePickerIncrement:10,
        separator:'至',
        minDate:new Date()
    }); 
```
##只选择小时和分钟

```
1.页面
<div class="col-md-1" style="width:10%">
<input type="text" class="col-md-2 form-control" id="hourAroud1">
</div>
2.引入js/css
< script   src = " ${ctx} /assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"   type = "text/javascript" ></ script >  
< link   href = " ${ctx} /assets/global/plugins/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css"   rel = "stylesheet"   type = "text/css" />
3.页面 js:

$( "#hourAroud1" ).datetimepicker({
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0,
        language: 'zh-CN' ,
        format: 'hh:ii'//只展示小时和分钟     });   

点击today:展示的是当前时间
```
##选择日期与小时
```
<!-- this should go after your </body> --><link rel="stylesheet" type="text/css" href="/jquery.datetimepicker.css"/ ><script src="/jquery.js"></script><script src="/build/jquery.datetimepicker.full.min.js"></script>
HTML
<input id="datetimepicker" type="text" >
javaScript
jQuery('#datetimepicker').datetimepicker();
i18n DatePicker Example #
All supported languages here
javaScript
jQuery.datetimepicker.setLocale('de');
jQuery('#datetimepicker1').datetimepicker({
 i18n:{
  de:{
   months:[
    'Januar','Februar','März','April',
    'Mai','Juni','Juli','August',
    'September','Oktober','November','Dezember',
   ],
   dayOfWeek:[
    "So.", "Mo", "Di", "Mi", 
    "Do", "Fr", "Sa.",
   ]
  }
 },
 timepicker:false,
 format:'d.m.Y'
});
Result
Only TimePicker Example #
javaScript
jQuery('#datetimepicker2').datetimepicker({
  datepicker:false,
  format:'H:i'
});
Result
Date Time Picker start date #
javaScript
jQuery('#datetimepicker_start_time').datetimepicker({
  startDate:'+1971/05/01'//or 1986/12/08
});
Result
Date Time Picker from unixtime #
javaScript
jQuery('#datetimepicker_unixtime').datetimepicker({
  format:'unixtime'
});
Result
```
##时间控件汉化
###datepicker时间控件汉化
```
让bootstrap-datepicker控件支持中文

这边博文记录配置让bootstrap-datepicker支持中文的配置步骤，首先官方的bootstrap-datepicker控件不支持本地化，所以需要从GitHub上下载下面这个第三方的已经支持本地化的，https://github.com/eternicode/bootstrap-datepicker，只需要下载2个文件bootstrap-datepicker.js和bootstrap-datepicker.zh-CN.js即可。这里要注意bootstrap-datepicker.zh-CN.js需要放在locales目录下。
调用的时候，需要把2个js文件都引用上，

<script src="/assets/js/date-time/bootstrap-datepicker.js"></script>
<script src="/assets/js/date-time/locales/bootstrap-datepicker.zh-CN.js"></script>

$('.date-picker').datepicker({
                language: 'zh-CN',
                autoclose: true,
                todayHighlight: true
            })

```
###daterangepicker时间控件汉化
```
增加locale配置即可：
$("input[name='timetest']").daterangepicker({
    timePicker:true,
    format:'YYYY-MM-DD HH:mm:ss',
    timePickerIncrement:10,
    timePicker12Hour:false,
    separator:'至',
    locale : {  
            applyLabel : '确定',  
            cancelLabel : '取消',  
            fromLabel : '起始时间',  
            toLabel : '结束时间',  
            customRangeLabel : '自定义',  
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
              '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
            firstDay : 1  
          }
  });


详情：
一、需要引入的css与js
<link href="bootstrap.min.css" rel="stylesheet">      
<link rel="stylesheet" type="text/css" media="all" href="daterangepicker-bs3.css" />  
<link rel="stylesheet" type="text/css" media="all" href="daterangepicker-1.3.7.css" />  
<link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet">  
  
<script type="text/javascript" src="jquery-1.10.1.min.js"></script>  
<script type="text/javascript" src="bootstrap.min.js"></script>  
<script type="text/javascript" src="moment.js"></script>  
<script type="text/javascript" src="daterangepicker-1.3.7.js"></script>

html:
<div class="form-group">  
                    <label class="control-label">  
                      日期：  
                    </label>  
                    <div class="controls">  
                      <div id="reportrange" class="input-prepend input-group"  data-date-format="yyyy-mm-dd hh:ii:ss">  
                                        <span class="add-on input-group-addon">  
                                            <i class="glyphicon glyphicon-calendar fa fa-calendar">  
                                            </i>  
                                        </span>  
                        <input type="text" style="width: 400px" name="timeSection" id="searchDateRange"  
                               class="form-control" value="Enter time" class="span4"/>  
                      </div>  
                    </div>  
 </div>  

 js:
 $(function(){  
      //时间插件  
//      $('#searchDateRange').val(moment().subtract('hours', 1).format('YYYY-MM-DD HH:mm:ss') + ' - ' + moment().format('YYYY-MM-DD HH:mm:ss'));  
  
      $('#reportrange').daterangepicker(  
              {  
                // startDate: moment().startOf('day'),  
                //endDate: moment(),  
                //minDate: '01/01/2012',    //最小时间  
                maxDate : moment(), //最大时间  
                dateLimit : {  
                  days : 30  
                }, //起止时间的最大间隔  
                showDropdowns : true,  
                showWeekNumbers : false, //是否显示第几周  
                timePicker : true, //是否显示小时和分钟  
                timePickerSeconds:true,  
                timePickerIncrement : 1, //时间的增量，单位为分钟  
                timePicker12Hour : false, //是否使用12小时制来显示时间  
                ranges : {  
                  //'最近1小时': [moment().subtract('hours',1), moment()],  
                  '今日': [moment().startOf('day'), moment()],  
                  '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],  
                  '最近7日': [moment().subtract('days', 6), moment()],  
                  '最近30日': [moment().subtract('days', 29), moment()]  
                },  
                opens : 'right', //日期选择框的弹出位置  
                buttonClasses : [ 'btn btn-default' ],  
                applyClass : 'btn-small btn-primary blue',  
                cancelClass : 'btn-small',  
                format : 'YYYY-MM-DD HH:mm:ss', //控件中from和to 显示的日期格式  
                separator : ' to ',  
                locale : {  
                  applyLabel : '确定',  
                  cancelLabel : '取消',  
                  fromLabel : '起始时间',  
                  toLabel : '结束时间',  
                  customRangeLabel : '自定义',  
                  daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
                  monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
                  firstDay : 1  
                }  
              }, function(start, end, label) {//格式化日期显示框  
  
                $('#searchDateRange').val(start.format('YYYY-MM-DD HH:mm:ss') + ' - ' + end.format('YYYY-MM-DD HH:mm:ss'));  
              });  
  
      //设置日期菜单被选项  --开始--  
  
       <%--var dateOption ;--%>  
       <%--if("${riqi}"=='day') {--%>  
       <%--dateOption = "今日";--%>  
       <%--}else if("${riqi}"=='yday') {--%>  
       <%--dateOption = "昨日";--%>  
       <%--}else if("${riqi}"=='week'){--%>  
       <%--dateOption ="最近7日";--%>  
       <%--}else if("${riqi}"=='month'){--%>  
       <%--dateOption ="最近30日";--%>  
       <%--}else if("${riqi}"=='year'){--%>  
       <%--dateOption ="最近一年";--%>  
       <%--}else{--%>  
       <%--dateOption = "自定义";--%>  
       <%--}--%>  
       <%--$(".daterangepicker").find("li").each(function (){--%>  
       <%--if($(this).hasClass("active")){--%>  
       <%--$(this).removeClass("active");--%>  
       <%--}--%>  
       <%--if(dateOption==$(this).html()){--%>  
       <%--$(this).addClass("active");--%>  
       <%--}--%>  
       <%--});--%>  
      //设置日期菜单被选项  --结束--  
  
    })
```
###datetimepicker汉化
```
只需要引入中文js，及设置language='zh'即可。
<script src="${ctx}/assets/global/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
<script src="${ctx}/assets/global/plugins/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>

<input type="text" class="col-md-2 form-control"  id="hourAroud1" />

$("#hourAroud1").datetimepicker({
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 1,
        minView: 0,
        maxView: 1,
        forceParse: 0,
        language:'zh-CN',//中文
        format:'hh:ii'  //展示小时+分钟：16:39
    });
```