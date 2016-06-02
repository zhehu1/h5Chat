/**
 * Created by vuji on 16/4/27.
 */
var express = require('express');
var router = express.Router();

var ChatMessageService  = require("../service/chatMessageService");
var chatMessageService = new ChatMessageService();
var AjaxResult = require("../../common/ajaxResult");
var ajaxResult = new AjaxResult();
var Tool = require("../../common/Tools");

/* GET users listing. */
router.get('/', function(req, res) {
    var from = req.query.from;
    var to = req.query.to;
    var msg = req.query.msg;
    var type = req.query.type;
    chatMessageService.insertMsg([from,to,msg,type],function(code,message){
        res.send(ajaxResult.returnSuccess(message));
    })
});

/**
 * 获得聊天记录
 */
router.get("/getMsgRecord",function(req,res){
    var from = req.query.from;
    var isGroup = (req.query.type === 2 || req.query.type === "2")?1:0;
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.unLogin());
        return;
    }
    id = req.session.userObj.id;
    chatMessageService.getMsgRecord([from,id,from,id,isGroup],function(code,data){
        if (code == 0) {
            res.send(ajaxResult.returnSuccess(Tool.toArray(data)));
        } else {
            res.send(ajaxResult.returnError(data));
        }
    })
});

/**
 * 文件下载
 */
router.get("/downloadRecord/:isGroup/:uId",function(req,res){
    var uId = req.params.uId;
    var isGroup = req.params.isGroup;
    var id = "";
    var msgData = "";
    if(typeof req.session.userObj == "undefined"){
        res.render('notFound',{title:"聊天记录下载失败",message:"请登录后再试!"});
        return;
    }
    id = req.session.userObj.id;
    if(uId == "" || isGroup == ""){
        res.render('notFound',{title:"聊天记录下载失败",message:"链接错误!"});
        return;
    }
    chatMessageService.getMsgRecord([uId,id,uId,id,isGroup],function(code,data){
        if (code == 0) {
            var msgRecord = Tool.toArray(data);
            msgRecord.forEach(function(item){
                msgData += msgHandel(item);
            });
            res.attachment('聊天记录.txt');
            res.set({
                'Content-Type': 'text/plain',
                'Content-Length': msgData.length,
            });
            res.send(new Buffer(msgData));
        } else {
            res.render('notFound',{title:"错误",message:"服务器异常,请与管理员联系!"});
        }
    })
});


function msgHandel(data){
    var type = data.type;
    var from = data.from;
    var to = data.to;
    var msg = JSON.parse(data.msg);
    var time = new Date(data.time);
    var currStr = "";
    if(type == 1){
        currStr = msg.from.nick+"(id:"+from+")  "+ time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate() + " " + time.getHours() + ":"+time.getMinutes() + ":" + time.getSeconds() + "\r\n"+emjoyHandel(msg.msg)+"\r\n";
    }else if(type == 2){
        currStr = msg.from.nick+"(id:"+from+")  "+ time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate() + " " + time.getHours() + ":"+time.getMinutes() + ":" + time.getSeconds() + "\r\n[图片](路径:"+msg.msg[0].linkPath+")\r\n";
    }else{
        currStr = msg.from.nick+"(id:"+from+")  "+ time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate() + " " + time.getHours() + ":"+time.getMinutes() + ":" + time.getSeconds() + "\r\n";
        Array.from(msg.msg).forEach(function(item){
            currStr += "[文件](路径:"+item.linkPath+")\r\n";
        });
    }
    currStr += "\r\n";
    return currStr;
}

function emjoyHandel(msg){
    var tmpStr = msg;
    var reg1 = /<img src='.+\.png' class='emjoy'\/>/;
    var reg2 = /\/emjoy\/\d+\@\d+x.png/;
    var emjoyArr = msg.match(reg1) || [];
    emjoyArr.forEach(function(item){
        tmpStr = tmpStr.replace(item,"[表情](路径:"+item.match(reg2)[0]+")");
    });
    return tmpStr;
}

module.exports = router;
