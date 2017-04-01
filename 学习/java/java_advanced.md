[TOC]
##web项目启动时执行某个方法

public void main() {
    TimerTask task = new TimerTask() {
      @Override
      public void run() {
        getCheckRule();
      }
    };
    Timer timer = new Timer();
    Calendar calendar = Calendar.getInstance();
    Date firstTime = calendar.getTime();
    long intevalPeriod = 2 * 1000;
    // schedules the task to be run in an interval
    // timer.scheduleAtFixedRate(task, delay,
    // intevalPeriod);
    timer.schedule(task, firstTime, intevalPeriod);
  }

  public void testCheck() {
    System.out.println("------------------>testcheck...");
  }