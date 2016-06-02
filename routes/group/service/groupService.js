/**
 * Created by vuji on 16/5/25.
 */
/**
 * Created by vuji on 16/4/12.
 */
var GroupDao = require("../dao/groupDao");
var groupDao = new GroupDao();
var groupService = function(){};

/**
 * 群组查询
 * @param parsms
 * @param cb
 */
groupService.prototype.getGroup = function(parsms,cb){
    groupDao.getGroup(parsms,function(data){
        if(data.code == 0){
            cb(0,data.resultObj);
        }else if(data.code == -1){
            cb(1,"数据库异常");
        }else{
            cb(1,"查询失败,请稍后再试!");
        }
    })
}

/**
 * 群组查询(不含群成员)
 * @param parsms
 * @param cb
 */
groupService.prototype.getGroupNoMember = function(parsms,cb){
    groupDao.getGroupNoMember(parsms,function(data){
        if(data.code == 0){
            cb(0,data);
        }else if(data.code == -1){
            cb(1,"数据库异常");
        }else{
            cb(1,"查询失败,请稍后再试!");
        }
    })
}

/**
 * 通过群组id查询群组信息
 * @param params
 * @param cb
 */
groupService.prototype.searchGroupById = function(params,cb){
    groupDao.searchGroupById(params,function(data){
        if(data.code == -1){
            cb(1,"数据库异常");
            return;
        }
        if(data.code == 0){
            if(data.affectedRows != 0){
                cb(0,data);
            }else{
                cb(1,"没有查询到该群组!");
            }
        }else{
            cb(1,"网络异常!");
        }
    })
}

/**
 * 验证用户是否在群组中
 * @param params
 * @param cb
 */
groupService.prototype.verifyUserInGroup = function(params,cb){
    groupDao.verifyIUserInGroupById(params,function(data){
        if(data.affectedRows == 0){
            cb(0,"ok");
        }else if(data.affectedRows == 1){
            cb(1,"您已加入该群组!");
        }else{
            cb(1,"查询异常!");
        }
    })
}

/**
 * 用户加入群组
 * @param params
 * @param cb
 */
groupService.prototype.addUserToGroupById = function(params,cb){
    groupDao.addUserToGroupById(params,function(data){
        if(data.code == 0){
            cb(0,data);
        }else if(data.code == -1){
            cb(1,"数据库异常");
        }else{
            cb(1,"查询失败,请稍后再试!");
        }
    })
}

/**
 * 退出群组
 * @param params
 * @param cb
 */
groupService.prototype.exitGroup = function(params,cb){
    groupDao.exitGroup(params,function(data){
        if(data.code == 0){
            cb(0,data);
        }else if(data.code == -1){
            cb(1,"数据库异常");
        }else{
            cb(1,"退出失败,请稍后再试!");
        }
    })
}

/**
 * 新建群组
 * @param params
 * @param cb
 */
groupService.prototype.createGroup = function(params,cb){
    groupDao.createGroup(params,function(data){
        if(data.code == 0){
            cb(0,data);
        }else if(data.code == -1){
            cb(1,"数据库异常");
        }else{
            cb(1,"创建失败,请稍后再试!");
        }
    })
}

/**
 * 修改群组名
 * @param params
 * @param cb
 */
groupService.prototype.updateGroupName = function(params,cb){
    groupDao.updateGroupName(params,function(data){
        if(data.code == 0){
            cb(0,data);
        }else if(data.code == -1){
            cb(1,"数据库异常");
        }else{
            cb(1,"创建失败,请稍后再试!");
        }
    })
}

module.exports = groupService;
