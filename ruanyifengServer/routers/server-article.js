//导入数据库工具
const db = require("../models/db.js");
//导入错误代工具
const errInfo = require("../config/codes.js");
//导入实例化路由
const Router = require("koa-router");
//导入分页工具
const pageTools = require("../util/pageTools");
const article = new Router();
//处理get请求
article.post("/add", async ctx => {
     //从前端获取过来的数据
     let data = ctx.request.body.fields;
     //将合的数据存入到数据库中
     let result = await db.insertData('article', data);
     //返回操作的结果
     ctx.body = result.affectedRows ? errInfo.ADD_SUCCESS : errInfo.ADD_FAIL;
  })
  .get("/del", async ctx => {
    let data = ctx.query;
    let result = await db.deleteDataById('article', data.id);
    ctx.body = result.affectedRows ? errInfo.DEL_SUCCESS : errInfo.DEL_FAIL;
  })
  .post("/update", async ctx => {
    //处理更新请求
    let data = ctx.request.body.fields;
    let result = await db.updatetById('article', data, data.id);
    ctx.body = result.affectedRows ? errInfo.UPDATE_SUCCESS : errInfo.UPDATE_FAIL;
  })
  .get("/selectItem",async ctx => {
    let id = ctx.query.id;
    let result = await db.findData({
        table:'article',
        where:{
            id:id
        }
    });
    ctx.body = result.length?result:errInfo.NO_DATA;
  })
  .get("/select",async (ctx)=>{
    //获取当前页码
    let pn = ctx.query.pn ? ctx.query.pn : 1;
    //获取开始查询的位置
    let start = pn > 1 ? (pn - 1) * 10 : 0;
    //获取前端提交过来的数据
    let data = ctx.query;
    //pn不是where查询的条件所以删除它
    delete data.pn;
    //获取总条数
    let count = (await db.count("article", data))[0].total_count;
    let json = {
        table: "article",
        where: data,
        start: start,
        num: 10
    };
    let result = await db.findData(json);
    //获取分页信息
    let pageInfo = pageTools(pn, start, count, result);
    let res = {};
    res["pageInfo"] = pageInfo;
    res["list"] = result;
    ctx.body = res;
  })

module.exports = article;