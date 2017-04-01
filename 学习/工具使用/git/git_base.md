[TOC]
##git配置两个账号

##如何本地与远程建立信任联系？
```
要解决这个问题，需要使用SSH秘钥的方式，接下来我就讲一下怎么进行配置。
1.在本地生成私钥和公钥
git config --global user.name "username"//用户昵称
git config --global user.email "emailAddress"//github或者gitlib的邮箱地址
ssh-keygen -t rsa -C "emailAddress"//github或者gitlib邮箱账户地址

2.将电脑上的公钥与远程仓库进行绑定
本地会在上面的步骤中会生成一个id_rsa.pub（默认情况是这个名称），将该文件中的内容copy到远程仓库github或gitlib的settings的SSH配置选项中。

Tittle名称自由发挥
```
##克隆工程
```
将远程的数据复制一份到本地
#【仓库copy地址】
git clone [git@rep.xx.com:zoeminghong/hello.git]
```
##本地新建Git工程
```
现在打算将本地的工程，放到Git仓库进行托管了，并且远程Git仓库已经创建了该项目的工程
#本地初始化工程，会生成一个.git文件
git init
#将本地的工程与远程仓库中的项目进行关联（不用关心项目名不一致的问题）
#此时本地工程与远程仓库已经建立了联系
git remote add origin [git@rep.xx.com:zoeminghong/hello.git]
 
 
#将本地所有文件添加到Git中，进行监管
git add .
#将内容提交 【提交注释】
git commit -m "[...]"
#将本地的内容同步到远程仓库中
git push -u origin master
```
##显示某一个特定的提交的日志
```
git show [十六进制码]
```
##查看提交图
```
git log --graph --pretty=oneline --abbrev-commit
```
##查看冲突未处理的文件列表
```
git ls-files -u
```
##本地代码与远程代码冲突问题
```
本地代码未commit的前提下，解决与远程代码冲突问题
git pull #失败
#将当前修改进行暂存起来
git stash
#或
git stash save "[注释]"
 
#获取最新的远程仓库代码
git pull
 
#恢复暂存的内容
git stash pop

#stash其他操作
#恢复最近一次save的原工作区内容,，并删除stash记录
git stash pop
#恢复最近一次save的原工作区内容,但不删除stash记录
git stash apply
#删除stash记录
git stash drop
#获取暂存列表
git stash list
但，上面的也可能存在问题，由于本地存在未被追踪的文件，并且远程仓库pull的时候也存在同名的文件，就会存在pull失败，在这种情况下，在git stash后面追加 --include-untracked，会将远程的文件与本地的文件融合

stash只会保存当前索引和工作目录的状态，其保存的是add和commit的中间状态，如果还没有被git追踪的文件，是不会被记录的
如果我对某文件进行了修改，但我不想要push到远程仓库，同时我又想获取最新的修改记录

git stash save
git pull --rebase
如果暂存内容现在不想在当前分支恢复了，而是想单独起一个分支

git stash branch [newBranchName]
想要查看当前工作区与暂存状态内容区别

git stash show -p stash{0}
本地代码已经commit后，解决与远程代码冲突问题
# 获取远端库最新信息 【分支名称】
git fetch origin [master]
 
# 做比较
git diff [本地分支名] origin/[远程分支名]
 
# 拉取最新代码，同时会让你merge冲突
git pull
方法2

# 获取最新代码到tmp分支上 [远程的分支:本地分支]
git fetch origin [master:tmp]
 
 
# 当前分支与tmp进行比较
git diff tmp
 
 
# 修改冲突部分，进行本地commit操作
git add .
 
 
git commit -m "[...]"
 
 
# 将tmp中内容合并到当前分支中
git merge tmp
 
 
# 删除分支
git branch -d tmp
```
##删除文件
```
保留副本操作
git rm --cache [文件名]
直接文件删除
git rm [文件名]
```
##后悔药
```
还原到最近的版本，废弃本地做的修改（当前文件修改没有进行add操作的时候）
git checkout -- [文件名]
取消已经暂存的文件(撤销先前"git add"的操作)
#当前HEAD，返回到上一次commit点，不会有任何日志记录
git reset HEAD --hard
git reset HEAD [文件名]
回退所有内容到上一个提交点
#最近内容已经commit的情况下
git reset HEAD^ --hard
回退这个文件的版本到上一个版本
#最近内容已经commit的情况下
git reset HEAD^ [文件名]
将本地的状态回退到和远程的一样
git reset –-hard origin/[分支名]
回退到某个版本
# 获取所有的HEAD更改信息的sha1值
git reflog
git reset [SHA1]
回退到上一次提交的状态，按照某一次的commit完全反向的进行一次commit.(代码回滚到上个版本，并提交git)
git revert HEAD
使用reset是不会有日志记录的，revert则会要提交一个记录点

修改最新的提交信息(修改提交的注释信息)
git commit --amend
```
##本地分支与远程分支相连
```
本地创建了一个分支，远程也有一个分支，进行两者关联
git checkout -b [本地分支名] origin/[远程分支名]
```
##Tag使用
```
我们在开发的时候，可能存在线上发布了一个版本，需要给这个版本代码打上一个标签，到时候可以方便回退到这个版本
# 创建tag 【tag名】
git tag v1.0
 
 
# 查看存在的tag
git tag
 
 
# 将tag更新到远程
git push origin --tags
接下来就讲解回退到具体的tag

# 保存当前编程环境
git stash
 
 
# 切换回某个tag（v1.0）
git show v1.0
 
 
#【sha1】
git reset --hard [2da7ef1]
 
 
# 创建分支来保存tag的数据，tag只是一个节点的标记，无法承载数据的修改记录,【分支名】
git checkout -b [bill]
 
 
# 接着你就可以在这里改啊改了
切换回主干或其他分支

# 切换分支
git checkout master
 
 
# 日志记录
git reflog
 
 
# 显示stash列表
git stash list
 
 
# 恢复之前的工作环境代码
git stash apply
 
 
# 删除stash
git stash drop
分支与主干合并

git add .
 
 
git commit -m "v1.1"
 
 
# bill分支合并到当前分支【分支名】
git merge [bill]
```
##关于代码的比较
```
# 显示暂存区和工作区的差异
git diff
git diff [filename]
 
# 显示暂存区和上一个commit的差异【文件名】
git diff --cached [hello.txt]
git diff --cached [HEAD或者SHA1] [filename]
 
# 显示工作区与当前分支最新commit之间的差异
git diff HEAD
git diff [HEAD或分支名] [filename]
 
# 显示两次提交之间的差异【分支名】
git diff [first-branch]...[second-branch]
git diff [SHA1] [SHA1] [filename]

#分支之间的差异
#分支之间的差异
git diff [分支1] [分支2]
git diff [分支1]..[分支2]
#指定文件
git diff [分支1]:[file1] [分支2]:[file2]

#查看指定提交范围内的所有变更文件情况
git diff --stat master~[范围值] [分支名]
git diff --stat master~5 tmp
//还可以值查看具体某一个文件
git diff --stat master~5 tmp test.txt
```
##定位哪个提交点导致文件出现问题
```
#先确定范围
git bisect bad  #一般都是当前HEAD是坏提交【sha1】
git bisect good a794f9bd96f06b57b4c10433e4d6abb3f0855749 
#上面的步骤就是确定范围的，接下来就是回答git的问题，他指定的提交点是好的还是坏的
git bisect good//如果是坏的，就bad，直到你找到哪个提交点导致出现问题
#查看维护日志
git bisect log
#完成操作后，要回切到工作分支上
git branch
git bisect reset
git branch
```
##检查文件中每一行代码是谁提交的记录
```
git blame -L [起始行数],[文件名]
```

##创建分支
```
#以当前节点作为分支的开始起点
git branch [分支名]
#以SHA1作为分支开始起点
git branch [分支名] [SHA1]
#创建并切换分支,sha1以哪个节点作为分支的起点
git checkout -b [分支名] [SHA1]
```
##重命名分支
```
在git中重命名远程分支，其实就是先删除远程分支，然后重命名本地分支，再重新提交一个远程分支。
//显示现在分支
git branch -av
//删除远程要删除的分支devel
git push --delete origin devel
//重命名本地分支devel为develop
git branch -m devel develop
//推送到远程
git push origin develop
这是由于在 github 中，devel 是项目的默认分支。要解决此问题，这样操作：

进入 github 中该项目的 Settings 页面；
设置 Default Branch 为其他的分支（例如 master）；
重新执行删除远程分支命令。
```
##查看远程仓库分支
```
git branch -a
```
##获取远程仓库分支代码
```
git fetch origin [远程仓库分支名] [本地仓库分支名]
```
##删除本地分支
```
git branch -d [分支名]
```
##查看分支
```
git show-branch
#或
git branch
分支前面都存在*或者!

*表示当前分支

在–之后的是记录分支的提交信息

像*+ [tmp] 远程2就表示该提交存在于两个分支中
```
##显示某分支中某文件内容
```
git show [分支名]:[文件名]
```
##显示某个节点某文件的内容
```
git show [SHA1] [文件名]
```
##关于切换分支的逻辑
```
如果存在未被git追踪的文件，git是会将其忽略的

如果存在已追踪且被修改或删除，必须commit之后，才能切换

如果要不计后果的情况，强切，加-f
将当前的分支修改的内容同步到其他的分支上

假如你希望变更作用于另一个分支上，但由于当前分支如果不提交，是无法切换到另一个分支上的

git checkout -m [另一个分支名]

```
##将一个区间的提交，移植到另一个分支
```
#当前分支，得到dev分支中dev~2之前的所有提交内容
git cherry-pick dev~2
cherry-pick会生成一条新的提交记录
```
##同一台电脑绑定两个Github 帐号
###预备知识
ssh 方式链接到 Github，需要唯一的公钥，如果想同一台电脑绑定两个Github 帐号，需要两个条件:

1.能够生成两对 私钥/公钥
2.push 时，可以区分两个账户，推送到相应的仓库

解决方案:
1.生成 私钥/公钥 时，密钥文件命名避免重复
2.设置不同 Host 对应同一 HostName 但密钥不同
3.取消 git 全局用户名/邮箱设置，为每个仓库独立设置 用户名/邮箱
###操作方法
```
查看已有 密钥
1.$ ls ~/.ssh/，看到 id_rsa 与 id_rsa_pub 则说明已经有一对密钥。
2.生成新的公钥，并命名为 id_rsa_2 (保证与之前密钥文件名称不同即可)
3.ssh-keygen -t rsa -f ~/.ssh/id_rsa_2 -C "860651416@qq.com"
在 .ssh 文件夹下新建 config 文件并编辑，让不同 Host 实际映射到同一 HostName，但密钥文件不同。Host 前缀可自定义。
# 配置adanac
Host github.com
    User git
    HostName github.com
    IdentityFile ~/.ssh/id_rsa
    PreferredAuthentications publickey

# 配置zhongxin007
Host github2.com
    User git
    HostName github.com
    IdentityFile ~/.ssh/id_rsa_2
    PreferredAuthentications publickey
4.将生成的 id_rsa.pub，id_rsa_2.pub内容copy 到对应的 repo
5.测试 ssh 链接
ssh -T git@github.com
Hi adanac! You've successfully authenticated, but GitHub does not provide shell access.
ssh -T git@github2.com
Hi zhongxin007! You've successfully authenticated, but GitHub does not provide shell access.出现这句，表示链接成功
6.取消全局 用户名/邮箱设置，并进入项目文件夹单独设置
# 取消全局 用户名/邮箱 配置
git config –-global –-unset user.name
git config –-global –-unset user.email
# 单独设置每个repo 用户名/邮箱（必须要在具体的某个项目文件夹中）
$ pwd
/e/adanac_blog/adanac.github.io
git config user.email "adanac@sina.com"
git config user.name "adanac"
7.命令行进入项目目录，重建 origin (adanac.github.io和zhongxin007.github.io 为相应项目地址)
$ pwd
/e/adanac_blog/adanac.github.io
$ git remote rm origin
$ git remote add origin git@github.com:adanac/adanac.github.io.git
(备注：项目对应的_config.yml中的repo: git@github.com:adanac/adanac.github.io.git , 要与这里设置的保持一致)
$ pwd 
/e/blog/zhongxin007.github.io
$ git remote rm origin
$ git remote add origin git@github2.com:zhongxin007/zhongxin007.github.io.git
(这个项目对应的_config.yml中 的repo: git@github2.com:zhongxin007/zhongxin007.github.io.git)
8.push 测试一下
git push origin master
```
##git项目在文章中加入本地的图片
```
首先确认 _config.yml 中有 post_asset_folder:true 。
在 hexo 目录，执行
npm install https://github.com/CodeFalling/hexo-asset-image --save

假设在
MacGesture2-Publish
├── apppicker.jpg
├── logo.jpg
└── rules.jpg
MacGesture2-Publish.md
这样的目录结构（目录名和文章名一致），只要使用 ![logo](MacGesture2-Publish/logo.jpg) 就可以插入图片。

生成的结构为
public/2015/10/18/MacGesture2-Publish
├── apppicker.jpg
├── index.html
├── logo.jpg
└── rules.jpg
同时，生成的 html 是
<img src="/2015/10/18/MacGesture2-Publish/logo.jpg" alt="logo">
而不是愚蠢的
<img src="MacGesture2-Publish/logo.jpg" alt="logo">
```
## 配置图片大小
```
默认图片大小是自适应的，有可能会很大，造成页面显示不美观，可以在/themes/freemind/source/css/style.css中找到img节增加最大宽度限制：
img {
  max-width: 97.5%;
  margin: 15px auto;
  display: block;
  width: auto;
  height: auto;
  max-width: 60%;
}
```