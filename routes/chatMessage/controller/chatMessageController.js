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
        res.send(ajaxResult.returnError("请登录后再试!"));
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

module.exports = router;
