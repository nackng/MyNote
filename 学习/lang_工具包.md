[TOC]
Lang 中工具类比较多，这里介绍几个主要的：
　　ClassUtils：  getShortClassName，这个函数应该在 java.lang.Class 类中有的，我看到很多人自己写这个函数。getAllInterfaces，convertClassNamesToClasses，isAssignable，primitivesToWrappers，isInnerClass。
　　NumberUtils： 关于数字以及数字和字符串转换的类 stringToInt，toDouble，createNumber，isAllZeros， int compare(float lhs, float rhs)， isNumber(String str)，double min(double[] array)。
　　RandomUtils： 用于产生随机数的。
　　DateFormatUtils： 日期时间格式转换，以及本地时间和 UTC 时间转换。
　　DateUtils： 日期工具类。isSameDay，truncate，round，modify。

　　基于反射机制的几个类：
　　CompareToBuilder： 比较，用在算法、排序、比较的地方。reflectionCompare，append。
　　EqualsBuilder： 通过反射机制比较。reflectionEquals 很多项目中用到。
　　HashCodeBuilder： 可以通过反射生成 hash code，很多算法的地方涉及到 hash code，但是并不是每个人都知道一种 hash code 的生成方法。
　　ToStringBuilder： 当你需要重载 toString 函数而不想写代码把当前类的所有成员信息列出来，可以用这个函数。

　　其它的几个类我用得比较少：
　　SerializationUtils  Java中得序列化比较奥妙，容易出错啊。
　　SystemUtils 可以读取一些关于 jdk 信息，操作系统信息的工具类。