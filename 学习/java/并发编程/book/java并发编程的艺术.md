http://blog.csdn.net/u013142781/article/details/50805655
[TOC]
##并发编程的挑战
###多线程不一定快
```
当并发执行累加操作不超过百万次时，速度会比串行执行累加操作要
慢。那么，为什么并发执行的速度会比串行慢呢？这是因为线程有创建和上下文切换的开销。
```
###减少上下文切换实战
```
第一步：用jstack命令dump线程信息，看看pid为3117的进程里的线程都在做什么。
sudo -u admin /opt/ifeve/java/bin/jstack 31177 > /home/adanac/dump3117

第二步：统计所有线程分别处于什么状态，发现300多个线程处于WAITING（onobject-
monitor）状态。
[adanac@localhost ~]$ grep java.lang.Thread.State dump3117 | awk '{print $2$3$4$5}'
        | sort | uniq -c
 39 RUNNABLE
 21 TIMED_WAITING(onobjectmonitor)
 6 TIMED_WAITING(parking)
 51 TIMED_WAITING(sleeping)
 305 WAITING(onobjectmonitor)
 3 WAITING(parking)

第三步：打开dump文件查看处于WAITING（onobjectmonitor）的线程在做什么。发现这些线
程基本全是JBOSS的工作线程，在await。说明JBOSS线程池里线程接收到的任务太少，大量线
程都闲着。
"http-0.0.0.0-7001-97" daemon prio=10 tid=0x000000004f6a8000 nid=0x555e in
    Object.wait() [0x0000000052423000]
 java.lang.Thread.State: WAITING (on object monitor)
 at java.lang.Object.wait(Native Method)
 - waiting on <0x00000007969b2280> (a org.apache.tomcat.util.net.AprEndpoint$Worker)
 at java.lang.Object.wait(Object.java:485)
 at org.apache.tomcat.util.net.AprEndpoint$Worker.await(AprEndpoint.java:1464)
 - locked <0x00000007969b2280> (a org.apache.tomcat.util.net.AprEndpoint$Worker)
 at org.apache.tomcat.util.net.AprEndpoint$Worker.run(AprEndpoint.java:1489)
 at java.lang.Thread.run(Thread.java:662)

第四步：减少JBOSS的工作线程数，找到JBOSS的线程池配置信息，将maxThreads降到
100。<maxThreads="250" maxHttpHeaderSize="8192"
 emptySessionPath="false" minSpareThreads="40" maxSpareThreads="75" 
     maxPostSize="512000" protocol="HTTP/1.1"
 enableLookups="false" redirectPort="8443" acceptCount="200" bufferSize="16384"
 connectionTimeout="15000" disableUploadTimeout="false" useBodyEncodingForURI= "true">

第五步：重启JBOSS，再dump线程信息，然后统计WAITING（onobjectmonitor）的线程，发现
减少了175个。WAITING的线程少了，系统上下文切换的次数就会少，因为每一次从
WAITTING到RUNNABLE都会进行一次上下文的切换。读者也可以使用vmstat命令测试一下。
[adanac@localhost ~]$ grep java.lang.Thread.State dump3117 | awk '{print $2$3$4$5}'
    | sort | uniq -c
   44 RUNNABLE
   22 TIMED_WAITING(onobjectmonitor)
   9 TIMED_WAITING(parking)
   36 TIMED_WAITING(sleeping)
   130 WAITING(onobjectmonitor)
1  WAITING(parking)
```
###死锁
```
一旦出现死锁，业务是可感知的，因为不能继续提供服务了，那么只能通过dump线程查看
到底是哪个线程出现了问题。
以下线程信息告诉我们是DeadLockDemo类的第32行和第22行引
起的死锁。

C:\Users\allen>jstack 1448
2017-02-04 21:58:27
Full thread dump Java HotSpot(TM) 64-Bit Server VM (25.60-b23 mixed mode):

"DestroyJavaVM" #12 prio=5 os_prio=0 tid=0x00000000023c8000 nid=0x1030 waiting o
n condition [0x0000000000000000]
   java.lang.Thread.State: RUNNABLE

"Thread-1" #11 prio=5 os_prio=0 tid=0x000000005878d000 nid=0x136c waiting for mo
nitor entry [0x000000005966f000]
   java.lang.Thread.State: BLOCKED (on object monitor)
        at com.adanac.book.concurrency.test.one.DeadLockDemo$2.run(DeadLockDemo.
java:32)
        - waiting to lock <0x00000000d6bbc470> (a java.lang.String)
        - locked <0x00000000d6bbc4a0> (a java.lang.String)
        at java.lang.Thread.run(Thread.java:745)

"Thread-0" #10 prio=5 os_prio=0 tid=0x000000005878c800 nid=0xa98 waiting for mon
itor entry [0x000000005951f000]
   java.lang.Thread.State: BLOCKED (on object monitor)
        at com.adanac.book.concurrency.test.one.DeadLockDemo$1.run(DeadLockDemo.
java:22)
        - waiting to lock <0x00000000d6bbc4a0> (a java.lang.String)
        - locked <0x00000000d6bbc470> (a java.lang.String)
        at java.lang.Thread.run(Thread.java:745)
```
###避免死锁的几个常见方法
```
·避免一个线程同时获取多个锁。
·避免一个线程在锁内同时占用多个资源，尽量保证每个锁只占用一个资源。
·尝试使用定时锁，使用lock.tryLock（timeout）来替代使用内部锁机制。
·对于数据库锁，加锁和解锁必须在一个数据库连接里，否则会出现解锁失败的情况。
```
###资源限制
```
（1）什么是资源限制
资源限制是指在进行并发编程时，程序的执行速度受限于计算机硬件资源或软件资源。
例如，服务器的带宽只有2Mb/s，某个资源的下载速度是1Mb/s每秒，系统启动10个线程下载资
源，下载速度不会变成10Mb/s，所以在进行并发编程时，要考虑这些资源的限制。硬件资源限
制有带宽的上传/下载速度、硬盘读写速度和CPU的处理速度。软件资源限制有数据库的连接
数和socket连接数等。
（2）资源限制引发的问题
在并发编程中，将代码执行速度加快的原则是将代码中串行执行的部分变成并发执行，
但是如果将某段串行的代码并发执行，因为受限于资源，仍然在串行执行，这时候程序不仅不
会加快执行，反而会更慢，因为增加了上下文切换和资源调度的时间。例如，之前看到一段程
序使用多线程在办公网并发地下载和处理数据时，导致CPU利用率达到100%，几个小时都不
能运行完成任务，后来修改成单线程，一个小时就执行完成了。

（3）如何解决资源限制的问题
对于硬件资源限制，可以考虑使用集群并行执行程序。既然单机的资源有限制，那么就让
程序在多机上运行。比如使用ODPS、Hadoop或者自己搭建服务器集群，不同的机器处理不同
的数据。可以通过“数据ID%机器数”，计算得到一个机器编号，然后由对应编号的机器处理这
笔数据。
对于软件资源限制，可以考虑使用资源池将资源复用。比如使用连接池将数据库和Socket
连接复用，或者在调用对方webservice接口获取数据时，只建立一个连接。
（4）在资源限制情况下进行并发编程如何在资源限制的情况下，让程序执行得更快呢？方法就是，根据不同的资源限制调整
程序的并发度，比如下载文件程序依赖于两个资源——带宽和硬盘读写速度。有数据库操作
时，涉及数据库连接数，如果SQL语句执行非常快，而线程的数量比数据库连接数大很多，则
某些线程会被阻塞，等待数据库连接。
```
###总结
```
在并发下如果出现问题，定位起来会比较耗时和棘手,所以
建议多使用JDK并发包提供的并发容器和工具类来解决并发
问题，因为这些类都已经通过了充分的测试和优化
```
##java并发机制的底层实现原理
###volatile应用
```
volatile是轻量级的synchronized，它在多处理器开发中保证了共享变量的“可见性”。
可见性的意思是当一个线程修改一个共享变量时，另外一个线程能读到这个修改的值。
它比synchronized的使用和执行成本更低，因为它不会引起线程上下文的切换和调度。
如果一个字段被声明成volatile，Java线程内存
模型确保所有线程看到这个变量的值是一致的。

```
###volatile优化
```
Java并发编程大师Doug lea在JDK 7的并发包里新增一个队列集合类Linked-
TransferQueue，它在使用volatile变量时，用一种追加字节的方式来优化队列出队和入队的性
能。LinkedTransferQueue的代码如下。
/** 
队列中的头部节点
 */
private transient final PaddedAtomicReference<QNode> head;
/** 
队列中的尾部节点
 */
private transient final PaddedAtomicReference<QNode> tail;
static final class PaddedAtomicReference <T> extends AtomicReference T> {
     // 使用很多4个字节的引用追加到64个字节
     Object p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, pa, pb, pc, pd, pe;
     PaddedAtomicReference(T r) {
        super(r);
     }
}
public class AtomicReference <V> implements java.io.Serializable {
     private volatile V value;
     // 
省略其他代码
｝
Doug lea使
用追加到64字节的方式来填满高速缓冲区的缓存行，避免头节点和尾节点加载到同一个缓存行，使头、尾节点在修改时不会互相锁定。

```
###synchronized的实现原理与应用
```
synchronized实现同步的基础：Java中的每一个对象都可以作为锁。具体表现
为以下3种形式。
·对于普通同步方法，锁是当前实例对象。
·对于静态同步方法，锁是当前类的Class对象。
·对于同步方法块，锁是Synchonized括号里配置的对象。

当一个线程试图访问同步代码块时，它首先必须得到锁，退出或抛出异常时必须释放锁。

```
###java对象头
```
synchronized用的锁是存在Java对象头里的。如果对象是数组类型，则虚拟机用3个字宽
（Word）存储对象头，如果对象是非数组类型，则用2字宽存储对象头。在32位虚拟机中，1字宽等于4字节，即32bit

Java对象头里的Mark Word里默认存储对象的HashCode、分代年龄和锁标记位。

```
###锁的升级
```
锁一共有4种状态，级别从低到高依次是：无锁状态、偏向锁状态、轻量级锁状
态和重量级锁状态，这几个状态会随着竞争情况逐渐升级。锁可以升级但不能降级，意味着偏向锁升级成轻量级锁后不能降级成偏向锁。这种锁升级却不能降级的策略，目的是为了提高获得锁和释放锁的效率.

```
###原子操作的实现原理
```
从Java 1.5开始，JDK的并发包里提供了一些类来支持原子操作，
如AtomicBoolean（用原子方式更新的boolean值）、AtomicInteger（用原子方式更新的int值）和AtomicLong（用原子方式更新的long值）。
这些原子包装类还提供了有用的工具方法，比如以原子的方式将当前值自增1和
自减1。

```
##java内存模型
###线程之间如何通信
```
通信是指线程之间以何种机制来交换信息。在命令式编程
中，线程之间的通信机制有两种：共享内存和消息传递。
在共享内存的并发模型里，线程之间共享程序的公共状态，通过写-读内存中的公共状态
进行隐式通信。在消息传递的并发模型里，线程之间没有公共状态，线程之间必须通过发送消息来显式进行通信。

```
###线程之间如何同步
```
同步是指程序中用于控制不同线程间操作发生相对顺序的机制。
在共享内存并发模型里，同步是显式进行的。
程序员必须显式指定某个方法或某段代码需要在线程之间互斥执行。

在消息传递的并发模型里，由于消息的发送必须在消息的接收之前，因此同步是隐式进行的。

```
###内存可见性问题
```
Java的并发采用的是共享内存模型，Java线程之间的通信总是隐式进行，整个通信过程对
程序员完全透明。如果编写多线程程序的Java程序员不理解隐式进行的线程之间通信的工作
机制，很可能会遇到各种奇怪的内存可见性问题。
```
##Java内存模型的抽象结构
```
在Java中，所有实例域、静态域和数组元素都存储在堆内存中，堆内存在线程之间共享
局部变量，方法定义参数和异常处理器参数不会在线程之间共享，它们不会有内存可见性问题。
Java线程之间的通信由Java内存模型（本文简称为JMM）控制，JMM决定一个线程对共享
变量的写入何时对另一个线程可见。
```
###线程之间通信
```
如果线程A与线程B之间要通信的话，必须要经历下面2个步骤。
1）线程A把本地内存A中更新过的共享变量刷新到主内存中去。
2）线程B到主内存中去读取线程A之前已更新过的共享变量。
这两个步骤实质上是线程A在向线程B发送消息，而且这个通信过程必须要
经过主内存。JMM通过控制主内存与每个线程的本地内存之间的交互，来为Java程序员提供
内存可见性保证。
```
###从源代码到指令序列的重排序
```
在执行程序时，为了提高性能，编译器和处理器常常会对指令做重排序。重排序分3种类
型。
1）编译器优化的重排序。编译器在不改变单线程程序语义的前提下，可以重新安排语句
的执行顺序。
2）指令级并行的重排序。现代处理器采用了指令级并行技术（Instruction-Level
Parallelism，ILP）来将多条指令重叠执行。如果不存在数据依赖性，处理器可以改变语句对应
机器指令的执行顺序。
3）内存系统的重排序。由于处理器使用缓存和读/写缓冲区，这使得加载和存储操作看上
去可能是在乱序执行。

```
###重排序
```
重排序是指编译器和处理器为了优化程序性能而对指令序列进行重新排序的一种手段。

编译器和处理器不会改变存在数据依赖关系的两个操作的执行顺序。
这里所说的数据依赖性仅针对单个处理器中执行的指令序列和单个线程中执行的操作，
不同处理器之间和不同线程之间的数据依赖性不被编译器和处理器考虑。

as-if-serial语义的意思是：不管怎么重排序（编译器和处理器为了提高并行度），（单线程）
程序的执行结果不能被改变。编译器、runtime和处理器都必须遵守as-if-serial语义。
as-
if-serial语义使单线程程序员无需担心重排序会干扰他们，也无需担心内存可见性问题。

如果A happens-before B，JMM并不要求A一定要在B之前执行。JMM仅仅要求前一个
操作（执行的结果）对后一个操作可见，且前一个操作按顺序排在第二个操作之前

总结：
在单线程程序中，对存在控制依赖的操作重排序，不会改变执行结果（这也是as-if-serial
语义允许对存在控制依赖的操作做重排序的原因）；但在多线程程序中，对存在控制依赖的操
作重排序，可能会改变程序的执行结果。
```
###volatile的内存语义
```
线程A写一个volatile变量，实质上是线程A向接下来将要读这个volatile变量的某个线程
发出了（其对共享变量所做修改的）消息。
·线程B读一个volatile变量，实质上是线程B接收了之前某个线程发出的（在写这个volatile变量之前对共享变量所做修改的）消息。
·线程A写一个volatile变量，随后线程B读这个volatile变量，这个过程实质上是线程A通过主内存向线程B发送消息。

由于volatile仅仅保证对单个volatile变量的读/写具有原子性，而锁的互斥执行的特性可以
确保对整个临界区代码的执行具有原子性。

```
###锁的内存语义

```
锁除了让临界区互斥执行外，还可以让释放锁的
线程向获取同一个锁的线程发送消息。
当线程释放锁时，JMM会把该线程对应的本地内存中的共享变量刷新到主内存中。
当线程获取锁时，JMM会把该线程对应的本地内存置为无效。从而使得被监视器保护的
临界区代码必须从主内存中读取共享变量。

下面对锁释放和锁获取的内存语义做个总结。
·线程A释放一个锁，实质上是线程A向接下来将要获取这个锁的某个线程发出了（线程A
对共享变量所做修改的）消息。
·线程B获取一个锁，实质上是线程B接收了之前某个线程发出的（在释放这个锁之前对共
享变量所做修改的）消息。·线程A释放锁，随后线程B获取这个锁，这个过程实质上是线程A通过主内存向线程B发
送消息。

```
###锁内存语义的实现
```
class ReentrantLockExample {
    int a = 0;
    ReentrantLock lock = new ReentrantLock();
    public void writer() {
        lock.lock();// 获取锁
        try {
            a++;
        } finally {
            lock.unlock();// 释放锁
        }
    }
    public void reader () {
        lock.lock();// 获取锁
        try {
            int i = a;
            ……
        } finally {
            lock.unlock();// 释放锁
        }
    }
}
在ReentrantLock中，调用lock()方法获取锁；调用unlock()方法释放锁。
ReentrantLock的实现依赖于Java同步器框架AbstractQueuedSynchronizer（本文简称之为
AQS）。AQS使用一个整型的volatile变量（命名为state）来维护同步状态，马上我们会看到，这
个volatile变量是ReentrantLock内存语义实现的关键。

```
###concurrent包的实现
```
由于Java的CAS同时具有volatile读和volatile写的内存语义，因此Java线程之间的通信现
在有了下面4种方式。
1）A线程写volatile变量，随后B线程读这个volatile变量。
2）A线程写volatile变量，随后B线程用CAS更新这个volatile变量。
3）A线程用CAS更新一个volatile变量，随后B线程用CAS更新这个volatile变量。
4）A线程用CAS更新一个volatile变量，随后B线程读这个volatile变量。
Java的CAS会使用现代处理器上提供的高效机器级别的原子指令，这些原子指令以原子
方式对内存执行读-改-写操作，这是在多处理器中实现同步的关键（从本质上来说，能够支持
原子性读-改-写指令的计算机，是顺序计算图灵机的异步等价机器，因此任何现代的多处理器
都会去支持某种能对内存执行原子性读-改-写操作的原子指令）。同时，volatile变量的读/写和
CAS可以实现线程之间的通信。把这些特性整合在一起，就形成了整个concurrent包得以实现的基石。如果我们仔细分析concurrent包的源代码实现，会发现一个通用化的实现模式。
首先，声明共享变量为volatile。
然后，使用CAS的原子条件更新来实现线程之间的同步。
同时，配合以volatile的读/写和CAS所具有的volatile读和写的内存语义来实现线程之间的通信。
AQS，非阻塞数据结构和原子变量类（java.util.concurrent.atomic包中的类），这些concurrent
包中的基础类都是使用这种模式来实现的，而concurrent包中的高层类又是依赖于这些基础类来实现的。
```
##双重检查锁定
```
非线程安全的延迟初始化对象的示例代码。
public class UnsafeLazyInitialization {
    private static Instance instance;
    public static Instance getInstance() {
        if (instance == null)               // 1：A线程执行
            instance = new Instance();      // 2：B线程执行
        return instance;
    }
}

对于UnsafeLazyInitialization类，我们可以对getInstance()方法做同步处理来实现线程安全的延迟初始化。示例代码如下。
public class SafeLazyInitialization {
    private static Instance instance;
    public synchronized static Instance getInstance() {
        if (instance == null)
            instance = new Instance();
        return instance;
    }
}
由于对getInstance()方法做了同步处理，synchronized将导致性能开销。如果getInstance()方
法被多个线程频繁的调用，将会导致程序执行性能的下降。
反之，如果getInstance()方法不会被
多个线程频繁的调用，那么这个延迟初始化方案将能提供令人满意的性能。

人们想通过双重检查
锁定来降低同步的开销。下面是使用双重检查锁定来实现延迟初始化的示例代码。
public class DoubleCheckedLocking {                      // 1
    private static Instance instance;                    // 2
    public static Instance getInstance() {               // 3
        if (instance == null) {                          // 4:第一次检查
            synchronized (DoubleCheckedLocking.class) {  // 5:加锁
                if (instance == null)                    // 6:第二次检查
                    instance = new Instance();          // 7:问题的根源出在这里
            }                                            // 8
        }                                                // 9
        return instance;                                 // 10
    }                                                    // 11
}

```
###两个办法来实现线程安全的延迟初始化
```
1.基于volatile的解决方案
public class SafeDoubleCheckedLocking {
    private volatile static Instance instance;
    public static Instance getInstance() {
        if (instance == null) {
            synchronized (SafeDoubleCheckedLocking.class) {
                if (instance == null)
                    instance = new Instance();         
                    // instance为volatile，现在没问题了
            }
        }
        return instance;
    }
}

2.基于类初始化的解决方案
JVM在类的初始化阶段（即在Class被加载后，且被线程使用之前），会执行类的初始化。在
执行类的初始化期间，JVM会去获取一个锁。这个锁可以同步多个线程对同一个类的初始化。
基于这个特性，可以实现另一种线程安全的延迟初始化方案（这个方案被称之为
Initialization On Demand Holder idiom）。
public class InstanceFactory {
    private static class InstanceHolder {
        public static Instance instance = new Instance();
    }
    public static Instance getInstance() {
        return InstanceHolder.instance ;// 这里将导致InstanceHolder类被初始化
    }
}

Java语言规范规定，对于每一个类或接口C，都有一个唯一的初始化锁LC与之对应。从C
到LC的映射，由JVM的具体实现去自由实现。JVM在类初始化期间会获取这个初始化锁，并且
每个线程至少获取一次锁来确保这个类已经被初始化过了
```
##java并发编程基础
###线程
```
public class MultiThread{
    public static void main(String[] args) {
        ThreadMXBean threadMXBean = ManagementFactory.getThreadMXBean();
        ThreadInfo[] threadInfos = threadMXBean.dumpAllThreads(false, false);
        for (ThreadInfo threadInfo : threadInfos) {
            System.out.println("[" + threadInfo.getThreadId() + "] " + threadInfo.getThreadName());
        }
    }
}
[5] Attach Listener
[4] Signal Dispatcher // 分发处理发送给JVM信号的线程
[3] Finalizer   // 调用对象finalize方法的线程
[2] Reference Handler   // 清除Reference的线程
[1] main   // main线程，用户程序入口

可以看到，一个Java程序的运行不仅仅是main()方法的运行，而是main线程和多个其他线
程的同时运行。

```
###线程的状态
```
public class ThreadState {
    public static void main(String[] args) {
        new Thread(new TimeWaiting(), "TimeWaitingThread").start();
        new Thread(new Waiting(), "WaitingThread").start();
        // 使用两个Blocked线程，一个获取锁成功，另一个被阻塞
        new Thread(new Blocked(), "BlockedThread-1").start();
        new Thread(new Blocked(), "BlockedThread-2").start();
    }

    // 该线程不断地进行睡眠
    static class TimeWaiting implements Runnable {
        @Override
        public void run() {
            while (true) {
                SleepUtils.second(100);
            }
        }
    }

    // 该线程在Waiting.class实例上等待
    static class Waiting implements Runnable {
        @Override
        public void run() {
            while (true) {
                synchronized (Waiting.class) {
                    try {
                        Waiting.class.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    // 该线程在Blocked.class实例上加锁后，不会释放该锁
    static class Blocked implements Runnable {
        public void run() {
            synchronized (Blocked.class) {
                while (true) {
                    SleepUtils.second(100);
                }
            }
        }
    }
}

public class SleepUtils {
    public static final void second(long seconds) {
        try {
            TimeUnit.SECONDS.sleep(seconds);
        } catch (InterruptedException e) {
        }
    }
}

使用jstack工具（可以选择打开终端，键入jstack或者到JDK安装目录的bin目录下
执行命令），尝试查看示例代码运行时的线程信息，更加深入地理解线程状态

运行该示例，打开终端或者命令提示符，键入“jps”，输出如下。
611 
935 Jps
929 ThreadState
270
可以看到运行示例对应的进程ID是929，接着再键入“jstack 929”

// BlockedThread-2
线程阻塞在获取
Blocked.class
示例的锁上
"BlockedThread-2" prio=5 tid=0x00007feacb05d000 nid=0x5d03 waiting for monitor 
entry [0x000000010fd58000]
       java.lang.Thread.State: BLOCKED (on object monitor)
// BlockedThread-1
线程获取到了
Blocked.class
的锁
"BlockedThread-1" prio=5 tid=0x00007feacb05a000 nid=0x5b03 waiting on condition 
[0x000000010fc55000]
       java.lang.Thread.State: TIMED_WAITING (sleeping)
// WaitingThread
线程在
Waiting
实例上等待
"WaitingThread" prio=5 tid=0x00007feacb059800 nid=0x5903 in Object.wait() 
[0x000000010fb52000]
       java.lang.Thread.State: WAITING (on object monitor)
// TimeWaitingThread
线程处于超时等待
"TimeWaitingThread" prio=5 tid=0x00007feacb058800 nid=0x5703 waiting on condition 
[0x000000010fa4f000]
       java.lang.Thread.State: TIMED_WAITING (sleeping)


```
###管道输入/输出流
```
管道输入/输出流和普通的文件输入/输出流或者网络输入/输出流不同之处在于，它主要
用于线程之间的数据传输，而传输的媒介为内存。
管道输入/输出流主要包括了如下4种具体实现：PipedOutputStream、PipedInputStream、
PipedReader和PipedWriter，前两种面向字节，而后两种面向字符。
创建了printThread，它用来接受main线程的输入，任何
main线程的输入均通过PipedWriter写入，而printThread在另一端通过PipedReader将内容读出
并打印。

package com.adanac.book.concurrency.test;

import java.io.IOException;
import java.io.PipedReader;
import java.io.PipedWriter;

public class Piped {
    public static void main(String[] args) throws Exception {
        PipedWriter out = new PipedWriter();
        PipedReader in = new PipedReader();
        // 将输出流和输入流进行连接，否则在使用时会抛出IOException
        out.connect(in);
        Thread printThread = new Thread(new Print(in), "PrintThread");
        printThread.start();
        int receive = 0;
        try {
            while ((receive = System.in.read()) != -1) {
                out.write(receive);
            }
        } finally {
            out.close();
        }
    }

    static class Print implements Runnable {
        private PipedReader in;

        public Print(PipedReader in) {
            this.in = in;
        }

        public void run() {
            int receive = 0;
            try {
                while ((receive = in.read()) != -1) {
                    System.out.print((char) receive);
                }
            } catch (IOException ex) {
            }
        }
    }
}

```
###Thread.join()作用
```
创建了10个线程，编号0~9，每个线程调用前一个线程的
join()方法，也就是线程0结束了，线程1才能从join()方法中返回，而线程0需要等待main线程结束。
package com.adanac.book.concurrency.test;

import java.util.concurrent.TimeUnit;

public class Join {
    public static void main(String[] args) throws Exception {
        Thread previous = Thread.currentThread();
        for (int i = 0; i < 10; i++) {
            // 每个线程拥有前一个线程的引用，需要等待前一个线程终止，才能从等待中返回
            Thread thread = new Thread(new Domino(previous), String.valueOf(i));
            thread.start();
            previous = thread;
        }
        TimeUnit.SECONDS.sleep(5);
        System.out.println(Thread.currentThread().getName() + " terminate.");
    }

    static class Domino implements Runnable {
        private Thread thread;

        public Domino(Thread thread) {
            this.thread = thread;
        }

        public void run() {
            try {
                thread.join();
            } catch (InterruptedException e) {
            }
            System.out.println(Thread.currentThread().getName() + " terminate.");
        }
    }
}

main terminate.
0 terminate.
1 terminate.
2 terminate.
3 terminate.
4 terminate.
5 terminate.
6 terminate.
7 terminate.
8 terminate.
9 terminate.


```
###ThreadLocal的使用
```
ThreadLocal，即线程变量，是一个以ThreadLocal对象为键、任意对象为值的存储结构。这
个结构被附带在线程上，也就是说一个线程可以根据一个ThreadLocal对象查询到绑定在这个
线程上的一个值。
可以通过set(T)方法来设置一个值，在当前线程下再通过get()方法获取到原先设置的值。
在代码清单4-15所示的例子中，构建了一个常用的Profiler类，它具有begin()和end()两个
方法，而end()方法返回从begin()方法调用开始到end()方法被调用时的时间差，单位是毫秒。

package com.adanac.book.concurrency.test.four;

import java.util.concurrent.TimeUnit;

public class Profiler {
    // 第一次get()方法调用时会进行初始化（如果set方法没有调用），每个线程会调用一次
    private static final ThreadLocal<Long> TIME_THREADLOCAL = new ThreadLocal<Long>() {
        protected Long initialValue() {
            return System.currentTimeMillis();
        }
    };

    public static final void begin() {
        TIME_THREADLOCAL.set(System.currentTimeMillis());
    }

    public static final long end() {
        return System.currentTimeMillis() - TIME_THREADLOCAL.get();
    }

    public static void main(String[] args) throws Exception {
        Profiler.begin();
        TimeUnit.SECONDS.sleep(2);
        System.out.println("Cost: " + Profiler.end() + " mills");
    }
}
Cost: 2001 mills
应用：
两个方法的调用不用在一个方法或者类中，比如在AOP（面
向方面编程）中，可以在方法调用前的切入点执行begin()方法，而在方法调用后的切入点执行
end()方法，这样依旧可以获得方法的执行耗时。
```
###一个简单的数据库连接池示例
```
package com.adanac.book.concurrency.test.four;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.sql.Connection;
import java.util.concurrent.TimeUnit;

public class ConnectionDriver {
    static class ConnectionHandler implements InvocationHandler {
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
            if (method.getName().equals("commit")) {
                TimeUnit.MILLISECONDS.sleep(100);
            }
            return null;
        }
    }

    // 创建一个Connection的代理，在commit时休眠100毫秒
    public static final Connection createConnection() {
        return (Connection) Proxy.newProxyInstance(ConnectionDriver.class.getClassLoader(),
                new Class<?>[] { Connection.class }, new ConnectionHandler());
    }
}

package com.adanac.book.concurrency.test.four;

import java.sql.Connection;
import java.util.LinkedList;

public class ConnectionPool {
    private LinkedList<Connection> pool = new LinkedList<Connection>();

    public ConnectionPool(int initialSize) {
        if (initialSize > 0) {
            for (int i = 0; i < initialSize; i++) {
                pool.addLast(ConnectionDriver.createConnection());
            }
        }
    }

    public void releaseConnection(Connection connection) {
        if (connection != null) {
            synchronized (pool) {
                // 连接释放后需要进行通知，这样其他消费者能够感知到连接池中已经归还了一个连接
                pool.addLast(connection);
                pool.notifyAll();
            }
        }
    }

    // 在mills内无法获取到连接，将会返回null
    public Connection fetchConnection(long mills) throws InterruptedException {
        synchronized (pool) {
            // 完全超时
            if (mills <= 0) {
                while (pool.isEmpty()) {
                    pool.wait();
                }
                return pool.removeFirst();
            } else {
                long future = System.currentTimeMillis() + mills;
                long remaining = mills;
                while (pool.isEmpty() && remaining > 0) {
                    pool.wait(remaining);
                    remaining = future - System.currentTimeMillis();
                }
                Connection result = null;
                if (!pool.isEmpty()) {
                    result = pool.removeFirst();
                }
                return result;
            }
        }
    }
}

package com.adanac.book.concurrency.test.four;

import java.sql.Connection;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;

public class ConnectionPoolTest {
    static ConnectionPool pool = new ConnectionPool(10);
    // 保证所有ConnectionRunner能够同时开始
    static CountDownLatch start = new CountDownLatch(1);
    // main线程将会等待所有ConnectionRunner结束后才能继续执行
    static CountDownLatch end;

    public static void main(String[] args) throws Exception {
        // 线程数量，可以修改线程数量进行观察
        int threadCount = 50;
        end = new CountDownLatch(threadCount);
        int count = 20;
        AtomicInteger got = new AtomicInteger();
        AtomicInteger notGot = new AtomicInteger();
        for (int i = 0; i < threadCount; i++) {
            Thread thread = new Thread(new ConnetionRunner(count, got, notGot), "ConnectionRunnerThread");
            thread.start();
        }
        start.countDown();
        end.await();
        System.out.println("total invoke: " + (threadCount * count));
        System.out.println("got connection:  " + got);
        System.out.println("not got connection " + notGot);
    }

    static class ConnetionRunner implements Runnable {
        int count;
        AtomicInteger got;
        AtomicInteger notGot;

        public ConnetionRunner(int count, AtomicInteger got, AtomicInteger notGot) {
            this.count = count;
            this.got = got;
            this.notGot = notGot;
        }

        public void run() {
            try {
                start.await();
            } catch (Exception ex) {
            }
            while (count > 0) {
                try {
                    // 从线程池中获取连接，如果1000ms内无法获取到，将会返回null
                    // 分别统计连接获取的数量got和未获取到的数量notGot
                    Connection connection = pool.fetchConnection(1000);
                    if (connection != null) {
                        try {
                            connection.createStatement();
                            connection.commit();
                        } finally {
                            pool.releaseConnection(connection);
                            got.incrementAndGet();
                        }
                    } else {
                        notGot.incrementAndGet();
                    }
                } catch (Exception ex) {
                } finally {
                    count--;
                }
            }
            end.countDown();
        }
    }
}

在资源一定的情况下（连接池中的10个连接），随着客户端
线程的逐步增加，客户端出现超时无法获取连接的比率不断升高。虽然客户端线程在这种超
时获取的模式下会出现连接无法获取的情况，但是它能够保证客户端线程不会一直挂在连接
获取的操作上，而是“按时”返回，并告知客户端连接获取出现问题，是系统的一种自我保护机
制。数据库连接池的设计也可以复用到其他的资源获取的场景，针对昂贵资源（比如数据库连
接）的获取都应该加以超时限制。
```
###线程池技术及其示例
```
对于服务端的程序，经常面对的是客户端传入的短小（执行时间短、工作内容较为单一）
任务，需要服务端快速处理并返回结果。如果服务端每次接受到一个任务，创建一个线程，然
后进行执行，这在原型阶段是个不错的选择，但是面对成千上万的任务递交进服务器时，如果
还是采用一个任务一个线程的方式，那么将会创建数以万记的线程，这不是一个好的选择。因
为这会使操作系统频繁的进行线程上下文切换，无故增加系统的负载，而线程的创建和消亡
都是需要耗费系统资源的，也无疑浪费了系统资源。
线程池技术能够很好地解决这个问题，它预先创建了若干数量的线程，并且不能由用户
直接对线程的创建进行控制，在这个前提下重复使用固定或较为固定数目的线程来完成任务
的执行。这样做的好处是，一方面，消除了频繁创建和消亡线程的系统资源开销，另一方面，
面对过量任务的提交能够平缓的劣化。
下面先看一个简单的线程池接口定义

package com.adanac.book.concurrency.test.four;

public interface ThreadPool<Job extends Runnable> {
    // 执行一个Job，这个Job需要实现Runnable
    void execute(Job job);
    // 关闭线程池
    void shutdown();
    // 增加工作者线程
    void addWorkers(int num);
    // 减少工作者线程
    void removeWorker(int num);
    // 得到正在等待执行的任务数量
    int getJobSize();
}

package com.adanac.book.concurrency.test.four;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

public class DefaultThreadPool<Job extends Runnable> implements ThreadPool<Job> {
    // 线程池最大限制数
    private static final int MAX_WORKER_NUMBERS = 10;
    // 线程池默认的数量
    private static final int DEFAULT_WORKER_NUMBERS = 5;
    // 线程池最小的数量
    private static final int MIN_WORKER_NUMBERS = 1;
    // 这是一个工作列表，将会向里面插入工作
    private final LinkedList<Job> jobs = new LinkedList<Job>();
    // 工作者列表
    private final List<Worker> workers = Collections.synchronizedList(new ArrayList<Worker>());
    // 工作者线程的数量
    private int workerNum = DEFAULT_WORKER_NUMBERS;
    // 线程编号生成
    private AtomicLong threadNum = new AtomicLong();

    public DefaultThreadPool() {
        initializeWokers(DEFAULT_WORKER_NUMBERS);
    }

    public DefaultThreadPool(int num) {
        workerNum = num > MAX_WORKER_NUMBERS ? MAX_WORKER_NUMBERS : num < MIN_WORKER_NUMBERS ? MIN_WORKER_NUMBERS : num;
        initializeWokers(workerNum);
    }

    public void execute(Job job) {
        if (job != null) {
            // 添加一个工作，然后进行通知
            synchronized (jobs) {
                jobs.addLast(job);
                jobs.notify();
            }
        }
    }

    public void shutdown() {
        for (Worker worker : workers) {
            worker.shutdown();
        }
    }

    public void addWorkers(int num) {
        synchronized (jobs) {
            // 限制新增的Worker数量不能超过最大值
            if (num + this.workerNum > MAX_WORKER_NUMBERS) {
                num = MAX_WORKER_NUMBERS - this.workerNum;
            }
            initializeWokers(num);
            this.workerNum += num;
        }
    }

    public void removeWorker(int num) {
        synchronized (jobs) {
            if (num >= this.workerNum) {
                throw new IllegalArgumentException("beyond workNum");
            }
            // 按照给定的数量停止Worker
            int count = 0;
            while (count < num) {
                Worker worker = workers.get(count);
                if (workers.remove(worker)) {
                    worker.shutdown();
                    count++;
                }
            }
            this.workerNum -= count;
        }
    }

    public int getJobSize() {
        return jobs.size();
    }

    // 初始化线程工作者
    private void initializeWokers(int num) {
        for (int i = 0; i < num; i++) {
            Worker worker = new Worker();
            workers.add(worker);
            Thread thread = new Thread(worker, "ThreadPool-Worker-" + threadNum.incrementAndGet());
            thread.start();
        }
    }

    // 工作者，负责消费任务
    class Worker implements Runnable {
        // 是否工作
        private volatile boolean running = true;

        public void run() {
            while (running) {
                Job job = null;
                synchronized (jobs) {
                    // 如果工作者列表是空的，那么就wait
                    while (jobs.isEmpty()) {
                        try {
                            jobs.wait();
                        } catch (InterruptedException ex) {
                            // 感知到外部对WorkerThread的中断操作，返回
                            Thread.currentThread().interrupt();
                            return;
                        }
                    }
                    // 取出一个Job
                    job = jobs.removeFirst();
                }
                if (job != null) {
                    try {
                        job.run();
                    } catch (Exception ex) {
                        // 忽略Job执行中的Exception
                    }
                }
            }
        }

        public void shutdown() {
            running = false;
        }
    }
}
线程池的本质就是使用了一个线程安全的工作队列连接工作者线程和客户端
线程，客户端线程将任务放入工作队列后便返回，而工作者线程则不断地从工作队列上取出工作并执行。当工作队列为空时，所有的工作者线程均等待在工作队列上，当有客户端提交了一个任务之后会通知任意一个工作者线程，随着大量的任务被提交，更多的工作者线程会被唤醒。
```
###一个基于线程池技术的简单Web服务器
```
目前的浏览器都支持多线程访问，比如说在请求一个HTML页面的时候，页面中包含的图
片资源、样式资源会被浏览器发起并发的获取，这样用户就不会遇到一直等到一个图片完全下载完成才能继续查看文字内容的尴尬情况。
下面通过使用前一节中的线程池来构造一个简单的Web服务器，这个Web服务器用来处理
HTTP请求，目前只能处理简单的文本和JPG图片内容。这个Web服务器使用main线程不断地接受客户端Socket的连接，将连接以及请求提交给线程池处理，这样使得Web服务器能够同时处理多个客户端请求
package com.adanac.book.concurrency.test.four;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.Closeable;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class SimpleHttpServer {
    // 处理HttpRequest的线程池
    static ThreadPool<HttpRequestHandler> threadPool = new DefaultThreadPool<HttpRequestHandler>(1);
    // SimpleHttpServer的根路径
    static String basePath;
    static ServerSocket serverSocket;
    // 服务监听端口
    static int port = 8080;

    public static void setPort(int port) {
        if (port > 0) {
            SimpleHttpServer.port = port;
        }
    }

    public static void setBasePath(String basePath) {
        if (basePath != null && new File(basePath).exists() && new File(basePath).isDirectory()) {
            SimpleHttpServer.basePath = basePath;
        }
    }

    // 启动SimpleHttpServer
    public static void start() throws Exception {
        serverSocket = new ServerSocket(port);
        Socket socket = null;
        while ((socket = serverSocket.accept()) != null) {
            // 接收一个客户端Socket，生成一个HttpRequestHandler，放入线程池执行
            threadPool.execute(new HttpRequestHandler(socket));
        }
        serverSocket.close();
    }

    static class HttpRequestHandler implements Runnable {
        private Socket socket;

        public HttpRequestHandler(Socket socket) {
            this.socket = socket;
        }

        @Override
        public void run() {
            String line = null;
            BufferedReader br = null;
            BufferedReader reader = null;
            PrintWriter out = null;
            InputStream in = null;
            try {
                reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                String header = reader.readLine();
                // 由相对路径计算出绝对路径
                String filePath = basePath + header.split(" ")[1];
                out = new PrintWriter(socket.getOutputStream());
                // 如果请求资源的后缀为jpg或者ico，则读取资源并输出
                if (filePath.endsWith("jpg") || filePath.endsWith("ico")) {
                    in = new FileInputStream(filePath);
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    int i = 0;
                    while ((i = in.read()) != -1) {
                        baos.write(i);
                    }
                    byte[] array = baos.toByteArray();
                    out.println("HTTP/1.1 200 OK");
                    out.println("Server: Molly");
                    out.println("Content-Type: image/jpeg");
                    out.println("Content-Length: " + array.length);
                    out.println("");
                    socket.getOutputStream().write(array, 0, array.length);
                } else {
                    br = new BufferedReader(new InputStreamReader(new FileInputStream(filePath)));
                    out = new PrintWriter(socket.getOutputStream());
                    out.println("HTTP/1.1 200 OK");
                    out.println("Server: Molly");
                    out.println("Content-Type: text/html; charset=UTF-8");
                    out.println("");
                    while ((line = br.readLine()) != null) {
                        out.println(line);
                    }
                }
                out.flush();
            } catch (Exception ex) {
                out.println("HTTP/1.1 500");
                out.println("");
                out.flush();
            } finally {
                close(br, in, reader, out, socket);
            }
        }
    }

    // 关闭流或者Socket
    private static void close(Closeable... closeables) {
        if (closeables != null) {
            for (Closeable closeable : closeables) {
                try {
                    closeable.close();
                } catch (Exception ex) {
                }
            }
        }
    }

    public static void main(String[] args) throws Exception {
        String rootPath = System.getProperty("user.dir");
        System.err.println(rootPath);
        SimpleHttpServer.setBasePath(rootPath + "\\src\\main\\webapp\\");
        SimpleHttpServer.start();
    }
}

index.html:
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>测试页面</title>
</head>
<body>
    <h1>第一张图片</h1><img src="images/meizi.jpg"  />
    <h1>第二张图片</h1><img src="images/pic.jpg"  />
    <h1>第三张图片</h1><img src="images/pic2.jpg"  />
</body>
</html>

通过Apache HTTP server benchmarking tool（版本2.3）来测试不同线程数下，SimpleHttpServer的吞
吐量表现。
测试场景是5000次请求，分10个线程并发执行，测试内容主要考察响应时间（越小越好）
和每秒查询的数量（越高越好）

线程池中线程数量并不是越多越好，具体的数量需要评估每个任务的处理时间，以
及当前计算机的处理器能力和数量。使用的线程过少，无法发挥处理器的性能；使用的线程过多，将会增加系统的无故开销，起到相反的作用。
```
##java中的锁
###Lock接口
```
锁是用来控制多个线程访问共享资源的方式，一般来说，一个锁能够防止多个线程同时
访问共享资源
在Lock接口出现之前，Java程序是靠synchronized关键字实现锁功能的，而Java SE 5之后，并发包中新增
了Lock接口（以及相关实现类）用来实现锁功能，它提供了与synchronized关键字类似的同步功
能，只是在使用时需要显式地获取和释放锁。虽然它缺少了（通过synchronized块或者方法所提
供的）隐式获取释放锁的便捷性，但是却拥有了锁获取与释放的可操作性、可中断的获取锁以
及超时获取锁等多种synchronized关键字所不具备的同步特性。
LockUseCase.java
Lock lock = new ReentrantLock();
lock.lock();
try {
} finally {
    lock.unlock();
}
在finally块中释放锁，目的是保证在获取到锁之后，最终能够被释放。
不要将获取锁的过程写在try块中，因为如果在获取锁（自定义锁的实现）时发生了异常，
异常抛出的同时，也会导致锁无故释放。
```
###队列同步器
```
队列同步器AbstractQueuedSynchronizer（以下简称同步器），是用来构建锁或者其他同步组
件的基础框架，它使用了一个int成员变量表示同步状态，通过内置的FIFO队列来完成资源获
取线程的排队工作，并发包的作者（Doug Lea）期望它能够成为实现大部分同步需求的基础。
同步器的主要使用方式是继承，子类通过继承同步器并实现它的抽象方法来管理同步状
态，在抽象方法的实现过程中免不了要对同步状态进行更改，这时就需要使用同步器提供的3
个方法（getState()、setState(int newState)和compareAndSetState(int expect,int update)）来进行操
作，因为它们能够保证状态的改变是安全的。子类推荐被定义为自定义同步组件的静态内部
类，同步器自身没有实现任何同步接口，它仅仅是定义了若干同步状态获取和释放的方法来
供自定义同步组件使用，同步器既可以支持独占式地获取同步状态，也可以支持共享式地获
取同步状态，这样就可以方便实现不同类型的同步组件（ReentrantLock、
ReentrantReadWriteLock和CountDownLatch等）。
同步器是实现锁（也可以是任意同步组件）的关键，在锁的实现中聚合同步器，利用同步
器实现锁的语义。可以这样理解二者之间的关系：锁是面向使用者的，它定义了使用者与锁交
互的接口（比如可以允许两个线程并行访问），隐藏了实现细节；同步器面向的是锁的实现者，
它简化了锁的实现方式，屏蔽了同步状态管理、线程的排队、等待与唤醒等底层操作。锁和同
步器很好地隔离了使用者和实现者所需关注的领域。
```
###同步队列的实现分析
```
1.同步队列
同步器依赖内部的同步队列（一个FIFO双向队列）来完成同步状态的管理，当前线程获取
同步状态失败时，同步器会将当前线程以及等待状态等信息构造成为一个节点（Node）并将其
加入同步队列，同时会阻塞当前线程，当同步状态释放时，会把首节点中的线程唤醒，使其再
次尝试获取同步状态。
同步队列中的节点（Node）用来保存获取同步状态失败的线程引用、等待状态以及前驱和
后继节点

节点是构成同步队列（等待队列）的基础，同步器拥有首节点（head）
和尾节点（tail），没有成功获取同步状态的线程将会成为节点加入该队列的尾部。

```
###重入锁ReentrantLock
```
就是支持重进入的锁，它表示该锁能够支持一个线程对
资源的重复加锁。除此之外，该锁的还支持获取锁时的公平和非公平性选择。

重进入是指任意线程在获取到锁之后能够再次获取该锁而不会被锁所阻塞，该特性的实
现需要解决以下两个问题。
1）线程再次获取锁。锁需要去识别获取锁的线程是否为当前占据锁的线程，如果是，则再
次成功获取。
2）锁的最终释放。线程重复n次获取了锁，随后在第n次释放该锁后，其他线程能够获取到
该锁。锁的最终释放要求锁对于获取进行计数自增，计数表示当前锁被重复获取的次数，而锁被释放时，计数自减，当计数等于0时表示锁已经成功释放。

```
###读写锁
```
之前提到锁（如Mutex和ReentrantLock）基本都是排他锁，这些锁在同一时刻只允许一个线程进行访问，
而读写锁在同一时刻可以允许多个读线程访问，但是在写线程访问时，所有的读线程和其他写线程均被阻塞。读写锁维护了一对锁，一个读锁和一个写锁，通过分离读锁和写
锁，使得并发性相比一般的排他锁有了很大提升。

在读操作时获取读锁，写操作时获取写锁即可

```


##java并发容器与框架
###ConcurrentHashMap的实现原理与使用
```
ConcurrentHashMap是线程安全且高效的HashMap。
（1）线程不安全的HashMap
在多线程环境下，使用HashMap进行put操作会引起死循环，导致CPU利用率接近100%，所
以在并发情况下不能使用HashMap。例如，执行以下代码会引起死循环。
HashMap在并发执行put操作时会引起死循环，是因为多线程会导致HashMap的Entry链表
形成环形数据结构，一旦形成环形数据结构，Entry的next节点永远不为空，就会产生死循环获取Entry。
（2）效率低下的HashTable
HashTable容器使用synchronized来保证线程安全，但在线程竞争激烈的情况下HashTable
的效率非常低下。因为当一个线程访问HashTable的同步方法，其他线程也访问HashTable的同步方法时，会进入阻塞或轮询状态。如线程1使用put进行元素添加，线程2不但不能使用put方法添加元素，也不能使用get方法来获取元素，所以竞争越激烈效率越低。

```
###ConcurrentHashMap的结构
```
通过ConcurrentHashMap的类图来分析ConcurrentHashMap的结构，如图6-1所示。
ConcurrentHashMap是由Segment数组结构和HashEntry数组结构组成。Segment是一种可重
入锁（ReentrantLock），在ConcurrentHashMap里扮演锁的角色；HashEntry则用于存储键值对数
据。一个ConcurrentHashMap里包含一个Segment数组。
每个Segment守护着一个HashEntry数组里的元素，当对HashEntry数组的数据进行修改时，
必须首先获得与它对应的Segment锁.

ConcurrentHashMap初始化方法是通过initialCapacity、loadFactor和concurrencyLevel等几个
参数来初始化segment数组、段偏移量segmentShift、段掩码segmentMask和每个segment里的
HashEntry数组来实现的。

```
###ConcurrentHashMap的操作
```
ConcurrentHashMap的3种操作——get操作、put操作和size操作。

定义成volatile的变量，能够在线
程之间保持可见性，能够被多线程同时读，并且保证不会读到过期的值，但是只能被单线程写
（有一种情况可以被多线程写，就是写入的值不依赖于原值），在get操作里只需要读不需要写
共享变量count和value，所以可以不用加锁。
```
###ConcurrentLinkedQueue
```
ConcurrentLinkedQueue是一个基于链接节点的无界线程安全队列，它采用先进先出的规
则对节点进行排序，当我们添加一个元素的时候，它会添加到队列的尾部；当我们获取一个元
素时，它会返回队列头部的元素。它采用了“wait-free”算法（即CAS算法）来实现，该算法在
Michael&Scott算法上进行了一些修改。
ConcurrentLinkedQueue由head节点和tail节点组成，每个节点（Node）由节点元素（item）和指向下一个节点（next）的引用组成，节点与节点之间就是通过这个next关联起来，从而组成一张链表结构的队列.

入队列就是将入队节点添加到队列的尾部。
发现入队主要做两件事情：第一是
将入队节点设置成当前队列尾节点的下一个节点；第二是更新tail节点.
入队方法永远返回true，所以不要通过返回值判断入队是否成功。

出队列的就是从队列里返回一个节点元素，并清空该节点对元素的引用。
当head节点里有元素时，直接弹出head
节点里的元素，而不会更新head节点。只有当head节点里没有元素时，出队操作才会更新head节点。
```
###java中的阻塞队列
```
JDK 7提供了7个阻塞队列，如下。
·ArrayBlockingQueue：一个由数组结构组成的有界阻塞队列。
·LinkedBlockingQueue：一个由链表结构组成的有界阻塞队列。
·PriorityBlockingQueue：一个支持优先级排序的无界阻塞队列。
·DelayQueue：一个使用优先级队列实现的无界阻塞队列。
·SynchronousQueue：一个不存储元素的阻塞队列。
·LinkedTransferQueue：一个由链表结构组成的无界阻塞队列。
·LinkedBlockingDeque：一个由链表结构组成的双向阻塞队列。

阻塞队列的实现原理：
使用通知模式实现。所谓通知模式，就是当生产者往满的队列里添加元素时会阻塞住生
产者，当消费者消费了一个队列中的元素后，会通知生产者当前队列可用。
```
###Fork/Join框架
```
Fork/Join框架是Java 7提供的一个用于并行执行任务的框架，是一个把大任务分割成若干
个小任务，最终汇总每个小任务结果后得到大任务结果的框架。

实例一：使用Fork/Join框架，需求是：计算1+2+3+4的结果
package com.adanac.book.concurrency.test.six;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.Future;
import java.util.concurrent.RecursiveTask;

public class CountTask extends RecursiveTask<Integer> {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    private static final int THRESHOLD = 2;

    // 阈值
    private int start;
    private int end;

    public CountTask(int start, int end) {
        this.start = start;
        this.end = end;
    }

    @Override
    protected Integer compute() {
        int sum = 0;
        // 如果任务足够小就计算任务
        boolean canCompute = (end - start) <= THRESHOLD;
        if (canCompute) {
            for (int i = start; i <= end; i++) {
                sum += i;
            }
        } else {
            // 如果任务大于阈值，就分裂成两个子任务计算
            int middle = (start + end) / 2;
            CountTask leftTask = new CountTask(start, middle);
            CountTask rightTask = new CountTask(middle + 1, end);
            // 执行子任务
            leftTask.fork();
            rightTask.fork();
            // 等待子任务执行完，并得到其结果
            int leftResult = leftTask.join();
            int rightResult = rightTask.join();
            // 合并子任务
            sum = leftResult + rightResult;
        }
        return sum;
    }

    public static void main(String[] args) {
        ForkJoinPool forkJoinPool = new ForkJoinPool();
        // 生成一个计算任务，负责计算1+2+3+4
        CountTask task = new CountTask(1, 4);
        // 执行一个任务
        Future<Integer> result = forkJoinPool.submit(task);
        try {
            System.out.println(result.get());
        } catch (InterruptedException e) {
        } catch (ExecutionException e) {
        }
    }
}

ForkJoinTask，ForkJoinTask与一般任务的主要区别在于它
需要实现compute方法，在这个方法里，首先需要判断任务是否足够小，如果足够小就直接执
行任务。如果不足够小，就必须分割成两个子任务，每个子任务在调用fork方法时，又会进入
compute方法，看看当前子任务是否需要继续分割成子任务，如果不需要继续分割，则执行当
前子任务并返回结果。使用join方法会等待子任务执行完并得到其结果。
```

##java中的13个原子操作类
###原子更新基本类型
```
原子的方式更新基本类型，Atomic包提供了以下3个类。
·AtomicBoolean：原子更新布尔类型。
·AtomicInteger：原子更新整型。
·AtomicLong：原子更新长整型。
```
###原子更新数组
```
·AtomicIntegerArray：原子更新整型数组里的元素。
·AtomicLongArray：原子更新长整型数组里的元素。
·AtomicReferenceArray：原子更新引用类型数组里的元素。
·AtomicIntegerArray类主要是提供原子的方式更新数组里的整型

import java.util.concurrent.atomic.AtomicIntegerArray;

public class AtomicIntegerArrayTest {
    static int[] value = new int[] { 1, 2 };
    static AtomicIntegerArray ai = new AtomicIntegerArray(value);

    public static void main(String[] args) {
        ai.getAndSet(0, 3);
        System.out.println(ai.get(0));
        System.out.println(value[0]);
    }
}
3
1
数组value通过构造方法传递进去，然后AtomicIntegerArray会将当前数组
复制一份，所以当AtomicIntegerArray对内部的数组元素进行修改时，不会影响传入的数组。
```
###原子更新引用类型
```
AtomicReference：原子更新引用类型。
·AtomicReferenceFieldUpdater：原子更新引用类型里的字段。
·AtomicMarkableReference：原子更新带有标记位的引用类型。可以原子更新一个布尔类
型的标记位和引用类型。构造方法是AtomicMarkableReference（V initialRef，boolean
initialMark）。

```
###原子更新字段类
```
如果需原子地更新某个类里的某个字段时，就需要使用原子更新字段类，Atomic包提供
了以下3个类进行原子字段更新。
·AtomicIntegerFieldUpdater：原子更新整型的字段的更新器。
·AtomicLongFieldUpdater：原子更新长整型字段的更新器。
·AtomicStampedReference：原子更新带有版本号的引用类型。
```
##java中的并发工具类
###等待多线程完成的CountDownLatch
```
CountDownLatch允许一个或多个线程等待其他线程完成操作。
假如有这样一个需求：我们需要解析一个Excel里多个sheet的数据，此时可以考虑使用多
线程，每个线程解析一个sheet里的数据，等到所有的sheet都解析完之后，程序需要提示解析完
成。在这个需求中，要实现主线程等待所有线程完成sheet的解析操作，最简单的做法是使用join()方法
package com.adanac.book.concurrency.test.eight;

public class JoinCountDownLatchTest {
    public static void main(String[] args) throws InterruptedException {
        Thread parser1 = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("parser1 finish");
            }
        });
        Thread parser2 = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("parser2 finish");
            }
        });
        parser1.start();
        parser2.start();
        parser1.join();
        parser2.join();
        System.out.println("all parser finish");
    }
}

join用于让当前执行线程等待join线程执行结束。其实现原理是不停检查join线程是否存
活，如果join线程存活则让当前线程永远等待。其中，wait（0）表示永远等待下去，代码片段如下。
while (isAlive()) {
    wait(0);
}

```
###同步屏障CyclicBarrier
```
CyclicBarrier的应用场景
CyclicBarrier可以用于多线程计算数据，最后合并计算结果的场景。例如，用一个Excel保
存了用户所有银行流水，每个Sheet保存一个账户近一年的每笔银行流水，现在需要统计用户
的日均银行流水，先用多线程处理每个sheet里的银行流水，都执行完之后，得到每个sheet的日
均银行流水，最后，再用barrierAction用这些线程的计算结果，计算出整个Excel的日均银行流水:

package com.adanac.book.concurrency.test.eight;

import java.util.Map.Entry;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

/**
 * 银行流水处理服务类
 * 
 */
public class BankWaterService implements Runnable {
    /**
     *  创建4 个屏障，处理完之后执行当前类的run方法
     */
    private CyclicBarrier c = new CyclicBarrier(4, this);
    /**
     *  假设只有4个  sheet，所以只启动4个线程
     */
    private Executor executor = Executors.newFixedThreadPool(4);
    /**
     *  保存每个sheet计算出的银流结果
     */
    private ConcurrentHashMap<String, Integer> sheetBankWaterCount = new ConcurrentHashMap<String, Integer>();

    private void count() {
        for (int i = 0; i < 4; i++) {
            executor.execute(new Runnable() {
                @Override
                public void run() {
                    // 计算当前sheet的银流数据，计算代码省略
                    sheetBankWaterCount.put(Thread.currentThread().getName(), 1);
                    // 银流计算完成，插入一个屏障
                    try {
                        c.await();
                    } catch (InterruptedException | BrokenBarrierException e) {
                        e.printStackTrace();
                    }
                }
            });
        }
    }

    @Override
    public void run() {
        int result = 0;
        // 汇总每个 sheet 计算出的结果
        for (Entry<String, Integer> sheet : sheetBankWaterCount.entrySet()) {
            result += sheet.getValue();
        }
        // 将结果输出
        sheetBankWaterCount.put("result", result);
        System.out.println(result);
    }

    public static void main(String[] args) {
        BankWaterService bankWaterCount = new BankWaterService();
        bankWaterCount.count();
    }
}

使用线程池创建4个线程，分别计算每个sheet里的数据，每个sheet计算结果是1，再由
BankWaterService线程汇总4个sheet计算出的结果4.
```
###CyclicBarrier和CountDownLatch的区别
```
CountDownLatch的计数器只能使用一次，而CyclicBarrier的计数器可以使用reset()方法重
置。所以CyclicBarrier能处理更为复杂的业务场景。例如，如果计算发生错误，可以重置计数
器，并让线程重新执行一次。

```
###控制并发线程数的Semaphore
```
Semaphore（信号量）是用来控制同时访问特定资源的线程数量，它通过协调各个线程，以
保证合理的使用公共资源。

1.应用场景
Semaphore可以用于做流量控制，特别是公用资源有限的应用场景，比如数据库连接。假
如有一个需求，要读取几万个文件的数据，因为都是IO密集型任务，我们可以启动几十个线程并发地读取，但是如果读到内存后，还需要存储到数据库中，而数据库的连接数只有10个，这时我们必须控制只有10个线程同时获取数据库连接保存数据，否则会报错无法获取数据库连接。这个时候，就可以使用Semaphore来做流量控制

package com.adanac.book.concurrency.test.eight;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Semaphore;

public class SemaphoreTest {
    private static final int THREAD_COUNT = 30;
    private static ExecutorService threadPool = Executors.newFixedThreadPool(THREAD_COUNT);
    /**
     * Semaphore（10）表示允许10个线程获取许可证，也就是最大并发数是10
     */
    private static Semaphore s = new Semaphore(10);

    public static void main(String[] args) {
        for (int i = 0; i < THREAD_COUNT; i++) {
            threadPool.execute(new Runnable() {
                @Override
                public void run() {
                    try {
                        s.acquire();
                        System.out.println("save data");
                        s.release();
                    } catch (InterruptedException e) {
                    }
                }
            });
        }
        threadPool.shutdown();
    }
}
虽然有30个线程在执行，但是只允许10个并发执行。Semaphore的构造方法
Semaphore（int permits）接受一个整型的数字，表示可用的许可证数量。Semaphore（10）表示允
许10个线程获取许可证，也就是最大并发数是10。
```
###线程间交换数据的Exchanger
```
Exchanger（交换者）是一个用于线程间协作的工具类。Exchanger用于进行线程间的数据交换。它提供一个同步点，在这个同步点，两个线程可以交换彼此的数据。这两个线程通过exchange方法交换数据，如果第一个线程先执行exchange()方法，它会一直等待第二个线程也
执行exchange方法，当两个线程都到达同步点时，这两个线程就可以交换数据，将本线程生产出来的数据传递给对方。

Exchanger的应用场景。
Exchanger可以用于遗传算法，遗传算法里需要选出两个人作为交配对象，这时候会交换
两人的数据，并使用交叉规则得出2个交配结果。Exchanger也可以用于校对工作，比如我们需
要将纸制银行流水通过人工的方式录入成电子银行流水，为了避免错误，采用AB岗两人进行录入，录入到Excel之后，系统需要加载这两个Excel，并对两个Excel数据进行校对，看看是否录入一致

package com.adanac.book.concurrency.test.eight;

import java.util.concurrent.Exchanger;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExchangerTest {
    private static final Exchanger<String> exgr = new Exchanger<String>();
    private static ExecutorService threadPool = Executors.newFixedThreadPool(2);

    public static void main(String[] args) {
        threadPool.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    String A = "银行流水A";
                    // A录入银行流水数据
                    exgr.exchange(A);
                } catch (InterruptedException e) {
                }
            }
        });
        threadPool.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    String B = "银行流水B";
                    // B录入银行流水数据
                    String A = exgr.exchange("B");
                    System.out.println("AB数据是否一致：" + A.equals(B) + "，A录入的是：" + A + "，B录入是：" + B);
                } catch (InterruptedException e) {
                }
            }
        });
        threadPool.shutdown();
    }
}

##java中的线程池
```
合理地使用线程池能够带来3个好处。
第一：降低资源消耗。通过重复利用已创建的线程降低线程创建和销毁造成的消耗。
第二：提高响应速度。当任务到达时，任务可以不需要等到线程创建就能立即执行。
第三：提高线程的可管理性。线程是稀缺资源，如果无限制地创建，不仅会消耗系统资源，
还会降低系统的稳定性，使用线程池可以进行统一分配、调优和监控。
```
###线程池的实现原理
```
1）线程池判断核心线程池里的线程是否都在执行任务。如果不是，则创建一个新的工作
线程来执行任务。如果核心线程池里的线程都在执行任务，则进入下个流程。
2）线程池判断工作队列是否已经满。如果工作队列没有满，则将新提交的任务存储在这
个工作队列里。如果工作队列满了，则进入下个流程。
3）线程池判断线程池的线程是否都处于工作状态。如果没有，则创建一个新的工作线程
来执行任务。如果已经满了，则交给饱和策略来处理这个任务。

```
###线程池的创建
```
new  ThreadPoolExecutor(corePoolSize, maximumPoolSize, keepAliveTime,
milliseconds,runnableTaskQueue, handler);

```
###向线程池提交任务
```
可以使用两个方法向线程池提交任务，分别为execute()和submit()方法。
execute()方法用于提交不需要返回值的任务，所以无法判断任务是否被线程池执行成功。

threadsPool.execute(new Runnable() {
                        @Override
                        public void run() {
                                // TODO Auto-generated method stub
                        }
                });

submit()方法用于提交需要返回值的任务。
Future<Object> future = executor.submit(harReturnValuetask);
                try {
                        Object s = future.get();
                } catch (InterruptedException e) {
                        // 
处理中断异常
                } catch (ExecutionException e) {
                        // 
处理无法执行任务异常
                } finally {
                        // 
关闭线程池
                        executor.shutdown();
                }
```
###关闭线程池
```
可以通过调用线程池的shutdown或shutdownNow方法来关闭线程池。它们的原理是遍历线
程池中的工作线程，然后逐个调用线程的interrupt方法来中断线程，所以无法响应中断的任务可能永远无法终止。

```
###合理地配置线程池
```
要想合理地配置线程池，就必须首先分析任务特性，可以从以下几个角度来分析。
·任务的性质：CPU密集型任务、IO密集型任务和混合型任务。
·任务的优先级：高、中和低。
·任务的执行时间：长、中和短。
·任务的依赖性：是否依赖其他系统资源，如数据库连接。

```

##executor框架
```
Java的线程既是工作单元，也是执行机制。从JDK 5开始，把工作单元与执行机制分离开
来。工作单元包括Runnable和Callable，而执行机制由Executor框架提供。
```
###Executor框架的结构
````
Executor框架主要由3大部分组成如下。
任务。包括被执行任务需要实现的接口：Runnable接口或Callable接口。
·任务的执行。包括任务执行机制的核心接口Executor，以及继承自Executor的
ExecutorService接口。Executor框架有两个关键类实现了ExecutorService接口
（ThreadPoolExecutor和ScheduledThreadPoolExecutor）。
·异步计算的结果。包括接口Future和实现Future接口的FutureTask类。
```
###Executor框架的主要成员
```
ThreadPoolExecutor、ScheduledThreadPoolExecutor、
Future接口、Runnable接口、Callable接口和Executors。
（1）ThreadPoolExecutor
ThreadPoolExecutor通常使用工厂类Executors来创建。
1）FixedThreadPool。下面是Executors提供的，创建使用固定线程数的FixedThreadPool的API。
public static ExecutorService newFixedThreadPool(int nThreads)
public static ExecutorService newFixedThreadPool(int nThreads, ThreadFactorythreadFactory)
FixedThreadPool适用于为了满足资源管理的需求，而需要限制当前线程数量的应用场
景，它适用于负载比较重的服务器。


2）SingleThreadExecutor。下面是Executors提供的，创建使用单个线程的SingleThread-
Executor的API。
public static ExecutorService newSingleThreadExecutor()
public static ExecutorService newSingleThreadExecutor(ThreadFactory threadFactory)
SingleThreadExecutor适用于需要保证顺序地执行各个任务；并且在任意时间点，不会有多个线程是活动的应用场景。

3）CachedThreadPool。下面是Executors提供的，创建一个会根据需要创建新线程的
CachedThreadPool的API。
public static ExecutorService newCachedThreadPool()
public static ExecutorService newCachedThreadPool(ThreadFactory threadFactory)
CachedThreadPool是大小无界的线程池，适用于执行很多的短期异步任务的小程序，或者
是负载较轻的服务器。

（2）ScheduledThreadPoolExecutor
ScheduledThreadPoolExecutor。包含若干个线程的ScheduledThreadPoolExecutor。
·SingleThreadScheduledExecutor。只包含一个线程的ScheduledThreadPoolExecutor。

创建固定个数线程的ScheduledThreadPoolExecutor的API:
public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize)
public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize,ThreadFactory)

创建单个线程的SingleThreadScheduledExecutor的API:
public static ScheduledExecutorService newSingleThreadScheduledExecutor()
public static ScheduledExecutorService newSingleThreadScheduledExecutor
(ThreadFactory threadFactory)

```
###ThreadPoolExecutor详解
```
通过Executor框架的工具类Executors，可以创建3种类型的ThreadPoolExecutor。
·FixedThreadPool。
·SingleThreadExecutor。
·CachedThreadPool。

```
####FixedThreadPool详解
```
FixedThreadPool被称为可重用固定线程数的线程池。
```
####SingleThreadExecutor详解
```
SingleThreadExecutor是使用单个worker线程的Executor。
```
####CachedThreadPool详解
```
CachedThreadPool是一个会根据需要创建新线程的线程池。
```
###ScheduledThreadPoolExecutor详解
```
ScheduledThreadPoolExecutor继承自ThreadPoolExecutor。它主要用来在给定的延迟之后运行任务，或者定期执行任务。ScheduledThreadPoolExecutor的功能与Timer类似，但
ScheduledThreadPoolExecutor功能更强大、更灵活。Timer对应的是单个后台线程，而
ScheduledThreadPoolExecutor可以在构造函数中指定多个对应的后台线程数。
```
###FutureTask详解
```
Future接口和实现Future接口的FutureTask类，代表异步计算的结果。
FutureTask除了实现Future接口外，还实现了Runnable接口。因此，FutureTask可以交给
Executor执行，也可以由调用线程直接执行（FutureTask.run()）。根据FutureTask.run()方法被执行
的时机，FutureTask可以处于下面3种状态。
1）未启动。FutureTask.run()方法还没有被执行之前，FutureTask处于未启动状态。当创建一
个FutureTask，且没有执行FutureTask.run()方法之前，这个FutureTask处于未启动状态。
2）已启动。FutureTask.run()方法被执行的过程中，FutureTask处于已启动状态。
3）已完成。FutureTask.run()方法执行完后正常结束，或被取消（FutureTask.cancel（…）），或
执行FutureTask.run()方法时抛出异常而异常结束，FutureTask处于已完成状态。

```
##java并发编程实践
###生产者和消费者模式
```
生产者和消费者模式是通过一个容器来解决生产者和消费者的强耦合问题。生产者和消
费者彼此之间不直接通信，而是通过阻塞队列来进行通信，所以生产者生产完数据之后不用等待消费者处理，直接扔给阻塞队列，消费者不找生产者要数据，而是直接从阻塞队列里取，阻塞队列就相当于一个缓冲区，平衡了生产者和消费者的处理能力。

这个阻塞队列就是用来给生产者和消费者解耦的。纵观大多数设计模式，都会找一个第
三者出来进行解耦，如工厂模式的第三者是工厂类，模板模式的第三者是模板类。在学习一些设计模式的过程中，先找到这个模式的第三者，能帮助我们快速熟悉一个设计模式。

```
###线程池与生产消费者模式
```
ava中的线程池类其实就是一种生产者和消费者模式的实现方式，但是我觉得其实现方
式更加高明。生产者把任务丢给线程池，线程池创建线程并处理任务，如果将要运行的任务数大于线程池的基本线程数就把任务扔到阻塞队列里，这种做法比只使用一个阻塞队列来实现生产者和消费者模式显然要高明很多，因为消费者能够处理直接就处理掉了，这样速度更快，而生产者先存，消费者再取这种方式显然慢一些。

```
###线上问题定位
```
有时候，有很多问题只有在线上或者预发环境才能发现，而线上又不能调试代码，所以线
上问题定位就只能看日志、系统状态和dump线程.

1）在Linux命令行下使用TOP命令查看每个进程的情况
我们的程序是Java应用，所以只需要关注COMMAND是Java的性能数据，COMMAND表
示启动当前进程的命令，在Java进程这一行里可以看到CPU利用率是300%，不用担心，这个是当前机器所有核加在一起的CPU利用率。

2）再使用top的交互命令数字1查看每个CPU的性能数据。
令行显示了CPU4，说明这是一个5核的虚拟机，平均每个CPU利用率在60%以上。如果
这里显示CPU利用率100%，则很有可能程序里写了一个死循环。

3）使用top的交互命令H查看每个线程的性能信息。
在这里可能会出现3种情况。
·第一种情况，某个线程CPU利用率一直100%，则说明是这个线程有可能有死循环，那么
请记住这个PID。
·第二种情况，某个线程一直在TOP 10的位置，这说明这个线程可能有性能问题。
·第三种情况，CPU利用率高的几个线程在不停变化，说明并不是由某一个线程导致CPU
偏高。

a)如果是第一种情况，也有可能是GC造成，
可以用jstat命令看一下GC情况，看看是不是因
为持久代或年老代满了，产生Full GC，导致CPU利用率持续飙高，命令和回显如下。
sudo /opt/java/bin/jstat -gcutil 31177 1000 5

还可以把线程dump下来，看看究竟是哪个线程、执行什么代码造成的CPU利用率高。执行
以下命令，把线程dump到文件dump17里。执行如下命令。
sudo -u admin /opt/taobao/java/bin/jstack  31177 > /home/adanac/dump17
dump出来的线程ID（nid）是十六进制的，而我们用TOP命令看到的线程ID是十进制的，所
以要用printf命令转换一下进制。然后用十六进制的ID去dump里找到对应的线程。
printf "%x\n" 31558
输出：7b46。


```
###性能测试
```
性能测试工具进行测试，该工具的原理
是，用户写一个Java程序向服务器端发起请求，这个工具会启动一个线程池来调度这些任务，可以配置同时启动多少个线程、发起请求次数和任务间隔时长。将这个程序部署在多台机器上执行，统计出QPS和响应时长。我们在10台机器上部署了这个测试程序，每台机器启动了100个线程进行测试，压测时长为半小时。注意不能压测线上机器，我们压测的是开发服务器。
测试开始后，首先登录到服务器里查看当前有多少台机器在压测服务器，因为程序的端
口是12200，所以使用netstat命令查询有多少台机器连接到这个端口上。命令如下。
$ netstat -nat | grep 12200 –c
10

通过这个命令可以知道已经有10台机器在压测服务器。QPS达到了1400，程序开始报错获
取不到数据库连接，因为我们的数据库端口是3306，用netstat命令查看已经使用了多少个数据库连接。命令如下。
$ netstat -nat | grep 3306 –c
12

增加数据库连接到20，QPS没上去，但是响应时长从平均1000毫秒下降到700毫秒，使用
TOP命令观察CPU利用率，发现已经90%多了，于是升级CPU，将2核升级成4核，和线上的机器保持一致。再进行压测，CPU利用率下去了达到了75%，QPS上升到了1800。执行一段时间后响应时长稳定在200毫秒。
增加应用服务器里线程池的核心线程数和最大线程数到1024，通过ps命令查看下线程数
是否增长了，执行的命令如下。
$ ps -eLf | grep java -c
1520

再次压测，QPS并没有明显的增长，单机QPS稳定在1800左右，响应时长稳定在200毫秒。
我在性能测试之前先优化了程序的SQL语句。使用了如下命令统计执行最慢的SQL，左边
的是执行时长，单位是毫秒，右边的是执行的语句，可以看到系统执行最慢的SQL是
queryNews和queryNewIds，优化到几十毫秒。
$ grep Y /home/admin/logs/xxx/monitor/dal-rw-monitor.log |awk -F',' '{print $7$5}' |
sort -nr|head -20
1811 queryNews
1764 queryNews
1740 queryNews
1697 queryNews
679 queryNewIds


```
###性能测试中使用的其他命令
```
1）查看网络流量。
$ cat /proc/net/dev

2）查看系统平均负载。
$ cat /proc/loadavg

3）查看系统内存情况。
$ cat /proc/meminfo

4）查看CPU的利用率。
cat /proc/stat

```
###异步任务池
```
Java中的线程池设计得非常巧妙，可以高效并发执行多个任务，但是在某些场景下需要对
线程池进行扩展才能更好地服务于系统。例如，如果一个任务仍进线程池之后，运行线程池的程序重启了，那么线程池里的任务就会丢失。另外，线程池只能处理本机的任务，在集群环境下不能有效地调度所有机器的任务。所以，需要结合线程池开发一个异步任务处理池.
任务池的主要处理流程是，每台机器会启动一个任务池，每个任务池里有多个线程池，当
某台机器将一个任务交给任务池后，任务池会先将这个任务保存到数据中，然后某台机器上
的任务池会从数据库中获取待执行的任务，再执行这个任务。
每个任务有几种状态，分别是创建（NEW）、执行中（EXECUTING）、RETRY（重试）、挂起
（SUSPEND）、中止（TEMINER）和执行完成（FINISH）。
```
