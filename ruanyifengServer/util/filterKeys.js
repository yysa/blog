/*
 * @Author: jabinwu 
 * @description:  过滤用户不想要的字段
 * @Date: 2018-06-28 16:30:51 
 * @Last Modified by: jabinwu
 * @Last Modified time: 2018-07-03 22:58:35
 */
//过滤字段
const filterKeys = function (obj, arr) {
    console.log(obj);
    console.log(arr);
    for (var key in arr) {
        delete obj[arr[key]]
    }
    return obj;
}
module.exports = filterKeys;