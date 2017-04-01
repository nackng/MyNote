[TOC]
##使用MySQL正则表达式
###（1）基本字符串匹配
```
SELECT prod_name

FROM products

WHERE prod_name REGEXP ‘1000’

ORDER BY prod_name;

检索prod_name包含文本1000的所有行。

除关键字LIKE被REGEXP替代外，这条语句看上去非常像使用
LIKE的语句（第8章）。它告诉MySQL： REGEXP后所跟的东西作
为正则表达式（与文字正文1000匹配的一个正则表达式）处理。

SELECT prod_name

FROM products

WHERE prod_name REGEXP ‘.000’

ORDER BY prod_name;

正则中，.代表匹配任意一个字符。

区分大小写时：使用BINARY关键字

WHERE prod_name REGEXP BINARY ‘JetPack .000’;
```
###（2）进行OR匹配（使用‘|’）
```
SELECT prod_name

FROM products

WHERE prod_name REGEXP ‘1000|2000’

ORDER BY prod_name;

可使用多个。
```
###（3）匹配几个字符之一
```
用[和]括起来的字符完成

SELECT prod_name

FROM products

WHERE prod_name REGEXP ‘[123] Ton’

ORDER BY prod_name;

[]是另一种形式的OR语句。 事实上，正则表达式[123]Ton

为[1|2|3]Ton的缩写，也可以使用后者。但是，需要用[]来定义OR语句查找什么。

SELECT prod_name

FROM products

WHERE prod_name REGEXP ‘1|2|3 Ton’

ORDER BY prod_name;
```
###（4）匹配范围
```
下面的集合将匹配数字0到9：[0-9]，a到z：[a-z]

SELECT prod_name

FROM products

WHERE prod_name REGEXP ‘[1-5] Ton’

ORDER BY prod_name;
```
###（5） 匹配特殊字符
```
必须用\\为前导，\\-表示查找-，\\.表示查找.

SELECT vend_name

FROM vendors

WHERE vend_name REGEXP ‘\\.’

ORDER BY vend_name;

这种处理就是所谓的转义（ escaping），正则表达式内具有特殊意义的所有字符都必须以这种方式转义。

匹配\ 为了匹配反斜杠（ \）字符本身，需要使用\\\。

元 字 符 说 明
\\f 换页
\\n 换行
\\r 回车
\\t 制表
\\v 纵向制表
```
###（6）匹配字符类
```
存在找出你自己经常使用的数字、所有字母字符或所有数字字母字

符等的匹配。为更方便工作，可以使用预定义的字符集，称为字符类

（ character class）。

字符类   说 明
[:alnum:] 任意字母和数字（同[a-zA-Z0-9]）
[:alpha:] 任意字符（同[a-zA-Z]）
[:blank:] 空格和制表（同[\\t]）
[:cntrl:] ASCII控制字符（ ASCII 0到31和127）
[:digit:] 任意数字（同[0-9]）
[:graph:] 与[:print:]相同，但不包括空格
[:lower:] 任意小写字母（同[a-z]）
[:print:] 任意可打印字符
[:punct:] 既不在[:alnum:]又不在[:cntrl:]中的任意字符
[:space:] 包括空格在内的任意空白字符（同[\\f\\n\\r\\t\\v]）
[:upper:] 任意大写字母（同[A-Z]）
[:xdigit:] 任意十六进制数字（同[a-fA-F0-9]）
```
###（7）匹配多个实例
```
重复元字符

元字符     说 明
*                        0个或多个匹配
+                        1个或多个匹配（等于{1,}）
?                        0个或1个匹配（等于{0,1}）
{n}                     指定数目的匹配
{n,}                   不少于指定数目的匹配
{n,m}               匹配数目的范围（ m不超过255）

SELECT prod_name

FROM products

WHERE prod_name REGEXP ‘\\([0-9] sticks?\\)’

ORDER BY prod_name;

正则表达式\\([0-9] sticks?\\)需要解说一下。 \\(匹配)，[0-9]匹配任意数字（这个例子中为1和5）， sticks?匹配stick和sticks（ s后的?使s可选，因为?匹配它前面的任何字符的0次或1次出现）， \\)匹配)。没有?，匹配stick和sticks会非常困难。

匹配连在一起的4位数字：

SELECT prod_name

FROM products

WHERE prod_name REGEXP ‘[[:digit:]]{4}’

ORDER BY prod_name;

[:digit:]匹配任意数字，因而它为数字的一个集合。 {4}确切地要求它前面的字符（任意数字）出现4次，所以[[:digit:]]{4}匹配连在一起的任意4位数字。或者如下

SELECT prod_name

FROM products

WHERE prod_name REGEXP ‘[0-9] [0-9] [0-9] [0-9]’

ORDER BY prod_name;
```
###（8）定位符
```
匹配特定位置的文本，需要使用定位元字符。

元字符  说明
^               文本的开始
$               文本的结尾
[[:<:]]       词的开始
[[:>:]]       词的结尾

SELECT prod_name

FROM products

WHERE prod_name REGEXP ‘^[0-9\\.]’

ORDER BY prod_name;

^匹配串的开始。因此， ^[0-9\\.]只在.或任意数字为串中第
一个字符时才匹配它们。

^的双重用途 ^有两种用法。在集合中（用[和]定义），用它
来否定该集合，否则，用来指串的开始处。
```