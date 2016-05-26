/**
 * Created by vuji on 16/5/25.
 */

var express = require('express');
var router = express.Router();

var GroupService  = require("../service/groupService");
var groupService = new GroupService();
var AjaxResult = require("../../common/ajaxResult");
var Tool = require("../../common/Tools");
var ajaxResult = new AjaxResult();

router.get('/getGroup', function(req, res, next) {
    var id = "";

    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;
    groupService.getGroup(id,function(code,message){
        if(code == 0){
            if(message.affectedRows == 0){
                res.send(ajaxResult.returnSuccess([]));
            }else if(message.affectedRows == 1){
                res.send(ajaxResult.returnSuccess([message.resultObj]));
            }else{
                res.send(ajaxResult.returnSuccess(Array.from(message.resultObj)));
            }
        }else{
            res.send(ajaxResult.returnError(message.message));
        }
    })
});

router.get('/getGroupNoMember', function(req, res, next) {
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;
    groupService.getGroupNoMember(id,function(code,message){
        if(code == 0){
            if(message.affectedRows == 0){
                res.send(ajaxResult.returnSuccess([]));
            }else if(message.affectedRows == 1){
                res.send(ajaxResult.returnSuccess([message.resultObj]));
            }else{
                res.send(ajaxResult.returnSuccess(Array.from(message.resultObj)));
            }
        }else{
            res.send(ajaxResult.returnError(message.message));
        }
    })
});

module.exports = router;