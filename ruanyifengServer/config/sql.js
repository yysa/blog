let db = require('../models/db.js');
const user_table = [
    //用户表
    `create table if not exists users(
        id INT NOT NULL AUTO_INCREMENT,
        user_name VARCHAR(100) NOT NULL UNIQUE COMMENT '用户名',
        password VARCHAR(100) NOT NULL COMMENT '密码',
        nick VARCHAR(100) NOT NULL COMMENT '昵称',
        head_pic VARCHAR(100) NOT NULL COMMENT '头像',
        is_admin INT NOT NULL COMMENT '是否为管理员',
        create_time VARCHAR(30) NOT NULL COMMENT '注册时间',
        last_time VARCHAR(30) NOT NULL COMMENT '最后登录时间',
        PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
    //文章表
    `create table if not exists article(
        id INT NOT NULL AUTO_INCREMENT,
        cid INT NOT NULL COMMENT '文章所属类型id',
        aid INT NOT NULL COMMENT '文章作者id',
        title VARCHAR(100) NOT NULL COMMENT '文章标题',
        subtitle VARCHAR(100) NOT NULL COMMENT '文章副标题',
        content TEXT NOT NULL COMMENT '文章内容',
        advertisement VARCHAR(100) NOT NULL COMMENT '文章赞助广告',
        create_time VARCHAR(30) NOT NULL COMMENT '创建时间',
        change_time VARCHAR(30) NOT NULL COMMENT '修改时间',
        PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
    //文章分类表
    `create table if not exists article_category(
        id INT NOT NULL AUTO_INCREMENT,
        cname VARCHAR(30) NOT NULL COMMENT '文章分类名称',
        create_time VARCHAR(30) NOT NULL COMMENT '创建时间',
        PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`, 
    //广告表
    `create table if not exists advertisement(
        id INT NOT NULL AUTO_INCREMENT,
        cid INT NOT NULL COMMENT '广告所属分类id',
        aname VARCHAR(100) NOT NULL COMMENT '广告赞助商',
        url VARCHAR(100) NOT NULL COMMENT '广告图地址',
        create_time VARCHAR(30) NOT NULL COMMENT '广告创建时间',
        start_time VARCHAR(30) NOT NULL COMMENT '广告开始时间',
        end_time VARCHAR(30) NOT NULL COMMENT '广告结束时间',
        PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`, 
//广告表
    `create table if not exists advertisement_category(
        id INT NOT NULL AUTO_INCREMENT,
        cname VARCHAR(100) NOT NULL COMMENT '广告分类名称',
        create_time VARCHAR(30) NOT NULL COMMENT '广告分类创建时间',
        PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`, 
    //评论表
    `create table if not exists comment(
        id INT NOT NULL AUTO_INCREMENT,
        aid INT NOT NULL COMMENT '评论所属文章id',
        uname VARCHAR(100) NOT NULL COMMENT '评论者名称',
        content TEXT NOT NULL COMMENT '评论内容',
        u_web VARCHAR(100) NOT NULL COMMENT '评论者个人网站', 
        create_time VARCHAR(30) NOT NULL COMMENT '创建时间',
        PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
    //网站信息表
    `create table if not exists infor(
        id INT NOT NULL AUTO_INCREMENT,
        iname VARCHAR(100) NOT NULL COMMENT '评论者名称',
        content TEXT NOT NULL COMMENT '评论内容', 
        create_time VARCHAR(30) NOT NULL COMMENT '创建时间',
        change_time VARCHAR(30) NOT NULL COMMENT '修改时间',
        PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;`
];

function createTable() {
    user_table.forEach(function (item, index) {
        db.createTable(item)
    });
}
createTable();
module.exports = createTable