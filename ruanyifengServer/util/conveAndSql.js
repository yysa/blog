/*
 * @Author: jabinwu 
 * @description:  将对象转换为条件sql语句
 * @Date: 2018-06-28 16:20:17 
 * @Last Modified by:   jabinwu 
 * @Last Modified time: 2018-06-28 16:20:17 
 */

module.exports = function (data) {
    let len = Object.keys(data).length;
    let keyValueStr = '';
    let i = 0;
    for (let key in data) {
        if (i == len - 1) {
            keyValueStr += `${key}="${data[key]}"`
        } else {
            keyValueStr += `${key}="${data[key]}" AND `
        }
        i++;
    }
    return keyValueStr;
}