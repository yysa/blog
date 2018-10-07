const path = require("path");
const config = require("../config/config");
const timeChange = require("../util/date");
const db = require("../models/db");
const lastAct  = require("../util/lastAct");
const support = new require("koa-router")();
//  文章的id为
support.get('/',async (ctx)=>{
  let content = await db.findData({
    table:'infor',
    where:{
      id:1
    }
  });
  //查询数据不存在时 返回404页面
  if(content.length == 0){
    await ctx.render('error');
    return;
  }
    //广告页
    await ctx.render('support',{
      timeChange:timeChange,
      webstatic:config.webstatic,
      content:content
    });
  }).get('/contact',async (ctx)=>{
    let content = await db.findData({
      table:'infor',
      where:{
        id:2
      }
    });
    //查询数据不存在时 返回404页面
    if(content.length == 0){
      await ctx.render('error');
      return;
    }
      //广告页
      await ctx.render('support',{
        timeChange:timeChange,
        webstatic:config.webstatic,
        content:content
      });
  }).get('/about',async (ctx)=>{
    let content = await db.findData({
      table:'infor',
      where:{
        id:3
      }
    });
    //查询数据不存在时 返回404页面
    if(content.length == 0){
      await ctx.render('error');
      return;
    }
      //广告页
      await ctx.render('support',{
        timeChange:timeChange,
        webstatic:config.webstatic,
        content:content
      });
  })

module.exports = support;