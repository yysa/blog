const path = require("path");
const config =  require("../config/config");
const test = new require("koa-router")();

test.get('/',async (ctx)=>{
    const a = {
        data:"我是ejs"
    }
    ctx.throw(500);
    ctx.body = ctx;
    // await ctx.render('test',{test:a});
    console.log(ctx);
})

module.exports = test;