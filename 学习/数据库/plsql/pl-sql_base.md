```
员工信息表[员工号，姓名，性别],T_Worker[WorkerId,name,sex]
员工迟到表[员工号，迟到日期，迟到时长],T_Late[WorkerId,latetime,latelong]
create table T_Worker(
  wid varchar2(32) primary key,
  name varchar2(32),
  sex varchar(5)
);
--T_Late[WorkerId,latetime,latelong]
create table T_Late(
  wid varchar2(32) not null,
  latetime date,
  latelong long
);
--●.在 日期1 (2002-10-9) 到日期2 (2002-11-6) 之间迟到的员工姓名
select t1.name 员工姓名 from t_worker t1
where t1.wid in(
             select t.wid 
             from t_late t 
             where to_char(t.latetime,'yyyy-MM-dd') >='2015-08-03' 
                   and to_char(t.latetime,'yyyy-MM-dd') <='2015-08-05')
--●.查询员工姓名首字母为O的员工信息
select t.* from t_worker t where t.name like 'l%'
或
select * from t_worker where name like 't%'
--●.更改员工号为00001的员工的姓名为Jack
update t_worker set name='Jack' where wid='100001'
--●.迟到2次（包括2次）以上的员工号
select t1.wid 
from (select t.wid, count(t.wid) latecount 
      from t_late t group by t.wid) t1 
where t1.latecount>=2
--●.没有迟到的员工信息（用Join)
select t.wid from t_worker t where t.wid not in
(select t1.wid from t_late t1)
--●. 说说你认为使用 Stored Procedures 的优缺点
<1>.存储过程优点
A.执行速度快。
存储过程只在创造时进行编译，已经通过语法检查和性能优化，以后每次执行存储过程都不需再重新编译，而我们通常使用的SQL语句每执行一次就编译一次,所以使用存储过程可提高数据库执行速度。
B.允许组件式编程。
经常会遇到复杂的业务逻辑和对数据库的操作，这个时候就会用SP来封装数据库操作。当对数据库进行复杂操作时(如对多个表进行Update,Insert,Query,Delete时)，可将此复杂操作用存储过程封装起来与数据库提供的事务处理结合一起使用。只需创建存储过程一次并将其存储在数据库中，以后即可在程序中调用该过程任意次。在代码上看，SQL语句和程序代码语句的分离，可以提高程序代码的可读性。
存储过程可以设置参数，可以根据传入参数的不同重复使用同一个存储过程，从而高效的提高代码的优化率和可读性。
C.减少网络流量。
一个需要数百行Transact-SQL代码的操作由一条执行过程代码的单独语句就可实现，而不需要在网络中发送数百行代码。
对于同一个针对数据库对象的操作，如果这一操作所涉及到的T-SQL语句被组织成一存储过程，那么当在客户机上调用该存储过程时，网络中传递的只是该调用语句，否则将会是多条SQL语句。从而减轻了网络流量，降低了网络负载。
D.提高系统安全性。
可将存储过程作为用户存取数据的管道。可以限制用户对数据表的存取权限，建立特定的存储过程供用户使用，避免非授权用户对数据的访问，保证数据的安全。
<2>.存储过程缺点：
A.移植性差。依赖于数据库厂商,难以移植(当一个小系统发展到大系统时,对数据库的要求也会发生改变)；
B.难以调试、维护。业务逻辑大的时候,封装性不够,难调试难以维护；
C.服务器不能负载均衡。复杂的应用用存储过程来实现，就把业务处理的负担压在数据库服务器上了。没有办法通过中间层来灵活分担负载和压力.均衡负载等。
```


##存储过程
```
create table T_Worker(
  wid varchar2(32) primary key,
  name varchar2(32),
  sex varchar(5)
);
---------------------------存储过程
-------------添加
--定义
create or replace procedure p_addtworker(v_name varchar2, v_sex varchar2)
is
v_wid number;
begin
  select max(wid) into v_wid from t_worker t;
  v_wid := v_wid + 1;
  insert into t_worker(wid,name,sex) values(v_wid,v_name,v_sex);
  commit;
end;
--调用
SQL> set serveroutput on
SQL> var name varchar2(20) := 'china';
SQL> var sex varchar2(20) := '女';
SQL> exec p_addtworker(:name,:sex);
PL/SQL procedure successfully completed
--------------------更新
--定义
create or replace procedure p_updatetworker(v_id in number,v_name in varchar2)
is
begin
  update t_worker set name = v_name where wid = v_id;
  if SQL%Found then
    dbms_output.put_line('更新成功');
    else
      dbms_output.put_line('更新失败');
      end if;
      commit;
end;
--调用
SQL> var p1 number;
SQL> exec :p1 := 100005;
SQL> var p2 varchar2(20);
SQL> exec :p2 := 'bbb';
SQL> exec p_updatetworker(:p1,:p2);
更新成功
PL/SQL procedure successfully completed
p1
---------
100005
p2
---------
bbb
--------------------删除
--定义
create or replace procedure p_deletetworker(v_id number)
is
begin
  delete from t_worker where wid = v_id;
  if sql%found then
    dbms_output.put_line('删除'|| v_id ||'成功');
  else 
    dbms_output.put_line('删除'|| v_id ||'失败');
    end if;
    commit;
end;
--调用
begin p_deletetworker(100002); end;
-------------------------------查找
--1.单行查询操作
--定义
create or replace procedure p_querytworker(v_id in t_worker.wid%type,v_res out varchar2) --输入参数
is
rid t_worker.wid%type; --变量
rname t_worker.name%type; --变量
begin
  select wid,name into rid,rname from t_worker where wid = v_id;
  /*dbms_output.put_line('编号为'|| rid ||'的姓名是'|| rname);*/
  v_res := '编号为'|| rid ||'的姓名是'|| rname;
  exception
    when no_data_found then
      dbms_output.put_line('没有符合条件的记录');
      when too_many_rows then
        dbms_output.put_line('记录数太多');
        when others then
          dbms_output.put_line('发生其他错误');
end;
--调用
SQL> var p varchar2(50);
SQL> exec p_querytworker(100006,:p);
PL/SQL procedure successfully completed
p
---------
编号为100006的姓名是allen
--2.显示游标，返回单行单列记录
--定义
create or replace procedure p_querytwoker2(v_id in t_worker.wid%type)
is
cursor v_cur is select name from t_worker where wid = v_id;
rname t_worker.name%type;
begin
  open v_cur;
  fetch v_cur into rname;
  if v_cur%found then
    dbms_output.put_line('编号为'|| v_id ||'的姓名为'|| rname);
    else
      dbms_output.put_line('没有符合条件的记录');
      end if;
      close v_cur;
      end;
--调用
SQL> exec p_querytworker2(100004);
编号为100004的姓名为china
--3.显示游标，返回单行多列记录
create or replace procedure p_querytworker3(v_id t_worker.wid%type) --type用于字段、列
is
cursor v_cur is select * from t_worker where wid = v_id;
v_row t_worker%rowtype;  --rowtype用于行
begin
  open v_cur;
  fetch v_cur into v_row;
  if v_cur%found then
    dbms_output.put_line('编号为'|| v_id || '的姓名为'|| v_row.name);
    else
      dbms_output.put_line('没有符合的记录');
      end if;
      close v_cur;
      end;
--调用
SQL> exec p_querytworker3(100005);
编号为100005的姓名为bbb
--4.显示游标(loop循环)：返回多行多列记录
--方法1：基于表的记录变量接收游标数据
--定义
create or replace procedure p_querytworker41
as
cursor v_cur is select * from t_worker;
v_row t_worker%rowtype;
begin
  open v_cur;
  loop
    fetch v_cur into v_row;
    exit when v_cur%notfound;
    dbms_output.put_line('编号为'|| v_row.wid || '的姓名为'|| v_row.name);
    end loop;
    close v_cur;
    end;
--调用
SQL> exec p_querytworker41();
编号为100001的姓名为a
编号为100004的姓名为china
编号为100005的姓名为bbb
PL/SQL procedure successfully completed
--方法2.基于游标的记录变量接收游标数据
--定义
create or replace procedure p_querytworker42
as
cursor v_cur is select * from t_worker;
v_row v_cur%rowtype;
begin
  open v_cur;
  loop
    fetch v_cur into v_row;
    exit when v_cur%notfound;
    dbms_output.put_line('编号为'|| v_row.wid ||'的姓名为'|| v_row.name);
    end loop;
    close v_cur;
    end;
    
--调用
SQL> exec p_querytworker42();
编号为100001的姓名为a
编号为100004的姓名为china
编号为100005的姓名为bbb
PL/SQL procedure successfully completed
--方法3.基于集合变量的接收游标数据
--定义
create or replace procedure p_querytworker43
as
cursor v_cur is select * from t_worker;
type cur_table_type is table of v_cur%rowtype index by binary_integer;
cur_table cur_table_type;
i int;
begin
open v_cur;
loop
i:=v_cur%rowcount+1;
fetch v_cur into cur_table(i); 
exit when v_cur%notfound;
dbms_output.put_line( '职工的编号为:'||cur_table(i).wid||';'||'的职工姓名为  '||cur_table(i).name );
end loop;
close v_cur;
end;
--调用
SQL> exec p_querytworker43();
职工的编号为:100001;的职工姓名为  a
职工的编号为:100004;的职工姓名为  china
职工的编号为:100005;的职工姓名为  bbb
PL/SQL procedure successfully completed
--5.显示游标(while....loop循环)：返回多行多列记录
--定义（有bug）
create or replace procedure p_querytworker5
as
cursor v_cur is select * from t_worker;
v_row t_worker%rowtype;
begin
  open v_cur;
  fetch v_cur into v_row;
  while v_cur%found loop --循环之前做个fetch
    dbms_output.put_line('编号为'|| v_row.wid ||'的姓名为' || v_row.name);
    end loop;
    close v_cur;
    end;
--调用
exec p_querytworker5();
--6.显示游标(for循环)(适合多个记录)：返回多行多列记录
--游标使用for循环不用open、fetch、close关闭游标.
--6.1.典型for循环
--定义
create or replace procedure p_querytworker61
as
cursor v_cur is select * from t_worker;
begin
  for res in v_cur loop
    dbms_output.put_line(res.wid ||' : ' || res.name);
    end loop;
    end;
--调用
SQL> exec p_querytworker6();
100001 : a
100004 : china
100005 : bbb
PL/SQL procedure successfully completed
--6.2.简单for循环
--定义
create or replace procedure p_querytworker62
as
begin
  for res in (select * from t_worker) loop
    dbms_output.put_line(res.wid ||' : '|| res.name);
    end loop;
    end;
--调用
exec p_querytworker6();
--7 ref游标(loop循环)
--7.1.ref弱类型游标 loop 循环
--定义
create or replace procedure p_querytworker71(v_type in varchar)
as
type cur is ref cursor; --声明游标类型为ref
v_row cur; --声明变量为ref游标类型
v_res t_worker%rowtype;
begin
  if v_type='all' then
    open v_row for select * from t_worker;
    loop
      fetch v_row into v_res;
      exit when v_row%notfound;
      dbms_output.put_line(v_res.wid ||' : '|| v_res.name);
      end loop;
      elsif v_type='top' then
        open v_row for select * from t_worker where rownum < 10;
        loop
          fetch v_row into v_res;
          exit when v_row%notfound;
          dbms_output.put_line(v_res.wid ||' -> '|| v_res.name);
          end loop;
          else
            dbms_output.put_line('请输入 all 或 top');
            return;
            end if;
            close v_row;
            end;
--调用
SQL> exec p_querytworker71('all');
--7.2. ref强类型游标 loop循环
--定义
create or replace procedure p_querytworker72
as
type cur is ref cursor return t_worker%rowtype; --声明游标类型为ref
v_row cur; --声明变量为ref游标类型
v_res t_worker%rowtype;
begin
  open v_row for select * from t_worker;
  loop
    fetch v_row into v_res;
    exit when v_row%notfound;
    dbms_output.put_line(v_res.wid ||' : '|| v_res.name);
    end loop;
    close v_row;
    end;
--调用
exec p_querytworker72();
--------------------------有单个数据值返回的存储过程
--定义
create or replace procedure proc_single_return(v_id in number,v_count out number)
is
begin
  select count(t.wid) into v_count from t_worker t where t.wid > v_id;
  dbms_output.put_line(v_count);
  end;
--调用
SQL> var res number;
SQL> exec proc_single_return(100003,:res);
3
PL/SQL procedure successfully completed
res
---------
3
-------------------------------------有返回值的存储过程(列表返回)
--首先建立我们自己的包
create or replace package m_package as
type m_cursor is ref cursor;
end m_package;
--定义存储过程
create or replace procedure proc_multi_return(p_id in number, p_cursor out m_package.m_cursor) 
is
begin
  open p_cursor for
    select * from t_worker where wid > p_id;
end proc_multi_return;
```


##两个经典的Oracle触发器示例
```
--触发器：
--添加员工信息,流水号作为自动编号(通过序列生成),
--并且判断如果工资小于0,则改为0;如果大于10000,则改为10000。
CREATE TABLE emp2(
       e_id NUMBER,
       e_no NUMBER,
       e_name VARCHAR2(20),
       e_sal NUMBER)
select * from emp2;
--CREATE SEQUENCE
create sequence seq_trg_id;
--CREATE TRIGER
create or replace trigger trg_add_emp_info
before 
insert on emp2 
for each row 
  declare 
  begin
    select seq_trg_id.nextval into :NEW.e_id from dual;
    if :NEW.e_sal < 0 then :NEW.e_sal:=0;
    elsif :NEW.e_sal > 10000 then :NEW.e_sal := 10000;
    end if;
    end;
--测试
insert into emp2(e_id,e_no,e_name,e_sal) values(seq_trg_id.nextval,7788,'adanac',100000000)
insert into emp2(e_id,e_no,e_name,e_sal) values(seq_trg_id.nextval,7788,'ad',10)
insert into emp2(e_no,e_name,e_sal) values(7788,'b',-10)
insert into emp2(e_id,e_no,e_name,e_sal) values(seq_trg_id.nextval,7788,'b1',-10)
delete from emp2 where e_id=5; commit;
insert into emp2(e_no,e_name,e_sal) values(7788,'b2',1000000)
insert into emp2(e_no,e_name,e_sal) values(7789,'c',1000000);commit;
    
--为emp建立触发器,将删除的记录放到emp3表中(autoid,deptno,empno,ename,del_rq-删除日期)
--CREATE TABLE
CREATE TABLE emp3(
    autoid NUMBER PRIMARY KEY,
    deptno NUMBER,
    empno NUMBER,
    ename VARCHAR2(20),
    del_rq DATE
)
--CREATE SEQUENCE（序列跟表没有任何关系，一般有多少表，就有多少个序列。每个表都用自己的序列）
create sequence seq_trg_del_autoid;
--CREATE TRIGGER
create or replace trigger trg_del_emp2_info
before delete
on emp2
for each row
  declare
  begin
    insert into emp3(autoid,deptno,empno,ename,del_rq)
    values
    (seq_trg_del_autoid.nextval,10,:OLD.e_no,:OLD.e_name,sysdate);
    end;


--测试
select * from emp3;
select * from emp2;
delete from emp2 t where t.e_id=24
commit;
```


##pl/sql触发器
```
http://cherryqq.iteye.com/blog/855022
http://www.cnblogs.com/liunx/archive/2008/04/09/1145173.html
http://bbs.csdn.net/topics/330058501
```
##pl/sql CURD
```
pl/sql调用java代码
--1. 通过创建Java source的方式将Java class编译到数据库中
create or replace and compile java source named fnd as
package fnd;
public class Test{
       public void test(){}
       public static String hello(){
              return "hello world";
       }
}
--2. 检查Java class是否编译成功
SQL> show errors java source fnd;
No errors for JAVA SOURCE SCOTT.FND
--3. 创建PL/SQL测试程序包
create or replace package test_package is
function sayHello return varchar2;
end test_package;
SQL> /
Package created
create or replace package body test_package is
 function sayHello return varchar2 is
   language java name 'fnd.Test.hello() return String';
 end test_package;
SQL> /
Package body created
--4. 编写plsq测试脚本
begin
  dbms_output.put_line(test_package.sayHello);
end;
SQL> set serveroutput on
SQL> /
hello world
PL/SQL procedure successfully completed
```


##存储过程与函数的联系与区别
```
存储过程procedure
--1.存储过程的定义 
create or replace procedure changeParam(vparam1 in out varchar2,vparam2 in out vchar2)
is 
vtemp varchar2(20);
begin
  dbms_output.put_line('交换前:'||vparam1||','||vparam2);
  vtemp := vparam1;
  vparam1 := vparam2;
  vparam2 := vtemp;
  dbms_output.put_line('交换后:'||vparam1||','||vparam2);
  exception
    when others then dbms_output.put_line('发生了错误');
    end changeParam;
--存储过程 的调用 
declare 
vp1 varchar2(20) := 'param1';
vp2 varchar2(20) := 'param2';
begin 
  changeParam(vparam1 => vp1, vparam2 => vp2);
end;
--2.第一个存储过程（创建剖析）
create or replace procedure proc1(   
  p_para1 varchar2,   
  p_para2 out varchar2,   
  p_para3 in out varchar2   
)as    
 v_name varchar2(20);   
begin   
  v_name := '张三丰';   
  p_para3 := v_name;   
  dbms_output.put_line('p_para3:'||p_para3);   
end; 
存储过程名定义：包括存储过程名和参数列表（参数名和参数类型）参数名不能重复，参数传递方式:IN, OUT, IN OUT。
IN 表示输入参数，按值传递方式。 
OUT 表示输出参数，可以理解为按引用传递方式。可以作为存储过程的输出结果，供外部调用者使用。 
IN OUT 即可作输入参数，也可作输出参数。 
参数的数据类型只需要指明类型名即可，不需要指定宽度。 参数的宽度由外部调用者决定。 
存储过程可以有参数，也可以没有参数 。
变量声明块：紧跟着的as (is )关键字，相当于pl/sql中的declare关键字，用于声明变量。 
变量声明块用于声明该存储过程需要用到的变量，它的作用域为该存储过程。另外这里声明的变量必须指定宽度。遵循PL/SQL的变量声明规范。 
过程语句块：从begin 关键字开始为过程的语句块。存储过程的具体逻辑在这里来实现。 
异常处理块：关键字为exception ，为处理语句产生的异常。该部分为可选 
结束块：由end关键字结果。
--1.2 存储过程的参数传递方式 
存储过程的参数传递有三种方式:IN,OUT,IN OUT . 
IN参数： 按值传递，并且它不允许在存储过程中被重新赋值，它相当于java在参数前面加上final关键字 。
如果存储过程的参数没有指定存参数传递类型，默认为IN 。
create or replace procedure proc1(   
  p_para1 varchar2,   
  p_para2 out varchar2,   
  p_para3 in out varchar2   
)as    
 v_name varchar2(20);   
begin   
  p_para1 :='aaa';   
  p_para2 :='bbb';   
  v_name := '张三丰';   
  p_para3 := v_name;   
  dbms_output.put_line('p_para3:'||p_para3);      
end;
8/3      PLS-00363: expression 'P_PARA1' cannot be used as an assignment target
OUT 参数：作为输出参数，需要注意，当一个参数被指定为OUT类型时，就算在调用存储过程之前对该参数进行了赋值，在存储过程中该参数的值仍然是null. 
create or replace procedure proc1(   
  p_para1 varchar2,   
  p_para2 out varchar2,   
  p_para3 in out varchar2   
)as    
 v_name varchar2(20);   
begin   
  v_name := '张三丰';   
  p_para3 := v_name;   
  dbms_output.put_line('p_para1:'||p_para1);   
  dbms_output.put_line('p_para2:'||p_para2);   
  dbms_output.put_line('p_para3:'||p_para3);   
end;   
  
SQL> var p1 varchar2(10);   
SQL> var p2 varchar2(10);   
SQL> var p3 varchar2(10);   
SQL> exec :p1 :='aaaa';   
SQL> exec :p2 :='bbbb';   
SQL> exec :p3 :='cccc';   
SQL> exec proc1(:p1,:p2,:p3);   
p_para1:aaaa   
p_para2:   
p_para3:张三丰
INOUT参数： 是真正的按引用传递参数。即可作为传入参数也可以作为传出参数。
--1.3存储过程参数宽度
--in类型的参数的宽度
我们无法在存储过程的定义中指定存储参数的宽度，也就导致了我们无法在存储过程中控制传入变量的宽度。这个宽度是完全由外部传入时决定的。
create or replace procedure proc1(   
  p_para1 varchar2,   
  p_para2 out varchar2,   
  p_para3 in out varchar2   
)as    
 v_name varchar2(2);   
begin   
  v_name := p_para1;   
end;
SQL> var p1 varchar2(10);   
SQL> var p2 varchar2(20);   
SQL> var p3 varchar2(30);   
SQL> exec :p1 :='aaaaaa';   
SQL> exec proc1(:p1,:p2,:p3);
begin proc1(:p1,:p2,:p3); end;
ORA-06502: PL/SQL: 数字或值错误 :  字符串缓冲区太小
ORA-06512: 在 "SCOTT.PROC1", line 8
ORA-06512: 在 line 1
--out类型的参数宽度
create or replace procedure proc1(   
  p_para1 varchar2,   
  p_para2 out varchar2,   
  p_para3 in out varchar2   
)as    
 v_name varchar2(2);   
begin   
  p_para2 :='aaaaaaaaaaaaaaaaaaaa';   
end;
SQL> var p1 varchar2(1);
SQL> var p2 varchar2(1);
SQL> var p3 varchar2(1);
SQL> exec :p2 := 'a';
PL/SQL procedure successfully completed
p2
---------
a
SQL> exec proc1(:p1,:p2,:p3);
PL/SQL procedure successfully completed
p1
---------
p2
---------
aaaaaaaaaaaaaaaaaaaa
p3
---------
SQL> select dump(:p2) from dual;
DUMP(:P2)
--------------------------------------------------------------------------------
Typ=1 Len=20: 97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97,97
p2
---------
aaaaaaaaaaaaaaaaaaaa
在该过程中，p_para2被赋予了20个字符a. 
而在外部的调用过程中，p2这个参数仅仅被定义为varchar2(1). 
而把p2作为参数调用这个过程，却并没有报错。而且它的真实值就是20个a。
--inout类型的参数宽度
create or replace procedure proc1(   
  p_para1 varchar2,   
  p_para2 out varchar2,   
  p_para3 in out varchar2   
)as    
 v_name varchar2(2);   
begin   
  p_para3 :='aaaaaaaaaaaaaaaaaaaa';   
end; 
SQL> var p1 varchar2(1);
SQL> var p2 varchar2(1);
SQL> var p3 varchar2(1);
SQL> exec proc1(:p1,:p2,:p3);
PL/SQL procedure successfully completed
p1
---------
p2
---------
p3
---------
aaaaaaaaaaaaaaaaaaaa
--总结，对于IN参数，其宽度是由外部决定。 
对于OUT 和IN OUT 参数，其宽度是由存储过程内部决定。 
因此，在写存储过程时，对参数的宽度进行说明是非常有必要的，最明智的方法就是参数的数据类型使用%type。这样双方就达成了一致。 
--1.4参数的默认值
存储过程的参数可以设置默认值，可以通过default 关键字为存储过程的参数指定默认值。在对存储过程调用时，就可以省略默认值。 
需要注意的是：默认值仅仅支持IN传输类型的参数。OUT 和 IN OUT不能指定默认值
create or replace procedure procdefault(p1 varchar2,   
                                        p2 varchar2 default 'mark') 
as
begin   
  dbms_output.put_line(p2);   
end;
SQL> exec procdefault('a');
mark
PL/SQL procedure successfully completed
--对于有默认值的参数不是排在最后的情况
create or replace procedure procdefault(p1 varchar2 default 'remark',    
                                        p2 varchar2) 
as
begin   
  dbms_output.put_line(p1);   
end;
想使用第一个参数的默认值时，我们可以指定参数的值：SQL> exec procdefault2(p2 =>'aa'); 
--存储过程内部块  
我们知道了存储过程的结构，语句块由begin开始，以end结束。这些块是可以嵌套。在语句块中可以嵌套任何以下的块。
create or replace procedure innerBlock(p1 varchar2)   
as    
  o1 varchar2(10) := 'out1';   
begin   
  dbms_output.put_line(o1);   
  declare    
    inner1 varchar2(20);   
  begin   
    inner1 :='inner1';   
    dbms_output.put_line(inner1);   
  
    declare    
      inner2 varchar2(20);   
    begin   
      inner2 := 'inner2';   
      dbms_output.put_line(inner2);   
    end;   
  exception    
    when others then   
      null;   
  end;   
end;
SQL> exec innerblock('a');
out1
inner1
inner2
PL/SQL procedure successfully completed
--存储过程定义
create or replace procedure protest(p1 varchar2,p2 out varchar2)
is
begin
  if(p1='a') 
  then
    p2:='your input is a';
    else if (p1='b') then 
      p2:='your input is b';
      else 
        p2:='your input is not a or b';
     end if;
   end if;
end;
--pl/sql调用
SQL> var p2 varchar2(20);
SQL> exec protest('a',:p2);
PL/SQL procedure successfully completed
p2
---------
your input is a
--java代码调用
public static String execProcedure() {
String res = "";
CallableStatement proc;
Connection conn = JdbcOracle.getConnection();
try {
proc = conn.prepareCall("{call protest(?,?)}");
proc.setString(1, "c");
proc.registerOutParameter(2, Types.VARCHAR); // 返回值的类型，Types.VARCHAR相当于String
proc.execute();
res = proc.getString(2);
return res;
} catch (SQLException e) {
e.printStackTrace();
} finally {
JdbcOracle.closeConnection();
}
return res;
}
```


##function的使用
```
--function中声明变量
create or replace function getName return varchar2 is
Result VARCHAR2(8000);
v_d number := 3; //声明一个number类型的变量，注意没有int型，且不能加declare关键字
begin
  FOR CUR IN
  (
        select ename from emp t where rownum < v_d
  )
  LOOP
      Result := Result||CUR.ename||',';
  END LOOP;
  --去掉最后一个逗号
  Result:=SUBSTR(Result,0,LENGTH(Result)-1);
  return(Result);
end;
--function的定义(带参数)
create or replace function getName(ineid IN VARCHAR2) return varchar2 is
  Result VARCHAR2(40);
begin
  --通过游标，CIP联络员的动态值
  FOR CUR IN
  (
        select ename from emp t where t.empno = ineid
  )
  LOOP
      Result := Result||CUR.ename||',';
  END LOOP;
  --去掉最后一个逗号
  Result:=SUBSTR(Result,0,LENGTH(Result)-1);
  return(Result);
end;
--function的调用（带参数） 
declare
v_empno emp.empno%TYPE;
begin
  if(getName(v_empno) IS NULL) THEN
     dbms_output.put_line('no result');
     else
       dbms_output.put_line(getName(v_empno));
  end if;
end;
--总结：函数的定义不像游标的使用，要在command windows下执行，可以在sql windows下执行。
--JAVA代码调用pl/sql的function:
public static String testFunction(int id) {
String retValue = "";
CallableStatement cs;
Connection conn = JdbcOracle.getConnection();
try {
cs = conn.prepareCall("{? = call getName(?)}");
// Register the type of the return value
cs.registerOutParameter(1, Types.VARCHAR); // 返回值
// 的类型，Types.VARCHAR相当于String
// Set the value for the IN parameter
cs.setInt(2, id);
// Execute and retrieve the returned value
cs.execute();
retValue = cs.getString(1);
return retValue;
} catch (SQLException e) {
e.printStackTrace();
} finally {
JdbcOracle.closeConnection();
}
return retValue;
}
--function的定义（不带参数）
create or replace function getName return varchar2 is
Result VARCHAR2(8000);
begin
  --通过游标，CIP联络员的动态值
  FOR CUR IN
  (
        select ename from emp t
  )
  LOOP
      Result := Result||CUR.ename||',';
  END LOOP;
  --去掉最后一个逗号
  Result:=SUBSTR(Result,0,LENGTH(Result)-1);
  return(Result);
end;
--function的调用 （不带参数）
declare
begin
  if(getName IS NULL) THEN
     dbms_output.put_line('no result');
     else
       dbms_output.put_line(getName);
  end if;
end;
--java代码调用不带参数的函数
public static String execFunction() {
String retValue = "";
CallableStatement cs;
Connection conn = JdbcOracle.getConnection();
try {
cs = conn.prepareCall("{? = call getName}");
cs.registerOutParameter(1, Types.VARCHAR); // 返回值的类型，Types.VARCHAR相当于String
cs.execute();
retValue = cs.getString(1);
return retValue;
} catch (SQLException e) {
e.printStackTrace();
} finally {
JdbcOracle.closeConnection();
}
return retValue;
}
```


##pl/sql   将select的结果赋给一个变量
```
create or replace function addTest(id in varchar2) return varchar2 is
 pid varchar2(10);
 begin
   select max(wid) into pid from t_worker;
   --并非是 pid := select max(wid) from t_worker;
   return pid;
 end;
```


##ORA-06502: PL/SQL: 数字或值错误 :  字符串缓冲区太小  
```
--官方解释是：  想存入数据库的数据（包含数据，字符串等等）不符合该字段的定义（比如长度，约束等）， 举个例子，就是说你想存一个空值到非空字段，如存入3位以上的数字到NUMBER(2)字段中，等等
--官方解决方法是： 改变数据的类型，或长度，等等。
PLS-00221: 'ADDTEST' 不是过程或尚未定义
--原因是在调用函数时没有接收返回值
--因此，定义函数时必须要定义返回值
ORA-20000：ORU-10027：buffer overflow,limit of 2000 bytes. 
原因：变量大小超过了dbms_output.putline的最大值。
解决办法1：
SQL>set   serveroutput   on   size   1000000   
解决办法2：
在begin后面加上DBMS_OUTPUT.ENABLE(buffer_size => null) ，表示输出buffer不受限制。
如：
set serveroutput on
declare
  v_sql    varchar2(1000);
  v_result varchar2(2000);
begin
  DBMS_OUTPUT.ENABLE(buffer_size => null); --表示输出buffer不受限制
JAVA调用时 pls-00201 必须声明标识符
原因：出现此问题，有可能是因为java代码中连接的数据库与建立函数的数据库不是同一个导致。
也有可能java中调用的函数名或存储过程名 写错！
 PL/SQL: ORA-00947: 没有足够的值 
--执行insert的时候出现这个错误
insert into 表1 values (123,2423,12);
表1的结构有4个column，显然插入的值只有三个，因此才会出现这个问题。
再加个column 的值执行后，ok。
--倘若只想插入三个数值的话：
insert into 表1(a,b,c) values (123,2423,12);
```
##pl/sql 删除自定义的函数
```
commond script窗口下：SQL > drop function function_Name;即可
```


##九九乘法法的三种实现
```
--loop实现
declare 
  v_i number(10); 
  v_j number(10); 
begin 
  v_i := 1; 
  loop 
    v_j := 1; 
    loop 
        dbms_output.put(v_i||'*'||v_j||'='||v_i*v_j||'   ');  
        v_j := v_j + 1; 
        exit when v_j > v_i; 
    end loop; 
    dbms_output.put_line(''); 
    v_i := v_i + 1; 
    exit when v_i>9;  
  end loop; 
end; 
--for实现
declare 
 v_d int(5); 
begin 
  v_d := 1; 
  for v_i in 1..9 loop 
       for v_j in 1..v_i loop 
         dbms_output.put(v_i||'*'||v_j||'='||v_i*v_j||'  '); 
       end loop; 
       dbms_output.put_line(''); 
  end loop; 
end; 
--while实现
declare 
  v_i number(10); 
  v_j number(10); 
begin 
  v_i := 1; 
  while v_i < 10 loop 
        v_j := 1; 
        while v_j <= v_i loop 
        dbms_output.put(v_i||'*'||v_j||'='||v_i*v_j||'  '); 
        v_j := v_j + 1; 
        end loop;  
        dbms_output.put_line(''); 
        v_i := v_i + 1; 
  end loop; 
end;
```


##游标的使用
```
--打印出emp表中的前两条数据
declare 
v_ename EMP.ENAME%TYPE;  --使用%TYPE,var_name变量将同emp表的name列的类型绑定
v_sal EMP.SAL%TYPE;
cursor cur_emp is select ename,sal from emp t;
begin 
  open cur_emp;
  fetch cur_emp INTO v_ename,v_sal;
  dbms_output.put_line('salary:'|| v_ename ||' '|| v_sal);
  fetch cur_emp into v_ename,v_sal;
  dbms_output.put_line('salary:'|| v_ename||' '||v_sal);
  close cur_emp;
  end;
--遍历打印出emp表中所的数据
--游标for循环
declare 
cursor cur_emp is select ename,sal from emp t;
begin 
  for emp_row in cur_emp
    loop 
      dbms_output.put_line('salar:'||emp_row.ename||' '||emp_row.sal);  
    end loop;
end;
总结如下：
for循环简单实用，会自动open和close游标;
自动定义了一个记录类型及声明该类型的变量，并自动fetch数据到这个变量中;
emp_row变量是一个记录类型，具体的结构由游标决定,无需在循环外进行声明，无需为其指定数据类型,。
其作用域仅仅是在循环体内;
由此可见，for循环是用来循环游标的最好方法。高效，简洁，安全。
--loop循环，求sum(1+2+..+100)
declare
v_sum int(5);
v_i int(5);
begin 
  v_sum := 0;
  v_i := 1;
  loop
    v_sum := v_sum + v_i;
    v_i := v_i + 1;
    exit when v_i > 100;
    end loop;
 dbms_output.put_line(v_sum);
end;
```