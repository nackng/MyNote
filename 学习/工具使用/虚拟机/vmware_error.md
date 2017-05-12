[TOC]
##无法获得VMCI 驱动程序的版本: 句柄无效。解决方法
关闭虚拟机，找到安装路径，用记事本打开.vmx结尾的文件找到vmci0.present = "TRUE"把TRUE改为FALSE,保存，再次打开虚拟机，问题解决。
##The VMware Authorization Service is not running
在服务列表里面查找跟VMware相关的服务，vmware service 启动即可。

