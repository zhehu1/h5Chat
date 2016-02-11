/**
 * Created by vuji on 16/2/6.
 */

//数据库连接
var mySqlConn = require('./src/mysql/mysql-conn');

mySqlConn.pool.getConnection(function(err,connection){
    //错误处理
    if(err){
        console.log(err);
        return ;
    }

    //验证用户名密码的正确性
    connection.query('select * from h5Chat_login',function(err,result){
        //错误处理
        if(err){
            console.log(err);
            //connection.release();
            return ;
        }
        //callback(false,result);
        console.log(result);
    });
    connection.release();
});