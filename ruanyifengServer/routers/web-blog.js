const path = require("path");
const config = require("../config/config");
const timeChange = require("../util/date");
const db = require("../models/db");
const lastAct  = require("../util/lastAct");
const groupActBytime = require("../util/groupActBytime.js");
const relevantAct = require("../util/relevant");
const blog = new require("koa-router")();
const test = require("../config/test");
blog.get('/', async (ctx) => {
  //导航页
  //查询类型为2 的所有文章
  let act = await db.findData({
    table: 'article',
    where: {
      cid: 1//cid 为2的为剪贴板文章
    }
  })
  //查询该文章的评论数
  let commmentNum = await db.findData({
    table:'comment',
    where:{
      aid: act[act.length-1].id
    }
  });

  //查询所有文章
  let allAct = await db.findData({
    table: 'article'
  })

  //查询所有评论
  let comment = await db.findData({
    table: 'comment'
  })
  await ctx.render('blog',{
    commmentNum:commmentNum.length?commmentNum.length:0,
    timeChange:timeChange,
    webstatic:config.webstatic,
    host:config.host,
    lastAct:lastAct,
    act:act,
    allAct:allAct,
    comment:comment,
  });
})



.get('/archives', async (ctx) => {
  //存档页
  let act = await db.findData({
    table: 'article',
    where: {
      cid: 2//cid 为2的为剪贴板文章
    }
  })
  //查询该文章的评论数
  let commmentNum = await db.findData({
    table:'comment',
    where:act.length?{aid: act[act.length-1].id}:{}
  });

  //查询所有文章
  let allAct = await db.findData({
    table: 'article'
  })
  //查询按文章id分组后的评论
  let gropComment = await db.findData({
    table:'comment group by aid',
    filds:['aid','count(aid) count']
  });

  //为最新的20篇文章加评论数
  let lAct = lastAct(allAct,20);
  for(let i = 0;i<lAct.length;i++){
    let count = 0;
    for(let j = 0;j<gropComment.length;j++){
      if(lAct[i].id == gropComment[j].aid){
        count = gropComment[j].count;
        break;
      }
    }
    lAct[i].count = count;
  }
  //查询所有文章类型及文章数量
  let allActCategory = await db.findData({
    filds: ['article_category.cname','count(article.cid) count'],
    table: ['article_category','article'],
    where:{
      'article_category.id' : 'article.cid'
    },
    link_search:true
  })
  await ctx.render('archives',{
    commmentNum:commmentNum.length?commmentNum.length:0,
    timeChange:timeChange,
    webstatic:config.webstatic,
    host:config.host,
    lastAct:lastAct,
    act:act,
    lAct:lAct,
    allAct:allAct,
    allActCategory:allActCategory
  });
})



.get('/list/:id', async (ctx) => {
  //列表页
  let cid = ctx.params.id;
  
  
  //查询当前页的文章分类
  let category = await db.findData({
    table:'article_category',
    where:{
      id:cid
    }
  });
  //如果查询不到文章或者是id错误跳转到404页面
  if(category.length == 0){
    await ctx.render('error');
    return;
  }

  //查询当前页的文章分类下的所有文章
  let allAct = await db.findData({
    filds:['id','create_time','title'],
    table:'article',
    where:{
      cid:cid
    }
  });
  // 查询评论并分组统计
  let groupComment = await db.findData({
    filds:['aid','count(aid) count'],
    table:'comment group by aid'
  });

  //为当前页的文章分类下的所有文章加上评论数
  for(let i = 0; i<allAct.length;i++){
    let count = 0;
    for(let j = 0;j<groupComment.length;j++){
      if(allAct[i].id == groupComment[j].aid){
        count = groupComment[j].count;
        break;
      }
    }
    allAct[i].count = count;
  }

  //查询所有文章分类
  let allCategory = await db.findData({
    table:'article_category'
  });
  //查询所有文章分组
  let groupAct = await db.findData({
    filds:['cid','count(cid) count'],
    table:'article group by cid'
  });
  //为所有文章分类加上对应的文章数量
  for(let i = 0; i<allCategory.length;i++){
    let count = 0;
    for(let j = 0;j<groupAct.length;j++){
      if(allCategory[i].id == groupAct[j].cid){
        count = groupAct[j].count;
        break;
      }
    }
    allCategory[i].count = count;
  }
  //根据年份分组文章
  //console.log(groupActBytime(allAct));
  await ctx.render('list',{
    timeChange:timeChange,
    host: config.host,
    webstatic: config.webstatic,
    allCategory:allCategory,
    category:category,
    allAct:allAct,
    groupAct:groupActBytime(allAct)
  });
})


.get('/article/:id', async (ctx) => {
  //文章页
  let aid = ctx.params.id;
  //查询文章信息
  let article = await db.findData({
    table: 'article',
    where: {
      id: aid
    }
  });
  //如果查询不到文章或者是id错误跳转到404页面
  if(article.length == 0){
    await ctx.render('error');
    return;
  }

  //查询文章的评论
  let comment = await db.findData({
    table: 'comment',
    where: {
      aid: aid
    }
  });
  //查询同一类型的所有文章
  let relevant = await db.findData({
    table: 'article',
    where: {
      cid: article[0].cid
    }
  });
  //查询文章分类名称
  let category = await db.findData({
    table: 'article_category',
    where: {
      id: article[0].cid
    }
  });
  //console.log(relevantAct({actArr:relevant,o:article[0],status:1}));
  await ctx.render('article', {
    timeChange:timeChange,
    host: config.host,
    webstatic: config.webstatic,
    imgstatic: config.imgstatic,
    article: article[0],
    comment: comment,
    relevant: relevantAct({actArr:relevant,o:article[0]}),
    category:category[0],
    nextPre: relevantAct({actArr:relevant,o:article[0],status:1})
  });
})
module.exports = blog;