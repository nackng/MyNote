##there are no packages available for installation
```
第一步：取得sublime.wbond.NET的IPv4地址。在命令提示符中输入以下命令：
ping sublime.wbond.Net


第二步：打开C:\Windows\system32\drivers\etc\hosts文件，增加如下对应关系：50.116.33.29 sublime.wbond.net
保存文件，然后再打开Package Control（快捷键Ctrl+Shift+P）开始安装即可。
```
##生成.dump文件
```
GBK Encoding Support 没有安装前打开ASNI格式编码文件会乱码，安装成功重启则可以打开正常 关于.dump文件生成的解释：
当打开一个非utf-8格式且包含汉字的文件时，sublime text 2会自动生成一个dump文件，文件修改过程中，不会修改原文件，只有按"保存"了才会将dump的数据更新到原文件里，关闭当前编辑的dump文件则会自动删除dump文件。


但是有时候 GBK Encoding Support 插件也会出些bug，就想这样，生成.dump文件后自动切换到这个文件编辑


解决办法：


下载地址：http://pan.baidu.com/share/link?shareid=174741&uk=2534294120


使用方法：下载 GBK Encoding Support.sublime-package 文件 替换 SublimeText2\Pristine Packages 下的GBK Encoding Support.sublime-package 文件，重启ST2就可以了。
```