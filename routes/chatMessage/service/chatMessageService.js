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
            cb(0,data);
        }else if(data.code == -1){
            cb(1,"数据库异常!");
        }else{
            cb(1,"插入失败!");
        }
    })
}

/**
 * 获取聊天记录
 * @param params
 * @param cb
 */
chatMessageService.prototype.getMsgRecord = function(params,cb){
    chatMessageDao.getMsgRecord(params,function(data){
        if(data.code == 0){
            cb(0,data);
        }else if(data.code == -1){
            cb(1,"数据库异常!");
        }else{
            cb(1,"查询失败,请稍后再试!");
        }
    })
}

module.exports = chatMessageService;