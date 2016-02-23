/**
 * 数据库配置
 * @type {exports|module.exports}
 *
 * Created by vuji on 16/2/6.
 */
var mysql = require('mysql');

var conf = {
    //dev
    mysqlDev: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database:'h5Chat', // 前面建的user表位于这个数据库中
        port: 3306,             //数据库端口
        connectionLimit: 30,        //配置最大链接数
        supportBigNumbers: true
    },
    //product
     mysql: {
     host: '10.9.1.188',
     user: 'akp8v3HkQTvRpkNN',
     password: '2Jooo33M9IYH0Vfr',
     database:'cf_39d5bd47_6f70_474f_99a0_0615a1ed0549', // 前面建的user表位于这个数据库中
     port: 3306,             //数据库端口
     connectionLimit: 30,        //配置最大链接数
     supportBigNumbers: true
     }
};

var pool = mysql.createPool(conf.mysqlDev);

exports.pool = pool;