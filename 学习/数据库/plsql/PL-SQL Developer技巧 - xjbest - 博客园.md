1、右键菜单
在PL/SQL Developer（下面简称PLD）中的每一个文本编辑窗口，如SQL Window，Command Window和Porgram Window，右键点击某个对象名称，会弹出一个包含操作对象命令的菜单，我们这里称之为右键菜单。
对象类型可以是表，视图，同义词，存储过程和函数等。根据对象类型的不同，弹出的菜单也有区别。表和视图有View, Edit, Rename, Drop, Query data 和Edit data等功能。View和Edit分别是查看和修改表的结构信息，如字段，主键，索引和约束等。Query data相当于新打开一个窗口，并执行select * from 表。Edit data相当于新打开一个窗口，并执行select * from 表 for update。存储过程和函数有Test功能，选中后可以进入调试状态。有时由于PLD识别错误，右键点击对象并不能出来正确的菜单，可以在对象所在的 DDL或DML语句的前面，加上分号，这样PLD就能正确的判断出对象的类型

2、Select for Update
有时我们需要把一些数据导入数据库中，如果用UE拼Insert语句，会比较麻烦，而且操作性不强。PLD的SQL Window可以查询，新增，修改和删除表的内容。查询自不必说，而新增，删除和修改，只需在select语句后加入for update，对表进行行级锁定，然后点击窗口的锁型图标，即可进入编辑状态。下面介绍一下如何从Excel中提取文本插入到数据库中我们的Excel文件中有三列：在数据库中建立临时表：create table t1 (cino varchar2(100), contno varchar2(100), loanno varchar2(100))然后在SQL Window中输入select t1 for update，并点击锁型鼠标，进入编辑状态：用鼠标点击第一行的输入窗口，这时PLD会死锁几秒钟，然后可以见到光标在第一行的输入框中闪动，用鼠标把 CINO, CONTNO, LOANNO选中：进入Excel中，把需要插入数据库的内容选中，然后切换到PLD，按Ctrl + V：点击√，然后再点击Commit按钮，则数据提交到表t1中，执行select * from t1可以看到内容：

3、PL/SQL Beautifier（PL/SQL 美化器）
PLD 6以上版本有对DML代码格式化的功能。在SQL Window或Program Window中选中部分代码（如果不选则对整个窗口的代码操作），在菜单中选Edit -> PL/SQL Beautifier，得到格式化的代码。对于非法的DML语句或DDL语句，PLD将会在下方状态栏提示PL/SQL Beautifier could not parse text。在缺省的状态下，PLD会把DML语句的每一个字段都排在单独的一行，这样不方便查看。在菜单中选Edit à PL/SQL Beautifier Options，进入Preferences窗口，选择Edit，进入配置文件编辑界面：在标签栏选DML，在窗口中部的Select, Insert和Update组框中把Fit选中，然后点击Save，把配置文件保存到PLD的安装目录下，点击Close关闭。在Rules file中输入配置文件所在位置，点击OK，完成配置文件切换。这时再对代码进行格式化，就可以使每一个字段尽可能的在一行上了。
4、 TNS Names
菜单Help à Support Info à TNS Names，可以查看Oracle的tnsnames.ora。

5、Copy to Excel
在SQL Window中执行Select语句，在结果出来以后，右键点击下面的数据区，选择Copy to Excel，可以把数据区的记录原样拷贝到Excel中。但有两点需要注意：一，field中不能以=开始，否则Excel会误认为是函数；二，数字不要超过17位，否则后面的位数将会置为0，但可以通过在数字前加‘来使Excel认为该field是文本，同时对于数据库中Numbe类型的字段，最好用 to_char输出，不然可能会显示不正常

6、PL/SQL Developer记住登陆密码
在使用PL/SQL Developer时，为了工作方便希望PL/SQL Developer记住登录Oracle的用户名和密码；
设置方法：PL/SQL Developer 7.1.2 ->tools->Preferences->Oracle->Logon History ， “Store history”是默认勾选的，勾上“Store with password” 即可，重新登录在输入一次密码则记住了。(我的好像不行哦)

7、执行单条SQL语句
在使用 PL/SQL Developer的SQL Window时，按F8键，PL/SQL Developer默认是执行该窗口的所有SQL语句，需要设置为鼠标所在的那条SQL语句，即执行当前SQL语句；
设置方法：PL/SQL Developer 7.1.2 -->tools->Preferences-->Window types ，勾上“AutoSelect Statement” 即可。

7、格式化SQL语句
在使用 PL/SQL Developer的SQL Window时，有时候输入的SQL语句太长或太乱，希望能用比较通用的写法格式话一下，这样看起来会好看些，也好分析；
使用方法：选中需要格式化的SQL语句，然后点击工具栏的PL/SQL beautifier按钮即可。

8、查看执行计划
在使用PL/SQL Developer的SQL Window时，有时候输入的SQL语句执行的效率，分析下表结构，如何可以提高查询的效率，可以通过查看Oracle提供的执行计划；
使用方法：选中需要分析的SQL语句，然后点击工具栏的Explain plan按钮（即执行计划），或者直接按F5即可。

9、调试存储过程
在使用PL/SQL Developer操作Oracle时，有时候调用某些存储过程，或者调试存储过程；
调用存储过程的方法：首先，在PL/SQL Developer左边的Browser中选择Procedures，查找需要调用的存储过程；然后，选中调试的存储过程，点击右键，选择Test，在弹出来的Test scrīpt窗口中，对于定义为in类型的参数，需要给该参数的Value输入值；最后点击上面的条数按钮：Start debugger 或者按F9；最后点击：RUN 或者Ctrl+R 。
（具体要调式一个存储过程，请参照操作手册，这个大概说明下应用）。

10、 oralce精简客户端的使用
要想PL/SQL连接oracle数据库，除了PL/SQL Developer 之外还需要Oracle客户端，有一个更方便的方法就是使用Oracle精简客户端，很多地方可以下载，文件很小，耗资源也少。安装完成后修改安装目录下的/Oracle/ora90/network/ADMIN/tnsnames.ora文件：格式如下：
DATABASE_NAME =(DESCRIPTION = (ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = 127.0.0.1)(PORT = 1521)) ) (CONNECT_DATA = #(SERVICE_NAME = dealer) (SID = SID_NAME) #(SERVER = DEDICATED) ))7、关键字自动大写:
了解一点编程的常识的人都知道，编码风格很重要。在阅读代码方面，保持一致的编码风格，阅读起来比较容易；在执行效率方面，保持一致的编码风格，更有可能被放到共享SQL区中，这样就提供了 执行的效率。设置也很简单：Tools->Preferences->Editor，将Keyword case选择Uppercase。我一般是让关键字大写，其他比如表名、字段名等都是小写。