/**
 * Created by vuji on 16/4/11.
 */
var mysql = require("mysql");
var conf = require("./mysqlConn");


//创建连接池
var pool = mysql.createPool(conf.mysqlDev);

exports.pool = pool;