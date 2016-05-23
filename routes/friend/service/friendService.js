/**
 * Created by vuji on 16/5/11.
 */
var FriendDao = require("../dao/friendDao");
var friendDao = new FriendDao();
var friendService = function(){};

/**
 * 插入消息到数据库
 * @param parsms
 * @param cb
 */
friendService.prototype.getFriends = function(parsms,cb){
    friendDao.queryFriends(parsms,function(data){
        if(data.code == 0){
            cb(0,data);
        }else if(data.code == -1){
            cb(1,"插入失败!");
        }else{
            cb(1,"数据库异常!");
        }
    })
}

module.exports = friendService;