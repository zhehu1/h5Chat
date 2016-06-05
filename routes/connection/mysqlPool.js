/**
 * Created by vuji on 16/4/11.
 */
var mysql = require("mysql");
var conf = {
    //dev
    mysqlDev: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database:'HTML5Chat', // 前面建的user表位于这个数据库中
        port: 3306,             //数据库端口
        connectionLimit: 30,        //配置最大链接数
        supportBigNumbers: true,
        debug:false
    }
};
var conn = mysql.createPool(conf.mysqlDev);

exports.pool = conn;
