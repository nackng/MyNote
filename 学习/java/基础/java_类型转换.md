## java String 与  long
```
1. 将string 转化成long
long l = Long.parseLong([String]); 或 
long l  = Long.parseLong([String],[int radix]); 
long l = Long.valueOf("123").longValue();

2.将string 转为 long （带小数情况）new BigDecimal(str).longValue();
    /**
     * 格式化元转分
     * 
     * @param num
     * @return
     */
    public static Long formatYuanByFen(String num) {
        BigDecimal bignum1 = new BigDecimal(num);
        BigDecimal bignum2 = new BigDecimal("100");
        BigDecimal bignum3 = bignum1.multiply(bignum2);

        System.out.println("res:" + bignum3.longValue());
        return bignum3.longValue();
    }

3.将long转为string
24+"";
```
## uint64_t 转 long
```
uint64_t  seller   =  new  uint64_t(12L);

Long res = seller.longValue();
```
##String 转 Short
```
  String b= "4" ;
         //用基本数据类型的对象包装器将String转换为short
         Short a= new   Short(b);
java.lang.NumberFormatException: Value out of range. Value:"200029" Radix:10 


String temp = "12";
short sh = Short.parseShort(temp);

``` 

##int 与 long
```
一.将long型转化为int型，这里的long型是基础类型：
long   a = 10;     int b = (int)a;   
二.将Long型转换为int 型的，这里的Long型是包装类型：
Long a = 10; int b=a.intValue();
三.将int型转化为long型，这里的int型是基础类型：
int a = 10;long b = (int)a;
四.将Integer型转化为long型，这里的Integer型是包装类型：
int a = 10;Long b = a.longValue();
```