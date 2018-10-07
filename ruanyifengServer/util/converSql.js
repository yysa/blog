/*
 * @Author: jabinwu 
 * @description:  将对象转换为sql语句形式的字符串
 * @Date: 2018-06-28 16:18:15 
 * @Last Modified by: jabinwu
 * @Last Modified time: 2018-06-28 16:18:38
 */

module.exports = function (data) {
    let len = Object.keys(data).length;
    keyValueStr = '';
    var i = 0;
    for (let key in data) {
        if (i == len - 1) {
            keyValueStr += `${key}="${data[key]}"`
        } else {
            keyValueStr += `${key}="${data[key]}",`
        }
        i++;
    }
    return keyValueStr;
}