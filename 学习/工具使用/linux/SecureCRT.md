##上传、下载文件
```
如果linux上没有这两个命令工具，则需要先安装。可以使用yum安装。运行命令yum install lrzsz

```
借助securtCRT，使用linux命令sz可以很方便的将服务器上的文件下载到本地，使用rz命令则是把本地文件上传到服务器。
sz中的s意为send（发送），告诉客户端，我（服务器）要发送文件 send to cilent，就等同于客户端在下载。
rz中的r意为received（接收），告诉客户端，我（服务器）要接收文件 received by cilent，就等同于客户端在上传。
```
sz用法：
下载一个文件
sz filename 


下载多个文件
sz filename1 filename2


下载dir目录下的所有文件，不包含dir下的文件夹
sz dir/*


rz用法：
输入rz回车后，会出现文件选择对话框，选择需要上传文件，一次可以指定多个文件，上传到服务器的路径为当前执行rz命令的目录。
```
下载文件存放位置在securtCRT中设置：
options — session options — X/Y/Zmodem。
##上传、下载文件夹
```
比如下载：
先将要下载的文件夹打包压缩后，再下载就可以了。
范例一：将整个 /etc 目录下的文件全部打包成为 /tmp/etc.tar


[root@linux ~]# tar -cvf /tmp/etc.tar /etc　　　　<==仅打包，不压缩！


[root@linux ~]# tar -zcvf /tmp/etc.tar.gz /etc　　<==打包后，以 gzip 压缩


[root@linux ~]# tar -jcvf /tmp/etc.tar.bz2 /etc　　<==打包后，以 bzip2 压缩


sz etc.tar.gz即可。
```
##securecrt中文乱码
```
修改 Secure CRT的Session Options

Options->Session Options->Appearance->Font->新宋体 字符集：中文GB2312 ->Character encoding 为UTF-8
```
##SecureCRT设置vim显示颜色 
```
只需要两个步骤：


1) 选项 --> 会话选项 --> 终端 --> 仿真 -->  勾选“ANSI 颜色”。
2)  在.bashrc中添加：export TERM=xterm
退出后重新连接就可以了。
 
或者,在SecureCRT里,不用vt100  而用xterm
```
##查看securecrt保存的密码
session保存位置

secureCRT将每个session的配置文件保存在C:\Documents and Settings\Administrator\Application Data\VanDyke下的config文件夹。根据session名找到对应的配置文件。

根据密文解密程序(python)

from Crypto.Cipher import Blowfish
def decrypt(password) :
    c1 = Blowfish.new('5F B0 45 A2 94 17 D9 16 C6 C6 A2 FF 06 41 82 B7'.replace(' ','').decode('hex'), Blowfish.MODE_CBC, '\x00'*8)
    c2 = Blowfish.new('24 A6 3D DE 5B D3 B3 82 9C 7E 06 F4 08 16 AA 07'.replace(' ','').decode('hex'), Blowfish.MODE_CBC, '\x00'*8)
    padded = c1.decrypt(c2.decrypt(password.decode('hex'))[4:-4])
    p = ''
    while padded[:2] != '\x00\x00' :
        p += padded[:2]
        padded = padded[2:]
    return p.decode('UTF-16')
print decrypt("xxx240f919a7a477198d1f6ce3a1fbf5a3671c82483f34bed1304c7ebe8de345");
安装Crypto

https://pypi.python.org/pypi/pycrypto

wget https://pypi.python.org/packages/source/p/pycrypto/pycrypto-2.6.1.tar.gz

tar -zxvf pycrypto-2.6.1.tar.gz

cd pycrtyto-2.6.1

python setup.py build

python setup.py install

如果报错，则安装python-devel 
yum install python-devel
待破解数据：
S:"Hostname"=172.172.178.15
S:"Firewall Name"=None
S:"Username"=appadmin
D:"[SSH2] Port"=00000016
S:"Password"=u6360e591138e3f8b2724b3aa380cb1e23ac23fee3c78f899989cdccb282dc443
