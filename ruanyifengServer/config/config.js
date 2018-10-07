const path = require('path');


let server_port = 3000;
let web_port = 8080;
module.exports = {
  //服务监听的端口
  server_port: server_port,
  web_port: web_port,
  //jwt的加密的key值
  secret: 'xishiyun',
  //官网主机地址
  host:`http://localhost:${web_port}/`,
  //网页静态资源地址
  webstatic:`http://localhost:${server_port}/web/`,
  imgstatic:`http://localhost:${server_port}/`,
  //连接数据的信息
  database: {
    //要连接的数据库名称
    DATABASE: 'xskjbk',
    //连接数据库账号
    USERNAME: 'root',
    //连接数据库的密码
    PASSWORD: '123456',
    //mysql数据库占用的端口
    PORT: '3306',
    //本地服务器主机名
    HOST: 'localhost'
  }
}