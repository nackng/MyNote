## java.util.ConcurrentModificationException
```
at java.util.ArrayList$Itr.checkForComodification(ArrayList.java:901)
at java.util.ArrayList$Itr.next(ArrayList.java:851)
at com.haiziwang.jplugin.study.ctrl.OcanalController.getLineRuleCompensate(OcanalController.java:1930)


这个问题是说,你不能在对一个List进行遍历的时候将其中的元素删除掉
解决办法是,你可以先将要删除的元素用另一个list装起来,等遍历结束再remove掉
可以这样写
List delList = new ArrayList();//用来装需要删除的元素
for(Information ia:list)
if(ia.getId()==k){
n++;
delList.add(ia);
}
list.removeAll(delList);//遍历完成后执行删除


// 1 使用Iterator提供的remove方法，用于删除当前元素【好像不能解决问题】
 for (Iterator<string> it = myList.iterator(); it.hasNext();) {
     String value = it.next();
      if (value.equals( "3")) {
          it.remove();  // ok
     }
}
System. out.println( "List Value:" + myList.toString());
 
 // 2 建一个集合，记录需要删除的元素，之后统一删除  【推荐】           
List<string> templist = new ArrayList<string>();
 for (String value : myList) {
      if (value.equals( "3")) {
          templist.remove(value);
     }
}
 // 可以查看removeAll源码，其中使用Iterator进行遍历
myList.removeAll(templist);
System. out.println( "List Value:" + myList.toString());  
```