const errInfo = require("../config/codes.js");

const Router = require("koa-router");
const checkLogin = new Router();

checkLogin.get('/',ctx => {
    ctx.body = errInfo.HAS_LOGIN;
})

module.exports = checkLogin;