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


##工程目录说明

>─build
>─config
>─doc
>─src
>---api
>---static
>---css
>-------fonts
>-------img
>-------js
>---common
>---component
>---directive
>---filter
>---library
>---store
>---view 
>---test
>-------e2e
>-------unit

更新说明：
1.由多页面应用，修改为单页面应用
2.所有的切换都在一个页面内进行，有些详情页或者特殊需要的，可以直接跳页打开，但是要自己控制头部底部
3.整体应用分为七个大的模块，已经按照名称分好文件夹了，分别是：goods，store，member，operations，statistics，setup，transaction
4.在上面的大模块下面，可以再按照需求建文件夹，组织自己的业务逻辑，例如goods下面的目录
5.在子一级目录里面，应该直接建承载业务的vue文件，例如goodsCheck.vue。
6.路由配置说明
    1).路由配置文件和PathSetting.js文件息息相关，是路由配置的数据来源，路由配置文件：common/router/routerMap.js
    2).routerMap的配置请参照目前的范例进行
    3).PathSetting的配置，在原来的基础上，增加了routerName的配置，相关说明：routerName
        * 一级导航的路径已经配置好了，与页面名称对应的，不要修改
        * 二级导航下面有三级菜单的时候，routerName设置成一级导航的
        * 如果没有，就设置成自己的
    4).请参照已有配置进行添加自己的路由和页面
    5).不行请找廖小敏

7.路由传参数
    1).路由定义：
    '/imageList/:albumId/:albumName/:companyName': { // 图片管理
        name: '/imageList',
        component: function(resolve) {
            require(['../../view/goods/imageManage/imageList/imageList.vue'], resolve);
        },
        auth: true
    }
    定义了三个参数，albumId、albumName、companyName
    2).调用：
    this.$route.router.go({
        name: '/imageList',
        params: {
            'albumId': data['album_id'],
            'albumName': data['album_name'],
            'companyName': data['company_name']
        }
    });
    3).接收：
    route: {
        data(transition) {
            this.albumId = transition.to.params.albumId;
            this.company = transition.to.params.company;
            this.albumName = transition.to.params.albumName;
        }
    }
    在vue文件里面添加一个route属性，这个属性里面有一个data方法，该方法接受一个切换对象transition作为参数，通过这个对象获取参数
