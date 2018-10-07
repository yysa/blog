//导入数据库工具
const db = require("../models/db.js");
//导入错误代工具
const errInfo = require("../config/codes.js");
const config = require("../config/config.js");
//导入实例化路由
const Router = require("koa-router");
const upload = require('../util/upload.js');

const jwt = require("jsonwebtoken");
//导入分页工具
const pageTools = require("../util/pageTools");
const login = new Router();
//处理get请求
login.post("/", async ctx => {
    let data = ctx.request.body.fields;
    let loginMsg = {};
    //密码帐号都不为空时才查询用户表
    if(data.user_name && data.password){
        //查询用户名和密码是否匹配
        let user = await db.findData({
            table:'users',
            where:data
        });
        //密码和帐号匹配
        if(user.length != 0){
            loginMsg.user_infor = user[0];
            loginMsg.errMsg = errInfo.LOGIN_SUCCESS;
            loginMsg.token = jwt.sign({
                //生成token的标识，必须是一个object, buffer或者string
                data: user[0].user_name,
                // 设置 token 过期时间
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 10 // 60 seconds * 60 minutes = 1 hour
              },
              //加密的key值
              config.secret
            );
        }else{
            loginMsg.errMsg = errInfo.ERROR_NAME_OR_PASSWORD;
        }
    }else{
        loginMsg.errMsg = errInfo.USER_PWD_EMPTY;
    }
    ctx.body = loginMsg;
});


module.exports = login;