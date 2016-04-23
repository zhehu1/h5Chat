var express = require('express');
var router = express.Router();
var AjaxResult = require("./common/ajaxResult");
var ajaxResult = new AjaxResult();
var UserService  = require("./user/service/userService");
var userService = new UserService();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '基于HTML5的实时聊天工具' });
});

//Checks route params (req.params), ex: /user/:id
//Checks query string params (req.query), ex: ?id=12
//Checks urlencoded body params (req.body), ex: id=

router.post('/loginCheck', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    userService.verify([username,password],function(code,message){
        if(code != 0){
            res.send(ajaxResult.returnError(message));
        }else{
            res.send(ajaxResult.returnSuccess(message));
        }
    })
});

module.exports = router;