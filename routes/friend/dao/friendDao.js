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

/**
 * 修改分组
 * @param params
 * @param cb
 */
friendDao.prototype.changeSet = function(params,cb){
    sqlExec.exe(friendSql.changeSet,params,cb);
}

/**
 * 删除好友
 * @param params
 * @param cb
 */
friendDao.prototype.deleteFriend = function(params,cb){
    sqlExec.exe(friendSql.deleteFriend,params,cb);
}

/**
 * 创建新好友分组
 * @param params
 * @param cb
 */
friendDao.prototype.createSet = function(params,cb){
    sqlExec.exe(friendSetSql.createSet,params,cb);
}

/**
 * 修改分组名称
 * @param params
 * @param cb
 */
friendDao.prototype.changeSetName = function(params,cb){
    sqlExec.exe(friendSetSql.updateSetName,params,cb);
}

/**
 * 删除分组
 * @param params
 * @param cb
 */
friendDao.prototype.deleteSet = function(params,cb){
    sqlExec.exe(friendSetSql.deleteSet,params,cb);
}
module.exports = friendDao;