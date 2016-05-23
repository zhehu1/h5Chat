var express = require('express');
var router = express.Router();
var AjaxResult = require("./common/ajaxResult");
var ajaxResult = new AjaxResult();


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session);
  res.render('index', { title: '基于HTML5的实时聊天工具' });
});

//Checks route params (req.params), ex: /user/:id
//Checks query string params (req.query), ex: ?id=12
//Checks urlencoded body params (req.body), ex: id=

router.get("/register",function(req,res,next){
   res.render("register",{title:"用户注册"})
});

router.get("/forgetPwd",function(req,res,next){
    res.render("forget",{title:"找回密码"})
})

module.exports = router;