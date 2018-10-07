/*
 * @Author: lbx 
 * @Description: 选出相关文章
 * @Date: 2018-09-25 17:33:40 
 * @Last Modified by: lbx
 * @Last Modified time: 2018-09-27 16:13:29
 */
module.exports = function (json) {
    var start = json.actArr.length - 1;
    var end = 0;
    var arr = [];
    var s = json.status ? json.status : 0;
    for (var i = json.actArr.length - 1; i >= 0; i--) {
        if (json.o.id == json.actArr[i].id) {
            break;
        }
    }
    if (s == 0) {
        //找出相关的4篇同类型文章
        if (json.actArr.length - i -1>= 4) {
            start = i + 4;
        }
        
        if(start-4 >= 0) {
            end = start - 3;
        }
        for (var j = start; j >= end; j--) {
            arr.push(json.actArr[j]);
        }
    }else if(s == 1){
        //找出同类型的上一篇和下一篇文章
        arr = {}
        if( i == json.actArr.length-1 && json.actArr.length>=1){
            arr.pre = json.actArr[i-1];
        }else if(i==0 && json.actArr.length>=1){
            arr.next = json.actArr[i+1];
        }else if(i>0){
            arr.pre = json.actArr[i-1];
            arr.next = json.actArr[i+1];
        }
    }
    return arr;
}