var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mySocket =new require('./src/mySocket');
var routes = require('./routes/index');
var users = require('./routes/users');

//数据库连接
var mySqlConn = require('./src/mysql/mysql-conn');

mySqlConn.pool.getConnection(function(err,connection){
  //错误处理
  if(err){
    callback(true);
    return ;
  }

  //验证用户名密码的正确性
  connection.query('select * from h5Chat_login',function(err,result){
    //错误处理
    if(err){
      callback(true);
      //connection.release();
      return ;
    }
    //callback(false,result);
    console.log(result);
  });
  connection.release();
})

//初始化自定义socket
var socket = new mySocket();
socket.init();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
