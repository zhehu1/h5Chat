/**
 * Created by vuji on 16/4/11.
 */

var SqlExec = require("../../connection/mysqlExec");
var loginSQL = require("../sql/loginSQL");
var userSQL = require("../sql/userSQL");
var forgetPwdSQL = require("../sql/forgetPwd");
var sqlExec = new SqlExec();

var userDao = function(){};

/**
 * 用户注册
 * @param params
 * @param cb
 */
userDao.prototype.register = function(params,cb){
    sqlExec.exe(loginSQL.add,params,cb);
};

/**
 * 用户登录验证
 * @param params
 * @param cb
 */
userDao.prototype.verify = function(params,cb){
    sqlExec.exe(loginSQL.verifyUser,params,cb);
};

/**
 * 修改密码
 * @param params
 * @param cb
 */
userDao.prototype.changePwd = function(params,cb){
    sqlExec.exe(loginSQL.changePwd,params,cb);
};

/**
 * 获取当前登录用户的用户信息
 * @param params
 * @param cb
 */
userDao.prototype.getUserInfo = function(params,cb){
    sqlExec.exe(userSQL.getUserInfo,params,cb);
};

/**
 * 通过账号获取当前登录用户的用户信息
 * @param params
 * @param cb
 */
userDao.prototype.getUserInfoByLoginName = function(params,cb){
    sqlExec.exe(userSQL.getUserInfoByLoginName,params,cb);
};

/**
 * 通过Id获取当前登录用户的用户信息
 * @param params
 * @param cb
 */
userDao.prototype.getUserInfoById = function(params,cb){
    sqlExec.exe(userSQL.getUserInfoById,params,cb);
}

/**
 * 检查用户名是否已存在
 * @param params
 * @param cb
 */
userDao.prototype.checkLoginNameIsExit = function(params,cb){
    sqlExec.exe(userSQL.checkIsExit,params,cb);
}


/**
 * 更新用户信息
 * @param params
 * @param cb
 */
userDao.prototype.updateUserInfo = function(params,cb){
    sqlExec.exe(userSQL.updateUserInfo,params,cb);
}

/**
 * 新增忘记密码数据
 * @param params
 * @param cb
 */
userDao.prototype.addForgetPwd = function(params,cb){
    sqlExec.exe(forgetPwdSQL.create,params,cb);
}

/**
 * 更新忘记密码数据状态
 * @param params
 * @param cb
 */
userDao.prototype.updateForgetPwd = function(params,cb){
    sqlExec.exe(forgetPwdSQL.update,params,cb);
}

/**
 * 获得用户信息
 * @param params
 * @param cb
 */
userDao.prototype.getUidByVerifyCode = function(params,cb){
    sqlExec.exe(forgetPwdSQL.getUid,params,cb);
}

/**
 * 根据用户Id重置密码
 * @param params
 * @param cb
 */
userDao.prototype.resetPwdById = function(params,cb){
    sqlExec.exe(forgetPwdSQL.resetPwd,params,cb);
}


module.exports = userDao;

