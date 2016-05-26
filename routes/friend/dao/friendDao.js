/**
 * Created by vuji on 16/5/11.
 */
var SqlExec = require("../../connection/mysqlExec");
var friendSql = require("../sql/friendSql");
var friendSetSql = require("../sql/friendSetSql");
var sqlExec = new SqlExec();

var friendDao = function(){};

/**
 * 查询用户好友列表
 * @param params
 * @param cb
 */
friendDao.prototype.queryFriends = function(params,cb){
    sqlExec.exe(friendSql.query,params,cb);
};

/**
 * 查询用户分组
 * @param params
 * @param cb
 */
friendDao.prototype.getFriendSet = function(params,cb){
    sqlExec.exe(friendSetSql.querySet,params,cb);
}

/**
 * 验证好友是否存在
 * @param params
 * @param cb
 */
friendDao.prototype.verifyIsExist = function(params,cb){
    sqlExec.exe(friendSql.verifyIsExist,params,cb);
}

/**
 * 添加好友
 * @param params
 * @param cb
 */
friendDao.prototype.addFriend = function(params,cb){
    sqlExec.exe(friendSql.addFriend,params,cb);
}


module.exports = friendDao;