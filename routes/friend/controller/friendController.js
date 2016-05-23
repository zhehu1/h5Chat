/**
 * Created by vuji on 16/5/11.
 */
var express = require('express');
var router = express.Router();

var FriendService  = require("../service/friendService");
var friendService = new FriendService();
var AjaxResult = require("../../common/ajaxResult");
var ajaxResult = new AjaxResult();

router.get('/', function(req, res, next) {
    var id = req.query.id || "";
    if(id == ""){
        res.send(ajaxResult.returnError("id不能为空!"));
        return;
    }
    friendService.getFriends(id,function(code,message){
        if(code == 0){
            res.send(ajaxResult.returnSuccess(message.resultObj));
        }else{
            res.send(ajaxResult.returnError(message.message));
        }
    })
});

module.exports = router;