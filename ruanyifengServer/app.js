/*
 * @Author: lbx 
 * @Description: 
 * @Date: 2018-09-25 11:37:12 
 * @Last Modified by: lbx
 * @Last Modified time: 2018-09-30 18:22:01
 */

//导入koa
const Koa = require("Koa"); 
const path = require("path");
//导入主路由
const web_routers = require("./routers/web-routers");

const server_routers = require("./routers/server-routers");
//导入服务端模板渲染引擎中间件
const views = require("koa-views");

const koaStatic = require("koa-static");

const config = require("./config/config");

const errHandle = require("./config/error.js");


//导入koabody处理formdata数据对象的中间件
const koaBody = require("koa-body");

const jwtKoa = require("koa-jwt");
//导入cors模块
const cors = require("koa-cors");



//导入sql配置文件，运行入口文件时先将表生成
var createTable = require("./config/sql.js");
const webapp = new Koa();
const server =new Koa();



//网页服务
//使用views中间件 应用ejs
webapp.use(
    views(path.join(__dirname, "./views"), {
      extension: "ejs"
    })
);
webapp.use(web_routers.routes()).use(web_routers.allowedMethods());
webapp.listen(config.web_port);

//配置静态资源加载中间件
//ad文件夹放广告图
//user文件夹放用户头像
//web文件夹放网页相关静态文件
server.use(cors());
server.use(koaStatic(__dirname+"/static"));

//处理401
server.use(errHandle);


server.use(
  jwtKoa({
    secret:config.secret
  }).unless({
    path: [
      /\/login/,
      /\/comment/
    ]
  })
);
//配置处理formdata形式数据的中间件
server.use(
  koaBody({
    multipart: true
  })
);
//挂载路由
server.use(server_routers.routes()).use(server_routers.allowedMethods());

//数据
server.listen(config.server_port);
console.log(`服务已开启。博客端口为${config.web_port}，后台服务端口为${config.server_port}`);
