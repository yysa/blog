/*
 * @Author: jabinwu 
 * @description:  文件上传工具
 * @Date: 2018-06-28 16:32:08 
 * @Last Modified by: lbx
 * @Last Modified time: 2018-09-29 23:48:27
 */
//导入文件模块
var fs = require('fs');
//导入路径模块
var path = require('path');
//上传方法,files为前端传过来的文件对象
function upload(files,spath) {
  //用户来保存上传到服务器的所有的文件地址
  var url = {};
  if (files) {
    //为了能处理多文件上传，所以我们需要遍历这个文件对象
    for (var item in files) {
      //获取文件的缓存地址
      var tmpath = files[item]['path'];
      //获取文件的名字
      var tmparr = files[item]['name'].split('.');
      //获取文件的后缀名
      var ext = '.' + tmparr[tmparr.length - 1];
      //生成随机的新的文件名并且与后缀拼接
      var fileName = parseInt(Math.random() * 100) + Date.parse(new Date()).toString() + ext;
      //拼接文件存入到服务器的目录地址
      var newpath = path.join(`static/${spath}/`, fileName);
      //根据服务器存储静态文件的文件的目录创建一个可写流
      var stream = fs.createWriteStream(newpath);
      //将可读流通过管道写入可写流，将图片上传到服务器静态文件目录
      fs.createReadStream(tmpath).pipe(stream);
      //获取文件存入数据库中的地址
      url[item] = `${spath}/${fileName}`;
    }
  }
  return url;
}
module.exports = upload;