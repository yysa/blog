const path = require("path");
const config =  require("../config/config");
const index = new require("koa-router")();

index.get('/',async (ctx)=>{
    await ctx.render('index',{
        webstatic:config.webstatic,
        host:config.host
    });
})

module.exports = index;