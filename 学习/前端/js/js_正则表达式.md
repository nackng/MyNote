##通用的验证
```
空格
var spaceReg = /\s/ g ;

手机号码
var phoneReg = /^1[3|5|6|7|8|9]\d{9}/ ;
检验邮箱
var EmailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/ ;
只能输入英文和数字

var codeReg = /^[0-9a-zA-Z]+$/ g ;

输入正确的身份证号

var manidReg = /^(\d{16,18})$/ g ;

不能输入特殊字符

var noSymbolReg = /^[0-9a-zA-Z\u4E00-\u9FA5]+$/ g ;

只能输入英文

var noSymbolReg = /^[a-zA-Z]+$/ g ;

只能输入金钱

var noSymbolReg = /^\$?(([0]{1}\.\d{1,2})|([1-9]{1}(\d+)?(\.\d{1,2})?))$/ g ;

只能输入百分比

var percentageReg = /^[1-9]{1}(\d{1,2})?(\.\d{1,2})?$/ g ;

只能输入数字

var percentageReg = /^[0-9]{1}(\d{1,})*$/ g ;

电话号码格式不正确

var telReg = /^[0-9\-]{5,20}$/ g ;

此处只能输入字母

var letterReg = /^[a-zA-Z]+$/ g ;

此处只能输入数字和字母

var letterReg = /^[0-9a-z]+$/ g ;

此处只能输入数字(小数点后两位)
var letterReg1 = /^[0-9]+$/ g ;
var letterReg2 = /^([0-9]+\.[0-9]{2})$/ g ;
var letterReg3 = /^([0-9]+\.[0-9]{1})$/ g ;
if ( letterReg1 . test ( value ) || letterReg2 . test ( value ) || letterReg3 . test ( value ))
链接
var httpReg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\?%&=]*)?/ ;
只能输入0-4
var numReg = /^[0-4]+$/ g ;

此处只能输入数字和字母

var letterReg = /^[0-9a-zA-Z]+$/ g ;

电话号码格式不正确
firstCheck =[];

if ( telReg . test ( value ) || phoneReg . test ( value )){
     var spaceReg = /\s/ g ;
     if ( spaceReg . test ( check [ i ]. value ))
     firstCheck . push ( check [ i ]);

``` 
## 验证手机号和电话号码
```
^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$
 
规则说明：
1、可以是1开头的11位数字（手机号）
2、可以是“区号-电话号-分机号”或者是“(区号)电话号-分机号”格式
3、区号是0开头的3～4位数字，可以没有区号
4、电话号是5～8位数字，不能以0开头
5、分机号是1～8位数字，可以没有分机号
 
合法数据示例：
13812341234
010-12345678
(0432)1234567-1234
```
##验证邮政编码
` ^[1-9]\d{5}$`


##验证整数
```
^-?[0-9]\d*$        //匹配整数
^[1-9]\d*$　 　 //匹配正整数
^-[1-9]\d*$ 　 //匹配负整数
^-?[1-9]\d*$　　 //匹配整数
^[1-9]\d*|0$　 //匹配非负整数（正整数 + 0）
^-[1-9]\d*|0$　　 //匹配非正整数（负整数 + 0）
^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$　　 //匹配正浮点数
^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$　 //匹配负浮点数
^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$　 //匹配浮点数
^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$　　 //匹配非负浮点数（正浮点数 + 0）
^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$　　//匹配非正浮点数（负浮点数 + 0）

^[0-9]+\.{0,1}[0-9]{0,2}$
    //
```
匹配10-99
^[1-9]{2}?$
匹配1-99
^[1-9][0-9]?$
