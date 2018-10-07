/*
 * @Author: jabinwu 
 * @description:  将对象转换为sql模糊查询字符串
 * @Date: 2018-06-28 16:19:07 
 * @Last Modified by:   jabinwu 
 * @Last Modified time: 2018-06-28 16:19:07 
 */

module.exports = function (data) {
    let len = Object.keys(data).length;
    keyValueStr = '';
    var i = 0;
    for (let key in data) {
        if (i == len - 1) {
            keyValueStr += `${key} like "%${data[key]}%"`
        } else {
            keyValueStr += `${key} like "%${data[key]}%",`
        }
        i++;
    }
    return keyValueStr;
}