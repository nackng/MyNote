主要内容
Intellij IDEA开发环境简介
Intellij IDEA Scala开发环境搭建
Intellij IDEA常见问题及解决方案
Intellij IDEA常用快捷键 1. Intellij IDEA开发环境简介

具体介绍请参见： http://baike.baidu.com/link?url=SBY93H3SPkmcmIOmZ8H60O1k4iVLgOmdqoKdGp9xHtU-Pbdsq2cpn75ZPZPWAJxeUlwr0ravraQzOckh777beq

Intellij IDEA是我用过最好的集成开发环境，没有之一，它对于Scala的支持远胜于Scala IDE for Eclipse 2. Intellij IDEA Scala开发环境搭建

Intellij IDEA 14.1.4 默认配置里面没有Scala插件，需要手动安装，在Intellij IDEA 14.1.4 第一次运行时选择configure  plugins，选择默认后在软件主界面去配置，但是本人测试发现，这种设置方式经常会因为网络问题配置失败，建议直接到
http://www.jetbrains.net/confluence/display/SCA/Scala+Plugin+for+IntelliJ+IDEA ，这个链接去下载，下载完成后，解压到Intellij IDEA 安装目录中的plugins里面去：


完成后，启动Intellij IDEA 14.1.4

配置Intellij IDEA 14.1.4后，我们来看看如何进行Scala开发环境的创建：

1 File->New Project

得到下列界面：


选择scala，然后下一步：

在Project SDK的右侧，点击new，得到：

选择JDK，在弹出框中选择JDK的安装目录


在Scala SDK的右侧，点击Create，得到下图所示界面：

可以选择Intellij IDEA中自带的Scala，也可以使用自己安装好的Scala,点击上图中的”Browse”，然后选择Scala的安装目录


配置好之后，直接finish，得到下列工程目录


点击File->Project Structure，

得到：

在src目录上，右键然后点击new fold

命名为main
再右鍵main，同样new fold，命名为scala，并设置为sources，如下图

整体的工程文件已经创建好了，如下图：

在scala源文件目录上，直接名鍵，new->scala class

选择Object，然后输入名称:Hello World


输入的代码如下：
object
 
HelloWorld
  {
def
 main(args: Array[String]) {
    println(
"Hello World"
)
  }
}


点击HelloWorld.scala文件，右键

或直接ctr+shift+F10运行程序 3. Intellij IDEA常见问题及解决方案
编码问题
Intellij IDEA的默认编码是GBK，如果代码中出现中文的话，会报错：
Error:scalac: IO error while decoding D:
\ScalaLearning
\src
\cn
\scala
\xtwy
\ScalaAndJavaException
\ScalaExceptionDemo
.scala with UTF-8
Please try specifying another one using the -encoding option

此时只要更改代码的编码就行，可以直接修改文件或软件配置
直接修改文件编码如下图：


修改软件配置过程如下：

File–>Setting


找到Editor中的FileEncoding，可以将工作都设置为UTF-8

2 修改默认快捷键
对一eclipse转过来的用户，习惯了eclipse中的快捷键，想在Intellij IDEA中也使用相同的快捷键，这时可以对默认快捷鍵进行修改。

File–>Setting

选择Setting中的keymap，Intellij IDEA中的所有快捷键都可以看到 4. Intellij IDEA常用快捷键

下面的快捷键，最好自己试一下，这样的话就能明白它到底是干什么用的，语言描述可能不到位 快捷鍵 用法描述
 Ctrl+Shift+A 根据名称查找操作，例如查找创建scala class操作
 Alt+F1 视图切换
 Ctrl+Tab 工具窗口、正在编辑的代码文件切换
 Alt+Home 显示导航条
 Ctrl+J 插入代码模板，例如main方法
 Ctrl+Alt+J 将选中的代码用代码模板包裹
 F4 打开工程配置窗口
 Ctrl+Slash 注释代码 //
 Ctrl+Shift+Slash 注释代码 /**/
 Ctrl+N/Ctrl+Shift+N 输入名称查询类或文件
 Ctrl+D 复制选中的代码
 Ctrl+W / Ctrl+Shift+W 智能地进行代码选择
 Ctrl+F 在当前文件中进行文本内容查找
 Shift+Shift search everywhere
 Ctrl+Shift+F7 高亮显示先中的方法或符号在当前文件中的使用情况
 Ctrl+Space 代码自动提示
 Ctrl+Shift+Enter 语句自动完成
 Alt+enter 代码自动修正


##scala实例
http://blog.csdn.net/lovehuangjiaju/article/details/47778671