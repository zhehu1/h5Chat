var express = require('express');
var router = express.Router();
var AjaxResilt = require("../src/ajaxResult/ajaxResult");
var ajaxResult = new AjaxResilt();

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
    console.log(username,password);
    if(username==""||password!="123"){
       res.send(ajaxResult.returnError("用户名或密码错误!"));
    }else{
      res.send(ajaxResult.returnSuccess("登录成功!"));
    }
});

module.exports = router;
