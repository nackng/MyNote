





##android:id="@+id/android:list"和android:id="@+id/list"的区别




-如果类继承的是
ListActivity
，那么在
xml
中只能定义成
android
:
list
。

-如果类继承的是
Activity
，自己去寻找
listview
，那就随便定义
id

+
id 
表示如果还没有该
id
,则定义一个
id
##dip、dp、sp、pt和px的区别




- 度量单位含义

     dip
:
 device independent pixels
(设备独立像素).
 
不同设备有不同的显示效果,这个和设备硬件有关，

         
一般我们为了支持
WVGA
、
HVGA
和
QVGA 
推荐使用这个，不依赖像素。
 

     dp
:
 
和
dip
是一样的

     px
:
 pixels
(像素).
 
不同设备显示效果相同，一般我们
HVGA
代表
320x480
像素，这个用的比较多。

     pt
:
 point
，是一个标准的长度单位，
1pt
＝
1
/
72
英寸，用于印刷业，非常简单易用；

     sp
:
 scaled pixels
(放大像素).
 
主要用于字体显示
best 
for
 textsize
。

     in
（英寸）：长度单位。
 

     mm
（毫米）：长度单位。


- 度量单位的换算公式

   
在
android
源码包
TypedValue
.
java
中，我们看如下函数：（该函数功能：是把各单位换算为像素）

```

   
public
 
static
 
float
 applyDimension
(
int
 unit
,
 
float
 value
,
 
DisplayMetrics
 metrics
)
 
{

		
switch
 
(
unit
)
 
{

			
case
 COMPLEX_UNIT_PX
:

				
return
 value
;

			
case
 COMPLEX_UNIT_DIP
:

				
return
 value 
*
 metrics
.
density
;

			
case
 COMPLEX_UNIT_SP
:

				
return
 value 
*
 metrics
.
scaledDensity
;

			
case
 COMPLEX_UNIT_PT
:

				
return
 value 
*
 metrics
.
xdpi 
*
 
(
1.0f
 
/
 
72
);

			
case
 COMPLEX_UNIT_IN
:

				
return
 value 
*
 metrics
.
xdpi
;

			
case
 COMPLEX_UNIT_MM
:

				
return
 value 
*
 metrics
.
xdpi 
*
 
(
1.0f
 
/
 
25.4f
);

		
}

		
return
 
0
;

	
}

```


   metrics
.
density
：默认值为
DENSITY_DEVICE 
/
 
(
float
)
 DENSITY_DEFAULT
;

   metrics
.
scaledDensity
：默认值为
DENSITY_DEVICE 
/
 
(
float
)
 DENSITY_DEFAULT
;

   metrics
.
xdpi
：默认值为
DENSITY_DEVICE
;

   DENSITY_DEVICE
：为屏幕密度

   DENSITY_DEFAULT
：默认值为
160


##fill_parent、wrap_content和match_parent的区别



三个属性都用来适应视图的水平或垂直大小，一个以视图的内容或尺寸为基础的布局比精确地指定视图范围更加方便。


1
）
fill_parent

设置一个构件的布局为
fill_parent
将强制性地使构件扩展，以填充布局单元内尽可能多的空间。这跟
Windows
控件的
dockstyle
属性大体一致。设置一个顶部布局或控件为
fill_parent
将强制性让它布满整个屏幕。


2
）
 wrap_content

设置一个视图的尺寸为
wrap_content
将强制性地使视图扩展以显示全部内容。以
TextView
和
ImageView
控件为例，设置为
wrap_content
将完整显示其内部的文本和图像。布局元素将根据内容更改大小。设置一个视图的尺寸为
wrap_content
大体等同于设置
Windows
控件的
Autosize
属性为
True
。


3
）
match_parent

   
Android2
.
2
中
match_parent
和
fill_parent
是一个意思
 
.两个参数意思一样，
match_parent
更贴切，于是从
2.2
开始两个词都可以用。那么如果考虑低版本的使用情况你就需要用
fill_parent
了
##关于居中显示 
- 当容器是RelativeLayout的时候才有。此时设置为RelativeLayout里的子控件属性为android:layout_centerInParent=”true“，就是水平垂直都居中。

- 当容器是LinearLayout时，首先要设置控件所处的LinearLayout的属性 android:orientation = "vertical"   >，然后设置控件自身的属性： android:layout_gravity = "center_horizontal" />。