var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var UserService  = require("../service/userService");
var userService = new UserService();
var mailService = require("../../mail/service/mailService");
var AjaxResult = require("../../common/ajaxResult");
var encrypt = require("../../common/encrypt");
var ajaxResult = new AjaxResult();
var BASE_IMG_PATH = "public/userImg/";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * 登录验证
 */
router.post('/loginCheck', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  userService.verify([username,encrypt.sha1(password)],function(code,message){
    if(code != 0){
      res.send(ajaxResult.returnError(message));
    }else{
        req.session.userObj = message;
      res.send(ajaxResult.returnSuccess(message));
    }
  })
});

/**
 * 检测用户是否存在
 */
router.get("/checkIsExit",function(req,res,next){
    var loginName = req.query.loginName;
  userService.checkLoginName([loginName],function(code,data){
    if(code != 0){
      res.send(ajaxResult.returnError(data));
    }else{
      res.send(ajaxResult.returnSuccess(data));
    }
  })
});

/**
 * 用户注册
 */
router.post("/registerDo",function(req,res,next){
  var loginName = req.body.loginName;
  var password = req.body.password;
  var rePassword = req.body.rePassword;
  if(loginName.trim() == ""){
    res.send(ajaxResult.returnError("账号不能为空!"))
  }
  if(password.trim() == ""){
    res.send(ajaxResult.returnError("密码不能为空!"))
  }
  if(rePassword.trim() == ""){
    res.send(ajaxResult.returnError("确认密码不能为空!"))
  }
  if(password.trim() !== rePassword.trim() ){
    res.send(ajaxResult.returnError("两次密码输入不一致!"))
  }
  userService.addUser([loginName,encrypt.sha1(password)],function(code,message){
    if(code != 0){
      res.send(ajaxResult.returnError(message));
    }else{
      res.send(ajaxResult.returnSuccess(message));
    }
  })
});


/**
 * 更新用户信息
 */
router.get("/updateInfo",function(req,res,next){
    var currUserObj = req.session.userObj;
    var picture = req.query.picture || null;
    var nickName = req.query.nickName || null;
    var birthday = req.query.birthday || null;
    var address = req.query.address || null;
    var email = req.query.email || null;
    var tel = req.query.tel || null;
    var sex = req.query.sex || null;
    userService.updateUserInfo([picture,nickName,birthday,address,email,tel,sex,currUserObj.id],function(code,message){
        if(code != 0){
            res.send(ajaxResult.returnError(message));
        }else{
            currUserObj.picture = picture;
            currUserObj.nickName = nickName;
            currUserObj.birthday = birthday;
            currUserObj.address = address;
            currUserObj.email = email;
            currUserObj.tel = tel;
            currUserObj.sex = sex;
            req.session.userObj = currUserObj;
            res.send(ajaxResult.returnSuccess(currUserObj));
        }
    })
});

/**
 * 忘记密码链接页面跳转
 */
router.get("/checkVerifyCode/:uId/:verifyCode",function(req,res,next){
    var verifyCode = req.params.verifyCode;
    var uId = req.params.uId;
    req.session.uId = uId;
    userService.checkForgetPwd([uId,verifyCode],function(code,dataObj){
        if(code != 0){
            res.render('notFound',{title:"错误!",message:dataObj})
        }else{
            res.render('forgetPwd', {title: '修改密码',uId:uId});
        }
    });
});

/**
 * 忘记密码邮件发送
 */
router.get("/forgetPwd",function(req,res,next){
    var uId = req.query.uId;
    var loginName =req.query.loginName;
    var currTime = new Date().getTime();
    var verifyCode = encrypt.sha1(uId + currTime);
    var link = "http://localhost:3000/users/checkVerifyCode/"+uId+"/"+verifyCode;
    userService.addForgetPwd([uId,verifyCode],function(code,dataObj){
        if(code != 0){
            res.send(ajaxResult.returnError(dataObj));
        }else{
            userService.getUserInfoByLoginName([loginName],function(data,dataObj){
                if(code == 0){
                    if(dataObj.email == "" || dataObj.email == null){
                        res.send(ajaxResult.returnError("您的邮箱为空,无法通过邮件找回密码,请与管理员联系!"));
                        return;
                    }
                    mailService.sendForgetPwdMail(dataObj.email,dataObj.nickName,link,function(code,data){
                        if(code != 0){
                            res.send(ajaxResult.returnError("邮件发送失败,请稍后再试!"));
                        }else{
                            res.send(ajaxResult.returnSuccess(dataObj));
                        }
                    })
                }else{
                    res.send(ajaxResult.returnError(dataObj));
                }
            })
        }
    })
});

/**
 * 重置密码
 */
router.post("/forget/resetPwd",function(req,res,next){
    var password = req.body.password;
    var rePassword = req.body.rePassword;
    var uId = req.session.uId;
    if(password == "" || rePassword == ""){
        res.send(ajaxResult.returnError("密码不能为空!"));
    }else{
        if(password != rePassword){
            res.send(ajaxResult.returnError("两次密码输入不一致!"));
        }else{
            userService.resetPWdById([encrypt.sha1(password),uId],function(code,dataObj){
                if(code == 0 ){
                    res.send(ajaxResult.returnSuccess("修改成功"));
                }else{
                    res.send(ajaxResult.returnError(dataObj));
                }

            });
        }
    }
});

module.exports = router;
