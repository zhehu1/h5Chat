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
    var arr =[];
    arr.push(req.query.from);
    arr.push(req.query.to);
    arr.push(req.query.msg);
    arr.push(req.query.type);
    chatMessageService.insertMsg(arr,function(code,message){
        res.send(ajaxResult.returnSuccess(message));
    })
});

module.exports = router;