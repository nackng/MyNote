##BigDecimal Error
```
BigDecimal做除法运算报java.lang.ArithmeticException: Non-terminating decimal expansion; no exact representable decimal result.解决办法


在使用两个BigDecimal类型的数字做除法运算时，出现了一个如下的异常信息：
java.lang.ArithmeticException: Non-terminating decimal expansion; no exact representable decimal result.
通过BigDecimal的divide方法进行除法时当不整除，出现无限循环小数时，就会抛异常：java.lang.ArithmeticException: Non-terminating decimal expansion; no exact representable decimal result.
解决方案:
BigDecimal weightValue = new BigDecimal(1000).multiply(new BigDecimal(11)).divide(new BigDecimal(2),2,RoundingMode.HALF_UP); 
此就是给divide方法设置精确的小数点，如：divide(xxxxx,2)。


附:
BigDecimal枚举常量用法摘要  ：
CEILING 
 向正无限大方向舍入的舍入模式
DOWN
向零方向舍入的舍入模式
DOWN        
向零方向舍入的舍入模式
FLOOR
向负无限大方向舍入的舍入模式
HALF_DOWN
向最接近数字方向舍入的舍入模式，如果与两个相邻数字的距离相等，则向下舍入
HALF_EVEN 
向最接近数字方向舍入的舍入模式，如果与两个相邻数字的距离相等，则向相邻的偶数舍入
HALF_UP
向最接近数字方向舍入的舍入模式，如果与两个相邻数字的距离相等，则向上舍入
UNNECESSARY 
用于断言请求的操作具有精确结果的舍入模式，因此不需要舍入
UP 
远离零方向舍入的舍入模式
``` 
##两个double类型相加，导致精度丢失
```
System.out.println(0.11+2001299.32);//非精确的输出
BigDecimal bigDecimal1 = new BigDecimal(Double.toString(0.11));
BigDecimal bigDecimal2 = new BigDecimal(Double.toString(2001299.32));
System.out.println(bigDecimal1.add(bigDecimal2));//精确的输出
```
##两个double类型相减，精度丢失
```
public   static   void  main(String[]  args ) {
    System. out .println( "7.22-7.02="  + (7.22f - 7.02f)); // 7.22-7.02=0.19999981
    System. out .println( "7.22-7.02="  +  subtract (7.22, 7.02)); // 7.22-7.02=0.2
}
 /**
 * 精确的减法
 */
public   static   double  subtract( double   d ,  double   e ) {
    BigDecimal  b1  =  new  BigDecimal(Double. toString ( d ));
    BigDecimal  b2  =  new  BigDecimal(Double. toString ( e ));
    return   b1 .subtract( b2 ).doubleValue();     
}   
```
##保留小数位
BigDecimal setScale = decimal.setScale(2,BigDecimal.ROUND_HALF_DOWN);//保留两位小数，并舍去
BigDecimal setScale = decimal.setScale(2,BigDecimal.ROUND_HALF_UP);//保留两位小数，并舍入
