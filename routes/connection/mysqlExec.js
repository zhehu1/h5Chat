/**
 * Created by vuji on 16/4/11.
 */
var conn = require("./mysqlPool");
var SqlResult = require("../common/sqlResult");
var sqlResult = new SqlResult();
var sqlExec = function(){};


//创建连接池

sqlExec.prototype.exe = function(sql,params,callback){
    conn.pool.getConnection(function(err,connection){
        if(err){
            throw "获取数据库连接失败!"
        }
        connection.query(sql,params || [],function(err,result){
            //错误处理
            if(err){
                if(err.errno == 1062){
                    if(err){
                        if(err.errno == 1062){
                            callback(sqlResult.isErr(err));
                            return;
                        }
                    }
                    return;
                }
            }
            callback(sqlResult.exeSuccess(result));
        });
        connection.release();
    })
}

sqlExec.prototype.transaction = function(sql,params,callback){
    conn.pool.getConnection(function(err,connection){
        if(err){
            throw "获取数据库连接失败!"
        }
        connection.beginTransaction(function(err){
            if(err){
                throw err;
                return;
            }
            connection.query(sql,params,function(err,result){
              if(err){
                  //if(err.errno == 1062){
                      callback(sqlResult.isErr(err));
                      return;
                  //}
              }
                connection.commit(function(err){
                    if(err){
                        callback(sqlResult.isErr(err));
                        return;
                    }
                    callback(sqlResult.exeSuccess(result));
                });
            })
        })
    })
}


module.exports = sqlExec;