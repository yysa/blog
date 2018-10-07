const router = require("koa-router")();

//网页访问路由
const webblog = require("./web-blog");
const webindex = require("./web-index");
const websupport = require("./web-support");


 
//装载网页访问子路由
router.use("/", webindex .routes(), webindex.allowedMethods());
router.use("/blog", webblog .routes(), webblog.allowedMethods());
router.use("/support", websupport.routes(), websupport.allowedMethods());

//配置404页面
router.get('*',async (ctx)=>{
    await ctx.render('error');
});



module.exports = router;