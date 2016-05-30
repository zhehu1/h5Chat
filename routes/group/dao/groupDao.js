/**
 * Created by vuji on 16/5/24.
 */
var SqlExec = require("../../connection/mysqlExec");
var groupSql = require("../sql/groupSql");
var sqlExec = new SqlExec();

var groupDao = function(){};

/**
 * 群组查询
 * @param params
 * @param cb
 */
groupDao.prototype.getGroup = function(params,cb){
    sqlExec.exe(groupSql.query,params,cb);
};

/**
 * 群组查询(不含群成员)
 * @param params
 * @param cb
 */
groupDao.prototype.getGroupNoMember = function(params,cb){
    sqlExec.exe(groupSql.queryNoMember,params,cb);
};

/**
 * 通过群组id查询群组信息
 * @param params
 * @param cb
 */
groupDao.prototype.searchGroupById = function(params,cb){
    sqlExec.exe(groupSql.searchGroupById,params,cb);
}

/**
 * 验证用户是否已经在群组中
 * @param params
 * @param cb
 */
groupDao.prototype.verifyIUserInGroupById = function(params,cb){
    sqlExec.exe(groupSql.verifyIUserInGroupById,params,cb);
}

/**
 * 加入群组
 * @param params
 * @param cb
 */
groupDao.prototype.addUserToGroupById = function(params,cb){
    sqlExec.exe(groupSql.addUserToGroupById,params,cb);
}

/**
 * 退出群组
 * @param params
 * @param cb
 */
groupDao.prototype.exitGroup = function(params,cb){
    sqlExec.exe(groupSql.exitGroup,params,cb);
}

/**
 * 新建群组
 * @param params
 * @param cb
 */
groupDao.prototype.createGroup = function(params,cb){
    sqlExec.exe(groupSql.createGroup,params,cb);
}

/**
 * 修改群组名称
 * @param params
 * @param cb
 */
groupDao.prototype.updateGroupName = function(params,cb){
    sqlExec.exe(groupSql.updateGroupName,params,cb);
}

module.exports = groupDao;

