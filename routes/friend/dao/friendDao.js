/**
 * Created by vuji on 16/5/11.
 */
var SqlExec = require("../../connection/mysqlExec");
var friendSql = require("../sql/friendSql");
var sqlExec = new SqlExec();

var friendDao = function(){};

/**
 * 用户注册
 * @param params
 * @param cb
 */
friendDao.prototype.queryFriends = function(params,cb){
    sqlExec.exe(friendSql.query,params,cb);
};

module.exports = friendDao;