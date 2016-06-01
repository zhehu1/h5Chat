/**
 * Created by vuji on 16/5/11.
 */
var express = require('express');
var router = express.Router();

var FriendService  = require("../service/friendService");
var friendService = new FriendService();
var UserService = require("../../user/service/userService");
var userService = new UserService();
var AjaxResult = require("../../common/ajaxResult");
var Tool = require("../../common/Tools");
var ajaxResult = new AjaxResult();

/**
 * 获得好友列表
 */
router.get('/', function(req, res, next) {
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;
    friendService.getFriendSet([id],function(code,data) {
        friendService.getFriends(id, function (code, message) {
            if (code == 0) {
                res.send(ajaxResult.returnSuccess({set:Tool.toArray(data),friend:Tool.groupArrByKey(message.resultObj, "setName")}));
            } else {
                res.send(ajaxResult.returnError(message.message));
            }
        })
    });
});

/**
 * 根据id查询用户信息
 */
router.get("/searchById",function(req,res,next){
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
    if(searchId == id){
        res.send(ajaxResult.returnError("不能添加自己为好友!"));
        return;
    }
    friendService.getFriendSet([id],function(code,data){
        if(code == 0){
            userService.getUserInfoById([searchId],function(code,data2){
                if(code == 0){
                    res.send(ajaxResult.returnSuccess({set:Tool.toArray(data),userInfo:data2}));
                }else{
                    res.send(ajaxResult.returnError(data2.message));
                }
            })
        }else{
            res.send(ajaxResult.returnError(data.message));
        }
    })
});

/**
 * 添加好友
 */
router.get("/addFriend",function(req,res,next){
    var friendId = req.query.friendId || "";
    var setId = req.query.setId || "";
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.unLogin());
        return;
    }
    id = req.session.userObj.id;
    if(friendId == ""){
        res.send(ajaxResult.returnError("id不能为空!"));
        return;
    }
    if(setId == ""){
        res.send(ajaxResult.returnError("分组不能为空!"));
        return;
    }
    if(friendId == id){
        res.send(ajaxResult.returnError("不能添加自己为好友!"));
        return;
    }
    friendService.verifyIsExist([id,friendId],function(code,data){
        if(code == 0){
            friendService.addFriend([id,friendId,setId],function(code,data){
                if(code == 0){
                    res.send(ajaxResult.returnSuccess(data.resultObj));
                }else{
                    res.send(ajaxResult.returnError(data.message));
                }
            })
        }else{
            res.send(ajaxResult.returnError("你们已经是好友了!"));
        }
    })
})


/**
 * 修改分组
 */
router.get("/changeSet",function(req,res,next){
    var setId = req.query.setId || "";
    var friendId = req.query.friendId || "";
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;
    friendService.changeSet([setId,friendId,id],function(code,data){
        if(code == 0){
            res.send(ajaxResult.returnSuccess(data.resultObj));
        }else{
            res.send(ajaxResult.returnError(data.message));
        }
    });
})

/**
 * 删除好友
 */
router.get("/deleteFriend",function(req,res,next){
    var friendId = req.query.friendId || "";
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;
    friendService.deleteFriend([friendId,id],function(code,data){
        if(code == 0){
            res.send(ajaxResult.returnSuccess(data.resultObj));
        }else{
            res.send(ajaxResult.returnError(data.message));
        }
    })
})

/**
 * 新建分组
 */
router.get("/createSet",function(req,res,next){
    var name = req.query.name || "";
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;
    if(name == ""){
        res.send(ajaxResult.returnError("名称不能为空!"));
        return;
    }
    friendService.createSet([id,name],function(code,data){
        if(code == 0){
            res.send(ajaxResult.returnSuccess(data.resultObj));
        }else{
            res.send(ajaxResult.returnError(data.message));
        }
    })
})

/**
 * 获得分组
 */
router.get("/getFriendSet",function(req,res){
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;

    friendService.getFriendSet([id],function(code,data){
        if(code == 0){
            res.send(ajaxResult.returnSuccess(Tool.toArray(data)));
        }else{
            res.send(ajaxResult.returnError(data.message));
        }
    })
})

/**
 * 修改分组名称
 */
router.get("/changeSetName",function(req,res){
    var setId = req.query.id;
    var setName = req.query.name;
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;
    friendService.changeSetName([setName,setId,id],function(code,data){
        if(code == 0){
            res.send(ajaxResult.returnSuccess(data));
        }else{
            res.send(ajaxResult.returnError(data));
        }
    })
});

/**
 * 删除分组
 */
router.get("/deleteSet",function(req,res){
    var setId = req.query.id;
    var id = "";
    if(typeof req.session.userObj == "undefined"){
        res.send(ajaxResult.returnError("请登录后再试!"));
        return;
    }
    id = req.session.userObj.id;
    friendService.deleteSet([setId,id],function(code,data){
        if(code == 0){
            res.send(ajaxResult.returnSuccess(data));
        }else{
            res.send(ajaxResult.returnError(data));
        }
    })
})

module.exports = router;