const router = require("koa-router")();


const upload= require("./upload");
const server_article = require("./server-article");
const server_article_category = require("./server-article_category");
const server_comment = require("./server-comment");
const server_users = require("./server-users");
const server_advertisement = require("./server-advertisement");
const server_infor= require("./server-infor");
const server_advertisement_category = require("./server-advertisement_category");
const login = require("./login");
const checkLogin = require("./checkLogin");
 
//装载子路由
router.use("/login",login.routes(),login.allowedMethods());
router.use("/checkLogin",checkLogin.routes(),checkLogin.allowedMethods());
router.use("/upload", upload.routes(),upload.allowedMethods());
router.use("/article", server_article .routes(), server_article.allowedMethods());
router.use("/articleCategory", server_article_category .routes(), server_article_category.allowedMethods());
router.use("/comment", server_comment .routes(), server_comment.allowedMethods());
router.use("/users", server_users .routes(), server_users.allowedMethods());
router.use("/advertisement", server_advertisement.routes(), server_advertisement.allowedMethods());
router.use("/infor", server_infor.routes(), server_infor.allowedMethods());
router.use("/advertisementCategory", server_advertisement_category.routes(), server_advertisement_category.allowedMethods());

module.exports = router;
