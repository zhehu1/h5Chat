var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/user/controller/users');
var fileUpload = require('./routes/file/controller/fileUpload');
var chatMessage = require('./routes/chatMessage/controller/chatMessageController');
var friend = require('./routes/friend/controller/friendController');
var group = require('./routes/group/controller/groupController');

var app = express();

app.use(session({
  secret: 'HTML5Chat', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 24*60*60 * 1000 },
  resave:true,
  saveUninitialized:false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
//app.use(bodyParser({uploadDir:'./uploads'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/fileUpload', fileUpload);
app.use('/chatMessage', chatMessage);
app.use('/friend', friend);
app.use('/group', group);

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
