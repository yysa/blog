/*
 * @Author: lbx 
 * @Description: 
 * @Date: 2018-09-26 11:35:43 
 * @Last Modified by: lbx
 * @Last Modified time: 2018-09-26 11:36:17
 */

module.exports = function (data) {
    let len = Object.keys(data).length;
    let keyValueStr = '';
    let i = 0;
    for (let key in data) {
        if (i == len - 1) {
            keyValueStr += `${key}=${data[key]}`
        } else {
            keyValueStr += `${key}=${data[key]} AND `
        }
        i++;
    }
    return keyValueStr;
}