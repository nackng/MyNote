##组合码商品导入时，提示定价金额不正确
测试环境：skuid-9990047








```
sp  =  setprice: 71311
sr = shareRadio: 3333
count = combSkuNum:5
spr： 1188397815
check = temp: 1188.397815
dot:4
dotNum: 397815


```
问题原因：（代码Bug）
当判断是否除尽的数check为整数时代码不严谨




```
备注：indexOf返回值
-1 没有找到该字符串
0  该字符串位于第一个字符
1  该字符串位于第二个字符
          String  tag  =  ".22222" ;
        System. out .println( tag .indexOf( "." )); //0
        System. out .println( tag .indexOf( "." ) >= 0); //true
        System. out .println( tag .indexOf( "." ) > 0); //false         System. out .println( tag .indexOf( "." ) == 0); //true   

```
##调用 多价创建接口异常




##页面 调用req resp.



