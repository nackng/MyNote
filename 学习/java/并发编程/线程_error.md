[TOC]
##Timer启用后无法停止？
如何停止Timer （有可能会解决内存溢出的问题，Exception in thread "org.springframework.scheduling.timer.TimerFactoryBean#1" java.lang.OutOfMemoryError: Java heap space）

所有TimerTask都完成了，按理说程序应该自动退出，但是它却没有！
在JDK1.5的文档Timer类中，有这样一句话：“对Timer对象最后的引用完成后，并且
 所有未处理的任务都已执行完成后，计时器的任务执行线程会正常终止（并且成为垃圾回收的对象）。但是这可能要很长时间后才发生。”

既然会成为垃圾回收的对象，那么我们就主动让系统回收一下吧。在每个TimerTask的run
()方法最后加上一行代码：System.gc();
然后再运行程序，搞定，正常了。

很自然会想到应该保证在Timer的最后一个TimerTask的最后调用gc(),但是经尝试发现只要在某一个TimerTask中调用过gc()，然后程序就能正常结束。并且
gc()也不必放在最后。
