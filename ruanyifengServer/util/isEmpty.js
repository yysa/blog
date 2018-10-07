/*
 * @Author: jabinwu 
 * @description:  判断用户名和密码是否为空
 * @Date: 2018-06-28 16:31:12 
 * @Last Modified by: jabinwu
 * @Last Modified time: 2018-06-28 16:31:34
 */

const errInfo = require("../config/codes.js");
const isEmpty = function (data) {
    if (JSON.stringify(data) == "{}") {
        return errInfo.USER_PWD_EMPTY;
    } else if (!data.name) {
        return errInfo.USER_EMPTY;
    } else if (!data.password) {
        return errInfo.PWD_EMPTY;
    } else {
        return null;
    }
}
module.exports = isEmpty;