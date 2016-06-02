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

/**
 * 查询群组信息(包含群成员)
 */
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

/**
 * 查询群组信息(不包含群成员)
 */
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

/**
 * 通过id查询群组信息
 */
router.get("/searchGroupById",function(req,res,next){
    var searchId = req.query.id || "";
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;

    if(searchId == ""){
        res.send(ajaxResult.returnError("id不能为空!"));
        return;
    }

    groupService.searchGroupById([searchId,"%"+searchId+"%"],function(code,data){
        if(code == 0){
            res.send(ajaxResult.returnSuccess(Tool.toArray(data)));
        }else{
            res.send(ajaxResult.returnError(data));
        }
    })
})

/**
 * 添加用户到群组
 */
router.get("/addUserToGroup",function(req,res,next){
    var groupId = req.query.id || "";
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;

    if(groupId == ""){
        res.send(ajaxResult.returnError("id不能为空!"));
        return;
    }
    groupService.verifyUserInGroup([groupId,id],function(code,data){
        if(code == 0){
            groupService.addUserToGroupById([groupId,id],function(code,data){
                if(code == 0){
                    res.send(ajaxResult.returnSuccess(data.resultObj));
                }else{
                    res.send(ajaxResult.returnError(data.message));
                }
            })
        }else{
            res.send(ajaxResult.returnError("你已经加入过了,请勿重复加入!"));
        }
    })
});

/**
 * 退出群组
 */
router.get("/exitGroup",function(req,res,next){
    var groupId = req.query.groupId || "";
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;

    groupService.exitGroup([id,groupId],function(code,data){
        if(code == 0){
            res.send(ajaxResult.returnSuccess(data.resultObj));
        }else{
            res.send(ajaxResult.returnError(data.message));
        }
    })
});


/**
 * 创建群组
 */
router.get("/createGroup",function(req,res,next){
    var groupName = req.query.name || "";
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;
    if(groupName == ""){
        res.send(ajaxResult.returnError("名称不能为空!"));
        return;
    }

    groupService.createGroup([groupName,id],function(code,data){
        if(code == 0){
            res.send(ajaxResult.returnSuccess(data.resultObj));
        }else{
            res.send(ajaxResult.returnError(data.message));
        }
    })
});

/**
 * 创建群组
 */
router.get("/changeGroupName",function(req,res,next){
    var groupId = req.query.id || "";
    var groupName = req.query.name || "";
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;
    if(groupName == ""){
        res.send(ajaxResult.returnError("名称不能为空!"));
        return;
    }

    groupService.updateGroupName([groupName,groupId],function(code,data){
        if(code == 0){
            res.send(ajaxResult.returnSuccess(data.resultObj));
        }else{
            res.send(ajaxResult.returnError(data.message));
        }
    })
});

module.exports = router;