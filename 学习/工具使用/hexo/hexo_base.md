[TOC]
##安装主题
`$ git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia`
修改hexo根目录下的 _config.yml ： `theme: yilia`
`cd themes/yilia`
`git pull`

主题配置文件在主目录下的_config.yml，请根据自己需要修改使用。 完整配置例子，可以参考我的博客备份
```
# Header
menu:
  主页: /
  随笔: /tags/随笔/

# SubNav
subnav:
  github: "#"
  weibo: "#"
  rss: "#"
  zhihu: "#"
  #qq: "#"
  #weixin: "#"
  #jianshu: "#"
  #douban: "#"
  #mail: "mailto:litten225@qq.com"
  #facebook: "#"
  #google: "#"
  #twitter: "#"
  #linkedin: "#"

rss: /atom.xml
```

# 是否需要修改 root 路径
# 如果您的网站存放在子目录中，例如 http://yoursite.com/blog，
# 请将您的 url 设为 http://yoursite.com/blog 并把 root 设为 /blog/。
root: 

# Content

# 文章太长，截断按钮文字
excerpt_link: more
# 文章卡片右下角常驻链接，不需要请设置为false
show_all_link: '展开全文'
# 数学公式
mathjax: false
# 是否在新窗口打开链接
open_in_new: false

# 打赏
# 请在需要打赏的文章的md文件头部，设置属性reward: true

# 打赏基础设定：0-关闭打赏； 1-文章对应的md文件里有reward:true属性，才有打赏； 2-所有文章均有打赏
reward_type: 2
# 打赏wording
reward_wording: '谢谢你请我吃糖果'
# 支付宝二维码图片地址，跟你设置头像的方式一样。比如：/assets/img/alipay.jpg
alipay: 
# 微信二维码图片地址
weixin: 

# Miscellaneous
baidu_analytics: ''
google_analytics: ''
favicon: /favicon.png

#你的头像url
avatar:

#是否开启分享
share_jia: true

#是否开启多说评论，填写你在多说申请的项目名称 duoshuo: duoshuo-key
#若使用disqus，请在博客config文件中填写disqus_shortname，并关闭多说评论
duoshuo: false

# 样式定制 - 一般不需要修改，除非有很强的定制欲望…
style:
  # 头像上面的背景颜色
  header: '#4d4d4d'
  # 右滑板块背景
  slider: 'linear-gradient(200deg,#a0cfe4,#e8c37e)'

# slider的设置
slider:
  # 是否默认展开tags板块
  showTags: false

# 智能菜单
# 如不需要，将该对应项置为false
# 比如
#smart_menu:
#  friends: false
smart_menu:
  innerArchive: '所有文章'
  friends: '友链'
  aboutme: '关于我'

friends:
  友情链接1: http://localhost:4000/
  友情链接2: http://localhost:4000/
  友情链接3: http://localhost:4000/
  友情链接4: http://localhost:4000/
  友情链接5: http://localhost:4000/
  友情链接6: http://localhost:4000/

aboutme: 很惭愧<br><br>只做了一点微小的工作<br>谢谢大家
```

##clone github repo
```
$ cd e:/hexo/blog

$ git clone https://github.com/adanac/zhongxin.github.io.git deploy/zhongxin.github.io
将我们之前创建的repo克隆到本地，新建一个目录叫做.deploy用于存放克隆的代码。
```
##自动发布脚本
```
创建一个deploy脚本文件
hexo generate
cp -R public/* deploy/zhongxin.github.io
cd deploy/zhongxin.github.io
git add .
git commit -m "update"
git push origin master

简单解释一下，hexo generate生成public文件夹下的新内容，然后将其拷贝至jiji262.github.io的git目录下，然后使用git commit命令提交代码到jiji262.github.io这个repo的master branch上。

需要部署的时候，执行这段脚本就可以了（比如可以将其保存为deploy.sh）。执行过程中可能需要让你输入Github账户的用户名及密码，按照提示操作即可。
```
##hexo好看的主题
https://github.com/Kaijun/hexo-theme-huxblog
http://www.codeblocq.com/assets/projects/hexo-theme-magnetic/

##发布自己的网站
[参考](http://www.jianshu.com/p/1c98aed8d92e)

$ mkdir zhongxin007
$ cd zhongxin007
$ hexo init
$ hexo server//(可本地预览效果)
$ git clone https://github.com/TryGhost/Casper.git themes/casper//(下载皮肤)
$ cd themes/casper/
$ git pull origin master//(更新作者的皮肤)
$ hexo generate//(重新生成博客)
$ hexo server//(重新预览博客)
###生成关于页面
修改`themes\clean-blog\_config.yml`添加
# Header
menu:
  主页: /
  关于: /about
  归档: /archives
  Github:
    url: https://zhongxin007.github.io
    icon: github
###部署到github
$ ssh-keygen -t rsa -C "860651416@qq.com"
修改_config.yml，
deploy:
  type: git
  repo: git@github.com:judasn/judasn.github.io.git
  branch: master



