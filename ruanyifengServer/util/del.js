/*
 * @Author: lbx 
 * @Description: 删除文件异步处理
 * @Date: 2018-09-28 14:53:08 
 * @Last Modified by: lbx
 * @Last Modified time: 2018-09-30 08:42:49
 */
const fs = require("fs");
module.exports = function(path='art',imgName){
    return new Promise(function(resolve,reject){
        fs.unlink(`static/${path}/${imgName}`,function(e){
            if(e){
                resolve(false);
            }else{
                resolve(true);
            }
       });
    });
}