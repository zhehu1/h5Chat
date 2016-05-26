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

module.exports = groupDao;

