## VUE模板工程
> VUE project

## 环境说明
### 1.安装nodejs(编译和打包需要用到)，配置环境变量path
### 2.下载项目工程
### 3.打开命令行，进入到工程根目录
### 4.如果需要进行域名替换，运行npm run repl,这个命令会把src下面的文件都进行一次扫描，将里面的域名按照配置文件进行替换
### 5.运行npm install 安装依赖,如果有依赖下载不了，可以尝试将源设置成taobao的，eg：npm --registry https://registry.npm.taobao.org info underscore
### 6.运行npm run build 编译生成dist
### 7.运行npm run dev 进行调试默认端口8080可以自己修改，在./config/index.js里面

更新说明：
1.由多页面应用，修改为单页面应用
2.所有的切换都在一个页面内进行，有些详情页或者特殊需要的，可以直接跳页打开，但是要自己控制头部底部
3.整体应用分为七个大的模块，已经按照名称分好文件夹了，分别是：goods，store，member，operations，statistics，setup，transaction
4.在上面的大模块下面，可以再按照需求建文件夹，组织自己的业务逻辑，例如goods下面的目录
5.在子一级目录里面，应该直接建承载业务的vue文件，例如goodsCheck.vue。
