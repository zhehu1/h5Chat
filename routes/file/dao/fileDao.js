/**
 * Created by vuji on 16/4/11.
 */
var fileDao = function(){};
var conn = require('../../connection/mysqlExec');

fileDao.prototype.uploadFile = function(str,next){
    conn.pool.getConnection(function(err,connection){
        //错误处理
        if(err){
            throw "获取数据库链接异常!";
        }

        connection.query(sqlStr,queryArr,function(err,result){

            //var strParseToJSON = JSON.parse(JSON.stringify(result));
            //错误处理
            if(err){
                throw "SQL异常!"+JSON.stringify(err);
            }

            callback(false,strParseToJSON);
        });
        connection.release();
    });
}


module.exports = fileDao;