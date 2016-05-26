/**
 * Created by vuji on 16/4/12.
 */
var UserDao = require("../dao/userDao");
var userDao = new UserDao();
var userService = function(){};

/**
 * 新增用户
 * @param parsms
 * @param cb
 */
userService.prototype.addUser = function(parsms,cb){
    userDao.register(parsms,function(data){
        if(data.code == 0){
            cb(0,"注册成功!");
        }else if(data.code == -1){
            cb(1,"该用户已存在!");
        }else{
            cb(1,"注册失败,请稍后再试!");
        }
    })
}

/**
 * 用户登录验证
 * @param params
 * @param cb
 */
    userService.prototype.verify = function (params,cb){
    userDao.verify(params,function(data){
        if(data.code == 0){
            //验证成功获取用户信息
            userDao.getUserInfo(params,function(data){
                if(data.code == 0) {
                    cb(0, data.resultObj);
                } else if(data.code == -1){
                    cb(1,"数据库异常!");
                }else{
                    cb(1,"用户名或密码错误!");
                }
            })
        }else if(data.code == -1){
            cb(1,"数据库异常!");
        }else{
            cb(1,"用户名或密码错误!");
        }
    });
};

/**
 * 密码修改
 * @param params
 * @param cb
 */
userService.prototype.changePwd = function(params,cb){
    userDao.changePwd(params,function(data){
        if(data.code == 0){
            cb(0,"密码修改成功!");
        }else if(data.code == -1){
            cb(1,"数据库异常!");
        }else{
            cb(1,"密码修改失败,请稍后再试!");
        }
    })
};


/**
 * 获取用户信息
 * @type {userService}
 */
userService.prototype.getUserInfoByLoginName = function(params,cb){
    userDao.getUserInfoByLoginName(params,function(data){
        if(data.code == 0) {
            cb(0, data.resultObj);
        } else if(data.code == -1){
            cb(1,"数据库异常!");
        }else{
            cb(1,"用户名或密码错误!");
        }
    })
};

/**
 * 通过id获取用户信息
 * @param params
 * @param cb
 */
userService.prototype.getUserInfoById = function(params,cb){
    userDao.getUserInfoById(params,function(data){
        if(data.code == 0) {
            cb(0, data.resultObj);
        } else if(data.code == -1){
            cb(1,"数据库异常!");
        }else{
            cb(1,"用户名或密码错误!");
        }
    })
};

/**
 * 检测用户名是否存在
 * @param params
 * @param cb
 */
userService.prototype.checkLoginName = function(params,cb){
    userDao.checkLoginNameIsExit(params,function(data){
        if(data.code == 0) {
            if(data.affectedRows == 0){
                cb(0, "该账号不存在");
            }else{
                cb(1,data.resultObj);
            }
        } else if(data.code == -1){
            cb(1,"数据库异常!");
        }else{
            cb(1,"该账号已存在!");
        }
    })
}

/**
 * 修改用户信息
 * @param params
 * @param cb
 */
userService.prototype.updateUserInfo = function(params,cb){
    userDao.updateUserInfo(params,function(data){
        if(data.code == 0) {
            cb(0, data.resultObj);
        } else if(data.code == -1){
            cb(1,"数据库异常!");
        }else{
            cb(1,"用户信息修改失败!");
        }
    })
}

/**
 * 忘记密码
 * @param params
 * @param cb
 */
userService.prototype.addForgetPwd = function(params,cb){
    userDao.addForgetPwd(params,function(data){
        if(data.code == 0){
            cb(0,data);
        }else if(data.code == -1){
            cb(1,"数据库异常!");
        }else{
            cb(1,"网络异常!");
        }
    });
}

/**
 * 忘记密码信息验证
 * @param params
 * @param cb
 */
userService.prototype.checkForgetPwd = function(params,cb){
    userDao.updateForgetPwd(params,function(data) {
        if (data.code == 0) {
            cb(0, data.resultObj);
        } else if (data.code == -1) {
            cb(1, "数据库异常!");
        } else {
            cb(1, "该链接不存在或已失效!");
        }
    })
}

/**
 * 查询用户信息
 * @param params
 * @param cb
 */
userService.prototype.getUserInfoByVerifyCode = function(params,cb){
    userDao.getUidByVerifyCode(params,function(data) {
        if (data.code == 0) {
            cb(0, data.resultObj);
        } else if (data.code == -1) {
            cb(1, "数据库异常!");
        } else {
            cb(1, "无数据");
        }
    })
}

/**
 * 通过用户Id重置密码
 * @param params
 * @param cb
 */
userService.prototype.resetPWdById = function(params,cb){
    userDao.resetPwdById(params,function(data){
        if (data.code == 0) {
            cb(0, data.resultObj);
        } else if (data.code == -1) {
            cb(1, "数据库异常!");
        } else {
            cb(1, "用户不存在!");
        }
    })
}


module.exports = userService;