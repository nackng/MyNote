[TOC]
##单例模式
```
有一些对象我们只需要一个，比方说：线程池、缓存、对话框、处理器偏好设置和注册表的对象等等。事实上，这类对象只能有一个实例，如果制造出多个实例，就会导致许多问题产生，例如：程序的行为异常、资源使用过量，或者是不一致的结果。

使用静态变量

如何确保这些类只存在一个实例？利用java的静态变量可以做到，但使用静态变量有个缺点：如果将对象赋值给一个全局变量，那么你必须在程序一开始就创建好对象。万一这个对象非常耗费资源，而程序在这次的执行过程中又一直没用到它，就形成了浪费。

用“双重检查加锁”，在getInstance()中减少使用同步
利用双重检查加锁，首先检查是否实例已经创建了，如果尚未创建，才进行同步。这样一来，只有第一次会同步。

public class Singleton {
    // volatile关键词确保，当uniqueInstance变量被初始化成Singleton实例时，
    // 多个线程正确地处理uniqueInstance变量
    private volatile static Singleton uniqueInstance;
 
    private Singleton() {
    }
 
    public static synchronized Singleton getInstance() {
        // 检查实例，如果不存在，就进入同步区块。
        if (uniqueInstance == null) {
            // 注意，只有第一次才彻底执行这里的代码
            synchronized (Singleton.class){
                // 进入区块后，再检查一次。如果仍是null，才创建实例
                if (uniqueInstance == null) {
                    uniqueInstance = new Singleton();
                }
            }
        }
        return uniqueInstance;
    }
}
```
