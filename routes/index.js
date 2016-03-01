var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '基于HTML5的实时聊天工具' });
});

module.exports = router;
