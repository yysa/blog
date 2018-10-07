# 项目说明
## <strong>本项目是仿阮一峰老师的个人博客的博客项目，仅用于个人学习。</strong>

* 1.ruanyifengAdmin是博客的后台管理，使用的技术是vue+vue-router+elementui。

* 2.raunyifengServer是博客的官网和后台服务接口，使用的技术是node+koa2+ejs+mysql。

* 3.测试数据.sql是测试数据插入的sql语句。

# 使用前的准备
* 1.安装mysql(我用的是WampServer开启的mysql服务)

* 2.安装node（v8.11.2）

* 3.安装npm/cnpm（5.6.0）

* 4.安装git（2.16.2.windows.1）

# 使用说明

<strong>1.使用git克隆本项目</strong>

> `git clone git@github.com:yysa/blog.git`

<strong>2.安装前后台的项目依赖</strong>

> `cnpm/npm i`

<strong>3.开启mysql服务，进入mysql命令行创建xskjbk数据库</strong>

> `create database xskjbk`

<strong>4.开启博客后台服务（ruanyifengServer）和后台管理(ruanyifengAdmin)</strong>

> `npm run start`

<strong>5.访问博客的首页localhost:8080和博客的后台管理localhost:8081(视自己电脑端口占用的情况而定，我的是8081端口)</strong>

# 待续...
