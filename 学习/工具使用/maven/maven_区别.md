[TOC]
##dependencies 和 dependencyManagement
```
dependencies 和 dependencyManagement 的区别在于：
前者，即使在子项目中不写该依赖项，那么子项目仍然会从父项目中继承该依赖项。
后者，如果在子项目中不写该依赖项，那么子项目中是不会从父项目继承该依赖项的；只有在子项目中写了该依赖项，才会从父项目中继承该项，并且version 和 scope 都读取自 父pom。
```