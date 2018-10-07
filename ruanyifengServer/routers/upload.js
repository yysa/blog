const db = require("../models/db.js");
//导入错误代工具
const errInfo = require("../config/codes.js");
//导入实例化路由
const Router = require("koa-router");
//导入分页工具
const pageTools = require("../util/pageTools");
const del = require("../util/del");
const URL = require("../config/config");
const imgUpload = require("../util/upload");
const fs = require("fs");
const path = require("path");
const upload = new Router();
//处理图片上传
upload.post("/", async ctx => {
        let paths = imgUpload(ctx.request.body.files,'art');
        let data=[];
        for(key in paths){
            data.push(URL.imgstatic+paths[key]);
        }
        ctx.body = {
            "errno": data.length?0:1,
            "data": data,
            "errMsg": data.length?'图片上传成功':'图片上传失败请重新上传'
        }
  }).get("/", async ctx =>{
      //根据图片名删除图片
      let imgName  = ctx.query.img;
      let path  = ctx.query.path;
      let e = await del(path,imgName);
      ctx.body = e?errInfo.DEL_SUCCESS:errInfo.DEL_FAIL;
  })

module.exports = upload;