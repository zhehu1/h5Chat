/**
 * Created by vuji on 16/4/27.
 */
var ChatMessageDao = require("../dao/chatMessageDao");
var chatMessageDao = new ChatMessageDao();
var chatMessageService = function(){};

/**
 * 插入消息到数据库
 * @param parsms
 * @param cb
 */
chatMessageService.prototype.insertMsg = function(parsms,cb){
    chatMessageDao.insertMsg(parsms,function(data){
        if(data.code == 0){
            //cb(0,"插入成功!");
            cb(0,data);
        }else if(data.code == -1){
            cb(1,"插入失败!");
        }else{
            cb(1,"数据库异常!");
        }
    })
}

module.exports = chatMessageService;