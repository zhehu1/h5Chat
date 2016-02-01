/**
 * Created by vuji on 16/1/31.
 */
var socketIo = require('socket.io')();

var mySocket = function(){};

mySocket.prototype.init = function(port){
    socketIo = socketIo.listen(port || 3001);
    //socket部分
    socketIo.on('connection', function(socket) {
        //接收并处理客户端发送的foo事件
        //socket.emit('this', { will: 'be received by everyone'});

        socket.on('private message', function (from, msg) {
            console.log('I received a private message by ', from, ' saying ', msg);
        });

        socket.on('disconnect', function () {
            socket.emit('user disconnected');
        });
    });
};

module.exports = mySocket;