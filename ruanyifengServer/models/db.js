//全局数据信息配置
const allConfig = require("../config/config.js");
//将对象转换为sql语句形式的字符串
const converSql = require("../util/converSql");
//将对象转换为sql模糊查询字符串;
const converLikeSql = require("../util/converLikeSql");
//将对象转换为条件sql语句
const converAndSql = require("../util/conveAndSql");
//将对象转化为连接查询sql语句
const conveLinkSql = require("../util/conveLinkSql");
//数据库的配置信息
const config = allConfig.database;
//引入mysql驱动
const mysql = require("mysql");
//创建连接池，连接数据库
const pool = mysql.createPool({
  host: config.HOST,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE
});
//与数据库建立连接，并且执行sql数据
let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
};

//创建表
let createTable = function (sql) {
  return query(sql, []);
};

//计算总条数
let count = function (table, where, link_search) {
  let _sql = "";
  if (where && JSON.stringify(where) != '{}') {
    //判断是否是模糊查询
    let str = '';
    if (!!link_search) {
      str = converLikeSql(where);
    }
    //普通的条件查询
    else {
      str = converAndSql(where);
    }
    _sql = `SELECT COUNT(*) AS total_count  FROM ${table} where ${str} `;
  } else {
    _sql = `SELECT COUNT(*) AS total_count  FROM ${table} `;
  }
  return query(_sql);
};

//插入数据
let insertData = function (table, values) {
  let _sql = "INSERT INTO ?? SET ?";
  return query(_sql, [table, values]);
};

//根据id删除数据
let deleteDataById = function (table, id) {
  let _sql = "DELETE FROM ?? WHERE id = ?";
  return query(_sql, [table, id]);
};

//根据条件删除数据
let deleteDataByWhere = function (json) {
  let str = converAndSql(json["where"]);
  let _sql = `DELETE FROM ${json["table"].toString()} WHERE ${str}`;
  return query(_sql);
};

//根据id更新数据
let updatetById = function (table, data, id) {
  data = converSql(data);
  let _sql = `UPDATE ${table} SET ${data}  WHERE id=${id}`;
  return query(_sql);
};

//根据id更新数据
let updatetByWhere = function (table, data, where) {
  data = converSql(data);
  where = converAndSql(where);
  let _sql = `UPDATE ${table} SET ${data}  WHERE ${where}`;
  console.log(_sql);
  return query(_sql);
};

//查询所有数据,因为json["start"]可能为0，所以用json["num"]来判断是否有分页
let findData = function (json) {
  //查询所有数据
  let str = "";
  //如果json["filds"]没有特定需要查询字段，则查询所有的数据
  json["filds"] = json["filds"] ? json["filds"] : "*";
  //如果条件对象json['where']为{}，则不使用条件查询
  json["where"] = JSON.stringify(json["where"]) == "{}" ? null : json["where"];
  //基本查询
  let _sql = `SELECT ${json["filds"]} FROM ${json["table"].toString()}`;
  //根据条件查询所有数据,没有分页
  if (!!json["where"] && !json["num"]) {
    //判断是否是联接查询
    if (!!json["link_search"]) {
      str = conveLinkSql(json["where"]);
    }
    //普通的条件查询
    else {
      str = converAndSql(json["where"]);
    }
    _sql = `SELECT ${json["filds"]} FROM ${json["table"].toString()} WHERE ${str} `;
  }
  //查询所有数据并且分页,没有条件查询
  else if (!json["where"] && !!json["num"]) {
    json["start"] = json["start"] == 1 ? 0 : json["start"];
    _sql = `SELECT ${json["filds"]} FROM ${json["table"].toString()}  LIMIT ${
      json["start"]
    }, ${json["num"]} `;
  }

  //根据条件查询所有数据，并且分页
  else if (!!json["where"] && !!json["num"]) {
    //判断是否是模糊查询
    if (!!json["like_search"]) {
      str = converLikeSql(json["where"]);
    }
    //普通的条件查询
    else {
      str = converAndSql(json["where"]);
    }
    console.log(json["link_search"]);
    
    //开始查询的位置
    json["start"] = json["start"] == 1 ? 0 : json["start"];
    //拼接sql语句
    _sql = `SELECT ${json["filds"]}  FROM ${json["table"].toString()} WHERE ${str} LIMIT ${
      json["start"]
    }, ${json["num"]}`;
  }
  console.log(_sql);
  return query(_sql);
};


module.exports = {
  query,
  createTable,
  insertData,
  count,
  updatetById,
  updatetByWhere,
  findData,
  deleteDataById,
  deleteDataByWhere,
};