[TOC]
##使用SPRING中的线程池ThreadPoolTaskExecutor实现并发。

###一：不需要返回值的情况 
```
1，初始化线程池
ThreadPoolTaskExecutor poolTaskExecutor = new ThreadPoolTaskExecutor();  
poolTaskExecutor.setQueueCapacity(10000);  
poolTaskExecutor.setCorePoolSize(5);  
poolTaskExecutor.setMaxPoolSize(10);  
poolTaskExecutor.setKeepAliveSeconds(5000);  
poolTaskExecutor.initialize();  
 
2，在线程池中执行某个线程
poolTaskExecutor.execute(new Thread(Objct...){...});  
```
###二：需要返回值的情况 
```
1，初始化线程池poolTaskExecutor，同上
 
2，新建一个类，实现Callable接口
class GetFromDB implements Callable<User> {  
    private UserDao userDao;  
    private Long userId;  
  
    public GetFromDB(UserDao userDao, Long userId) {  
        this.userDao = userDao;  
        this.userId = userId;  
    }  
  
    public User call() throws DaoException {  
        User user = userDao.getUserById(userId);  
        return user;  
    }  
}  
 
3，用之前的GetFromDB类构造一个FutureTask类
FutureTask<User> dbtask = new FutureTask<User>(GetFromDB);  
 
4，提交并执行
threadpool.submit(dbtask);  
 
5，得到返回值
try {  
    User user = dbtask.get();  
} catch (Exception e) {  
    if (e instanceof ExecutionException  
            && ((ExecutionException) e).getCause() instanceof DaoException) {  
        throw (DaoException) ((ExecutionException) e).getCause();  
    } else {  
        其他处理方式  
    }  
}  
 
 
注：一旦调用了get()方法，如果线程还未产生返回值，则将阻塞get()方法，直到得到返回值。基于此，如果你想确保线程执行完后才执行下一步操作，即使你不想得到返回值也可以调用一下此方法。当然这与多线程的初衷不符。 
```
###ThreadPoolTaskExecutor的配置解释
```
ThreadPoolTaskExecutor对
ThreadPoolExecutor做了包装。

<bean id ="taskExecutor"  class ="org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor" >
    <property name ="corePoolSize" value ="5" /> 
    <property name ="keepAliveSeconds" value ="300" /> 
    <property name ="maxPoolSize" value ="10" /> 
    <property name ="queueCapacity" value ="25" /> 
  </bean> 


线程的配置文件：
corePoolSize： 线程池维护线程的最少数量
keepAliveSeconds  线程池维护线程所允许的空闲时间
maxPoolSize   线程池维护线程的最大数量
queueCapacity 线程池所使用的缓冲队列

当一个任务通过execute(Runnable)方法欲添加到线程池时：

l  如果此时线程池中的数量小于corePoolSize，即使线程池中的线程都处于空闲状态，也要创建新的线程来处理被添加的任务。

l  如果此时线程池中的数量等于 corePoolSize，但是缓冲队列 workQueue未满，那么任务被放入缓冲队列。

l  如果此时线程池中的数量大于corePoolSize，缓冲队列workQueue满，并且线程池中的数量小于maximumPoolSize，建新的线程来处理被添加的任务。

l  如果此时线程池中的数量大于corePoolSize，缓冲队列workQueue满，并且线程池中的数量等于maximumPoolSize，那么通过 handler所指定的策略来处理此任务。也就是：处理任务的优先级为：核心线程corePoolSize、任务队列workQueue、最大线程 maximumPoolSize，如果三者都满了，使用handler处理被拒绝的任务。

l  当线程池中的线程数量大于 corePoolSize时，如果某线程空闲时间超过keepAliveTime，线程将被终止。这样，线程池可以动态的调整池中的线程数。
```