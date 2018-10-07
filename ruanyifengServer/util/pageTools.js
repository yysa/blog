/*
 * @Author: jabinwu 
 * @description: 分页工具 
 * @Date: 2018-06-28 16:31:39 
 * @Last Modified by: jabinwu
 * @Last Modified time: 2018-07-10 08:33:13
 */

//导入分页工具
const db = require("../models/db.js");
const pageTools = function (pn, start, count, result) {
    return {
        hasPrePage: pn > 1 ? true : false,
        hasNextPage: result.length <= 10 && start + 10 >= count ? false : true,
        total_count: count,
        nowPage: pn
    };
};
module.exports = pageTools;