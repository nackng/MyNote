##No layout: index.html
```
执行 hexo  s 后，访问http://localhost:4000后，访问不到。
后台日志：WARN  No layout: index.html
```
##ERROR Deployer not found: git
```
直接执行hexo d的话一般会报如下错误：
Deployer not found: github 或者 Deployer not found: git
原因是还需要安装一个插件：
npm install hexo-deployer-git --save
```
##npm WARN deprecated swig@1.4.2: This package is no longer maintained
npm uninstall swig
npm install swig@lastest
##hexo deploy ERROR Deployer not found: git
npm install hexo-deployer-git --save 改了之后执行，再部署就可以了。
##WARN  No layout: index.html
##hexo deploy Error: error: src refspec HEAD does not match any.
 error at Process.ChildProcess._handle.onexit
git config --global user.name "zhongxin007"
git config --global user.email "860651416@qq.com"
hexo deploy




