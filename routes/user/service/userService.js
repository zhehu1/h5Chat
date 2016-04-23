/**
 * Created by vuji on 16/4/12.
 */
var UserDao = require("../dao/userDao");
var userDao = new UserDao();
var userService = function(){};


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
}


module.exports = userService;