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

module.exports = groupService;
