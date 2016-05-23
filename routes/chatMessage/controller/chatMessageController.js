/**
 * Created by vuji on 16/4/27.
 */
var express = require('express');
var router = express.Router();

var ChatMessageService  = require("../service/chatMessageService");
var chatMessageService = new ChatMessageService();
var AjaxResult = require("../../common/ajaxResult");
var ajaxResult = new AjaxResult();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var from = req.query.from;
    var to = req.query.to;
    var msg = req.query.msg;
    var type = req.query.type;
    chatMessageService.insertMsg([from,to,msg,type],function(code,message){
        res.send(ajaxResult.returnSuccess(message));
    })
});

module.exports = router;
