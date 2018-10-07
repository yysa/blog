/*
 * @Author: jabinwu 
 * @description:  判断用户的角色，限制相关用户权限
 * @Date: 2018-06-28 16:13:56 
 * @Last Modified by: jabinwu
 * @Last Modified time: 2018-06-28 18:03:24
 */
const db = require("../models/db.js");
const errInfo = require("../config/codes.js");
const checkAccess = async function (ctx) {
    //获取token值
    let token = ctx.headers.authorization.split(" ")[1];
    //根据token值查询用户角色
    let tokenData = await db.findData({
        where: {
            token: token,
        },
        table: 'xskj_token'
    });
    console.log(tokenData);
    //判断用户是否为管理员和超级管理员
    if (tokenData[0].cid == 3 || tokenData[0].cid == 4) {
        ctx.body = errInfo.NO_ACCSEE;
        return false;
    } else {
        return true;
    }
}
module.exports = checkAccess;